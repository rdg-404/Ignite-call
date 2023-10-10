/* eslint-disable camelcase */
import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const createCallingBody = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string(),
  date: z.string().datetime(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' })
  }

  const { name, email, observations, date } = createCallingBody.parse(req.body)

  const callingDate = dayjs(date).startOf('hour')

  if (callingDate.isBefore(new Date())) {
    return res.status(400).json({ message: 'Date is in the past' })
  }

  const conflictingCalling = await prisma.calling.findFirst({
    where: {
      user_id: user.id,
      date: callingDate.toDate(),
    },
  })

  if (conflictingCalling) {
    return res
      .status(400)
      .json({ message: 'There is another scheduling at at the same time.' })
  }

  const calling = await prisma.calling.create({
    data: {
      name,
      email,
      observations,
      date: callingDate.toDate(),
      user_id: user.id,
    },
  })

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
  })

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Ignite Call ${name}`,
      description: observations,
      start: {
        dateTime: callingDate.format(),
      },
      end: {
        dateTime: callingDate.add(1, 'hour').format(),
      },
      attendees: [{ email, displayName: name }],
      conferenceData: {
        createRequest: {
          requestId: calling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
  })

  return res.status(201).end()
}

import { prisma } from '@/lib/prisma'
// import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { year, month } = req.query

  if (!year || !month) {
    return res.status(404).json({ message: 'Year or month not specified.' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' })
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    )
  })

  const blockedDatesRaw: Array<{ day: number }> = await prisma.$queryRaw`
    SELECT 
      EXTRACT(DAY FROM C.date) AS day,
      COUNT(C.date) AS amount,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size


    FROM callings C

    LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = WEEKDAY(DATE_ADD(C.date, INTERVAL 1 DAY))

    WHERE C.user_id = ${user.id}
      AND DATE_FORMAT(C.date, "%Y-%m") = ${`${year}-${month}`}

    GROUP BY EXTRACT(DAY FROM C.date),
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)


    HAVING amount >= size
  `

  const blockedDates = blockedDatesRaw.map((item) => item.day)
  // console.log(blockedDates)

  return res.json({ blockedWeekDays, blockedDates })
}

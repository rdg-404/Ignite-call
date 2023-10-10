import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './style'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import { CallForm } from './CallForm'
import { NextSeo } from 'next-seo'

interface CallProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Call({ user }: CallProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name} | IgniteCall`} />
      <Container>
        <UserHeader>
          <Avatar src={user.avatarUrl} />
          <Heading>{user.name}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>
        <CallForm />
      </Container>
    </>
  )
}

// qual página gerar de forma estática
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

// generate static page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },

    revalidate: 60 * 60 * 24, // reload 1 day
  }
}

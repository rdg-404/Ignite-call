import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './style'
import Image from 'next/image'

import previewImage from '../../assets/preview.png'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4x">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          height={400}
          priority
          quality={100}
          alt="Calendário simbolizando aplicação em funcionamento"
        />
      </Preview>
    </Container>
  )
}

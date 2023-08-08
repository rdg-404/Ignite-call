import { Button, TextInput } from '@ignite-ui/react'
import { useForm } from 'react-hook-form'
import { Form } from './style'
import { ArrowRight } from 'phosphor-react'

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm()

  async function handleClaimUsername(data: any) {
    console.log(data)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuário"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}

import { Button, TextInput, Text } from '@ignite-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormError, FormErrorMessage } from './style'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'
import { useRouter } from 'next/router'

const ClaimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário deve conter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário deve conter apenas letras ou hifens',
    })
    .transform((username) => {
      return username.toLowerCase()
    }),
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema> // passa as props do zod para o ts

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    router.push(`/register?username=${username}`) // redireciona para a url
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormErrorMessage>
        <Text size="sm">
          {errors.username ? (
            <FormError size="sm">{errors.username.message}</FormError>
          ) : (
            'Digite o nome do usuário'
          )}
        </Text>
      </FormErrorMessage>
    </>
  )
}

import { CalendarBlank, Clock } from 'phosphor-react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './style'
import { Button, Text, TextInput } from '@ignite-ui/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
  email: z.string().email({ message: 'Informe um email válido.' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  callingDate: Date
  onReturnToCalendar: () => void
}

export function ConfirmStep({
  callingDate,
  onReturnToCalendar,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmCall(data: ConfirmFormData) {
    const { name, email, observations } = data

    await api.post(`/users/${username}/call`, {
      name,
      email,
      observations,
      date: callingDate,
    })

    onReturnToCalendar()
  }

  const describedDate = dayjs(callingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(callingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmCall)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>

        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de email</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextInput {...register('observations')} />
      </label>

      <FormActions>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>

        <Button type="button" variant="tertiary" onClick={onReturnToCalendar}>
          Cancelar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}

import { CalendarBlank, Clock } from 'phosphor-react'
import { ConfirmForm, FormActions, FormHeader } from './style'
import { Button, Text, TextInput } from '@ignite-ui/react'

export function ConfirmStep() {
  function handleConfirmCall() {}
  return (
    <ConfirmForm as="form" onSubmit={handleConfirmCall}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          29 de Setembro de 2023
        </Text>

        <Text>
          <Clock />
          16:00
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" />
      </label>

      <label>
        <Text size="sm">Endereço de email</Text>
        <TextInput type="email" placeholder="johndoe@example.com" />
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextInput />
      </label>

      <FormActions>
        <Button type="submit">Confirmar</Button>

        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}

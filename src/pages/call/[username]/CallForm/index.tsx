import { useState } from 'react'
import { CalendaryStep } from './CalendaryStep'
import { ConfirmStep } from './ConfirmStep'
// import { ConfirmStep } from './ConfirmStep'

export function CallForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  if (selectedDateTime) {
    return <ConfirmStep callingDate={selectedDateTime} />
  }
  return <CalendaryStep onSelectDateTime={setSelectedDateTime} />
}

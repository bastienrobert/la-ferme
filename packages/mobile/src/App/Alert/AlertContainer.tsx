import React, { FC, useState, useCallback } from 'react'
import generateUUID from 'uuid/v4'

import Alert, { AlertContent } from './Alert'

import useBus from '@/hooks/useBus'

export interface IdentifiedAlert extends AlertContent {
  uuid: string
}

const AlertContainer: FC = () => {
  const [alerts, setAlert] = useState<IdentifiedAlert[]>([])

  useBus(
    'alert',
    useCallback(
      (alert: AlertContent) => {
        setAlert(
          alerts.concat({
            uuid: generateUUID(),
            ...alert
          })
        )
      },
      [alerts]
    )
  )

  const generateOnPress = (uuid: string) => () => {
    setAlert(alerts.filter(alert => uuid !== alert.uuid))
  }

  return (
    <>
      {alerts.map(({ uuid, ...alert }) => (
        <Alert
          key={`alert-${uuid}`}
          {...alert}
          onPress={generateOnPress(uuid)}
        />
      ))}
    </>
  )
}

export default AlertContainer

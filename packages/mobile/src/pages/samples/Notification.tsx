import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import uuid from 'uuid/v4'

import NotificationBanner from '@/components/shared/NotificationBanner'
import NotificationInner from '@/components/shared/NotificationInner'
import FullContainer from '@/components/shared/FullContainer'

import useTheme from '@/hooks/useTheme'

const NotificationSample = () => {
  const [notification, setNotification] = useState([])
  const { setTheme } = useTheme()

  const mock = () => {
    setNotification([
      ...notification,
      {
        uuid: uuid()
      }
    ])
  }

  const onClose = id => () => {
    setNotification(notification.filter(n => n.uuid !== id))
  }

  const close = useEffect(() => {
    setTheme('red')
  }, [setTheme])

  return (
    <Component>
      {notification.map(n => {
        return (
          <NotificationBanner
            key={`notif-${n.uuid}`}
            title="Anonyme"
            subtitle="Une notification reçue..."
            icon="lightning"
            onClose={onClose(n.uuid)}>
            <NotificationInner
              title="Dommage"
              text="Oh mais c’est ce qu’on appel avoir une faim de loup pour rassasier son appetit de lion."
              description="Monique choisit de nouveau une carte coup de boule ou coup de pouce !"
            />
          </NotificationBanner>
        )
      })}

      <Button title="Mock" onPress={mock} />
    </Component>
  )
}

const Component = styled(FullContainer)`
  justify-content: flex-end;
`

const Button = styled.Button`
  margin-top: auto;
`

export default NotificationSample

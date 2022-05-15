import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components/native'
import uuid from 'uuid/v4'

import Container from '@/components/shared/Container'
import RegularizationNotification from './RegularizationNotification'
import SkillNotification from './SkillNotification'

export enum NotificationType {
  Regularization = 1,
  Skill
}

const notificationByType = {
  [NotificationType.Regularization]: RegularizationNotification,
  [NotificationType.Skill]: SkillNotification
}

export interface NotificationsProps {
  type: NotificationType
  params?: { [key: string]: any }
}

export interface NotificationProps extends NotificationsProps {
  uuid: string
  onClose: () => void
}

const Notifications: FC<NotificationsProps> = ({ params, type }) => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (!type) return
    setNotifications([
      ...notifications,
      {
        uuid: uuid(),
        type,
        params
      }
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, type])

  const onClose = id => () => {
    setNotifications(notifications.filter(n => n.uuid !== id))
  }

  if (notifications.length <= 0) return null

  return (
    <Component>
      {notifications
        .map(notification => {
          const C = notificationByType[notification.type]
          if (!C) return null

          return (
            <C
              {...notification}
              key={uuid}
              onClose={onClose(notification.uuid)}
            />
          )
        })
        .reverse()}
    </Component>
  )
}

const Component = styled(Container)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: visible;
`

export default Notifications

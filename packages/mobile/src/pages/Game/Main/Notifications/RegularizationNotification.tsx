import React, { FC } from 'react'
import { global as globalData } from '@la-ferme/shared/data'

import { NotificationProps } from './'
import NotificationBanner from '@/components/shared/NotificationBanner'
import NotificationInner from '@/components/shared/NotificationInner'

const content = globalData.notifications.regularization

const RegularizationNotification: FC<NotificationProps> = ({
  params,
  onClose
}) => {
  const c = content[params.event]

  return (
    <NotificationBanner
      title={c.title}
      subtitle={c.description}
      icon={c.icon}
      onClose={onClose}>
      <NotificationInner
        title={c.inner.title}
        text={c.inner.text}
        description={c.inner.description}
        params={params}
      />
    </NotificationBanner>
  )
}

export default RegularizationNotification

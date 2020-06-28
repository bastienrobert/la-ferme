import React, { FC } from 'react'
import { RegularizationName } from '@la-ferme/shared/typings'
import { global as globalData } from '@la-ferme/shared/data'

import { NotificationProps } from './'
import NotificationBanner from '@/components/shared/NotificationBanner'
import NotificationInner from '@/components/shared/NotificationInner'

import useAudio from '@/hooks/useAudio'

const content = globalData.notifications

const contentByName = {
  [RegularizationName.Penalty]: content.regularization.penalty,
  [RegularizationName.Reward]: content.regularization.reward
}

const imageByName = {
  [RegularizationName.Penalty]: require('@/assets/images/notifications/regularization/penalty.webp'),
  [RegularizationName.Reward]: require('@/assets/images/notifications/regularization/reward.webp')
}

const RegularizationNotification: FC<NotificationProps> = ({
  params,
  onClose
}) => {
  useAudio(require('@/assets/audios/notification.mp3'))
  const c = contentByName[params.event]
  const image = imageByName[params.event]

  return (
    <NotificationBanner
      title={c.title}
      subtitle={c.description}
      icon={c.icon}
      onClose={onClose}>
      <NotificationInner
        title={c.inner.title}
        text={c.inner.text}
        image={image}
        backgroundImage="beige"
        description={c.inner.description}
        params={params}
      />
    </NotificationBanner>
  )
}

export default RegularizationNotification

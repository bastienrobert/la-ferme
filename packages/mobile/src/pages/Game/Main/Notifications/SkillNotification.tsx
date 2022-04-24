import React, { FC } from 'react'
import { global as globalData } from '@la-ferme/shared/data'
import { Icons, Colors } from '@la-ferme/components/native'

import { NotificationProps } from './'
import NotificationBanner from '@/components/shared/NotificationBanner'
import NotificationInner from '@/components/shared/NotificationInner'

import useAudio from '@/hooks/useAudio'
import { skillsByName } from '@/utils/helpers/skills'
import { charactersByName } from '@/utils/helpers/players'

const content = globalData.notifications.skill

const imagesByPlayer = {
  isabelle: require('@/assets/images/notifications/skill/isabelle.webp'),
  leon: require('@/assets/images/notifications/skill/leon.webp'),
  peter: require('@/assets/images/notifications/skill/peter.webp'),
  monique: require('@/assets/images/notifications/skill/monique.webp')
}

const SkillNotification: FC<NotificationProps> = ({ params, onClose }) => {
  useAudio(require('@/assets/audios/notification.mp3'))
  const find = skillsByName[params.skill]

  const character = params.from?.character
  const image = character ? imagesByPlayer[character] : undefined
  const player = character ? charactersByName[character] : undefined

  return (
    <NotificationBanner
      title={content.title}
      subtitle={content.description}
      icon={content.icon as Icons}
      onClose={onClose}>
      <NotificationInner
        title={content.title}
        text={find.notificationText}
        image={image}
        backgroundImage={player?.color as Colors.Any}
        description={find.notification}
        params={{
          character: params.from.character
        }}
      />
    </NotificationBanner>
  )
}

export default SkillNotification

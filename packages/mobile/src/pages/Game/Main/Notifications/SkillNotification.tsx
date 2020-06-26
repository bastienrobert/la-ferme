import React, { FC } from 'react'
import { global as globalData } from '@la-ferme/shared/data'
import { Icons } from '@la-ferme/components/native'

import { NotificationProps } from './'
import NotificationBanner from '@/components/shared/NotificationBanner'
import NotificationInner from '@/components/shared/NotificationInner'

import { skillsByName } from '@/utils/helpers/skills'

const content = globalData.notifications.skill

const SkillNotification: FC<NotificationProps> = ({ params, onClose }) => {
  const find = skillsByName[params.skill]

  return (
    <NotificationBanner
      title={content.title}
      subtitle={content.description}
      icon={content.icon as Icons}
      onClose={onClose}>
      <NotificationInner
        title={content.title}
        text={find.notificationText}
        description={find.notification}
        params={{
          character: params.from.character
        }}
      />
    </NotificationBanner>
  )
}

export default SkillNotification

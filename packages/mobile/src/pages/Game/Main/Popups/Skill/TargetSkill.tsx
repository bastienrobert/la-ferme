import React, { FC } from 'react'
import { Player as PlayerType } from '@la-ferme/shared/typings'

import PlayerSelect from '@/components/shared/PlayerSelect'

import { getAllExceptCurrent } from '@/utils/helpers/players'

const TargetSkill: FC<any> = ({ player, players, confirm }) => {
  const onTargetPress = (target: PlayerType) => {
    confirm(target)
  }

  return (
    <PlayerSelect
      onPress={onTargetPress}
      players={getAllExceptCurrent(players, player)}
    />
  )
}

export default TargetSkill

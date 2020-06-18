import React, { FC } from 'react'
import { Player } from '@la-ferme/shared/typings'

import PlayerCardStep from './PlayerCardStep'
import SpectatorCardStep from './SpectatorCardStep'

export enum CardStepType {
  Civil = 1,
  Uncivil
}

export interface CardStepProps {
  player: Player
  onCivilPress?: () => void
  onUncivilPress?: () => void
  choice?: CardStepType
}

const CardStep: FC<CardStepProps> = ({ choice, ...props }) => {
  return choice ? (
    <SpectatorCardStep choice={choice} {...props} />
  ) : (
    <PlayerCardStep {...props} />
  )
}

export default CardStep

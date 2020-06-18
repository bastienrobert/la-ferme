import React, { FC } from 'react'

import { RoundViewProps } from '../'
import GameCard, { GameCardType } from '@/components/shared/GameCard'

export interface RoundSpectatorConfirmProps extends RoundViewProps {}

const Confirm: FC<RoundSpectatorConfirmProps> = ({ data, player, players }) => {
  return (
    <GameCard
      type={GameCardType.Spectator}
      choice={data.choice}
      name={data.cards[data.choice]}
      player={player}
      players={players}
    />
  )
}

export default Confirm

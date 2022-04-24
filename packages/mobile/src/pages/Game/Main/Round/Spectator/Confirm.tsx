import React, { FC } from 'react'
import { roundChoiceToCardType } from '@la-ferme/shared/data/cards'

import { RoundViewProps } from '../'
import GameCard, { GameCardType } from '@/components/shared/GameCard'

export interface RoundSpectatorConfirmProps extends RoundViewProps {}

const Confirm: FC<RoundSpectatorConfirmProps> = ({ data, players }) => {
  const current = players.find(p => p.uuid === data.player)
  const formattedTargets = data.targets.map(t => {
    return players.find(p => p.uuid === t)
  })
  const choiceType = roundChoiceToCardType[data.choice]

  return (
    <GameCard
      type={GameCardType.Spectator}
      choice={data.choice}
      targets={formattedTargets}
      name={data.cards[choiceType]}
      player={current}
      players={players}
    />
  )
}

export default Confirm

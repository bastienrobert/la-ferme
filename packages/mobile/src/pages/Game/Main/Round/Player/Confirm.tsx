import React, { FC } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { roundChoiceToCardType } from '@la-ferme/shared/data/cards'

import { RoundViewProps } from '../'
import GameCard, { GameCardType } from '@/components/shared/GameCard'

import { COMPLETE_CARD_ROUND_MUTATION } from '@/graphql/round'

export interface RoundPlayerConfirmProps extends RoundViewProps {}

const Confirm: FC<RoundPlayerConfirmProps> = ({ data, player, players }) => {
  const [completeCardRoundMutation] = useMutation(COMPLETE_CARD_ROUND_MUTATION)
  const choiceType = roundChoiceToCardType[data.choice]

  const formattedTargets = data.targets.map(t => {
    return players.find(p => p.uuid === t)
  })

  const onCompletePress = () => {
    completeCardRoundMutation({
      variables: { playerUUID: player.uuid }
    })
  }

  return (
    <GameCard
      type={GameCardType.Confirm}
      choice={data.choice}
      name={data.cards[choiceType]}
      player={player}
      players={players}
      targets={formattedTargets}
      onPress={onCompletePress}
    />
  )
}

export default Confirm

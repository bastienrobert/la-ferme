import React, { FC } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { getCard } from '@la-ferme/shared/data/cards'
import {
  RoundChoice,
  RoundStep,
  Card as CardType
} from '@la-ferme/shared/typings'

import { RoundViewProps } from '../'
import CardStep from '@/components/shared/CardStep'

import { SET_CARD_ROUND_MUTATION } from '@/graphql/round'

export interface RoundPlayerCardProps extends RoundViewProps {}

const Card: FC<RoundPlayerCardProps> = ({ data, player, forceUpdate }) => {
  const [setCardRoundMutation] = useMutation(SET_CARD_ROUND_MUTATION)

  const cards = {
    civil: getCard(data.cards.civil),
    uncivil: getCard(data.cards.uncivil)
  }

  const onPress = (choice: RoundChoice, card: CardType) => () => {
    card.reward.params?.target
      ? forceUpdate({
          ...data,
          choice,
          step: RoundStep.Target
        })
      : setCardRoundMutation({
          variables: { playerUUID: player.uuid, choice }
        })
  }

  return (
    <CardStep
      player={player}
      onCivilPress={onPress(RoundChoice.Civil, cards.civil)}
      onUncivilPress={onPress(RoundChoice.Uncivil, cards.uncivil)}
    />
  )
}

export default Card

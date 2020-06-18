import React, { FC } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Player, RoundChoice } from '@la-ferme/shared/typings'

import { RoundViewProps } from '../'
import GameCard, { GameCardType } from '@/components/shared/GameCard'

import { SET_CARD_ROUND_MUTATION } from '@/graphql/round'

export interface RoundPlayerConfirmProps extends RoundViewProps {}

const Confirm: FC<RoundPlayerConfirmProps> = ({ data, player, players }) => {
  const [setCardRoundMutation] = useMutation(SET_CARD_ROUND_MUTATION)

  const onPress = (choice: RoundChoice) => (target: Player) => {
    const targets = [target.uuid]
    setCardRoundMutation({
      variables: { playerUUID: player.uuid, choice, targets }
    })
  }

  return (
    <GameCard
      type={GameCardType.Select}
      choice={data.choice}
      name={data.cards[data.choice]}
      player={player}
      players={players}
      onPlayerSelect={onPress(data.choice)}
    />
  )
}

export default Confirm

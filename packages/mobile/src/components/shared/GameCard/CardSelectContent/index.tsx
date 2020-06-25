import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { Card, Player } from '@la-ferme/shared/typings'

import Choose from './Choose'
import Confirm from './Confirm'
import Container from '@/components/shared/Container'

export interface CardSelectContentProps {
  card: Card
  players: Player[]
  onPress: (player: Player) => void
}

const CardSelectContent: FC<CardSelectContentProps> = ({
  card,
  players,
  onPress
}) => {
  const [player, setPlayer] = useState<Player>()

  return (
    <Component alignSelf="center">
      {player ? (
        <Confirm
          player={player}
          onConfirm={() => onPress(player)}
          onCancel={() => setPlayer(undefined)}
        />
      ) : (
        <Choose card={card} players={players} setPlayer={setPlayer} />
      )}
    </Component>
  )
}

const Component = styled(Container)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export default CardSelectContent

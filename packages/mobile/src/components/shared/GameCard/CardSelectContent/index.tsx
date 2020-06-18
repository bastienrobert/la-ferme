import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

import Choose from './Choose'
import Confirm from './Confirm'
import Container from '@/components/shared/Container'

export interface CardSelectContentProps {
  players: Player[]
  onPress: (player: Player) => void
}

const CardSelectContent: FC<CardSelectContentProps> = ({
  players,
  onPress
}) => {
  const [player, setPlayer] = useState<Player>()

  return (
    <Component>
      {player ? (
        <Confirm
          player={player}
          onConfirm={() => onPress(player)}
          onCancel={() => setPlayer(undefined)}
        />
      ) : (
        <Choose players={players} setPlayer={setPlayer} />
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

import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

import Container from './Container'
import PlayerImage from './PlayerImage'

export interface PlayerSelectProps {
  players: Player[]
  onPress: (player: Player) => void
}

const PlayerSelect: FC<PlayerSelectProps> = ({ players, onPress }) => {
  return (
    <Component alignSelf="center">
      {players.map((player, i) => {
        return (
          <IconWrapper key={i}>
            <PlayerImage player={player} onPress={() => onPress(player)} />
          </IconWrapper>
        )
      })}
    </Component>
  )
}

const Component = styled(Container)`
  max-width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const IconWrapper = styled(Container)`
  margin: 0 15px;
`

export default PlayerSelect

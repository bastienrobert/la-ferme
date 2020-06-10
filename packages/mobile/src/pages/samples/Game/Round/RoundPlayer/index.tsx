import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

// import PickCard from './PickCard'
// import ForwardOrTurn from './ForwardOrTurn'
import PlayerChoice from './PlayerChoice'
import FullContainer from '@/components/shared/FullContainer'

export interface RoundPlayerProps {
  player: Player
}

const RoundPlayer: FC<RoundPlayerProps> = ({ players, player }) => {
  return (
    <Component>
      {/* <PickCard character="peter" /> */}
      {/* <ForwardOrTurn player={player} onSubmit={() => console.log('HELLO')} /> */}
      <PlayerChoice player={player} players={players} />
    </Component>
  )
}

const Component = styled(FullContainer)`
  width: 100%;
  flex: 1;
`

export default RoundPlayer

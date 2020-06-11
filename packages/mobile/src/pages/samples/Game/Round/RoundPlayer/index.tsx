import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

// import PickCard from './PickCard'
// import ForwardOrTurn from './ForwardOrTurn'
import PlayerChoice from './PlayerChoice'
import FullContainer from '@/components/shared/FullContainer'

export interface RoundPlayerProps {
  data: any
  player: Player
  players: Player[]
}

const RoundPlayer: FC<RoundPlayerProps> = props => {
  return (
    <Component>
      {/* <PickCard character="peter" /> */}
      {/* <ForwardOrTurn player={player} onSubmit={() => console.log('HELLO')} /> */}
      <PlayerChoice {...props} />
    </Component>
  )
}

const Component = styled(FullContainer)`
  width: 100%;
  flex: 1;
`

export default RoundPlayer

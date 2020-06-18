import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

// import CardStep from '@/components/shared/CardStep'
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
      {/* <CardStep {...props} /> */}
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

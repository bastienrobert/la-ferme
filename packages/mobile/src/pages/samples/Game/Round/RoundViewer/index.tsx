import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

import PlayerChoice from './PlayerChoice'
// import PlayerIsPlaying from './PlayerIsPlaying'
// import CardStep, { CardStepType } from '@//components/shared/CardStep'
import FullContainer from '@/components/shared/FullContainer'

export interface RoundPlayerProps {
  data: any
  player: Player
  players: Player[]
}

const Viewer: FC<any> = props => {
  return (
    <Component>
      {/* <CardStep choice={CardStepType.Civil} {...props} /> */}
      {/* <PlayerIsPlaying {...props} /> */}
      <PlayerChoice {...props} />
    </Component>
  )
}

const Component = styled(FullContainer)`
  width: 100%;
  flex: 1;
`

export default Viewer

import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

import PlayerIsPlaying from './PlayerIsPlaying'
import FullContainer from '@/components/shared/FullContainer'

export interface RoundPlayerProps {
  data: any
  player: Player
  players: Player[]
}

const Viewer: FC<any> = props => {
  return (
    <Component>
      <PlayerIsPlaying {...props} />
    </Component>
  )
}

const Component = styled(FullContainer)`
  width: 100%;
  flex: 1;
`

export default Viewer

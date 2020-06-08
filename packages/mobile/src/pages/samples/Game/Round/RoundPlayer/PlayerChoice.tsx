import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

import FullContainer from '@/components/shared/FullContainer'
import GameCard from '@/components/shared/GameCard'

export interface PlayerChoiceProps {
  player: Player
  onSubmit: () => void
}

const PlayerChoice: FC<PlayerChoiceProps> = ({ onSubmit }) => {
  return (
    <Component alignSelf="center">
      <GameCard />
    </Component>
  )
}

const Component = styled(FullContainer)`
  width: 100%;
  flex: 1;
  height: 100%;
  elevation: 3;
  align-items: center;
  padding: 20px;
  max-width: 500px;
  justify-content: center;
`

export default PlayerChoice

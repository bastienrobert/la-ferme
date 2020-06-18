import React, { FC } from 'react'
import styled from 'styled-components/native'

import FullContainer from '@/components/shared/FullContainer'
import GameCard from '@/components/shared/GameCard'

const PlayerChoice: FC<any> = ({ player, players, onSubmit }) => {
  return (
    <Component alignSelf="center">
      <GameCard player={player} players={players} />
    </Component>
  )
}

const Component = styled(FullContainer)`
  width: 100%;
  flex: 1;
  elevation: 3;
  align-items: center;
  max-width: 500px;
  justify-content: center;
`

export default PlayerChoice

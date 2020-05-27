import React, { FC, useState } from 'react'
import uuid from 'uuid/v4'
import { Button } from 'react-native'

import Round from './Round'
import FullContainer from '@/components/shared/FullContainer'

import { player } from './mock'

const Game: FC<any> = () => {
  const mockData = () => {
    return {
      uuid: uuid(),
      player: player.uuid
    }
  }

  const [data, setData] = useState(mockData())

  return (
    <FullContainer>
      <Button title="Mock" onPress={() => setData(mockData())} />
      <Round data={data} player={player} />
    </FullContainer>
  )
}

export default Game

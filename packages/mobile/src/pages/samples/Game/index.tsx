import React, { FC, useState } from 'react'
import uuid from 'uuid/v4'
import { Button } from 'react-native'

import Menu from './Menu'
import Round from './Round'
import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'

import { players, player } from './mock'

const color: any = ['yellow', 'red', 'gray']

const Game: FC<any> = () => {
  const mockData = () => {
    return {
      uuid: uuid(),
      player: player.uuid,
      background: color[Math.floor(Math.random() * color.length)]
    }
  }

  const [data, setData] = useState(mockData())

  return (
    <>
      <Menu />
      <FullContainer>
        <Container style={{ zIndex: 999 }}>
          <Button title="Mock" onPress={() => setData(mockData())} />
        </Container>
        <Round data={data} player={player} players={players} />
      </FullContainer>
    </>
  )
}

export default Game

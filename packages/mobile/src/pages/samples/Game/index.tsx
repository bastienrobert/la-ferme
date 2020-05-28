import React, { FC, useEffect, useState, useContext } from 'react'
import uuid from 'uuid/v4'
import { Button } from 'react-native'

import ThemeContext from '@/App/Theme/Context'

import Round from './Round'
import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'

import { player } from './mock'

const Game: FC<any> = () => {
  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    setTheme('yellow')
  }, [setTheme])

  const mockData = () => {
    return {
      uuid: uuid(),
      player: player.uuid
    }
  }

  const [data, setData] = useState(mockData())

  return (
    <FullContainer>
      <Container style={{ zIndex: 999 }}>
        <Button title="Mock" onPress={() => setData(mockData())} />
      </Container>
      <Round data={data} player={player} />
    </FullContainer>
  )
}

export default Game

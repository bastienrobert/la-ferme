import React, { FC, useState } from 'react'
import uuid from 'uuid/v4'
import { View, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

import Menu from './Menu'
import Round from './Round'
import Popup, { PopupType } from './Popup'
import FullContainer from '@/components/shared/FullContainer'
import Header from '@/components/shared/Header'

import { players, player } from './mock'

const Game: FC<any> = () => {
  const [popup, setPopup] = useState<PopupType>()

  const mockData = () => {
    return {
      uuid: uuid(),
      player: players[1].uuid,
      background: 'gray'
      // background: color[Math.floor(Math.random() * color.length)]
    }
  }

  const [data] = useState(mockData())

  return (
    <FullContainer style={{ overflow: popup ? 'hidden' : 'visible' }}>
      <Menu setPopup={setPopup} />
      <Header players={players} player={players[1]} />
      <Round data={data} player={player} players={players} />
      <Popup set={setPopup} type={popup} players={players} player={player} />
    </FullContainer>
  )
}

export default Game

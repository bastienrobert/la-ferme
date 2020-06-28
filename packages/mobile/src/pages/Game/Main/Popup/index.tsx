import React, { FC, useEffect } from 'react'
import styled from 'styled-components/native'
import { Player as PlayerType } from '@la-ferme/shared/typings'
import { Colors } from '@la-ferme/components/native'

import Report from './Report'
import PhoneCall from './PhoneCall'
import Skill from './Skill'
import GameOver from './GameOver'
import FullContainer from '@/components/shared/FullContainer'

import useTheme from '@/hooks/useTheme'

export enum PopupType {
  Report = 1,
  PhoneCall,
  Skill,
  GameOver
}

export interface PopupProps {
  set: (type?: PopupType) => void
  type: PopupType
  player: PlayerType
  players: PlayerType[]
}

const innerByType = {
  [PopupType.Report]: Report,
  [PopupType.PhoneCall]: PhoneCall,
  [PopupType.Skill]: Skill,
  [PopupType.GameOver]: GameOver
}

const grayBackground = [
  PopupType.GameOver,
  PopupType.Report,
  PopupType.PhoneCall
]

const Popup: FC<PopupProps> = props => {
  const { type } = props
  const { setTheme, theme } = useTheme()

  const Container = containerByType[type]
  const Inner = innerByType[type]

  useEffect(() => {
    if (!type) return
    if (grayBackground.includes(type)) {
      setTheme('gray')
    }
  }, [setTheme, type])

  return Inner ? (
    <Container style={{ backgroundColor: Colors[theme] }}>
      <Inner {...props} />
    </Container>
  ) : null
}

const Component = styled(FullContainer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 110px;
  padding-bottom: 10px;
`

const OverComponent = styled(Component)`
  padding-top: 0;
  z-index: 998;
`

const containerByType = {
  [PopupType.Report]: Component,
  [PopupType.PhoneCall]: OverComponent,
  [PopupType.Skill]: Component,
  [PopupType.GameOver]: OverComponent
}

export default Popup

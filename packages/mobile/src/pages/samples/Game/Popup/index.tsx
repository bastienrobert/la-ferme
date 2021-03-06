import React, { FC } from 'react'
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
  params: { [key: string]: any }
  player: PlayerType
  players: PlayerType[]
}

const innerByType = {
  [PopupType.Report]: Report,
  [PopupType.PhoneCall]: PhoneCall,
  [PopupType.Skill]: Skill,
  [PopupType.GameOver]: GameOver
}

const Popup: FC<PopupProps> = props => {
  const { type } = props
  const { theme } = useTheme()

  const Container = containerByType[type]
  const Inner = innerByType[type]

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
  padding-top: 100px;
`

const OverComponent = styled(Component)`
  padding-top: 0;
  z-index: 999;
`

const containerByType = {
  [PopupType.Report]: Component,
  [PopupType.PhoneCall]: OverComponent,
  [PopupType.Skill]: Component,
  [PopupType.GameOver]: OverComponent
}

export default Popup

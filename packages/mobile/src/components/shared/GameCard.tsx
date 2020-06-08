import React, { FC } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { global as globalData } from '@la-ferme/shared/data'
import { Player } from '@la-ferme/shared/typings'

import Container, { ContainerProps } from '@/components/shared/Container'

import CardGameUp, {
  RATIO as CARD_GAME_UP_RATIO
} from '@/components/cards/game/up'
import CardGameDown, {
  RATIO as CARD_GAME_DOWN_RATIO
} from '@/components/cards/game/down'

import { shadow, inner } from '@/components/cards/cards.style'

export const content = globalData.role

export type GameCardType = 'civil' | 'uncivil'

export interface GameCardData extends ContainerProps {
  name: string
  type: GameCardType
  player: Player
  self: boolean
}

export interface GameCardProps extends ContainerProps {
  name: string
  type: GameCardType
}

const GameCard: FC<GameCardProps> = ({
  name,
  type,
  player,
  self,
  ...props
}) => {
  return (
    <Component {...props}>
      <TopStyledContainer style={{ aspectRatio: CARD_GAME_UP_RATIO }}>
        <StyledCard as={CardGameUp} />
        <BigImage
          source={require('@/assets/images/role/animations/characters/isabelle.webp')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <BackgroundImage
          source={require('@/assets/images/game/pick/civil.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <TopInner>{/* <WalktroughCardTitle type={type} /> */}</TopInner>
      </TopStyledContainer>
      <BottomStyledContainer style={{ aspectRatio: CARD_GAME_DOWN_RATIO }}>
        <StyledCard as={CardGameDown} />
        <BottomInner></BottomInner>
      </BottomStyledContainer>
    </Component>
  )
}

export default GameCard

const Component = styled(Container)`
  width: 100%;
  height: 100%;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const BigImage = styled(FastImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`

const BackgroundImage = styled(FastImage)`
  position: absolute;
  top: 0;
  left: 10%;
  width: 80%;
  height: 100%;
  z-index: 0;
`

const TopStyledContainer = styled(Container)`
  width: 100%;
`

const TopInner = styled(Container)`
  ${inner}
  padding: 43px 12px;
`

const BottomInner = styled(Container)`
  ${inner}
  padding: 28px 26px;
`

const BottomStyledContainer = styled(Container)`
  margin-top: -1px;
  width: 100%;
`

const StyledCard = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  ${shadow}
`

import React, { FC } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Button } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'
import { Player } from '@la-ferme/shared/typings'

import Container, { ContainerProps } from '@/components/shared/Container'
import PlayerSelect from '@/components/shared/PlayerSelect'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import CardGameUp, {
  RATIO as CARD_GAME_UP_RATIO
} from '@/components/cards/game/up'
import CardGameDown, {
  RATIO as CARD_GAME_DOWN_RATIO
} from '@/components/cards/game/down'

import { shadow, inner } from '@/components/cards/cards.style'

export const content = globalData.role

export type GameCardType = 'civil' | 'uncivil'

export interface GameCardProps extends ContainerProps {
  name: string
  type: GameCardType
  player: Player
  players: Player[]
  self: boolean
}

const GameCard: FC<GameCardProps> = ({
  name,
  type,
  player,
  players,
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
        <TopInner>
          <Title preset="H3" textAlign="center">
            Choix
          </Title>
        </TopInner>
      </TopStyledContainer>
      <BottomStyledContainer style={{ aspectRatio: CARD_GAME_DOWN_RATIO }}>
        <StyledCard as={CardGameDown} />
        <BottomInner>
          {/* <Description textAlign="center">
            Aujourd'hui, Monsieur Lane fait sa tête de mûle et ne veut pas cèder
            sa place prioritaire. Vous cedez votre place à Madame Henriette la
            biquette et elle vous remercie.
          </Description> */}
          {/* <Title preset="H5" textAlign="center">
            Vous avancez de 2 cases !
          </Title>
          <ButtonContainer alignSelf="center">
            <Button variant="secondary">Okéé</Button>
          </ButtonContainer> */}
          <PlayerSelect players={players} confirmation onPress={() => {}} />
        </BottomInner>
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
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  transform: scale(1.2);
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

const ButtonContainer = styled(Container)`
  margin-top: auto;
`

const Description = styled(Text)`
  margin-bottom: 12px;
`

import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Button } from '@la-ferme/components/native'

import { PopupProps } from './'
import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import Point from '@/components/shared/Point'
import Title from '@/components/typo/Title'
import GameOverTitle, {
  RATIO as GAME_OVER_TITLE_RATIO
} from '@/components/svgs/GameOver'
import CardPopup, { RATIO as CARD_POPUP_RATIO } from '@/components/cards/popup'

const GameOver: FC<PopupProps> = ({ set }) => {
  const onConfirm = () => {}

  const onCancel = () => {
    set(undefined)
  }

  return (
    <Component>
      <CrossImage source={require('@/assets/images/gameover/cross.png')} />
      <LineImage source={require('@/assets/images/gameover/line.png')} />
      <TopPoints>
        <FirstPoint />
        <SecondPoint />
        <ThirdPoint />
      </TopPoints>
      <BottomPoints>
        <FourthPoint />
        <FifthPoint />
        <SixthPoint />
      </BottomPoints>
      <Box alignSelf="center">
        <Inner alignSelf="center">
          <StyledBackground />
          <JustArrived
            source={require('@/assets/images/role/just_arrived.png')}
          />
          <Wrapper alignSelf="center">
            <StyledGameOverTitle />
            <Title preset="H5" textAlign="center">
              confirmez-vous
            </Title>
            <Title preset="H5" textAlign="center">
              la fin de la partie ?
            </Title>
          </Wrapper>
        </Inner>
        <ButtonContainer alignSelf="center">
          <Button onPress={onConfirm}>YEP</Button>
          <Button onPress={onCancel}>NOPE</Button>
        </ButtonContainer>
      </Box>
    </Component>
  )
}

const Component = styled(FullContainer)`
  align-items: center;
  justify-content: center;
`

const Box = styled(Container)`
  max-width: 500px;
  width: 85%;
`

const Inner = styled(Container)`
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  width: 100%;
  aspect-ratio: ${CARD_POPUP_RATIO};
  z-index: 999;
  margin-bottom: 40px;
`

const StyledBackground = styled(CardPopup)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Wrapper = styled(Container)`
  width: 70%;
  max-width: 350px;
`

const JustArrived = styled.Image`
  position: absolute;
  top: -60px;
  right: -25px;
`

const StyledGameOverTitle = styled(GameOverTitle)`
  width: 80%;
  max-width: 350px;
  align-self: center;
  aspect-ratio: ${GAME_OVER_TITLE_RATIO};
  margin-bottom: 22px;
`

const ButtonContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const CrossImage = styled.Image`
  position: absolute;
  top: 0;
  left: -20px;
  width: 133px;
  transform: rotate(-41deg);
`

const LineImage = styled.Image`
  position: absolute;
  bottom: 0;
  right: -60px;
  width: 136px;
`

const TopPoints = styled(Container)`
  position: absolute;
  top: 70px;
  left: 50%;
`

const FirstPoint = styled(Point)`
  position: absolute;
  top: 0;
  left: 0;
`

const SecondPoint = styled(Point)`
  position: absolute;
  top: 8px;
  left: -22px;
`

const ThirdPoint = styled(Point)`
  position: absolute;
  top: 50px;
  left: 60px;
`

const BottomPoints = styled(Container)`
  position: absolute;
  bottom: 50px;
  left: 35%;
`

const FourthPoint = styled(Point)`
  position: absolute;
  bottom: 0;
  left: 0;
`

const FifthPoint = styled(Point)`
  position: absolute;
  bottom: 56px;
  left: 80px;
`

const SixthPoint = styled(Point)`
  position: absolute;
  bottom: 68px;
  left: 92px;
`

export default GameOver

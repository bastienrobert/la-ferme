import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Button } from '@la-ferme/components/native'

import { PopupProps } from '../'
import GameOverDecorations from './'
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
      <GameOverDecorations />
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

export default GameOver

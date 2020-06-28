import React, { FC } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
// import { global as globalData } from '@la-ferme/shared/data'
import { Icon } from '@la-ferme/components/native'

import { MiniGameProps } from './'
import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'

import { winImages, looseImages } from '@/utils/helpers/players'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

// const content = globalData.phoneCall

const getBackground = (winner: boolean) => {
  if (winner) return require('@/assets/images/minigame/confettis.webp')
  else return require('@/assets/images/minigame/scribbles.webp')
}

const MiniGameResults: FC<Required<MiniGameProps>> = ({
  player,
  winner,
  close
}) => {
  const isWinner = player.uuid === winner
  const images = isWinner ? winImages : looseImages
  const color = isWinner ? 'gray' : 'beige'

  return (
    <Component>
      <Background source={getBackground(isWinner)} />
      <MainContainer alignSelf="center">
        <BigImage source={images[player.character]} />
        <StyledTitle preset="H1" color={color} textAlign="center">
          {isWinner ? 'gagné' : 'perdu'}
        </StyledTitle>
        <TextContainer>
          <StyledText color={color} textAlign="center">
            Crotte de bique ! Vous n’avez pas été assez rapide!
          </StyledText>
          <Title preset="H5" color={color} textAlign="center">
            Vous reculez d’une case !
          </Title>
        </TextContainer>
      </MainContainer>
      <IconContainer alignSelf="center">
        <Icon icon="cross" background="red" onPress={close} />
      </IconContainer>
    </Component>
  )
}

const Component = styled(FullContainer)`
  justify-content: center;
`

const BigImage = styled(FastImage)`
  width: 60%;
  max-width: 600px;
  aspect-ratio: 1;
`

const Background = styled(FastImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const MainContainer = styled(Container)`
  margin-top: auto;
`

const StyledTitle = styled(Title)`
  margin-bottom: 18px;
`

const StyledText = styled(Text)`
  margin-bottom: 12px;
`

const TextContainer = styled(Container)`
  max-width: 270px;
`

const IconContainer = styled(Container)`
  margin-top: auto;
  margin-bottom: 50px;
`

export default MiniGameResults

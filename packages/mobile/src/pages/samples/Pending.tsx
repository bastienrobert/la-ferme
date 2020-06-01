import React from 'react'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'

import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import TitleWithHastag from '@/components/shared/TitleWithHashtag'
import Text from '@/components/typo/Text'

import viewport from '@/services/viewport'

import globalData from '@la-ferme/shared/data/global'
const content = globalData.pending

const Pending = () => {
  return (
    <Component>
      <Container alignSelf="center">
        <TitleWithHastag
          anchor="right"
          titleColor="beige"
          hashtagColor="yellow"
          {...content.title}
        />
      </Container>
      <ImageContainer>
        <BackgroundAnimation
          source={require('@/assets/lottie/pending-numbers.json')}
          autoPlay
        />
        <Character
          source={require('@/assets/images/pending/isabelle.webp')}
          resizeMode="contain"
        />
      </ImageContainer>
      <TextContainer>
        {content.text.map((line, i) => (
          <DescriptionText
            key={`pending-text-${i}`}
            color="beige"
            textAlign="center">
            {line}
          </DescriptionText>
        ))}
      </TextContainer>
    </Component>
  )
}

const Component = styled(FullContainer)`
  margin-top: 90px;
`

const ImageContainer = styled(FullContainer)`
  position: relative;
  justify-content: center;
  align-items: center;
`

const TextContainer = styled(FullContainer)`
  position: relative;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 350px;
`

const BackgroundAnimation = styled(LottieView)`
  position: absolute;
  top: 50px;
  left: 0;
  width: ${viewport.width}px;
  transform: scale(1.25) translateY(-50px);
`

const Character = styled.Image`
  width: 400px;
  margin: auto;
`

const DescriptionText = styled(Text)`
  padding-bottom: 20px;
`

export default Pending
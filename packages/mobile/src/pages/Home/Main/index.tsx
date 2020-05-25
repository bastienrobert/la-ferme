import React, { FC, useContext, useLayoutEffect } from 'react'
import styled from 'styled-components/native'

import ThemeContext from '@/App/Theme/Context'

import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import Audio from '@/components/shared/Audio'

const Home: FC<any> = ({ navigation }) => {
  const { setTheme } = useContext(ThemeContext)

  useLayoutEffect(() => {
    setTheme('gray')
  }, [setTheme])

  const onCameraIconClick = () => {
    navigation.navigate('Home:QRCode')
  }

  return (
    <Component>
      <Audio source={require('@/assets/tmp/sample.mp3')} paused={true} />
      <TitleContainer>
        <Title preset="H1" color="beige" textAlign="center">
          commencer une partie
        </Title>
      </TitleContainer>
      <ImagesWrapper>
        <TouchableImageContainer onPress={() => console.log('NFC')}>
          <StyledImage source={require('@/assets/images/home/nfc.png')} />
        </TouchableImageContainer>
        <TouchableImageContainer onPress={onCameraIconClick}>
          <StyledImage source={require('@/assets/images/home/qrcode.png')} />
        </TouchableImageContainer>
      </ImagesWrapper>
      <ContentWrapper>
        <Text color="beige" textAlign="center">
          Placez votre téléphone devant le tag NFC de la boite.
        </Text>
        <SpacedOrContainer>
          <Title preset="H3" color="yellow" textAlign="center">
            OU
          </Title>
        </SpacedOrContainer>
        <Text color="beige" textAlign="center">
          Scannez le QR code en ouvrant votre appareil photo.
        </Text>
      </ContentWrapper>
    </Component>
  )
}

const Component = styled(FullContainer)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const TitleContainer = styled(Container)`
  width: 100%;
  margin-top: 30px;
`

const ImagesWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const TouchableImageContainer = styled.TouchableOpacity`
  width: 50%;
  max-width: 200px;
`

const StyledImage = styled.Image`
  width: 100%;
`

const ContentWrapper = styled.View`
  flex: 1;
  width: 70%;
  max-width: 500px;
  align-items: center;
  justify-content: center;
`

const SpacedOrContainer = styled(Container)`
  margin: 30px 0;
  width: 100%;
`

export default Home

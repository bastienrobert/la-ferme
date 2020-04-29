import React, { FC, useContext, useEffect } from 'react'
import styled from 'styled-components/native'
import { Icon } from '@la-ferme/components/native'

import ThemeContext from '@/App/Theme/Context'

import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'

const Home: FC<any> = ({ navigation }) => {
  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    setTheme('gray')
  }, [setTheme])

  const onCameraIconClick = () => {
    navigation.navigate('Home:QRCode')
  }

  return (
    <Component>
      <TitleContainer>
        <Title preset="H1" color="beige" textAlign="center">
          commencer une partie
        </Title>
      </TitleContainer>
      <ImagesWrapper>
        <StyledImage source={require('@/assets/images/home/nfc.png')} />
        <StyledImage source={require('@/assets/images/home/qrcode.png')} />
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
      <ButtonView>
        <ButtonContainer>
          <Icon icon="camera" background="yellow" onPress={onCameraIconClick} />
        </ButtonContainer>
      </ButtonView>
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

const StyledImage = styled.Image`
  width: 50%;
  max-width: 200px;
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

const ButtonContainer = styled(Container)`
  align-self: center;
`

const ButtonView = styled.View`
  margin-bottom: 40px;
  z-index: 2;
`

export default Home

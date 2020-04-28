import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Icon } from '@la-ferme/components/native'

import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'

const Home: FC<any> = ({ navigation }) => {
  const onCameraIconClick = () => {
    navigation.navigate('Home:QRCode')
  }

  return (
    <Component>
      <TitleContainer>
        <Title preset="H1" color="beige" textAlign="center">
          commencer
        </Title>
        <Title preset="H1" color="beige" textAlign="center">
          une partie
        </Title>
      </TitleContainer>
      <FullContainer>
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
      </FullContainer>
      <ButtonView>
        <ButtonContainer>
          <Icon icon="camera" background="yellow" onPress={onCameraIconClick} />
        </ButtonContainer>
      </ButtonView>
    </Component>
  )
}

const Component = styled.View`
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const TitleContainer = styled(FullContainer)`
  margin-top: 30px;
  flex: auto;
`

const SpacedOrContainer = styled(FullContainer)`
  margin: 40px 0;
`

const ButtonContainer = styled(Container)`
  align-self: center;
`

const ButtonView = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 40px;
  z-index: 2;
`

export default Home

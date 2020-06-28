import React, { FC } from 'react'
import styled from 'styled-components/native'
// import FastImage from 'react-native-fast-image'
// import { global as globalData } from '@la-ferme/shared/data'

import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import TitleWithHashtag from '@/components/shared/TitleWithHashtag'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

// const content = globalData.phoneCall

const MiniGameStart: FC = () => {
  return (
    <Component>
      <Container alignSelf="center">
        <Subtitle preset="H4" color="yellow" textAlign="center">
          mini-jeu
        </Subtitle>
        <Title preset="H1" color="red" textAlign="center">
          roule
        </Title>
        <TitleWithHashtag
          title="ma poulet"
          titleColor="red"
          hashtag={['et que ca saute!']}
          hashtagColor="yellow"
          anchor="right"
          textAlign="center"
          alignSelf="center"
          hashtagOffset={{ x: 15, y: 10 }}
        />
      </Container>
      <TextContainer alignSelf="center">
        <BeigeText color="beige" textAlign="center">
          La vache ! Quel monde sur la route ce matin. Un petit coup de klaxon
          presserait peu être un peu ces tortues.
        </BeigeText>
        <Text color="yellow" textAlign="center">
          Vous avez 20 secondes pour taper le plus vite possible sur votre
          téléphone afin de faire le plus de bruit possible.
        </Text>
      </TextContainer>
    </Component>
  )
}

const Component = styled(FullContainer)`
  justify-content: space-between;
`

const Subtitle = styled(Title)`
  margin-bottom: 30px;
`

const BeigeText = styled(Text)`
  margin-bottom: 20px;
`

const TextContainer = styled(Container)`
  max-width: 300px;
`

export default MiniGameStart

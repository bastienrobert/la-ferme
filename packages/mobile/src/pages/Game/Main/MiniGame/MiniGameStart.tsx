import React, { FC } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { global as globalData, minigames } from '@la-ferme/shared/data'

import { MiniGameProps } from './'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import TitleWithHashtag from '@/components/shared/TitleWithHashtag'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import startImages from './startImages'

const global = globalData.minigame.start

const MiniGameStart: FC<MiniGameProps> = ({ type, player }) => {
  const images = startImages[type]
  const content = minigames[type]

  return (
    <Component>
      <Container alignSelf="center">
        <Subtitle preset="H4" color="yellow" textAlign="center">
          {global.subtitle}
        </Subtitle>
        <Title preset="H1" color="red" textAlign="center">
          {content.start.title_1}
        </Title>
        <TitleWithHashtag
          title={content.start.title_2}
          titleColor="red"
          hashtag={[content.start.description]}
          hashtagColor="yellow"
          anchor="right"
          textAlign="center"
          alignSelf="center"
          hashtagOffset={{ x: 15, y: 10 }}
        />
      </Container>
      <BigImage
        source={images[player.character]}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TextContainer alignSelf="center">
        <BeigeText color="beige" textAlign="center">
          {content.start.text_1}
        </BeigeText>
        <Text color="yellow" textAlign="center">
          {content.start.text_2}
        </Text>
      </TextContainer>
    </Component>
  )
}

const Component = styled(FullContainer)`
  justify-content: space-between;
`

const BigImage = styled(FastImage)`
  width: 80%;
  flex: 1;
  max-width: 400px;
  align-self: center;
  aspect-ratio: 1;
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

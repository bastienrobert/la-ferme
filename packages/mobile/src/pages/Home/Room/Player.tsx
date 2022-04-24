import React, { FC } from 'react'
import styled from 'styled-components/native'
import { global as globalData } from '@la-ferme/shared/data'

import { TitleContainer, ContentContainer } from './room.shared'
import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

const content = globalData.room

const Player: FC = () => {
  return (
    <PlayerContainer>
      <TitleContainer>
        <Title preset="H1" color="beige" textAlign="center">
          {content.player_title}
        </Title>
      </TitleContainer>
      <ContentContainer>
        <Text color="beige" textAlign="center">
          {content.player_subtitle_1}
        </Text>
        <Text color="beige" textAlign="center">
          {content.player_subtitle_2}
        </Text>
      </ContentContainer>
    </PlayerContainer>
  )
}

const PlayerContainer = styled(Container)`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-self: center;
`

export default Player

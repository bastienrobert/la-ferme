import React, { FC } from 'react'
import styled from 'styled-components/native'
import { MIN_PLAYERS, MAX_PLAYERS } from '@la-ferme/shared/settings'

import { TitleContainer, ContentContainer, content } from './room.shared'
import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'

const Owner: FC = () => {
  return (
    <OwnerContainer>
      <TitleContainer>
        <Title preset="H1" color="beige" textAlign="center">
          {content.owner_title}
        </Title>
      </TitleContainer>
      <ContentContainer>
        <Title preset="H4" color="beige" textAlign="center">
          {content.owner_subtitle_1}
          <Title preset="H4" color="yellow">
            {MIN_PLAYERS}
          </Title>
          {content.owner_subtitle_2}
          <Title preset="H4" color="yellow">
            {MAX_PLAYERS}
          </Title>
          {content.owner_subtitle_3}
        </Title>
      </ContentContainer>
    </OwnerContainer>
  )
}

const OwnerContainer = styled(Container)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  align-self: center;
`

export default Owner

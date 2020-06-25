import React, { FC } from 'react'
import styled from 'styled-components/native'
import { global as globalData } from '@la-ferme/shared/data'

import { CardStepProps } from '.'
import { Component, Cards } from './cardStep.styles'
import PickCard from './PickCard'
import CardAnimation from './CardAnimation'
import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'
import PlayerWithHashtag from '@/components/shared/PlayerWithHashtag'

const content = globalData.cardStep.viewer

const SpectatorCardStep: FC<CardStepProps> = ({ player, choice }) => {
  return (
    <Component>
      <TitleContainer alignSelf="center">
        <PlayerWithHashtag
          alignSelf="center"
          textAlign="center"
          character={player.character}
        />
        <Title preset="H1" color="beige" textAlign="center">
          {content.choosed}
        </Title>
      </TitleContainer>
      <CardAnimation type={choice} player={player} />
      <Cards alignSelf="center">
        <PickCard type={choice} />
      </Cards>
    </Component>
  )
}

const TitleContainer = styled(Container)`
  margin-bottom: 40px;
`

export default SpectatorCardStep

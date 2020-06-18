import React, { FC } from 'react'
import styled from 'styled-components/native'

import { CardStepProps } from '.'
import PickCard from './PickCard'
import CardAnimation from './CardAnimation'
import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'
import PlayerWithHashtag from '@/components/shared/PlayerWithHashtag'
import { Component, Cards } from './cardStep.styles'

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
          a choisi
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

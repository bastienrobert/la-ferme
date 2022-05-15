import React, { FC } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { global as globalData } from '@la-ferme/shared/data'
import { Player, RoundStep, Character } from '@la-ferme/shared/typings'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import PlayerWithHashtag from '@/components/shared/PlayerWithHashtag'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import { charactersByName } from '@/utils/helpers/players'

const content = globalData.game.spectator

const playerImage = {
  isabelle: require('@/assets/images/game/viewer/animations/viewer_isabelle.webp'),
  peter: require('@/assets/images/game/viewer/animations/viewer_peter.webp'),
  monique: require('@/assets/images/game/viewer/animations/viewer_monique.webp'),
  leon: require('@/assets/images/game/viewer/animations/viewer_leon.webp')
}

const getText = (character: Character, step: RoundStep) => {
  const name = character.displayName

  switch (step) {
    case RoundStep.New:
      return `${name} ${content.new_step}`
    case RoundStep.Card:
      return `${name} ${content.card_step}`
    default:
      return ''
  }
}

export interface NewOrCardProps {
  player: Player
  step: RoundStep
}

const NewOrCard: FC<NewOrCardProps> = ({ player, step }) => {
  const character = charactersByName[player.character]

  return (
    <Component alignSelf="center">
      <TitleContainer>
        <PlayerWithHashtag
          anchor="right"
          hashtagOffset={{ x: 40 }}
          alignSelf="center"
          character={character.name}
        />
        <Title preset="H1" color="beige" textAlign="center">
          {content.title_1}
        </Title>
        <Title preset="H1" color="beige" textAlign="center">
          {content.title_2}
        </Title>
      </TitleContainer>
      <PlayerImage source={playerImage[player.character]} />
      <DescriptionContainer alignSelf="center">
        <Description color="beige" textAlign="center">
          {getText(character, step)}
        </Description>
        <Title preset="H5" color="beige" textAlign="center">
          {content.warning}
        </Title>
      </DescriptionContainer>
    </Component>
  )
}

const Component = styled(FullContainer)`
  width: 100%;
  flex: 1;
  elevation: 3;
  align-items: center;
  max-width: 350px;
  justify-content: center;
  margin-bottom: 70px;
`

const TitleContainer = styled(Container)`
  width: 100%;
`

const PlayerImage = styled(FastImage)`
  width: 90%;
  max-width: 400px;
  max-height: 45%;
  aspect-ratio: 1;
`

const DescriptionContainer = styled(Container)`
  max-width: 300px;
  width: 100%;
`

const Description = styled(Text)`
  margin-bottom: 15px;
`

export default NewOrCard

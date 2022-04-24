import React, { FC } from 'react'
import styled from 'styled-components/native'
import { useMutation } from '@apollo/react-hooks'
import FastImage from 'react-native-fast-image'
import { global as globalData } from '@la-ferme/shared/data'
import { Button } from '@la-ferme/components/native'

import { RoundViewProps } from '../'
import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import TitleWithHashtag from '@/components/shared/TitleWithHashtag'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import { CONFIRM_BOARD_ROUND_MUTATION } from '@/graphql/round'

import useAudio from '@/hooks/useAudio'
import { complementaries, buttons } from '@/utils/colors'

const content = globalData.game.forwardOrTurn

export type RoundPlayerNewProps = RoundViewProps

const soundsByPlayer = {
  leon: require('@/assets/audios/leon.mp3'),
  peter: require('@/assets/audios/peter.mp3'),
  monique: require('@/assets/audios/monique.mp3'),
  isabelle: require('@/assets/audios/peter.mp3')
}

const RoundPlayerNew: FC<RoundPlayerNewProps> = ({ player, character }) => {
  const [confirmBoardRoundMutation] = useMutation(CONFIRM_BOARD_ROUND_MUTATION)
  useAudio(soundsByPlayer[player.character])

  const onSubmit = () => {
    confirmBoardRoundMutation({
      variables: { playerUUID: player.uuid }
    })
  }

  return (
    <Component alignSelf="center">
      <Container alignSelf="center">
        <Title preset="H1" color="gray" textAlign="center">
          {content.title_1}
        </Title>
        <Title preset="H1" color="gray" textAlign="center">
          {content.title_2}
        </Title>
        <TitleWithHashtag
          title={content.title_3}
          textAlign="center"
          hashtag={[content.title_hashtag]}
          titleColor="gray"
          hashtagColor={complementaries[character.color]}
        />
      </Container>
      {player.character === 'isabelle' ? (
        <Animation
          source={require('@/assets/images/game/forward_or_turn_yellow.webp')}
        />
      ) : (
        <Animation
          source={require('@/assets/images/game/forward_or_turn_red.webp')}
        />
      )}
      <TextContainer alignSelf="center">
        <Text color="gray" textAlign="center">
          {content.text}
        </Text>
      </TextContainer>
      <ButtonContainer alignSelf="center">
        <Button onPress={onSubmit} variant={buttons[character.color]}>
          {content.cta_ok}
        </Button>
      </ButtonContainer>
    </Component>
  )
}

const Component = styled(FullContainer)`
  width: 100%;
  flex: 1;
  height: 100%;
  elevation: 3;
  align-items: center;
  max-width: 350px;
  justify-content: center;
`

const TextContainer = styled(Container)`
  margin-top: auto;
  margin-bottom: 20px;
  max-width: 300px;
  width: 100%;
`

const Animation = styled(FastImage)`
  flex: 1;
  width: 100%;
  aspect-ratio: 1;
  max-height: 50%;
`

const ButtonContainer = styled(Container)`
  margin-top: auto;
  margin-bottom: 40px;
`

export default RoundPlayerNew

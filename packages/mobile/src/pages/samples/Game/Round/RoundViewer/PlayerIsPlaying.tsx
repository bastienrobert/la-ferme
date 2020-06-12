import React, { FC } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { global as globalData } from '@la-ferme/shared/data'
import { Player } from '@la-ferme/shared/typings'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import PlayerWithHashtag from '@/components/shared/PlayerWithHashtag'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

// const content = globalData.game.forwardOrTurn

export interface ForwardOrTurnProps {
  player: Player
  onSubmit: () => void
}

const PlayerIsPlaying: FC<ForwardOrTurnProps> = ({ player, onSubmit }) => {
  return (
    <Component alignSelf="center">
      <TitleContainer>
        <PlayerWithHashtag alignSelf="center" character={player.character} />
        <Title preset="H1" color="beige" textAlign="center">
          joue son
        </Title>
        <Title preset="H1" color="beige" textAlign="center">
          tour
        </Title>
      </TitleContainer>
      <PlayerImage
        source={require('@/assets/images/game/viewer/animations/viewer_peter.webp')}
      />
      <DescriptionContainer>
        <Description color="beige" textAlign="center">
          Peter peut décider d’avancer ou de tourner une case autour de lui.
        </Description>
        <Title preset="H5" color="beige" textAlign="center">
          SOYEZ ATTENTIF AUX ACTIONS DES AUTRES JOUEURS !
        </Title>
      </DescriptionContainer>
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
  justify-content: space-between;
  margin-bottom: 80px;
`

const TitleContainer = styled(Container)`
  width: 100%;
`

const PlayerImage = styled(FastImage)`
  width: 90%;
  max-width: 400px;
  aspect-ratio: 1;
`

const DescriptionContainer = styled(Container)`
  width: 100%;
`

const Description = styled(Text)`
  margin-bottom: 15px;
`

export default PlayerIsPlaying

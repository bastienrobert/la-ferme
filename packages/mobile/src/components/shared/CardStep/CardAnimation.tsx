import React, { FC } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Player } from '@la-ferme/shared/typings'

import { CardStepType } from './'

const uncivilAnimation = {
  isabelle: require('@/assets/images/game/pick/animations/uncivil_isabelle.webp'),
  leon: require('@/assets/images/game/pick/animations/uncivil_leon.webp'),
  monique: require('@/assets/images/game/pick/animations/uncivil_monique.webp'),
  peter: require('@/assets/images/game/pick/animations/uncivil_peter.webp')
}
const civilAnimation = require('@/assets/images/game/pick/animations/civil.webp')

const getAnimationSource = (type: CardStepType, character: string) => {
  if (type === CardStepType.Civil) return civilAnimation
  else return uncivilAnimation[character]
}

export interface CardAnimationProps {
  type: CardStepType
  player: Player
}

const CardAnimation: FC<CardAnimationProps> = ({ type, player }) => {
  if (!type) return null

  const animation = getAnimationSource(type, player.character)
  if (!animation) return null

  const C = type === CardStepType.Civil ? CivilAnimation : UncivilAnimation

  return (
    <Component
      as={C}
      source={animation}
      resizeMode={FastImage.resizeMode.contain}
    />
  )
}

const Component = styled(FastImage)`
  position: absolute;
  z-index: 2;
`

const CivilAnimation = styled(Component)`
  bottom: 0;
  right: 0;
  width: 90%;
  aspect-ratio: 1;
  max-width: 500px;
`

const UncivilAnimation = styled(Component)`
  width: 90%;
  aspect-ratio: 1;
  max-width: 500px;
  bottom: -120px;
`

export default CardAnimation

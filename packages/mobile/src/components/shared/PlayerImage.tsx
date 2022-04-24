import React, { FC } from 'react'
import { Colors } from '@la-ferme/components/native'
import { Player } from '@la-ferme/shared/typings'
import { characters } from '@la-ferme/shared/data'

import CircleImage, { CircleImageProps } from './CircleImage'

import { images as playerImages } from '@/utils/helpers/players'

export interface PlayerImageProps
  extends Omit<CircleImageProps, 'onPress' | 'source'> {
  player: Player
  onPress?: (player: Player) => void
}

const PlayerImage: FC<PlayerImageProps> = ({ player, onPress, ...rest }) => {
  const character = characters.find(c => player.character === c.name)

  const props: CircleImageProps = {
    background: character.color as Colors.IconBackground,
    source: playerImages[player.character],
    ...rest
  }
  if (onPress) props.onPress = () => onPress(player)

  return <CircleImage {...props} />
}

export default PlayerImage

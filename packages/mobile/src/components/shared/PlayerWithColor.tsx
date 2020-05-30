import React, { FC } from 'react'
import { Typo } from '@la-ferme/components/native'
import { Character } from '@la-ferme/shared/typings'
import characters from '@la-ferme/shared/data/characters'

import { TextProps } from '@/components/typo/Text'

const sizes = {
  large: Typo.presets.H1,
  small: Typo.presets.H4
}

const charactersByName: { [key: string]: Character } = characters.reduce(
  (acc, c) => {
    acc[c.name] = c
    return acc
  },
  {}
)

export type PlayerWithColorSize = 'large' | 'small'

export interface PlayerWithColorProps extends Omit<TextProps, 'children'> {
  size: PlayerWithColorSize
  character: string
}

const PlayerWithColor: FC<PlayerWithColorProps> = ({
  size,
  character,
  textAlign = 'left'
}) => {
  const preset = sizes[size]
  const find = charactersByName[character]

  return (
    <Typo {...preset} color={find?.color} textAlign={textAlign}>
      {find.displayName}
    </Typo>
  )
}

export default PlayerWithColor

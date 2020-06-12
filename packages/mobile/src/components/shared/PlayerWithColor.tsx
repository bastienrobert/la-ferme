import React, { FC } from 'react'
import { Colors, Typo, TypoProps } from '@la-ferme/components/native'

import { charactersByName } from '@/utils/helpers/players'

const sizes = {
  large: Typo.presets.H1,
  small: Typo.presets.H4
}

export type PlayerWithColorSize = 'large' | 'small'

export interface PlayerWithColorProps extends TypoProps {
  character: string
  size?: PlayerWithColorSize
  _color?: Colors.Typo
  _displayName?: string
}

const PlayerWithColor: FC<PlayerWithColorProps> = ({
  size,
  character,
  _color,
  _displayName,
  ...props
}) => {
  const preset = sizes[size]
  const find = charactersByName[character]

  return (
    <Typo color={(_color ?? find.color) as Colors.Typo} {...preset} {...props}>
      {_displayName ?? find.displayName}
    </Typo>
  )
}

PlayerWithColor.defaultProps = {
  size: 'large'
}

export default PlayerWithColor

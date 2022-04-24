import React, { FC } from 'react'
import { CSSProperties } from 'styled-components'

import { Typo, TypoProps, Colors } from '@la-ferme/components'

const preset = Typo.presets['TAG']
preset.size = 'h3'

export interface SubtitleProps extends TypoProps {
  color?: Colors.Typo
  style?: CSSProperties
  className?: string
}

const Subtitle: FC<SubtitleProps> = ({
  children,
  color = 'gray',
  ...style
}) => {
  return (
    <Typo color={color} textAlign="center" {...preset} {...style}>
      {children}
    </Typo>
  )
}

export default Subtitle

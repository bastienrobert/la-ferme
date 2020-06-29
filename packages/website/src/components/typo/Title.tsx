import React, { FC } from 'react'
import { CSSProperties } from 'styled-components'

import { Typo, TypoProps, Colors } from '@la-ferme/components'

export interface TitleProps extends TypoProps {
  color?: Colors.Typo
  style?: CSSProperties
  className?: string
}

const Title: FC<TitleProps> = ({ children, color = 'gray', ...style }) => {
  const props = Typo.presets['H1']
  props.size = '6vw'

  return (
    <Typo color={color} textAlign="center" {...props} {...style}>
      {children}
    </Typo>
  )
}

export default Title

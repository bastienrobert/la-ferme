import React, { FC } from 'react'

import { Typo, TypoProps, Colors, Fonts } from '@la-ferme/components'

export interface TextProps extends TypoProps {
  textAlign?: Fonts.TextAlignOption
  color?: Colors.Typo
  className?: string
}

const Text: FC<TextProps> = ({
  children,
  color = 'gray',
  textAlign,
  ...style
}) => {
  return (
    <Typo family="futura" color={color} textAlign={textAlign} {...style}>
      {children}
    </Typo>
  )
}

export default Text

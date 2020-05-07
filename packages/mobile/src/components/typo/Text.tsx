import React, { FC } from 'react'

import { Typo, Colors, Fonts } from '@la-ferme/components/native'

export interface TextProps {
  textAlign?: Fonts.TextAlignOption
  color?: Colors.Typo
}

const Text: FC<TextProps> = ({
  children,
  color = 'gray',
  textAlign = 'left'
}) => {
  return (
    <Typo family="futura" color={color} textAlign={textAlign}>
      {children}
    </Typo>
  )
}

export default Text

import React, { FC } from 'react'
import { TextStyle } from 'react-native'

import { Typo, Colors, Fonts } from '@la-ferme/components/native'

export interface TextProps {
  textAlign?: Fonts.TextAlignOption
  color?: Colors.Typo
  style?: TextStyle
}

const Text: FC<TextProps> = ({
  children,
  color = 'gray',
  textAlign = 'left',
  style
}) => {
  return (
    <Typo family="futura" color={color} textAlign={textAlign} style={style}>
      {children}
    </Typo>
  )
}

export default Text

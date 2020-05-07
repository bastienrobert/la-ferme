import React, { FC } from 'react'

import { Typo, Colors, Fonts } from '@la-ferme/components/native'

export interface TitleProps {
  textAlign?: Fonts.TextAlignOption
  color?: Colors.Typo
  preset?: 'H1' | 'H2' | 'H3' | 'H4'
}

const Title: FC<TitleProps> = ({
  children,
  preset,
  color = 'gray',
  textAlign = 'left'
}) => {
  const props = Typo.presets[preset]

  return (
    <Typo color={color} textAlign={textAlign} {...props}>
      {children}
    </Typo>
  )
}

export default Title

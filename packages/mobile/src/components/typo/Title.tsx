import React, { FC } from 'react'

import { Typo, Colors, Fonts } from '@la-ferme/components/native'

export interface TitleProps {
  textAlign?: Fonts.TextAlignOption
  color?: Colors.Typo
}

const Title: FC<TitleProps> = ({
  children,
  color = 'gray',
  textAlign = 'left'
}) => {
  return (
    <Typo family="bowlby" size="h1" color={color} textAlign={textAlign}>
      {children}
    </Typo>
  )
}

export default Title

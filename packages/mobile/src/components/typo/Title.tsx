import React, { FC } from 'react'

import { Typo, TypoProps } from '@la-ferme/components/native'

export type TitlePreset = 'H1' | 'H2' | 'H3' | 'H4' | 'H5'

export interface TitleProps extends TypoProps {
  preset?: TitlePreset
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

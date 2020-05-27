import React, { FC } from 'react'
import { Typo } from '@la-ferme/components/native'

import { TextProps } from './Text'

const preset = Typo.presets['TAG']

const Hashtag: FC<TextProps> = ({
  children,
  color = 'gray',
  textAlign = 'left'
}) => {
  return (
    <Typo {...preset} color={color} textAlign={textAlign}>
      {children}
    </Typo>
  )
}

export default Hashtag

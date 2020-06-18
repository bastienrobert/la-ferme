import React, { FC } from 'react'

import { Typo, TypoProps } from '@la-ferme/components/native'

const Text: FC<TypoProps> = ({
  children,
  color = 'gray',
  textAlign = 'left',
  ...style
}) => {
  return (
    <Typo family="futura" color={color} textAlign={textAlign} {...style}>
      {children}
    </Typo>
  )
}

export default Text

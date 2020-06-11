import React, { FC } from 'react'

import { OnlyChildProps } from './typo.shared'
import { Typo } from '@la-ferme/components/native'

const Header: FC<OnlyChildProps> = ({ children }) => {
  return (
    <Typo
      color="beige"
      family="futura"
      variant="bold"
      textTransform="uppercase">
      {children}
    </Typo>
  )
}

export default Header

import React, { FC } from 'react'

import { OnlyChildProps } from './typo.shared'
import { Typo } from '@la-ferme/components/native'

const NavLabel: FC<OnlyChildProps> = ({ children }) => {
  return (
    <Typo
      color="beige"
      size="h6"
      family="futura"
      variant="bold"
      textTransform="uppercase">
      {children}
    </Typo>
  )
}

export default NavLabel

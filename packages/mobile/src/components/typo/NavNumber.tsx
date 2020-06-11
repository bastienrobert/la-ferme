import React, { FC } from 'react'

import { OnlyChildProps } from './typo.shared'
import { Typo } from '@la-ferme/components/native'

const NavTitle: FC<OnlyChildProps> = ({ children }) => {
  return (
    <Typo color="beige" size="h6" family="bowlby" textTransform="uppercase">
      {children}
    </Typo>
  )
}

export default NavTitle

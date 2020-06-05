import React, { FC } from 'react'

import { Typo } from '@la-ferme/components/native'

const NavTitle: FC = ({ children }) => {
  return (
    <Typo color="beige" size="h6" family="bowlby" textTransform="uppercase">
      {children}
    </Typo>
  )
}

export default NavTitle

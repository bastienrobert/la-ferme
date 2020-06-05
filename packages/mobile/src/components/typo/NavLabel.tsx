import React, { FC } from 'react'

import { Typo } from '@la-ferme/components/native'

const NavLabel: FC = ({ children }) => {
  return (
    <Typo
      color="beige"
      size="h6"
      family="futura"
      variant="bold"
      textTransform="uppercase"
      fontWeight="bold">
      {children}
    </Typo>
  )
}

export default NavLabel

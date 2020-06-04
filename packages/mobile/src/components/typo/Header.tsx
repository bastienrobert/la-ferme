import React, { FC } from 'react'

import { Typo } from '@la-ferme/components/native'

const Header: FC = ({ children }) => {
  return (
    <Typo
      color="beige"
      family="futura"
      variant="bold"
      textTransform="uppercase"
      fontWeight="bold">
      {children}
    </Typo>
  )
}

export default Header

import React, { FC } from 'react'
import { CSSProperties } from 'styled-components'
import { Typo } from '@la-ferme/components'

export interface TypoNavProps {
  active?: boolean
  style?: CSSProperties
  className?: string
}

const TypoNav: FC<TypoNavProps> = ({ children, active, ...style }) => {
  return (
    <Typo
      color={active ? 'red' : 'gray'}
      size="h6"
      family="futura"
      variant={active ? 'bold' : null}
      {...style}>
      {children}
    </Typo>
  )
}

export default TypoNav

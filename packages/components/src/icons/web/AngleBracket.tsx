import React, { FC } from 'react'

import { SVG } from './shared'
import { Colors } from '@/theme'
import { IconProps } from '@/icons'

const AngleBracket: FC<IconProps> = ({ color = 'beige' }) => {
  return (
    <SVG viewBox="0 0 12 20">
      <path
        d="M2 2L10 10.1847L2.34204 18"
        stroke={Colors[color]}
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  )
}

export default AngleBracket

import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Svg, Path } from 'react-native-svg'

import { IconBackgroundProps } from './Icon.shared'
import styles from './Icon.styles'
import { Colors } from '@/theme'

const Background: FC<IconBackgroundProps> = ({ color }) => {
  return (
    <SVG viewBox="0 0 55 55" preserveAspectRatio="none">
      <Path
        d="M55 27.472C55 42.6553 42.6615 55.8217 27.5 54.944C14.0024 54.1783 0 42.6553 0 27.472C0 12.2886 12.3199 0 27.5 0C41.4089 0 55 12.3073 55 27.472Z"
        fill={Colors[color]}
      />
    </SVG>
  )
}

const SVG = styled(Svg)`
  ${styles.commons.background}
`

export default Background

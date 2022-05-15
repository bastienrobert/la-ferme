import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Svg, Path } from 'react-native-svg'

import { ButtonBackgroundProps } from './Button.shared'
import styles from './Button.styles'
import { Colors } from '@/theme'

const Background: FC<ButtonBackgroundProps> = ({ color }) => {
  return (
    <SVG viewBox="0 0 111 44" preserveAspectRatio="none">
      <Path
        d="M111 22.0215C111 11.8364 106.069 3.25938 99.6136 1.38317C96.2962 -0.493044 73.7923 0.311048 68.5922 0.311048C65.9025 0.311048 59.5369 0.713093 53.6195 0.981124H36.764C31.026 0.579078 21.8809 0.311048 20.5361 0.0430172C18.6533 -0.225013 12.9152 0.847108 12.9152 0.847108C11.0325 0.981124 9.32897 2.05325 7.89446 3.25938C6.5496 4.3315 5.38406 5.67166 4.30818 7.14582C3.77023 7.94991 3.32195 8.48598 3.05298 8.61999C1.97709 9.5581 -0.89193 15.5888 0.273611 25.7739C1.17018 33.8148 3.85989 36.8972 5.11509 37.9693C7.62548 41.1857 10.7635 43.0619 14.2601 43.0619H15.7843C20.9844 43.732 28.0673 44 30.6673 44C34.6122 44 77.1993 42.7939 80.9649 43.598C84.8202 44.402 98.8963 43.0619 98.8963 43.0619C98.8963 43.0619 110.731 40.1136 110.731 25.1039C110.91 23.8977 111 22.9596 111 22.0215Z"
        fill={Colors[color]}
      />
    </SVG>
  )
}

const SVG = styled(Svg)`
  ${styles.commons.background}
  ${styles.native.background}
`

export default Background

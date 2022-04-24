import React, { FC } from 'react'
import { Svg, Path, SvgProps } from 'react-native-svg'

import { Colors } from '@la-ferme/components/native'

const IndicatorIcon: FC<SvgProps> = props => {
  return (
    <Svg viewBox="0 0 56 5" fill="none" {...props}>
      <Path
        fill={Colors.white}
        d="M1.14978 2.88401C1.14978 2.88401 17.3672 3.4137 23.2418 2.90514C29.1164 2.39658 54.8504 2.11591 54.8504 2.11591"
      />
      <Path
        stroke={Colors.beige}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1.14978 2.88401C1.14978 2.88401 17.3672 3.4137 23.2418 2.90514C29.1164 2.39658 54.8504 2.11591 54.8504 2.11591"
      />
    </Svg>
  )
}

export default IndicatorIcon

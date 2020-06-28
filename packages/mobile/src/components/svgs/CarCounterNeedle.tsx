import React, { FC } from 'react'
import { Svg, Path, SvgProps } from 'react-native-svg'

import { Colors } from '@la-ferme/components/native'

export const WIDTH = 9
export const HEIGHT = 21
export const RATIO = WIDTH / HEIGHT

const CarCounterNeedle: FC<SvgProps> = props => {
  return (
    <Svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none" {...props}>
      <Path
        fill={Colors.red}
        d="M4.28078 20.2191C6.55599 20.2191 8.40042 18.3893 8.40042 16.1322C8.40042 13.8751 6.55599 12.0453 4.28078 12.0453C2.00556 12.0453 0.161133 13.8751 0.161133 16.1322C0.161133 18.3893 2.00556 20.2191 4.28078 20.2191Z"
      />
      <Path
        stroke={Colors.red}
        strokeWidth="4"
        strokeMiterlimit="10"
        d="M4.28076 0.445679V17.0354"
      />
    </Svg>
  )
}

export default CarCounterNeedle

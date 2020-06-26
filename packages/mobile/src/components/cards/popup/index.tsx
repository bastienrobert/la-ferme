import React, { FC } from 'react'
import { Colors } from '@la-ferme/components/native'

import { Svg, G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg'

export const WIDTH = 352
export const HEIGHT = 311
export const RATIO = WIDTH / HEIGHT

const CardPopup: FC<SvgProps> = props => {
  return (
    <Svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none" {...props}>
      <G clip-path="url(#clip0)">
        <Path
          d="M19.28 0A19.28 19.28 0 010 19.29V290.7A20.352 20.352 0 0020.28 311h311.28a20.34 20.34 0 0020.28-20.29V19.29a19.273 19.273 0 01-13.637-5.65A19.28 19.28 0 01332.56 0h-11.23a2.74 2.74 0 01-2.74 2.74A2.721 2.721 0 01315.85 0h-11.32a2.71 2.71 0 01-.797 1.943 2.724 2.724 0 01-1.943.797A2.73 2.73 0 01299.05 0h-11.3a2.734 2.734 0 01-4.677 1.933A2.725 2.725 0 01282.28 0H271a2.699 2.699 0 01-.783 1.936 2.707 2.707 0 01-1.927.804 2.737 2.737 0 01-2.595-1.675A2.743 2.743 0 01265.48 0h-11.3a2.74 2.74 0 01-.8 1.94 2.722 2.722 0 01-1.94.8A2.732 2.732 0 01248.71 0h-11.3a2.74 2.74 0 01-5.48 0h-11.32a2.71 2.71 0 01-.797 1.943 2.724 2.724 0 01-1.943.797A2.73 2.73 0 01215.13 0h-11.3a2.729 2.729 0 01-2.73 2.74A2.73 2.73 0 01198.36 0h-11.3a2.74 2.74 0 01-.8 1.94 2.722 2.722 0 01-1.94.8A2.732 2.732 0 01181.59 0h-11.33a2.71 2.71 0 01-.797 1.943 2.724 2.724 0 01-1.943.797A2.732 2.732 0 01164.79 0h-11.3A2.744 2.744 0 11148 0h-11.3a2.732 2.732 0 01-2.7 2.74 2.705 2.705 0 01-1.959-.786A2.71 2.71 0 01131.24 0h-11.33a2.72 2.72 0 01-1.68 2.537 2.71 2.71 0 01-1.05.203A2.73 2.73 0 01114.44 0h-11.3a2.74 2.74 0 01-.8 1.94 2.722 2.722 0 01-1.94.8A2.73 2.73 0 0197.67 0H86.34a2.718 2.718 0 01-2.74 2.74A2.73 2.73 0 0180.87 0h-11.3a2.74 2.74 0 01-5.48 0h-11.3a2.73 2.73 0 01-2.73 2.74A2.73 2.73 0 0147.32 0H36a2.71 2.71 0 01-2.73 2.74A2.73 2.73 0 0130.52 0H19.28z"
          fill={Colors.beige}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Path fill={Colors.white} d="M0 0h351.84v310.99H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default CardPopup
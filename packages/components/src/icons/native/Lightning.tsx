import React, { FC } from 'react'
import { Path } from 'react-native-svg'

import { SVG } from './shared'
import { IconProps } from '@/icons'
import { Colors } from '@/theme'

const Plus: FC<IconProps> = ({ color = 'yellow' }) => {
  return (
    <SVG viewBox="0 0 21 36" fill="none">
      <Path
        d="M8.48144 0H20.7239C20.96 0 21.0781 0.267212 20.9432 0.434219L9.96538 14.1956C9.83048 14.3793 9.94852 14.6466 10.1846 14.6299L18.4137 14.563C18.6329 14.563 18.7678 14.8136 18.6329 14.9973L2.79863 35.8899C2.61314 36.1404 2.20843 35.9233 2.32647 35.6394L7.84065 19.9741C7.9081 19.7904 7.75634 19.59 7.55398 19.6067L0.302912 20.3749C0.100557 20.3916 -0.05121 20.1912 0.0162418 20.0075L8.2285 0.167007C8.26222 0.066803 8.3634 0 8.48144 0Z"
        fill={Colors[color]}
      />
    </SVG>
  )
}

export default Plus

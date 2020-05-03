import React, { FC } from 'react'

import { SVG } from './shared'
import { IconProps } from '@/icons'
import { Colors } from '@/theme'

const Plus: FC<IconProps> = ({ color = 'beige' }) => {
  return (
    <SVG viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.0918 9.71863C11.1394 10.088 11.1871 10.5034 11.2109 10.9189C7.82991 10.8958 3.97277 10.9882 1.92515 11.0343C1.11563 11.0574 0.496581 11.6807 0.496581 12.4655L0.496581 15.3046C0.496582 16.0433 1.06801 16.6665 1.82991 16.7358C4.25849 16.9435 9.30611 17.3821 11.2109 17.2205C11.1156 19.3441 10.9966 21.3984 10.9252 22.9219C10.9013 23.7298 11.0204 25.5072 11.1394 26.7536C11.2109 27.4923 11.8537 28.0693 12.6156 28.0693L15.9728 28.0693C16.7585 28.0693 17.4252 27.4692 17.449 26.6844C17.5442 24.2838 17.7585 19.3903 17.949 16.8281C19.7823 16.805 21.568 16.8512 23.1632 16.8973C23.9252 16.9204 25.6156 17.0589 26.8775 17.1743C27.7347 17.2436 28.4966 16.5973 28.4966 15.7432L28.4966 13.0656C28.4966 12.3039 27.8775 11.6576 27.068 11.6345C24.949 11.5652 20.949 11.4037 18.1871 11.2421C18.1871 7.98743 18.1156 4.29421 18.0442 2.33218C18.0204 1.54737 17.3775 0.92414 16.568 0.92414L12.2823 0.92414C11.449 0.92414 10.7823 1.57045 10.8061 2.37835C10.8299 4.4327 10.9013 8.14901 11.0918 9.71863Z"
        fill={Colors[color]}
      />
    </SVG>
  )
}

export default Plus

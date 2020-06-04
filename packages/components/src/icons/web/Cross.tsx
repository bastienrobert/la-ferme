import React, { FC } from 'react'

import { SVG } from './shared'
import { IconProps } from '@/icons'
import { Colors } from '@/theme'

const Plus: FC<IconProps> = ({ color = 'beige' }) => {
  return (
    <SVG viewBox="0 0 24 24" fill="none">
      <path
        d="M12.6132 6.11914C12.3824 6.42867 12.1284 6.73819 11.8515 7.07152C9.54319 4.66676 6.84251 2.00009 5.41139 0.595331C4.8574 0.047712 3.95718 0.0477121 3.4032 0.619141L1.41809 2.66676C0.887185 3.21438 0.864101 4.07152 1.32575 4.66676C2.82613 6.54771 5.98846 10.4287 7.41958 11.643C5.84996 13.143 4.30342 14.5477 3.19545 15.5953C2.61839 16.1668 1.44117 17.5715 0.633274 18.5477C0.148538 19.143 0.194704 20.0001 0.702523 20.5477L3.01079 22.9287C3.56477 23.5001 4.44192 23.5001 4.9959 22.9763C6.75019 21.2858 10.3511 17.8572 12.3131 16.143C13.5827 17.4287 14.783 18.7382 15.8448 19.9049C16.3526 20.4763 17.3913 21.762 18.1992 22.7144C18.7301 23.3811 19.7226 23.4287 20.3228 22.8096L22.1694 20.8572C22.7234 20.2858 22.7234 19.3811 22.2156 18.8096C20.8306 17.262 18.1761 14.3096 16.3987 12.2382C18.707 9.88105 21.2692 7.11914 22.608 5.64295C23.1389 5.07152 23.1389 4.14295 22.5849 3.57152L19.6534 0.547712C19.0994 -0.0237166 18.1761 -0.0237166 17.6221 0.547712C16.1679 2.07152 13.6057 4.83343 12.6132 6.11914Z"
        fill={Colors[color]}
      />
    </SVG>
  )
}

export default Plus

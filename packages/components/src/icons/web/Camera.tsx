import React from 'react'

import { SVG } from './shared'
import { Colors } from '@/theme'

export default function Camera() {
  return (
    <SVG viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m21.2505 6.17711-2.1419-6.17711-11.21716.842333-2.64927 5.334777h-5.24217l1.12735 19.82289h24.74535l1.1273-19.82289zm-7.7787 15.49889c-2.762-.1684-5.63673-2.527-5.63673-5.6155 0-3.0886 2.53653-5.6156 5.63673-5.6156 2.8748 0 5.6368 2.527 5.6368 5.6156 0 3.0885-2.4802 5.784-5.6368 5.6155z"
        fill={Colors.gray}
      />
    </SVG>
  )
}

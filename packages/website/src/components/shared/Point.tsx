import React, { FC } from 'react'
import styled from 'styled-components'
import { Colors } from '@la-ferme/components'

export interface PointProps {
  color?: Colors.Any
}

const Point: FC<PointProps> = ({ color, ...style }) => {
  return (
    <Component {...style}>
      <svg fill="none" viewBox="0 0 32 32">
        <g filter="url(#filter0_point)">
          <circle cx="16" cy="14" r="14" fill={Colors[color]} />
        </g>
        <defs>
          <filter
            id="filter0_point"
            x="0"
            y="0"
            width="32"
            height="32"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </Component>
  )
}

Point.defaultProps = {
  color: 'beige'
}

const Component = styled.div`
  width: 28px;
`

export default Point

import { PropsWithChildren } from 'react'
import { Colors } from '@/theme'

import { Icons } from '@/icons'

export interface IconSharedProps extends PropsWithChildren<any> {
  /** The icon name */
  icon?: Icons
  /** The color of the icon */
  color?: Colors.IconColor
  /** The background color of the icon */
  background?: Colors.IconBackground
  /** Padding around icon */
  padding?: number | string
  /** Icon size */
  size?: number | string
  /** Disable the icon */
  disabled?: boolean
}

export const defaultPadding = 15
export const defaultSize = 26

export interface IconBackgroundProps {
  color?: Colors.IconBackground
}

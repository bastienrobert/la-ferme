import { Colors } from '@/theme'

import { Icons } from '@/icons'

export interface IconProps {
  /** The icon name */
  icon: Icons
  /** The color of the icon */
  color?: Colors.IconColor
  /** The background color of the icon */
  background?: Colors.IconBackground
  /** Disable the icon */
  disabled: boolean
}

export interface IconBackgroundProps {
  color?: Colors.IconBackground
}

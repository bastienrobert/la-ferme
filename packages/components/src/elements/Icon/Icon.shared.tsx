import { Colors } from '@/theme'

export interface IconProps {
  /** The icon name */
  icon: string
  /** The size of the button */
  background?: Colors.IconBackground
  /** Disable the button */
  disabled: boolean
}

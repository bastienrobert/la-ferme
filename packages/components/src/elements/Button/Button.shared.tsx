import { Colors } from '@/theme'

/** Different theme variations */
export const ButtonVariantOptions = [] as const
export type ButtonVariant = 'primary' | 'secondary' | 'danger'
export const defaultVariant = 'primary'

/** The size of the button */
export type ButtonSize = 'small' | 'medium' | 'large'
export const defaultSize = 'medium'

/** Get background color from background */
export type Variants = {
  [key in ButtonVariant]: Colors.Button
}

export const variants: Variants = {
  primary: 'yellow',
  secondary: 'blue',
  danger: 'red'
}

export interface ButtonSharedProps {
  children: string
  /** The size of the button */
  size?: ButtonSize
  /** The theme of the button */
  variant?: ButtonVariant
  /** Disabled interactions */
  disabled?: boolean
}

export interface ButtonBackgroundProps {
  color?: Colors.Button
}

/** Different theme variations */
export const ButtonVariantOptions = [] as const
export type ButtonVariant = 'primary' | 'secondary'
export const defaultVariant = 'primary'

/** The size of the button */
export type ButtonSize = 'small' | 'medium' | 'large'
export const defaultSize = 'medium'

export interface IButtonProps {
  children: string
  /** The size of the button */
  size?: ButtonSize
  /** The theme of the button */
  variant?: ButtonVariant
  /** Disabled interactions */
  disabled?: boolean
}

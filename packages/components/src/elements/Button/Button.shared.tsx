/** Different theme variations */
export const ButtonVariantOptions = ['primary', 'secondary'] as const
export type ButtonVariant = typeof ButtonVariantOptions[number]
export const defaultVariant = 'primary'

/** The size of the button */
export const ButtonSizeOptions = ['small', 'medium', 'large'] as const
export type ButtonSize = typeof ButtonSizeOptions[number]
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

/* eslint-disable no-bitwise */
import { ButtonVariant } from '@la-ferme/components/native'

export const complementaries = {
  gray: 'yellow',
  yellow: 'blue',
  blue: 'red',
  red: 'yellow',
  pink: 'blue'
}

export const buttons: { [key: string]: ButtonVariant } = {
  yellow: 'secondary',
  blue: 'danger',
  red: 'primary',
  pink: 'secondary'
}

export const hexToRgb = (hex: string) => {
  return hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16))
}

export const hexToRgba = (color: string, opacity: number) => {
  return `rgba(${hexToRgb(color)}, ${opacity})`
}

/* eslint-disable no-bitwise */
import { Button, Colors } from '@la-ferme/components/native'

export const complementaries = {
  [Colors.yellow]: Colors.blue,
  [Colors.blue]: Colors.red,
  [Colors.red]: Colors.yellow,
  [Colors.pink]: Colors.blue
}

export const buttons: { [key: string]: Button.Variant } = {
  [Colors.yellow]: 'secondary',
  [Colors.blue]: 'primary',
  [Colors.red]: 'primary',
  [Colors.pink]: 'secondary'
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

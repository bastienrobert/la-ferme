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

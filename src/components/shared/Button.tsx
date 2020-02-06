import React from 'react'
import { Button, ButtonProps } from 'react-native'

export interface ICustomButtonProps extends ButtonProps {
  children: string
}

export default function CustomButton({
  children,
  onPress
}: ICustomButtonProps) {
  return <Button title={children} onPress={onPress} />
}

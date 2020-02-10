import React from 'react'
import { Button, ButtonProps } from 'react-native'

interface ICustomButtonProps extends ButtonProps {
  children: string
}

export type CustomButtonProps = Omit<ICustomButtonProps, 'title'>

export default function CustomButton({ children, onPress }: CustomButtonProps) {
  return <Button title={children} onPress={onPress} />
}

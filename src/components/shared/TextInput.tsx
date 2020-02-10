import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

export default function CustomTextInput({ placeholder }: TextInputProps) {
  return <TextInput style={styles.CustomTextInput} placeholder={placeholder} />
}

const styles = StyleSheet.create({
  CustomTextInput: { height: 40, borderColor: 'gray', borderWidth: 1 }
})

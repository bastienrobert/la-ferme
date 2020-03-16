import React from 'react'
import { Text, View } from 'react-native'
import { Button } from '@la-ferme/components/native'

export default function Welcome({ goto }: Page.IPageProps) {
  const onCreatePress = () => {
    goto('Room:Create')
  }

  return (
    <View>
      <Text>Hello</Text>
      <Button onPress={onCreatePress}>Create room</Button>
    </View>
  )
}

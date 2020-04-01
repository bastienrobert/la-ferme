import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { Button } from '@la-ferme/components/native'

const Welcome: FC<any> = ({ navigation }) => {
  const onCreatePress = () => {
    navigation.navigate('Room:Create')
  }

  return (
    <View>
      <Text>Hello</Text>
      <Button onPress={onCreatePress}>Create room</Button>
    </View>
  )
}

export default Welcome

import React, { FC } from 'react'
import { View } from 'react-native'
import { Typo, Button } from '@la-ferme/components/native'

const Welcome: FC<any> = ({ navigation }) => {
  const onCreatePress = () => {
    navigation.navigate('Room:Create')
  }

  return (
    <View>
      <Typo size="h1">La ferme</Typo>
      <Button onPress={onCreatePress}>Create room</Button>
    </View>
  )
}

export default Welcome

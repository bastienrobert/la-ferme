import React, { FC } from 'react'
import { View } from 'react-native'
import { Typo, Button } from '@la-ferme/components/native'

interface IPage {
  load: () => Promise<void>
}

const CreateRoom: FC<any> & IPage = ({ navigation }) => {
  const onHomePress = () => {
    navigation.navigate('Home')
  }

  return (
    <View>
      <Typo h1>La ferme</Typo>
      <Typo h2>Create room</Typo>
      <Button onPress={onHomePress}>Return to home</Button>
    </View>
  )
}

CreateRoom.load = () => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, 1000)
  )
}

export default CreateRoom

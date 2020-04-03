import React, { FC } from 'react'
import { View } from 'react-native'
import { Typo, Button } from '@la-ferme/components/native'

import RoundComplete from './RoundComplete'

interface IPage {
  load: () => Promise<void>
}

const CreateRoom: FC<any> & IPage = ({ navigation }) => {
  const onHomePress = () => {
    navigation.navigate('Home')
  }

  return (
    <View>
      <Typo size="h1">La ferme</Typo>
      <Typo size="h2">Create room</Typo>
      <RoundComplete />
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

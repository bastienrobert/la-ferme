import React, { FC } from 'react'
import { View } from 'react-native'
import { Button } from '@la-ferme/components/native'

import RoundComplete from './RoundComplete'
import Typo from '@/components/Typo'

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

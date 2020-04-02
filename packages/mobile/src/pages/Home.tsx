import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { Button } from '@la-ferme/components/native'

import { CONNECT } from '@/graphql/connect'

const Welcome: FC<any> = ({ navigation }) => {
  const [connect, { data }] = useMutation(CONNECT)

  const onCreatePress = async () => {
    await connect()
    console.log(data)
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

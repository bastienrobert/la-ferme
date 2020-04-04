import React, { FC } from 'react'
import { View } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { Typo, Button } from '@la-ferme/components/native'

import { ROOM_JOIN } from '@/graphql/room'

import auth from '@/utils/auth'

const Welcome: FC<any> = ({ navigation }) => {
  const [joinRoom, { data }] = useMutation(ROOM_JOIN)

  const onCreatePress = async () => {
    await joinRoom({
      variables: {
        box_id: 'ba7e0095-0e48-47bd-a90d-32cac8f0139a',
        user: auth.uuid
      }
    })
    navigation.navigate('Room:Create')
  }

  console.log(data)

  return (
    <View>
      <Typo size="h1">La Ferme</Typo>
      <Typo>{auth._uuid}</Typo>
      <Button onPress={onCreatePress}>Create room</Button>
      <Button onPress={auth.clear}>Clean async torage</Button>
    </View>
  )
}

export default Welcome

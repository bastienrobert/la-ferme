import React, { FC, useState, useEffect } from 'react'
import { View } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { Typo, Button } from '@la-ferme/components/native'

import { ROOM_JOIN_MUTATION } from '@/graphql/room'

import auth from '@/utils/auth'

const Home: FC<any> = ({ navigation }) => {
  const [joinRoom] = useMutation(ROOM_JOIN_MUTATION)
  const [uuid, setUUID] = useState(auth.uuid || '')

  useEffect(() => {
    if (auth.uuid) return
    auth.on('uuid', setUUID)
  }, [])

  const onCreatePress = async () => {
    await joinRoom({
      variables: {
        boxID: 'ba7e0095-0e48-47bd-a90d-32cac8f0139a',
        userUUID: auth.uuid
      }
    })
    navigation.navigate('Room:Join')
  }

  return (
    <View>
      <Typo size="h1">La Ferme</Typo>
      <Typo>{uuid}</Typo>
      <Button onPress={onCreatePress}>Create room</Button>
      <Button onPress={auth.clear}>Clean async torage</Button>
    </View>
  )
}

export default Home

import React, { FC, useState, useEffect } from 'react'
import { View } from 'react-native'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Typo, Button } from '@la-ferme/components/native'

import { ROOM_JOIN_MUTATION } from '@/graphql/room'

import auth from '@/utils/auth'

const Home: FC<any> = ({ navigation }) => {
  const client = useApolloClient()
  const [joinRoom, { data }] = useMutation(ROOM_JOIN_MUTATION)
  const [uuid, setUUID] = useState(auth.uuid || '')

  useEffect(() => {
    if (auth.uuid) return
    auth.on('uuid', setUUID)
  }, [])

  useEffect(() => {
    if (!data) return
    navigation.navigate('Room', data.joinRoom)
  }, [data, navigation])

  const onJoinPress = async () => {
    const boxID = '99719f7a-52a7-4d0e-b794-4caf71c4bcce'
    client.writeData({ data: { boxID } })
    joinRoom({
      variables: {
        // TODO: set boxID from QR code or NFC tag
        boxID,
        userUUID: auth.uuid
      }
    })
  }

  return (
    <View>
      <Typo size="h1">La Ferme</Typo>
      <Typo size="h5">Connected as</Typo>
      <Typo>{uuid}</Typo>
      <Button onPress={onJoinPress}>Join room</Button>
    </View>
  )
}

export default Home

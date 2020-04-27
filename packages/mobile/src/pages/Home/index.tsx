import React, { FC, useState, useEffect } from 'react'
import { View } from 'react-native'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Typo, Icon } from '@la-ferme/components/native'

import Container from '@/components/Container'

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

  const join = async boxID => {
    // boxID = '99719f7a-52a7-4d0e-b794-4caf71c4bcce'
    client.writeData({ data: { boxID } })
    joinRoom({
      variables: {
        // TODO: set boxID from QR code or NFC tag
        boxID,
        userUUID: auth.uuid
      }
    })
  }

  const onCameraIconClick = () => {
    navigation.navigate('Home:QRCode')

    if (null) join('')
  }

  return (
    <View>
      <Typo size="h1">Commencer une partie</Typo>
      <Typo size="h5">Connected as</Typo>
      <Typo>{uuid}</Typo>
      <Container>
        <Icon icon="camera" background="yellow" onPress={onCameraIconClick} />
      </Container>
    </View>
  )
}

export default Home

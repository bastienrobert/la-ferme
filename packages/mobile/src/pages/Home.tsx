import React, { FC, useState, useEffect } from 'react'
import { Text, View, Platform } from 'react-native'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Typo, Button } from '@la-ferme/components/native'

import { ROOM_JOIN_MUTATION } from '@/graphql/room'

import auth from '@/utils/auth'

import QRCodeScanner from 'react-native-qrcode-scanner'

const Home: FC<any> = ({ navigation }) => {
  const client = useApolloClient()
  const [joinRoom, { data }] = useMutation(ROOM_JOIN_MUTATION)
  const [uuid, setUUID] = useState(auth.uuid || '')
  let boxID = null

  useEffect(() => {
    if (auth.uuid) return
    auth.on('uuid', setUUID)
  }, [])

  useEffect(() => {
    if (!data) return
    navigation.navigate('Room', data.joinRoom)
  }, [data, navigation])

  const join = async () => {
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

  const onSuccess = function (e: any) {
    boxID = e.data
    join()
  }

  return (
    <View>
      <Typo size="h1">La Ferme</Typo>
      <Typo size="h5">Connected as</Typo>
      <Typo>{uuid}</Typo>
      {/* <Button onPress={join}>Join room</Button> */}
      <View>
        <QRCodeScanner
          onRead={onSuccess}
          fadeIn={false}
          vibrate={Platform.OS === 'android'}
          topContent={<Text>Scan the QR code.</Text>}
        />
      </View>
    </View>
  )
}

export default Home

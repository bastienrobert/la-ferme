import React, { FC } from 'react'
import { View } from 'react-native'
import { useSubscription } from '@apollo/react-hooks'
import { Typo, Button } from '@la-ferme/components/native'

import { ROOM_USERS } from '@/graphql/room'

import Users from './Users'

interface IPage {
  load: () => Promise<void>
}

const CreateRoom: FC<any> & IPage = ({ navigation }) => {
  const box_id = 'ba7e0095-0e48-47bd-a90d-32cac8f0139a'
  const { data, loading } = useSubscription(ROOM_USERS, {
    variables: { box_id }
  })

  const onHomePress = () => {
    navigation.navigate('Home')
  }

  return (
    <View>
      <Typo size="h1">La ferme</Typo>
      <Typo size="h2">Create room</Typo>
      <Button onPress={onHomePress}>Return to home</Button>
      {loading ? (
        <Typo>Trying to connect to {box_id}</Typo>
      ) : (
        <Typo>Connected to room {data.box_id}</Typo>
      )}
      {data && <Users data={data.connectedUsers} />}
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

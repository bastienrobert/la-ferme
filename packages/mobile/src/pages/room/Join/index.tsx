import React, { FC } from 'react'
import { View } from 'react-native'
import { useSubscription, useQuery } from '@apollo/react-hooks'
import { Typo, Button } from '@la-ferme/components/native'

import { ROOM_USERS_QUERY, ROOM_USERS_SUBSCRIPTION } from '@/graphql/room'

import Users from './Users'

const CreateRoom: FC<any> = ({ navigation }) => {
  const boxID = 'ba7e0095-0e48-47bd-a90d-32cac8f0139a'
  const roomUsersSub = useSubscription(ROOM_USERS_SUBSCRIPTION, {
    variables: { boxID }
  })
  const roomUsersQuery = useQuery(ROOM_USERS_QUERY, {
    variables: { boxID }
  })

  const onHomePress = () => {
    navigation.navigate('Home')
  }

  const data =
    roomUsersSub?.data?.connectedUsers || roomUsersQuery?.data?.connectedUsers

  return (
    <View>
      <Typo size="h1">La ferme</Typo>
      <Typo size="h2">Create room</Typo>
      <Button onPress={onHomePress}>Return to home</Button>
      {roomUsersQuery.loading && roomUsersSub.loading ? (
        <Typo>Trying to connect to {boxID}</Typo>
      ) : (
        <Typo>
          Connected to room {roomUsersSub?.data?.boxID ?? 'no stream'}
        </Typo>
      )}
      {data && <Users data={data} />}
    </View>
  )
}

export default CreateRoom

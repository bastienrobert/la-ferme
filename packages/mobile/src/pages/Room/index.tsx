import React, { FC, useEffect } from 'react'
import { View } from 'react-native'
import { useSubscription, useQuery, useMutation } from '@apollo/react-hooks'
import { Typo, Button } from '@la-ferme/components/native'

import { GET_BOX_ID, NEW_USER_IN_ROOM_SUBSCRIPTION } from '@/graphql/room'
import { START_GAME_MUTATION, GAME_STATUS_SUBSCRIPTION } from '@/graphql/game'

import auth from '@/utils/auth'

import Users from './Users'

const CreateRoom: FC<any> = ({ navigation, route }) => {
  const routeData = route?.params

  const boxIDQuery = useQuery(GET_BOX_ID)
  const boxID = boxIDQuery?.data?.boxID

  const [startGameMututation] = useMutation(START_GAME_MUTATION)
  const gameStatusSubscription = useSubscription(GAME_STATUS_SUBSCRIPTION, {
    variables: { boxID }
  })
  const newUserInRoomSubscription = useSubscription(
    NEW_USER_IN_ROOM_SUBSCRIPTION,
    {
      variables: { boxID }
    }
  )

  const owner = routeData?.creatorUUID === auth.uuid

  useEffect(() => {
    if (!gameStatusSubscription.data) return
    if (gameStatusSubscription.data?.gameStatus?.winnerUUID) return
    navigation.navigate('Role', gameStatusSubscription.data?.gameStatus)
  }, [gameStatusSubscription.data, navigation])

  const onHomePress = () => {
    navigation.navigate('Home')
  }

  const onStartPress = () => {
    startGameMututation({ variables: { boxID, userUUID: auth.uuid } })
  }

  const streaming = newUserInRoomSubscription.loading
    ? 'not streaming'
    : 'streaming'
  const data = newUserInRoomSubscription.data?.connectedUsers || routeData

  return (
    <View>
      <Typo size="h1">La ferme</Typo>
      <Typo size="h2">Room</Typo>
      <Typo size="h2">{owner ? 'You own' : 'You join'}</Typo>
      <Typo size="h5">Connected to room with box id:</Typo>
      <Typo>{boxID}</Typo>
      <Button onPress={onHomePress}>Return to home</Button>
      <Typo>{streaming}</Typo>
      <Typo size="h5">Connected users:</Typo>
      {data && <Users data={data.users} />}
      {!owner && <Typo size="h1">Patientez...</Typo>}
      {owner && data && data.users?.length > 1 && (
        <Button onPress={onStartPress}>Start the game</Button>
      )}
    </View>
  )
}

export default CreateRoom

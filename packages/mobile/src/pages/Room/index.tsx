import React, { FC, useEffect } from 'react'
import { View } from 'react-native'
import { useSubscription, useQuery, useMutation } from '@apollo/react-hooks'
import { Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'

import { GET_BOX_ID, NEW_USER_IN_ROOM_SUBSCRIPTION } from '@/graphql/room'
import { START_GAME_MUTATION, GAME_STATUS_SUBSCRIPTION } from '@/graphql/game'

import auth from '@/utils/auth'

import Users from './Users'

const Room: FC<any> = ({ navigation, route }) => {
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

  // TODO
  // subscription should be cancelled when React navigation focus blur
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
      <Text color="beige">La ferme</Text>
      <Text color="beige">Room</Text>
      <Text color="beige">{owner ? 'You own' : 'You join'}</Text>
      <Text color="beige">Connected to room with box id:</Text>
      <Text>{boxID}</Text>
      <Container>
        <Button onPress={onHomePress}>Return to home</Button>
      </Container>
      <Text color="beige">{streaming}</Text>
      <Text color="beige">Connected users:</Text>
      {data && <Users data={data.users} />}
      {!owner && <Text color="beige">Patientez...</Text>}
      {owner && data && data.users?.length > 1 && (
        <Container>
          <Button onPress={onStartPress}>Start the game</Button>
        </Container>
      )}
    </View>
  )
}

export default Room

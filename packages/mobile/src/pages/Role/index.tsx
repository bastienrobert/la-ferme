import React, { FC, useEffect } from 'react'
import { useMutation, useSubscription, useQuery } from '@apollo/react-hooks'
import { Typo, Button } from '@la-ferme/components/native'

import Container from '@/components/Container'

import { GET_BOX_ID } from '@/graphql/room'
import {
  PLAYER_READY_MUTATION,
  PLAYER_IS_READY_SUBSCRIPTION
} from '@/graphql/player'

import auth from '@/utils/auth'

const Role: FC<any> = ({ navigation, route }) => {
  const routeData = route?.params

  const boxIDQuery = useQuery(GET_BOX_ID)
  const boxID = boxIDQuery?.data?.boxID

  const [playerReadyMutation] = useMutation(PLAYER_READY_MUTATION)
  const playerIsReadySubscription = useSubscription(
    PLAYER_IS_READY_SUBSCRIPTION,
    { variables: { boxID } }
  )

  const subscriptionPlayers =
    playerIsReadySubscription?.data?.playerIsReady?.players

  const players = subscriptionPlayers ?? routeData.players
  const userData = players.find(player => player.user === auth.uuid)

  const everybodyIsReady = players.every(player => player.ready)

  useEffect(() => {
    if (!everybodyIsReady) return
    navigation.navigate('Game')
  }, [navigation, everybodyIsReady])

  const onReadyPress = () => {
    playerReadyMutation({ variables: { boxID, userUUID: auth.uuid } })
  }

  return (
    <>
      <Typo size="h1">You are</Typo>
      <Typo>{userData.character}</Typo>
      <Typo>{userData.goal}</Typo>
      <Typo>{userData.skill}</Typo>
      <Typo>{userData.ready ? 'you are ready' : 'you are not ready'}</Typo>
      <Typo size="h2">All players</Typo>
      <Typo size="h3">{everybodyIsReady ? 'Ready' : 'Not yet'}</Typo>
      {players.map((player, i) => (
        <Typo key={`player-${i}`}>
          {player.character}: {player.goal} {player.skill} is{' '}
          {player.ready ? 'ready' : 'not ready'} ({player.user})
        </Typo>
      ))}
      <Container>
        <Button onPress={onReadyPress}>Ready</Button>
      </Container>
    </>
  )
}

export default Role

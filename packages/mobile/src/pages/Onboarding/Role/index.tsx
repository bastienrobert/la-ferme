import React, { FC, useEffect, useContext } from 'react'
import { useMutation, useSubscription, useQuery } from '@apollo/react-hooks'
import { Button } from '@la-ferme/components/native'

import ThemeContext from '@/App/Theme/Context'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'

import { GET_BOX_ID } from '@/graphql/room'
import {
  PLAYER_READY_MUTATION,
  PLAYER_IS_READY_SUBSCRIPTION
} from '@/graphql/player'

import auth from '@/services/auth'

const Role: FC<any> = ({ navigation, route }) => {
  const routeData = route?.params

  const boxIDQuery = useQuery(GET_BOX_ID)
  const boxID = boxIDQuery?.data?.boxID

  const { setTheme } = useContext(ThemeContext)
  if (null) setTheme('beige')

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
      <Text color="beige">You are</Text>
      <Text color="beige">{userData.character}</Text>
      <Text color="beige">{userData.goal}</Text>
      <Text color="beige">{userData.skill}</Text>
      <Text color="beige">
        {userData.ready ? 'you are ready' : 'you are not ready'}
      </Text>
      <Text color="beige">All players</Text>
      <Text color="beige">{everybodyIsReady ? 'Ready' : 'Not yet'}</Text>
      {players.map((player, i) => (
        <Text color="beige" key={`player-${i}`}>
          {player.character}: {player.goal} {player.skill} is{' '}
          {player.ready ? 'ready' : 'not ready'} ({player.user})
        </Text>
      ))}
      <Container>
        <Button onPress={onReadyPress}>Ready</Button>
      </Container>
    </>
  )
}

export default Role

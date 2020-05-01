import React, { FC, useContext, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button } from '@la-ferme/components/native'

import ThemeContext from '@/App/Theme/Context'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'

import { GET_BOX_ID } from '@/graphql/room'
import { GET_PLAYER, PLAYER_READY_MUTATION } from '@/graphql/player'

import auth from '@/services/auth'

const Role: FC<any> = ({ navigation }) => {
  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    setTheme('red')
  }, [setTheme])

  const boxIDQuery = useQuery(GET_BOX_ID)
  const boxID = boxIDQuery?.data?.boxID

  const playerQuery = useQuery(GET_PLAYER, {
    variables: { userUUID: auth.uuid }
  })
  const [playerReadyMutation] = useMutation(PLAYER_READY_MUTATION)

  const onReadyPress = () => {
    playerReadyMutation({ variables: { boxID, userUUID: auth.uuid } })
    navigation.navigate('Onboarding:Pending')
  }

  const userData = playerQuery?.data?.getPlayer

  if (!userData) return <Text color="gray">Fetching user</Text>

  return (
    <>
      <Text color="gray">You are</Text>
      <Text color="gray">{userData.character}</Text>
      <Text color="gray">{userData.goal}</Text>
      <Text color="gray">{userData.skill}</Text>
      {/* <Text color="beige">{everybodyIsReady ? 'Ready' : 'Not yet'}</Text>
      {players.map((player, i) => (
        <Text color="beige" key={`player-${i}`}>
          {player.character}: {player.goal} {player.skill} is{' '}
          {player.ready ? 'ready' : 'not ready'} ({player.user})
        </Text>
      ))} */}
      <Container>
        <Button onPress={onReadyPress}>Ready</Button>
      </Container>
    </>
  )
}

export default Role

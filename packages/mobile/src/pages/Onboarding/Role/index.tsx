import React, { FC, useContext, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import ThemeContext from '@/App/Theme/Context'

import Walktrough from '@/components/shared/Walktrough'
import Text from '@/components/typo/Text'

import { GAME_INFOS_QUERY, SET_PLAYER_INFOS_MUTATION } from '@/graphql/local'
import { GET_PLAYER, PLAYER_READY_MUTATION } from '@/graphql/player'

const Role: FC<any> = ({ navigation }) => {
  const { setTheme } = useContext(ThemeContext)
  const [playerInfosMutation] = useMutation(SET_PLAYER_INFOS_MUTATION)

  useEffect(() => {
    setTheme('red')
  }, [setTheme])

  const gameInfosQuery = useQuery(GAME_INFOS_QUERY)
  const { player } = gameInfosQuery?.data ?? {}

  const playerQuery = useQuery(GET_PLAYER, {
    variables: { playerUUID: player.uuid }
  })
  const [playerReadyMutation, { data }] = useMutation(PLAYER_READY_MUTATION)

  const onReadyPress = () => {
    playerReadyMutation({ variables: { playerUUID: player.uuid } })
  }

  useEffect(() => {
    if (!data?.playerReady) return
    navigation.navigate('Onboarding:Pending')
  }, [data, navigation])

  const userData = playerQuery?.data?.getPlayer

  useEffect(() => {
    if (!userData) return
    const { character, goal, skill } = userData
    playerInfosMutation({ variables: { character, goal, skill } })
  }, [playerInfosMutation, userData])

  if (!userData) return <Text color="gray">Fetching user</Text>

  return (
    <>
      <Walktrough player={userData} onReadyPress={onReadyPress} />
    </>
  )
}

export default Role

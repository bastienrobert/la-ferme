import React, { FC, useEffect, useCallback } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { Colors } from '@la-ferme/components/native'
import { characters } from '@la-ferme/shared/data'

import { RootStackParamList } from '@/App/routes'

import Walktrough from '@/pages/Onboarding/Role/Walktrough'
import Text from '@/components/typo/Text'

import { GAME_INFOS_QUERY, SET_PLAYER_INFOS_MUTATION } from '@/graphql/local'
import { GET_PLAYER, PLAYER_READY_MUTATION } from '@/graphql/player'

import useTheme from '@/hooks/useTheme'

type OnboardingRoleRouteProp = RouteProp<RootStackParamList, 'Onboarding:Role'>
type OnboardingRoleNavigationProp = NavigationProp<
  RootStackParamList,
  'Onboarding:Role'
>

export interface OnboardingRoleProps {
  route: OnboardingRoleRouteProp
  navigation: OnboardingRoleNavigationProp
}

const Role: FC<OnboardingRoleProps> = ({ navigation }) => {
  const { setTheme } = useTheme()
  const [playerInfosMutation] = useMutation(SET_PLAYER_INFOS_MUTATION)

  const gameInfosQuery = useQuery(GAME_INFOS_QUERY)
  const { player } = gameInfosQuery?.data ?? {}

  const playerQuery = useQuery(GET_PLAYER, {
    variables: { playerUUID: player.uuid }
  })
  const userData = playerQuery?.data?.getPlayer

  const [playerReadyMutation, { data }] = useMutation(PLAYER_READY_MUTATION)

  useEffect(() => {
    if (!userData) return
    const character = characters.find(c => userData.character === c.name)
    setTheme(character.color as Colors.Theme)
  }, [setTheme, userData])

  useEffect(() => {
    if (!data?.playerReady) return
    navigation.navigate('Onboarding:Pending')
  }, [data, navigation])

  useEffect(() => {
    if (!userData) return
    const { character, goal, skill } = userData
    playerInfosMutation({ variables: { character, goal, skill } })
  }, [playerInfosMutation, userData])

  const onReadyPress = useCallback(() => {
    playerReadyMutation({ variables: { playerUUID: player.uuid } })
  }, [player, playerReadyMutation])

  if (!userData) return <Text color="gray">Fetching user</Text>

  return <Walktrough player={userData} onReadyPress={onReadyPress} />
}

export default Role

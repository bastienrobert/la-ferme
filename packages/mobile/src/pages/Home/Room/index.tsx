import React, { FC, useEffect, useMemo } from 'react'
import styled from 'styled-components/native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { useSubscription, useQuery, useMutation } from '@apollo/react-hooks'
import { UUID, GameStatusType, User } from '@la-ferme/shared/typings'

import { RootStackParamList } from '@/App/routes'

import Owner from './Owner'
import Player from './Player'
import OwnerButton from './OwnerButton'
import NumberOfConnectedUsers from './NumberOfConnectedUsers'
import BackgroundAnimation from './BackgroundAnimation'
import FullContainer from '@/components/shared/FullContainer'

import { GAME_INFOS_QUERY } from '@/graphql/local'
import { NEW_USER_IN_ROOM_SUBSCRIPTION } from '@/graphql/room'
import { START_GAME_MUTATION, GAME_UPDATED_SUBSCRIPTION } from '@/graphql/game'

import auth from '@/services/auth'

export interface HomeRoomParams {
  boxID: UUID
  creatorUUID: UUID
  gameUUID: UUID
  playerUUID: UUID
  users: User[]
}

type HomeRoomRouteProp = RouteProp<RootStackParamList, 'Home:Room'>
type HomeRoomNavigationProp = NavigationProp<RootStackParamList, 'Home:Room'>

export interface HomeRoomProps {
  route: HomeRoomRouteProp
  navigation: HomeRoomNavigationProp
}

const Room: FC<HomeRoomProps> = ({ navigation, route }) => {
  const routeData = route?.params

  const gameInfosQuery = useQuery(GAME_INFOS_QUERY)
  const { boxID, player, gameUUID } = gameInfosQuery?.data ?? {}

  const [startGameMututation] = useMutation(START_GAME_MUTATION)
  const gameUpdatedSubscription = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
    variables: { gameUUID }
  })
  const newUserInRoomSubscription = useSubscription(
    NEW_USER_IN_ROOM_SUBSCRIPTION,
    {
      variables: { boxID }
    }
  )

  const owner = useMemo(() => {
    return routeData?.creatorUUID === auth.uuid
  }, [routeData])

  // TODO
  // subscription should be cancelled when React navigation focus blur
  useEffect(() => {
    if (!navigation.isFocused) return
    const data = gameUpdatedSubscription.data?.gameUpdated
    if (!data || data.type !== GameStatusType.Start) return
    navigation.navigate('Onboarding:Hello')
  }, [gameUpdatedSubscription.data, navigation])

  const onStartPress = () => {
    startGameMututation({ variables: { playerUUID: player.uuid } })
  }

  const data = newUserInRoomSubscription.data?.connectedUsers || routeData

  return (
    <Component>
      {owner ? <Owner /> : <Player />}
      {data && <NumberOfConnectedUsers users={data.users} />}
      {owner && <OwnerButton users={data?.users} onPress={onStartPress} />}
      <BackgroundAnimation owner={owner} />
    </Component>
  )
}

const Component = styled(FullContainer)`
  align-items: center;
  justify-content: space-between;
`

export default Room

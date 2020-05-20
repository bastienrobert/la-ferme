import React, { FC, useEffect, useContext } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'

import ThemeContext from '@/App/Theme/Context'

import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'

import { GAME_PLAYER_INFOS_QUERY } from '@/graphql/local'
import { READY_PLAYERS_QUERY, GAME_UPDATED_SUBSCRIPTION } from '@/graphql/game'

const Pending: FC<any> = ({ navigation }) => {
  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    setTheme('red')
  }, [setTheme])

  const gameInfosQuery = useQuery(GAME_PLAYER_INFOS_QUERY)
  const { gameUUID } = gameInfosQuery?.data ?? {}

  const playerIsReadyQuery = useQuery(READY_PLAYERS_QUERY, {
    variables: { gameUUID }
  })

  const gameUpdatedSubscription = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
    variables: { gameUUID }
  })

  const players =
    gameUpdatedSubscription.data?.gameUpdated?.players ??
    playerIsReadyQuery.data?.getReadyPlayers ??
    []

  const everybodyIsReady =
    players.length > 0 && players.every(player => player.ready)

  useEffect(() => {
    if (!everybodyIsReady) return
    navigation.navigate('Game:Main', { players })
  }, [players, navigation, everybodyIsReady])

  return (
    <FullContainer>
      <Title preset="H1">PENDING</Title>
      {players.map((p, i) => (
        <Title preset="H4" key={i}>
          {`${p.uuid}: ${p.character} - ${p.ready}`}
        </Title>
      ))}
    </FullContainer>
  )
}

export default Pending

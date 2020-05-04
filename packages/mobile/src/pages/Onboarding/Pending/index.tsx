import React, { FC, useEffect, useContext } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'

import ThemeContext from '@/App/Theme/Context'

import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'

import { GET_BOX_ID } from '@/graphql/local'
import { READY_PLAYERS_QUERY, GAME_UPDATED_SUBSCRIPTION } from '@/graphql/game'

const Pending: FC<any> = ({ navigation }) => {
  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    setTheme('red')
  }, [setTheme])

  const boxIDQuery = useQuery(GET_BOX_ID)
  const boxID = boxIDQuery?.data?.boxID

  const playerIsReadyQuery = useQuery(READY_PLAYERS_QUERY, {
    variables: { boxID }
  })

  const gameUpdatedSubscription = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
    variables: { boxID }
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
          {`${p.user}: ${p.character} - ${p.ready}`}
        </Title>
      ))}
    </FullContainer>
  )
}

export default Pending

import React, { FC, useEffect, useContext } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'

import ThemeContext from '@/App/Theme/Context'

import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'

import { GET_BOX_ID } from '@/graphql/room'
import { READY_PLAYERS_QUERY } from '@/graphql/game'
import { PLAYER_IS_READY_SUBSCRIPTION } from '@/graphql/player'

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

  const playerIsReadySubscription = useSubscription(
    PLAYER_IS_READY_SUBSCRIPTION,
    { variables: { boxID } }
  )

  const players =
    playerIsReadySubscription.data?.playerIsReady?.players ??
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

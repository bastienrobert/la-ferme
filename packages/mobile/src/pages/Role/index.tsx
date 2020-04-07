import React, { FC } from 'react'
import { Typo } from '@la-ferme/components/native'

import auth from '@/utils/auth'

const Role: FC<any> = ({ route }) => {
  const routeData = route?.params

  const userData = routeData.players.find(player => player.user === auth.uuid)

  return (
    <>
      <Typo size="h1">You are</Typo>
      <Typo>{userData.character}</Typo>
      <Typo>{userData.goal}</Typo>
      <Typo>{userData.skill}</Typo>
      <Typo size="h2">Other players</Typo>
      {routeData.players.map((player, i) => (
        <Typo key={`player-${i}`}>
          {player.character}: {player.goal} {player.skill} ({player.user})
        </Typo>
      ))}
    </>
  )
}

export default Role

import React, { FC, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UUID, Player } from '@la-ferme/shared/typings'

import Text from '@/components/typo/Text'
import Container from '@/components/shared/Container'
import PlayerSelect from '@/components/shared/PlayerSelect'

import { REPORT_PLAYER_MUTATION } from '@/graphql/report'

export interface ReportProps {
  userUUID: UUID
  boxID: UUID
  players: Player[]
}

const Report: FC<ReportProps> = ({ players, boxID, userUUID }) => {
  const [used, setUsed] = useState(false)
  const [reportPlayerMutation] = useMutation(REPORT_PLAYER_MUTATION)

  const onPlayerPress = (player: Player) => {
    setUsed(true)
    reportPlayerMutation({
      variables: { boxID, userUUID, targetUUID: player.user }
    })
  }

  const filteredPlayers = players.filter(player => player.user !== userUUID)

  return (
    <Container>
      {used ? (
        <Text>Report has already been used</Text>
      ) : (
        <PlayerSelect onPress={onPlayerPress} players={filteredPlayers} />
      )}
    </Container>
  )
}

export default Report

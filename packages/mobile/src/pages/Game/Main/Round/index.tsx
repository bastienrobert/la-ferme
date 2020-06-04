import React, { FC } from 'react'
import {
  UUID,
  Round as RoundType,
  Player as PlayerType
} from '@la-ferme/shared/typings'

import Player from './Player'
import Watcher from './Watcher'
import Text from '@/components/typo/Text'
import Container from '@/components/shared/Container'

export interface RoundProps {
  data: RoundType
  players: PlayerType[]
  gameUUID: UUID
  player: PlayerType
}

const Round: FC<RoundProps> = props => {
  const { data, player } = props

  return (
    <Container>
      <Text>Round</Text>
      {!data && <Text>No round data yet</Text>}
      {data && <Text>New round for user</Text>}
      {data && <Text>{data.player}</Text>}
      {data && <Text>Step : {data.step}</Text>}
      {data &&
        (data.player === player.uuid ? (
          <Player {...props} />
        ) : (
          <Watcher {...props} />
        ))}
    </Container>
  )
}

export default Round

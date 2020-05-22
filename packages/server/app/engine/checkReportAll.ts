import { Collection } from 'bookshelf'

// import { REPORT } from '@la-ferme/shared/constants'
// import { EventType } from '@la-ferme/shared/typings'

import Player from '@/app/models/Player'
import Game from '@/app/models/Game'

// import pubsub from '@/app/pubsub'

// const REPORT_ALL = -1.5
// const REWARD_ALL = 1.5

export default async (game: Game, players: Collection<Player>) => {
  const scores = players.reduce((acc, p) => acc + p.score, 0)
  const average = scores / players.length
  console.log(game, average)

  // pubsub.publish(REPORT.CREATE, {
  //   eventTriggered: {
  //     gameUUID: game.uuid,
  //     type: EventType.Report,
  //     player: player.uuid
  //   }
  // })
}

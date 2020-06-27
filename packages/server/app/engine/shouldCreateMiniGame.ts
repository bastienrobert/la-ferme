import { MINI_GAME } from '@la-ferme/shared/constants'

import Game from '@/app/models/Game'
import MiniGame from '@/app/models/MiniGame'

import {
  MINI_GAME_FROM_NUMBER_OF_ROUND,
  MINI_GAME_AVG_ROUND_COUNT
} from '@la-ferme/shared/settings'

import pubsub from '@/app/pubsub'
import { UUID, EventType } from '@la-ferme/shared/typings'

const publishMiniGame = (gameUUID: UUID, name: string) => {
  pubsub.publish(MINI_GAME.CREATE, {
    eventTriggered: {
      gameUUID: gameUUID,
      type: EventType.MiniGame,
      name
    }
  })
}

export interface ShouldCreateMiniGameOptions {
  numberOfRounds: number
}

export default async (
  game: Game,
  { numberOfRounds }: ShouldCreateMiniGameOptions
) => {
  if (numberOfRounds < MINI_GAME_FROM_NUMBER_OF_ROUND) return false
  const random = Math.random()
  if (random > 1 / MINI_GAME_AVG_ROUND_COUNT) return

  await new MiniGame({
    game_id: game.id
  }).save()

  publishMiniGame(game.uuid, 'NAME')
}

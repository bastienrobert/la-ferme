import { Collection } from 'bookshelf'
import { MINI_GAME } from '@la-ferme/shared/constants'
import { UUID, EventType } from '@la-ferme/shared/typings'
import { minigames } from '@la-ferme/shared/data'

import Game from '@/app/models/Game'
import Player from '@/app/models/Player'
import MiniGame from '@/app/models/MiniGame'
import MiniGamePlayer from '@/app/models/MiniGamePlayer'

import {
  MINI_GAME_FROM_NUMBER_OF_ROUND,
  MINI_GAME_AVG_ROUND_COUNT
} from '@la-ferme/shared/settings'

import pubsub from '@/app/pubsub'

const publishMiniGame = (gameUUID: UUID, { name, uuid }) => {
  pubsub.publish(MINI_GAME.CREATE, {
    eventTriggered: {
      gameUUID: gameUUID,
      type: EventType.MiniGame,
      name,
      miniGameUUID: uuid
    }
  })
}

const names = Object.keys(minigames)

export interface ShouldCreateMiniGameOptions {
  numberOfRounds: number
}

export default async (
  game: Game,
  { numberOfRounds }: ShouldCreateMiniGameOptions
) => {
  if (!process.env.DEBUG_MINIGAME) {
    if (numberOfRounds < MINI_GAME_FROM_NUMBER_OF_ROUND) return false
    const random = Math.random()
    if (random > 1 / MINI_GAME_AVG_ROUND_COUNT) return
  }

  const name = names[Math.floor(Math.random() * names.length)]
  const miniGame = await new MiniGame({
    name,
    game_id: game.id
  }).save()

  const players = (await game.presentPlayers().fetch()) as Collection<Player>
  const miniGamePlayers = await Promise.all(
    players.map(async player => {
      return await new MiniGamePlayer({
        player_id: player.id,
        mini_game_id: miniGame.id
      }).save()
    })
  )

  if (miniGamePlayers.length > 0) {
    publishMiniGame(game.uuid, { name, uuid: miniGame.uuid })
  }
}

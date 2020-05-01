import { Collection } from 'bookshelf'
import { ROUND } from '@la-ferme/shared/constants'
import { NOT_ALLOWED } from '@la-ferme/shared/errors'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'

import User from '@/app/models/User'
import Room from '@/app/models/Room'
import Round from '@/app/models/Round'
import Player from '@/app/models/Player'

import { connections } from '@/app/stores'
import Game from '@/app/models/Game'

const getGame = async boxID => {
  const room = await Room.findByBoxID(boxID)
  const lastGame = await room.getLastGame()
  return await lastGame.fetch({
    withRelated: [{ players: qb => qb.orderBy('created_at') }]
  })
}

const getRounds = async (game: Game) => {
  return await game.rounds().orderBy('created_at').fetch()
}

const createRound = async (gameID, playerID) => {
  const round = new Round({ game_id: gameID, player_id: playerID })
  await round.save()

  const player = await round.player().fetch({ withRelated: ['user'] })
  const user = player.related('user') as User

  return {
    user: user.uuid
  }
}

const publishRound = (boxID, round) => {
  pubsub.publish(ROUND.NEW, {
    newRound: {
      boxID,
      round
    }
  })
}

const resolvers = {
  Mutation: {
    // user in the game
    async readyForRound(_, { boxID, userUUID }) {
      connections.setReady(userUUID)

      const users = connections.getByBoxID(boxID)
      const everyBodyIsReady = Array.from(users).every(
        ({ 1: val }) => val.ready === true
      )

      if (everyBodyIsReady) {
        const game = await getGame(boxID)
        const players = game.related('players') as Collection<Player>
        const player = players.first()
        const round = await createRound(game.id, player.id)
        publishRound(boxID, round)
      }

      return true
    },
    // push a confirmed round
    async pushRound(_, { boxID, userUUID }) {
      const game = await getGame(boxID)
      const rounds = await getRounds(game)
      const players = game.related('players') as Collection<Player>

      const lastRound = await rounds
        .last()
        .fetch({ withRelated: ['player', 'player.user'] })

      const player = lastRound.related('player') as Player
      const user = player.related('user') as User

      if (user.uuid !== userUUID) throw new Error(NOT_ALLOWED)

      lastRound.completed = true

      const serializedPlayers = players.serialize()
      const nextPlayerIndex =
        (serializedPlayers.findIndex(p => p.id === player.id) + 1) %
        players.length
      const nextPlayer = players.at(nextPlayerIndex)

      // check events before creating round to assign it to the good person
      // get events from Game.events() WHERE status IS NEW AND WHERE player IS nextPlayer
      const [round] = await Promise.all([
        createRound(game.id, nextPlayer.id),
        lastRound.save()
      ])
      publishRound(boxID, round)

      return true
    }
  },
  Subscription: {
    // new round in town
    newRound: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(ROUND.NEW),
        ({ newRound }, variables) => {
          return newRound.boxID === variables.boxID
        }
      )
    }
  }
}

export default resolvers

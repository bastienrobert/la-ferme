import { ROUND } from '@la-ferme/shared/constants'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'

import Room from '@/app/models/Room'
import Round from '@/app/models/Round'

import { connections } from '@/app/stores'

const getGame = async boxID => {
  const room = await Room.findByBoxID(boxID)
  const lastGame = await room.getLastGame()
  return await lastGame.fetch()
}

const getPlayers = async game => {
  return await game.players.orderBy('id').fetch()
}

const getRounds = async game => {
  return await game.rounds.orderBy('id').fetch()
}

const createRound = async (gameID, playerID) => {
  const round = new Round({ game_id: gameID, player_id: playerID })
  await round.save()

  const player = await round.player.fetch()
  const user = await player.user.fetch()

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
        const players = await getPlayers(game)
        const player = players.first()
        const round = await createRound(game.id, player.id)
        publishRound(boxID, round)
      }

      return true
    },
    // push a confirmed round
    async pushRound(_, { boxID }) {
      const game = await getGame(boxID)
      const rounds = await getRounds(game)
      const players = await getPlayers(game)

      const lastRound = await rounds.last().fetch()
      const player = await lastRound.player.fetch()

      lastRound.completed = true
      await lastRound.save()

      const serializedPlayers = players.serialize()
      const nextPlayerIndex =
        (serializedPlayers.findIndex(p => p.id === player.id) + 1) %
        players.length
      const nextPlayer = serializedPlayers[nextPlayerIndex]
      const round = await createRound(game.id, nextPlayer.id)
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

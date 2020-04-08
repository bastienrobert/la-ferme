import { GAME } from '@la-ferme/shared/constants'
import { NOT_ALLOWED } from '@la-ferme/shared/errors'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'
import Room from '@/app/models/Room'
import User from '@/app/models/User'

import formatPlayers from '@/app/helpers/formatPlayers'

const characters = ['peter', 'monique', 'leon', 'isabelle']

const getRandomCharacter = tmp => {
  const character = tmp.splice(Math.floor(Math.random() * tmp.length), 1)
  return character[0]
}

const resolvers = {
  Game: {
    __resolveType(game) {
      return game.winnerUUID ? 'WonGame' : 'NewGame'
    }
  },
  Mutation: {
    // set game as ready
    async startGame(_, { userUUID, boxID }) {
      const room = await Room.findByBoxID(boxID)
      const game = await (await room.getLastGame()).fetch()
      const creator = await game.creator.fetch()
      if (creator.uuid !== userUUID) throw new Error(NOT_ALLOWED)
      await game.start().save()

      const players = await game.players.fetch()

      const tmp_characters = characters
      await Promise.all(
        players.map(player => {
          player.character = getRandomCharacter(tmp_characters)
          player.skill = 'skill'
          player.goal = 'goal'
          return player.save()
        })
      )

      const formattedPlayer = await formatPlayers(players)
      pubsub.publish(GAME.START, {
        gameStatus: {
          boxID,
          players: formattedPlayer
        }
      })

      return true
    },
    async stopGame(_, { winnerUUID, boxID }) {
      const room = await Room.findByBoxID(boxID)
      const game = await (await room.getLastGame()).fetch()
      const winner = await User.findByUUID(winnerUUID)
      game.winner = winner.id
      await game.save()

      const players = await game.players.fetch()

      const formattedPlayer = await formatPlayers(players)
      pubsub.publish(GAME.STOP, {
        gameStatus: {
          boxID,
          winnerUUID,
          players: formattedPlayer
        }
      })

      return true
    }
  },
  Subscription: {
    gameStatus: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([GAME.START, GAME.STOP]),
        ({ gameStatus }, variables) => {
          return gameStatus.boxID === variables.boxID
        }
      )
    }
  }
}

export default resolvers

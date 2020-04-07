import { GAME } from '@la-ferme/shared/constants'
import { NOT_ALLOWED } from '@la-ferme/shared/errors'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'
import Room from '@/app/models/Room'

import formatPlayers from '@/app/helpers/formatPlayers'

const characters = ['peter', 'monique', 'leon', 'isabelle']

const getRandomCharacter = tmp => {
  const character = tmp.splice(Math.floor(Math.random() * tmp.length), 1)
  return character[0]
}

const resolvers = {
  Mutation: {
    // set game as ready
    async startGame(_, { userUUID, boxID }) {
      const room = await Room.findByBoxID(boxID)
      const game = await (await room.getLastGame()).fetch()
      const creator = await game.creator.fetch()
      if (creator.uuid !== userUUID) throw new Error(NOT_ALLOWED)
      game.start().save()

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
        gameStarted: {
          boxID,
          players: formattedPlayer
        }
      })

      return true
    }
  },
  Subscription: {
    gameStarted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(GAME.START),
        ({ gameStarted }, variables) => {
          return gameStarted.boxID === variables.boxID
        }
      )
    }
  }
}

export default resolvers

import { GAME } from '@la-ferme/shared/constants'
import { NOT_ALLOWED } from '@la-ferme/shared/errors'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'
import Room from '@/app/models/Room'

const characters = ['peter', 'monique', 'leon', 'isabelle']

const getRandomCharacter = () => {
  return characters[Math.floor(Math.random() * characters.length)]
}

const formatPlayer = async player => {
  const user = await player.user.fetch()
  const { character, skill, goal } = await player.serialize()
  return {
    user: user.uuid,
    character,
    skill,
    goal
  }
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
      await Promise.all(
        players.map(player => {
          player.character = getRandomCharacter()
          player.skill = 'skill'
          player.goal = 'goal'
          return player.save()
        })
      )

      const formattedPlayer = await Promise.all(players.map(formatPlayer))
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

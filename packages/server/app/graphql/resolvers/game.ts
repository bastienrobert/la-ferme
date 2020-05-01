import { Collection } from 'bookshelf'
import { GAME } from '@la-ferme/shared/constants'
import { NOT_ALLOWED } from '@la-ferme/shared/errors'
import { characters, goals, skills } from '@la-ferme/shared/data'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'
import Room from '@/app/models/Room'
import User from '@/app/models/User'
import Player from '@/app/models/Player'

import { connections } from '@/app/stores'

import formatPlayers from '@/app/helpers/formatPlayers'

const getRandomPlayerSpecifications = () => {
  const tmp_characters = characters.slice()
  const tmp_skills = goals.slice()
  const tmp_goals = skills.slice()

  const getAndSplice = tmp => () => {
    const res = tmp.splice(Math.floor(Math.random() * tmp.length), 1)
    return res.length > 0 ? res[0].name : null
  }

  return {
    getCharacter: getAndSplice(tmp_characters),
    getSkill: getAndSplice(tmp_skills),
    getGoal: getAndSplice(tmp_goals)
  }
}

const resolvers = {
  Game: {
    __resolveType(game) {
      return game.winnerUUID ? 'WonGame' : 'NewGame'
    }
  },
  Query: {
    async getReadyPlayers(_, { boxID }) {
      const room = await Room.findByBoxID(boxID)
      const game = await (await room.getLastGame()).fetch({
        withRelated: ['players']
      })

      const players = game.related<Player>('players') as Collection<Player>
      const res = players.map(async player => {
        const user = await player.user().fetch()
        const { ready, character, skill, goal } = player.serialize()
        return {
          user: user.uuid,
          ready,
          character,
          skill,
          goal
        }
      })

      return res
    }
  },
  Mutation: {
    // set game as ready
    async startGame(_, { userUUID, boxID }) {
      const room = await Room.findByBoxID(boxID)
      const game = await (await room.getLastGame()).fetch({
        withRelated: ['creator', 'players']
      })

      const creator = game.related<User>('creator') as User
      if (creator.uuid !== userUUID) throw new Error(NOT_ALLOWED)
      game.start()
      await game.save()

      const players = game.related<Player>('players') as Collection<Player>

      const {
        getCharacter,
        getSkill,
        getGoal
      } = getRandomPlayerSpecifications()

      await Promise.all(
        players.map(player => {
          player.character = getCharacter()
          player.skill = getSkill()
          player.goal = getGoal()
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
      const lastGame = await room.getLastGame()

      const [game, winner] = await Promise.all([
        lastGame.fetch({ withRelated: ['players', 'players.user'] }),
        User.findByUUID(winnerUUID)
      ])

      game.winner = winner.id
      await game.save()

      const players = game.related('players')
      const formattedPlayer = await formatPlayers(players)

      connections.getByBoxID(boxID).forEach((_, key) => {
        connections.reset(key)
      })

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

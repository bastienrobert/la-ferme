import { Collection } from 'bookshelf'
import { GAME, PLAYER, ROUND } from '@la-ferme/shared/constants'
import { NOT_ALLOWED } from '@la-ferme/shared/errors'
import { characters, goals, skills } from '@la-ferme/shared/data'
import { GameStatusType } from '@la-ferme/shared/typings'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'
import Room from '@/app/models/Room'
import User from '@/app/models/User'
import Skill from '@/app/models/Skill'
import Player from '@/app/models/Player'

import { connections } from '@/app/stores'

import getAndSplice from '@/app/helpers/getAndSplice'
import formatPlayers from '@/app/helpers/formatPlayers'
import getPlayer from '@/app/helpers/getPlayer'

const resolvers = {
  GameStatusType: {
    start: GameStatusType.START,
    end: GameStatusType.END,
    report: GameStatusType.REPORT,
    ready: GameStatusType.READY,
    round: GameStatusType.ROUND,
    skill: GameStatusType.SKILL
  },
  GameStatus: {
    __resolveType({ type }) {
      switch (type) {
        case GameStatusType.END:
          return 'GameStatusWon'
        case GameStatusType.READY:
          return 'GameStatusReady'
        case GameStatusType.ROUND:
          return 'GameStatusRound'
        default:
          return 'GameStatusDefault'
      }
    }
  },
  Query: {
    async getReadyPlayers(_, { boxID }) {
      const room = await Room.findByBoxID(boxID)
      const game = await (await room.getLastGame()).fetch({
        withRelated: ['players', 'players.user']
      })

      const players = game.related<Player>('players') as Collection<Player>
      const formattedPlayers = await formatPlayers(players)

      return formattedPlayers
    }
  },
  Mutation: {
    // set game as ready
    async startGame(_, { userUUID, boxID }) {
      const room = await Room.findByBoxID(boxID)
      const lastGame = await room.getLastGame()
      const game = await lastGame.fetch({
        withRelated: ['creator', 'players', 'players.user']
      })

      const creator = game.related<User>('creator') as User
      if (creator.uuid !== userUUID) throw new Error(NOT_ALLOWED)
      game.start()
      await game.save()

      const players = game.related<Player>('players') as Collection<Player>

      const getCharacter = getAndSplice(characters)
      const getSkill = getAndSplice(goals)
      const getGoal = getAndSplice(skills)

      await Promise.all(
        players.map(async player => {
          const skill = new Skill({ type: getSkill() })
          skill.setPlayer(player.id)
          await skill.save()

          player.character = getCharacter()
          player.goal = getGoal()
          return player.save()
        })
      )

      const formattedPlayer = await formatPlayers(players)

      pubsub.publish(GAME.START, {
        gameUpdated: {
          type: GameStatusType.START,
          boxID,
          players: formattedPlayer
        }
      })

      return true
    },
    async stopGame(_, { winnerUUID, boxID }) {
      const room = await Room.findByBoxID(boxID)
      const lastGame = await room.getLastGame()

      // TODO
      // COMPUTE STATISTICS

      const [game, winnerUser] = await Promise.all([
        lastGame.fetch({
          withRelated: ['players', 'players.user']
        }),
        User.findByUUID(winnerUUID, {
          withRelated: [{ players: qb => qb.orderBy('created_at') }]
        })
      ])
      const winnerPlayer = getPlayer(winnerUser)

      game.winner = winnerPlayer.id
      await game.save()

      const players = game.related('players')
      const formattedPlayer = await formatPlayers(players)

      connections.getByBoxID(boxID).forEach((_, key) => {
        connections.reset(key)
      })

      pubsub.publish(GAME.STOP, {
        gameUpdated: {
          type: GameStatusType.END,
          boxID,
          winnerUUID,
          players: formattedPlayer
        }
      })

      return true
    }
  },
  Subscription: {
    gameUpdated: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator([
            GAME.START,
            GAME.STOP,
            PLAYER.READY,
            ROUND.UPDATE
          ]),
        ({ gameUpdated }, variables) => {
          return gameUpdated.boxID === variables.boxID
        }
      )
    }
  }
}

export default resolvers

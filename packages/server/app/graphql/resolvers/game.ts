import { Collection } from 'bookshelf'
import { GAME, PLAYER, ROUND } from '@la-ferme/shared/constants'
import { NOT_ALLOWED } from '@la-ferme/shared/errors'
import { characters, goals, skills } from '@la-ferme/shared/data'
import {
  GameStatusType,
  GameGlobalStatisticsName
} from '@la-ferme/shared/typings'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'
import Room from '@/app/models/Room'
import Game from '@/app/models/Game'
import User from '@/app/models/User'
import Skill from '@/app/models/Skill'
import Player from '@/app/models/Player'

import { connections } from '@/app/stores'
import getStatistics from '@/app/engine/getStatistics'

import getAndSplice from '@/app/helpers/getAndSplice'
import formatPlayers from '@/app/helpers/formatPlayers'

const resolvers = {
  GameStatusType: {
    start: GameStatusType.Start,
    end: GameStatusType.End,
    ready: GameStatusType.Ready,
    round: GameStatusType.Round
  },
  GameGlobalStatisticsName: {
    civil: GameGlobalStatisticsName.Civil,
    uncivil: GameGlobalStatisticsName.Uncivil
  },
  GameStatus: {
    __resolveType({ type }) {
      switch (type) {
        case GameStatusType.End:
          return 'GameStatusWon'
        case GameStatusType.Ready:
          return 'GameStatusReady'
        case GameStatusType.Round:
          return 'GameStatusRound'
        default:
          return 'GameStatusDefault'
      }
    }
  },
  Query: {
    async getReadyPlayers(_, { gameUUID }) {
      const game = await Game.findByUUID(gameUUID, {
        withRelated: ['players']
      })

      const players = game.related<Player>('players') as Collection<Player>
      const formattedPlayers = await formatPlayers(players)

      return formattedPlayers
    }
  },
  Mutation: {
    // set game as ready
    async startGame(_, { playerUUID }) {
      const player = await Player.findByUUID(playerUUID, {
        withRelated: [
          'user',
          'game',
          'game.creator',
          'game.players',
          'game.players.user'
        ]
      })

      const game = player.related('game') as Game
      const user = player.related('user') as User
      const creator = game.related('creator') as User

      if (creator.uuid !== user.uuid) throw new Error(NOT_ALLOWED)
      game.start()
      await game.save()

      const players = game.related('players') as Collection<Player>

      const getCharacter = getAndSplice(characters)
      const getSkill = getAndSplice(skills)
      const getGoal = getAndSplice(goals)

      await Promise.all(
        players.map(async p => {
          const skill = new Skill({
            player_id: p.id
          })
          skill.name = getSkill()
          await skill.save()

          p.character = getCharacter()
          p.goal = getGoal()

          return p.save()
        })
      )

      const formattedPlayer = await formatPlayers(players)

      pubsub.publish(GAME.START, {
        gameUpdated: {
          gameUUID: game.uuid,
          type: GameStatusType.Start,
          players: formattedPlayer
        }
      })

      return true
    },
    async stopGame(_, { winnerUUID }) {
      const winner = await Player.findByUUID(winnerUUID, {
        withRelated: ['game', 'game.room', 'game.players', 'game.players.user']
      })
      const game = winner.related('game') as Game
      const room = game.related('room') as Room

      game.winner = winner.id
      await game.save()

      const players = game.related('players') as Collection<Player>
      const statistics = await getStatistics(game, { players, winner })

      const [numberOfRounds, formattedPlayer] = await Promise.all([
        game.numberOfRounds(),
        formatPlayers(players)
      ])

      connections.getByBoxID(room.boxID).forEach((__, key) => {
        connections.reset(key)
      })

      pubsub.publish(GAME.STOP, {
        gameUpdated: {
          gameUUID: game.uuid,
          type: GameStatusType.End,
          numberOfRounds,
          winnerUUID,
          statistics,
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
          return gameUpdated.gameUUID === variables.gameUUID
        }
      )
    }
  }
}

export default resolvers

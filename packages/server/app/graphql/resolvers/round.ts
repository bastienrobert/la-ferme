import { Collection } from 'bookshelf'
import { ROUND } from '@la-ferme/shared/constants'
import { cards } from '@la-ferme/shared/data'
import {
  RoundChoice,
  RoundStep,
  GameStatusType,
  Round as RoundType
} from '@la-ferme/shared/typings'
import { NOT_ALLOWED } from '@la-ferme/shared/errors'

import pubsub from '@/app/pubsub'

import User from '@/app/models/User'
import Room from '@/app/models/Room'
import Round from '@/app/models/Round'
import Player from '@/app/models/Player'
import Game from '@/app/models/Game'

import { connections } from '@/app/stores'
import formatPlayers from '@/app/helpers/formatPlayers'
import getRandom from '@/app/helpers/getRandom'

const formatRound = async (round: Round, step): Promise<RoundType> => {
  const player = await round.player().fetch({ withRelated: ['user'] })
  const user = player.related('user') as User

  switch (step) {
    case RoundStep.CONFIRM:
      return {
        user: user.uuid,
        step: round.step,
        cards: {
          civil: round.civilCard,
          uncivil: round.uncivilCard
        },
        choice: round.choice
      }
    case RoundStep.CARD:
      return {
        user: user.uuid,
        step: round.step,
        cards: {
          civil: round.civilCard,
          uncivil: round.uncivilCard
        }
      }
    default:
      return {
        user: user.uuid,
        step: round.step
      }
  }
}

const getGame = async boxID => {
  const room = await Room.findByBoxID(boxID)
  const lastGame = await room.getLastGame()
  return await lastGame.fetch({
    withRelated: [{ players: qb => qb.orderBy('created_at') }, 'players.user']
  })
}

const getRounds = async (game: Game) => {
  return await game.rounds().orderBy('created_at').fetch()
}

const createRound = async (gameID, playerID) => {
  const civil = getRandom(cards.civil)
  const uncivil = getRandom(cards.uncivil)

  const round = new Round({
    game_id: gameID,
    player_id: playerID,
    civil_card: civil.name,
    uncivil_card: uncivil.name
  })
  return await round.save()
}

const publishRound = (boxID, { players, round, numberOfRounds }) => {
  pubsub.publish(ROUND.UPDATE, {
    gameUpdated: {
      type: GameStatusType.ROUND,
      boxID,
      numberOfRounds,
      players,
      round
    }
  })
}

const resolvers = {
  Round: {
    __resolveType({ step }) {
      switch (step) {
        case RoundStep.CONFIRM:
          return 'RoundStepConfirm'
        case RoundStep.CARD:
          return 'RoundStepCard'
        default:
          return 'RoundStepDefault'
      }
    }
  },
  RoundStep: {
    new: RoundStep.NEW,
    card: RoundStep.CARD,
    confirm: RoundStep.CONFIRM,
    complete: RoundStep.COMPLETE
  },
  RoundChoice: {
    civil: RoundChoice.CIVIL,
    uncivil: RoundChoice.UNCIVIL
  },
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
        const numberOfRounds = await game.numberOfRounds()
        const formattedRound = formatRound(round, RoundStep.NEW)
        publishRound(boxID, {
          players: formatPlayers(players),
          round: formattedRound,
          numberOfRounds
        })
      }

      return true
    },
    async confirmBoardRound(_, { boxID, userUUID }) {
      const game = await getGame(boxID)
      const rounds = await getRounds(game)
      const players = game.related('players') as Collection<Player>

      const lastRound = await rounds
        .last()
        .fetch({ withRelated: ['player', 'player.user'] })

      const player = lastRound.related('player') as Player
      const user = player.related('user') as User

      if (user.uuid !== userUUID) throw new Error(NOT_ALLOWED)

      const step = RoundStep.CARD
      lastRound.step = step
      await lastRound.save()

      const formattedRound = formatRound(lastRound, step)
      const numberOfRounds = await game.numberOfRounds()
      publishRound(boxID, {
        players: formatPlayers(players),
        round: formattedRound,
        numberOfRounds
      })
      return true
    },
    async setCardRound(_, { boxID, userUUID, choice }) {
      const game = await getGame(boxID)
      const rounds = await getRounds(game)
      const players = game.related('players') as Collection<Player>

      const lastRound = await rounds
        .last()
        .fetch({ withRelated: ['player', 'player.user'] })

      const player = lastRound.related('player') as Player
      const user = player.related('user') as User

      if (user.uuid !== userUUID) throw new Error(NOT_ALLOWED)

      const step = RoundStep.CONFIRM
      lastRound.step = step
      lastRound.choice = choice
      await lastRound.save()

      const formattedRound = formatRound(lastRound, step)
      const numberOfRounds = await game.numberOfRounds()
      publishRound(boxID, {
        players: formatPlayers(players),
        round: formattedRound,
        numberOfRounds
      })
      return true
    },
    // set a round status with given infos
    async completeCardRound(_, { boxID, userUUID }) {
      const game = await getGame(boxID)
      const rounds = await getRounds(game)
      const players = game.related('players') as Collection<Player>

      const lastRound = await rounds
        .last()
        .fetch({ withRelated: ['player', 'player.user'] })

      const player = lastRound.related('player') as Player
      const user = player.related('user') as User

      if (user.uuid !== userUUID) throw new Error(NOT_ALLOWED)

      lastRound.step = RoundStep.COMPLETE

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
      const numberOfRounds = await game.numberOfRounds()
      const formattedRound = formatRound(round, RoundStep.NEW)
      publishRound(boxID, {
        players: formatPlayers(players),
        round: formattedRound,
        numberOfRounds
      })

      return true
    }
  }
}

export default resolvers

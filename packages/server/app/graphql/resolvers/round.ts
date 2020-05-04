import { Collection } from 'bookshelf'
import { ROUND } from '@la-ferme/shared/constants'
import { cards } from '@la-ferme/shared/data'
import {
  RoundChoice,
  RoundStep,
  GameStatusType
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

const formatRound = async round => {
  const player = await round.player().fetch({ withRelated: ['user'] })
  const user = player.related('user') as User

  return {
    user: user.uuid,
    step: round.step
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
  const civil = cards.civil[Math.floor(Math.random() * cards.civil.length)]
  const uncivil =
    cards.uncivil[Math.floor(Math.random() * cards.uncivil.length)]

  const round = new Round({
    game_id: gameID,
    player_id: playerID,
    civil_card: civil.name,
    uncivil_card: uncivil.name
  })
  return await round.save()
}

const publishRound = (boxID, { players, round }) => {
  pubsub.publish(ROUND.UPDATE, {
    gameUpdated: {
      type: GameStatusType.ROUND,
      boxID,
      players,
      round
    }
  })
}

const resolvers = {
  RoundStep: {
    new: RoundStep.NEW,
    board: RoundStep.BOARD,
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
        const formattedRound = await formatRound(round)
        publishRound(boxID, {
          players: formatPlayers(players),
          round: formattedRound
        })
      }

      return true
    },
    // set a round status with given infos
    async setRound(_, { boxID, userUUID, choice, step }) {
      const game = await getGame(boxID)
      const rounds = await getRounds(game)
      const players = game.related('players') as Collection<Player>

      const lastRound = await rounds
        .last()
        .fetch({ withRelated: ['player', 'player.user'] })

      const player = lastRound.related('player') as Player
      const user = player.related('user') as User

      if (user.uuid !== userUUID) throw new Error(NOT_ALLOWED)

      lastRound.step = step

      if (step === RoundStep.BOARD) {
        await lastRound.save()
        const formattedRound = formatRound(lastRound)
        publishRound(boxID, {
          players: formatPlayers(players),
          round: formattedRound
        })
        return true
      } else {
        const serializedPlayers = players.serialize()
        const nextPlayerIndex =
          (serializedPlayers.findIndex(p => p.id === player.id) + 1) %
          players.length
        const nextPlayer = players.at(nextPlayerIndex)

        lastRound.choice = choice

        console.log('ROUND CHOICE', choice)

        // check events before creating round to assign it to the good person
        // get events from Game.events() WHERE status IS NEW AND WHERE player IS nextPlayer
        const [round] = await Promise.all([
          createRound(game.id, nextPlayer.id),
          lastRound.save()
        ])
        const formattedRound = formatRound(round)
        publishRound(boxID, {
          players: formatPlayers(players),
          round: formattedRound
        })

        return true
      }
    }
  }
}

export default resolvers

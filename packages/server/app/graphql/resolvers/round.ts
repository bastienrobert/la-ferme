import { Collection } from 'bookshelf'
import { ROUND } from '@la-ferme/shared/constants'
import { cards } from '@la-ferme/shared/data'
import {
  RoundChoice,
  RoundStep,
  GameStatusType,
  UUID,
  Card
} from '@la-ferme/shared/typings'
import { NOT_ALLOWED } from '@la-ferme/shared/errors'

import pubsub from '@/app/pubsub'

import User from '@/app/models/User'
import Room from '@/app/models/Room'
import Round from '@/app/models/Round'
import Player from '@/app/models/Player'
import Game from '@/app/models/Game'

import { connections } from '@/app/stores'
import getRoundData from '@/app/engine/getRoundData'
import setReports from '@/app/engine/setReports'
import getNextPlayer from '@/app/engine/getNextPlayer'
import roundShouldWatch from '@/app/engine/roundShouldWatch'

import formatPlayers from '@/app/helpers/formatPlayers'
import getRandom from '@/app/helpers/getRandom'
import {
  getChosenCardFromRound,
  getChosenCard
} from '@/app/helpers/getChosenCard'
import checkReports from '@/app/engine/checkReports'
import RoundTarget from '@/app/models/RoundTarget'

interface SaveTargetsParams {
  card: Card
  player: Player
  round: Round
}

const createRound = async (gameID: UUID, playerID: UUID) => {
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

const publishRound = (gameUUID: UUID, { players, round, numberOfRounds }) => {
  pubsub.publish(ROUND.UPDATE, {
    gameUpdated: {
      gameUUID,
      type: GameStatusType.Round,
      numberOfRounds,
      players,
      round
    }
  })
}

const getPlayerData = async playerUUID => {
  const player = await Player.findByUUID(playerUUID, {
    withRelated: [
      'game',
      'rounds',
      {
        'game.rounds': qb => qb.orderBy('created_at'),
        'game.players': qb => qb.orderBy('created_at')
      }
    ]
  })

  const game = player.related('game') as Game
  const rounds = player.related('rounds') as Collection<Round>
  const players = game.related('players') as Collection<Player>

  const lastRound = await rounds.last().fetch({ withRelated: ['player'] })
  const lastRoundPlayer = lastRound.related('player') as Player

  if (playerUUID !== lastRoundPlayer.uuid) throw new Error(NOT_ALLOWED)

  return {
    player,
    game,
    rounds,
    players,
    lastRound
  }
}

const createTarget = async (player: Player, round: Round) => {
  const roundTarget = new RoundTarget({
    player_id: player.id,
    round_id: round.id
  })
  return roundTarget.save()
}

const saveTargets = async (
  targets: UUID[],
  { round, player, card }: SaveTargetsParams
) => {
  return card.reward.params?.self
    ? createTarget(player, round)
    : Promise.all(
        targets.map(async target => {
          const p = await Player.findByUUID(target)
          return createTarget(p, round)
        })
      )
}

const resolvers = {
  Round: {
    __resolveType({ step }) {
      switch (step) {
        case RoundStep.Confirm:
          return 'RoundStepConfirm'
        case RoundStep.Card:
          return 'RoundStepCard'
        default:
          return 'RoundStepDefault'
      }
    }
  },
  RoundStep: {
    new: RoundStep.New,
    card: RoundStep.Card,
    confirm: RoundStep.Confirm,
    complete: RoundStep.Complete
  },
  RoundChoice: {
    civil: RoundChoice.Civil,
    uncivil: RoundChoice.Uncivil
  },
  Mutation: {
    // user in the game
    async readyForRound(_, { playerUUID }) {
      const player = await Player.findByUUID(playerUUID, {
        withRelated: [
          'user',
          'game',
          'game.room',
          { 'game.players': qb => qb.orderBy('created_at') }
        ]
      })
      const user = player.related('user') as User
      const game = player.related('game') as Game
      const room = game.related('room') as Room

      connections.setReady(user.uuid)

      const users = connections.getByBoxID(room.boxID)
      const everyBodyIsReady = Array.from(users).every(
        ({ 1: val }) => val.ready === true
      )

      if (everyBodyIsReady) {
        const players = game.related('players') as Collection<Player>
        const firstPlayer = players.first()
        const round = await createRound(game.id, firstPlayer.id)
        const numberOfRounds = await game.numberOfRounds()
        const formattedRound = await getRoundData(round, RoundStep.New)
        publishRound(game.uuid, {
          players: formatPlayers(players),
          round: formattedRound,
          numberOfRounds
        })
      }

      return true
    },
    async confirmBoardRound(_, { playerUUID }) {
      const { game, players, lastRound } = await getPlayerData(playerUUID)

      const step = RoundStep.Card
      lastRound.step = step
      await lastRound.save()

      const formattedRound = await getRoundData(lastRound, step)
      const numberOfRounds = await game.numberOfRounds()
      publishRound(game.uuid, {
        players: formatPlayers(players),
        round: formattedRound,
        numberOfRounds
      })
      return true
    },
    async setCardRound(_, { playerUUID, choice, targets }) {
      const { game, player, players, lastRound } = await getPlayerData(
        playerUUID
      )

      const lastChoosenCard = getChosenCard(
        { civil: lastRound.civilCard, uncivil: lastRound.uncivilCard },
        choice
      )

      player.increase(lastChoosenCard.reward.score)

      const step = RoundStep.Confirm
      lastRound.step = step
      lastRound.choice = choice

      await Promise.all([
        player.save(),
        lastRound.save(),
        saveTargets(targets, {
          player,
          round: lastRound,
          card: lastChoosenCard
        })
      ])

      setReports({
        game,
        player,
        delta: lastChoosenCard.reward.score
      })

      const formattedRound = await getRoundData(lastRound, step)
      const numberOfRounds = await game.numberOfRounds()

      publishRound(game.uuid, {
        players: formatPlayers(players),
        round: formattedRound,
        numberOfRounds
      })

      return true
    },
    // set a round status with given infos
    async completeCardRound(_, { playerUUID }) {
      const { game, player, players, lastRound } = await getPlayerData(
        playerUUID
      )

      const lastChoosenCard = getChosenCardFromRound(lastRound)

      lastRound.step = RoundStep.Complete
      lastRound.watch = roundShouldWatch(lastChoosenCard)
      await lastRound.save()

      const nextPlayer = await getNextPlayer(players, player)

      const round = await createRound(game.id, nextPlayer.id)
      const numberOfRounds = await game.numberOfRounds()
      const formattedRound = await getRoundData(round, RoundStep.New)

      checkReports(game.uuid, { game })

      publishRound(game.uuid, {
        players: formatPlayers(players),
        round: formattedRound,
        numberOfRounds
      })

      return true
    }
  }
}

export default resolvers

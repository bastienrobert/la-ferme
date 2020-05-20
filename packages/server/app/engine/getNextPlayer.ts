import { Collection } from 'bookshelf'
import { CardRewardType } from '@la-ferme/shared/typings'

import Player from '@/app/models/Player'
import Game from '@/app/models/Game'
import Round, { RoundType } from '@/app/models/Round'
import RoundTarget, { RoundTargetStatus } from '@/app/models/RoundTarget'

import checkUnwatch from './checkUnwatch'
import { getChosenCardFromRound } from '@/app/helpers/getChosenCard'

const generatePassedRound = async (player: Player) => {
  const game = (await player.game().fetch()) as Game
  const round = new Round({
    game_id: game.id,
    player_id: player.id,
    type: RoundType.Pass
  })
  return await round.save()
}

const activeTargetAction = async (player: Player, round: Round) => {
  const card = getChosenCardFromRound(round)

  // if it's return null, player is not allowed to play
  switch (card.reward.type) {
    case CardRewardType.LoseRound:
      await generatePassedRound(player)
      return null
    default:
      return player
  }
}

const getReversed = async (player: Player) => {
  const rounds = (await player
    .rounds()
    .where({ watch: true }, false)
    .orderBy('created_at')
    .fetch({
      withRelated: [
        // @ts-ignore
        {
          targets: qb => qb.where({ status: RoundTargetStatus.Reversed })
        }
      ]
    })) as Collection<Round>

  const targets: Collection<RoundTarget>[] = rounds.reduce((acc, round) => {
    const related = round.related('targets')
    const length = related.serialize().length
    return length > 0 ? acc.concat(related) : acc
  }, [])

  if (targets.length <= 0) return
  return targets[0].first()
}

const getTargeted = async (player: Player) => {
  const targetted = await player
    .targetted()
    .where({ status: RoundTargetStatus.New }, false)
    .fetch({
      withRelated: ['round']
    })

  const ordered = targetted.orderBy('round.created_at') as Collection<RoundTarget> // prettier-ignore
  return ordered.first()
}

const isAbleToPlay = async (player: Player) => {
  const reversed = await getReversed(player)
  const targetted = await getTargeted(player)
  const target = reversed || targetted

  if (target) {
    target.status = RoundTargetStatus.Completed
    await target.save()

    const round = await target.round().fetch()
    await checkUnwatch(round)

    return await activeTargetAction(player, round)
  }

  return player
}

const checkIfCurrentPlayerReplay = async (player: Player) => {
  const skill = await player.skill().fetch()
  const ability = skill.name === 'happy' && skill.using
  skill.complete().save()
  return ability
}

export default async (
  players: Collection<Player>,
  current: Player
): Promise<Player> => {
  const serializedPlayers = players.serialize()
  const currentIndex = serializedPlayers.findIndex(p => p.id === current.id)

  const replay = await checkIfCurrentPlayerReplay(current)
  if (replay) return current

  let indexOffset = 1
  let nextPlayer = null
  do {
    const index = (currentIndex + indexOffset) % serializedPlayers.length
    nextPlayer = await isAbleToPlay(players.at(index))

    indexOffset++
  } while (!nextPlayer)

  return nextPlayer
}

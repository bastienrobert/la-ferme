import { Collection } from 'bookshelf'
import {
  StatisticName,
  GameStatistics,
  GameGlobalStatistics,
  GameGlobalStatisticsName,
  ReportStatus,
  RoundChoice,
  PlayerUUIDWithStatistic
} from '@la-ferme/shared/typings'

import Game from '@/app/models/Game'
import Player from '@/app/models/Player'
import Skill from '@/app/models/Skill'

interface GetStatisticNameFromPlayerOptions {
  winner: Player
  mostTargettedPlayer: Player
}

const getStatisticNameFromPlayer = async (
  player: Player,
  { winner, mostTargettedPlayer }: GetStatisticNameFromPlayerOptions
): Promise<StatisticName> => {
  if (player.uuid === winner) {
    return player.score < 0 ? 'nasty-winner' : 'nice-winner'
  }

  if (player.uuid === mostTargettedPlayer.uuid) {
    return 'targeted-uncivil'
  }

  const skill = await player.skill().fetch()
  if (skill.usable) 'unused-skill'

  const reportCount = Number(
    await player
      .receivedReports()
      .where({ status: ReportStatus.Completed }, false)
      .count()
  )
  if (reportCount > 0) return 'brigade-call'

  if (player.score < -1) return 'most-uncivil'
  else if (player.score > 1) return 'most-civil'

  return 'moderate'
}

const getGlobalStatistics = async (
  game: Game,
  playersStatistics: PlayerUUIDWithStatistic[]
): Promise<GameGlobalStatistics> => {
  const avg = await game.averageScore()
  const name =
    avg > 0 ? GameGlobalStatisticsName.Civil : GameGlobalStatisticsName.Uncivil

  const sum = playersStatistics.reduce(
    (acc, p) => {
      acc.civil += p.civil
      acc.uncivil += p.uncivil
      acc.reports += p.reports
      acc.skill += p.skill
      return acc
    },
    {
      civil: 0,
      uncivil: 0,
      reports: 0,
      skill: 0
    }
  )

  return {
    name,
    ...sum
  }
}

export interface GetStatisticsOptions {
  players: Collection<Player>
  winner: Player
}

export default async (
  game: Game,
  { players, winner }: GetStatisticsOptions
): Promise<GameStatistics> => {
  const targettedPlayer = await Promise.all(
    players.map(async player => {
      if (player.uuid === winner) return { player, count: 0 }
      const count = Number(await player.targeted().count())
      return { player, count }
    })
  )
  const mostTargettedPlayer = targettedPlayer.sort(
    (a, b) => a.count - b.count
  )[0].player

  const playersStatistics = await Promise.all(
    players.map(async p => {
      const player = await p.fetch({ withRelated: ['reports', 'skill'] })
      const name = await getStatisticNameFromPlayer(player, {
        winner,
        mostTargettedPlayer
      })

      const civil = Number(
        await player
          .rounds()
          .where({ choice: RoundChoice.Civil }, false)
          .count()
      )
      const uncivil = Number(
        await player
          .rounds()
          .where({ choice: RoundChoice.Uncivil }, false)
          .count()
      )

      const reports = Number(await player.related('reports').count())
      const skill = (player.related('skill') as Skill).usable ? 0 : 1

      return {
        player: player.uuid,
        name,
        reports,
        skill,
        civil,
        uncivil
      }
    })
  )

  const globalStatistics = await getGlobalStatistics(game, playersStatistics)

  return {
    players: playersStatistics,
    global: globalStatistics
  }
}

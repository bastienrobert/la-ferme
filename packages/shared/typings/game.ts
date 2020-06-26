import { UUID } from './scalars'
import { Player } from './player'

export enum GameStatusType {
  Start = 'start',
  End = 'end',
  Ready = 'ready',
  Round = 'round'
}

export interface GameStatus {
  type: GameStatusType
  players: Player[]
}

export type StatisticName =
  | 'nice-winner'
  | 'nasty-winner'
  | 'most-civil'
  | 'moderate'
  | 'most-uncivil'
  | 'targeted-uncivil'
  | 'brigade-call'
  | 'unused-skill'

export interface CommonStatistics {
  civil: number
  uncivil: number
  reports: number
  skill: number
}

export interface PlayerUUIDWithStatistic extends CommonStatistics {
  name: StatisticName
  player: UUID
}

export enum GameGlobalStatisticsName {
  Civil = 'civil',
  Uncivil = 'uncivil'
}

export interface GameGlobalStatistics extends CommonStatistics {
  name: GameGlobalStatisticsName
}

export interface GameStatistics {
  players: PlayerUUIDWithStatistic[]
  global: GameGlobalStatistics
}

export interface Statistic {
  name: StatisticName
  displayName: string
  text: string
}

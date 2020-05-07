export type UUID = string & { readonly _: unique symbol }

export enum Gender {
  Male = 1,
  Female = 2
}

export interface User {
  uuid: UUID
  exists?: boolean
}

export interface Player {
  uuid: UUID
  ready: boolean
  character?: string
  skill?: string
  goal?: string
}

export interface Character {
  name: string
  color: string
  secondaryColor: string
  displayName: string
  description: string
  gender: Gender
  text: string
}

export interface Goal {
  name: string
  displayName: string
  description: string
  text: string
}

export interface Skill {
  name: string
  displayName: string
  description: string
  text: string
  effect: string
}

export enum CardRewardType {
  Turn = 'turn',
  Backward = 'backward',
  Forward = 'forward',
  Restart = 'restart',
  LoseRound = 'lose_round',
  SwichPlace = 'swich_place'
}

export interface CardRewardParams {
  self?: boolean
  cases?: number
  target?: number
}

export interface CardReward {
  type: CardRewardType
  text: string
  score: number
  params?: CardRewardParams
}

export interface Card {
  name: string
  displayName: string
  text: string
  reward: CardReward
}

export interface RoundCards {
  civil: string
  uncivil: string
}

export interface Round {
  player: UUID
  step: RoundStep
  cards?: RoundCards
  choice?: string
  targets?: UUID[]
}

export enum RoundStep {
  New = 'new',
  Card = 'card',
  Confirm = 'confirm',
  Complete = 'complete'
}

export enum RoundChoice {
  Civil = 'civil',
  Uncivil = 'uncivil'
}

export enum GameStatusType {
  Start = 'start',
  End = 'end',
  Ready = 'ready',
  Round = 'round'
}

export enum EventType {
  TurnLose = 'turn_lose',
  Replay = 'replay',
  ReportAll = 'report_all',
  Report = 'report',
  Skill = 'skill',
  MiniGame = 'mini_game'
}

export interface GameStatus {
  type: GameStatusType
  players: Player[]
}

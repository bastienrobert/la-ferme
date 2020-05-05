export type UUID = string & { readonly _: unique symbol }

export enum Gender {
  MALE = 1,
  FEMALE = 2
}

export interface User {
  uuid: UUID
  exists?: boolean
}

export interface Player {
  user: UUID
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

export interface CardRewardParams {
  cases?: number
  target?: number
}

export interface CardReward {
  type: string
  text: string
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
  user: UUID
  step: RoundStep
  cards?: RoundCards
  choice?: string
}

export enum RoundStep {
  NEW = 'new',
  CARD = 'card',
  CONFIRM = 'confirm',
  COMPLETE = 'complete'
}

export enum RoundChoice {
  CIVIL = 'civil',
  UNCIVIL = 'uncivil'
}

export enum GameStatusType {
  START = 'start',
  END = 'end',
  REPORT = 'report',
  READY = 'ready',
  ROUND = 'round',
  SKILL = 'skill'
}

export interface GameStatus {
  type: GameStatusType
  players: Player[]
}

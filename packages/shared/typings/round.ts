import { UUID } from './scalars'

export interface RoundCards {
  civil: string
  uncivil: string
}

export interface Round {
  player: UUID
  step: RoundStep
  cards?: RoundCards
  choice?: RoundChoice
  targets?: UUID[]
}

export enum RoundStep {
  New = 'NEW',
  Card = 'CARD',
  Target = 'TARGET',
  Confirm = 'CONFIRM',
  Complete = 'COMPLETE'
}

export enum RoundChoice {
  Civil = 'CIVIL',
  Uncivil = 'UNCIVIL'
}

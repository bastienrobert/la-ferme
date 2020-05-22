import { UUID } from './scalars'

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

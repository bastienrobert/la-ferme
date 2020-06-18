import { UUID } from './scalars'

export enum Gender {
  Male = 1,
  Female = 2
}

export interface Player {
  uuid: UUID
  ready?: boolean
  character?: string
  skill?: string
  goal?: string
}

export interface Character {
  name: string
  color: string
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

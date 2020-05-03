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

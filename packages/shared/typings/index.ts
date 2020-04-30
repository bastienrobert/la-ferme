export type UUID = string & { readonly _: unique symbol }

export interface User {
  uuid: UUID
  exists?: boolean
}

export interface Player {
  user: UUID
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

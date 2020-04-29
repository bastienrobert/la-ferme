export type UUID = string & { readonly _: unique symbol }

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

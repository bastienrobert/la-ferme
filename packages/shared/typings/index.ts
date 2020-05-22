import { UUID } from './scalars'

export * from './scalars'
export * from './card'
export * from './game'
export * from './round'
export * from './player'
export * from './event'

export interface User {
  uuid: UUID
  exists?: boolean
}

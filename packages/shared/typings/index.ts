import { UUID } from './scalars'

export * from './scalars'
export * from './card'
export * from './game'
export * from './round'
export * from './player'
export * from './event'

export type Locale = 'fr'

export interface User {
  uuid: UUID
  exists?: boolean
}

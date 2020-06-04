import { Player } from './player'

export enum GameStatusType {
  Start = 'start',
  End = 'end',
  Ready = 'ready',
  Round = 'round'
}

export interface GameStatus {
  type: GameStatusType
  players: Player[]
}

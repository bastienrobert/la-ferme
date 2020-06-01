export enum CardRewardType {
  Turn = 'turn',
  Backward = 'backward',
  Forward = 'forward',
  Restart = 'restart',
  LoseRound = 'lose_round',
  SwichPlace = 'swich_place'
}

export interface CardRewardParams {
  self?: boolean
  cases?: number
  target?: number
}

export interface CardReward {
  type: CardRewardType
  text: string
  score: number
  params?: CardRewardParams
}

export interface Card {
  name: string
  displayName: string
  playerText: string
  viewerText: string
  reward: CardReward
}

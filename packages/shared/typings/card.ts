export enum CardRewardType {
  Turn = 1,
  Backward,
  Forward,
  Restart,
  LoseRound,
  SwichPlace
}

export interface CardRewardParams {
  self?: boolean
  cases?: number
  target?: number
}

export interface CardReward {
  type: CardRewardType
  playerText: string
  viewerText: string
  score: number
  params?: CardRewardParams
}

export interface Card {
  name: string
  displayName: string
  playerText: string
  viewerText: string
  effect?: string
  reward: CardReward
}

export enum EventType {
  Regularization = 'REGULARIZATION',
  Report = 'REPORT',
  Skill = 'SKILL',
  MiniGame = 'MINI_GAME',
  MiniGameScore = 'MINI_GAME_SCORE'
}

export enum ReportStatus {
  New = 'NEW',
  Confirmed = 'CONFIRMED',
  Duplicated = 'DUPLICATED',
  Reversed = 'REVERSED',
  Completed = 'COMPLETED',
  Canceled = 'CANCELED'
}

export enum RegularizationName {
  Reward = 'REWARD',
  Penalty = 'PENALTY'
}

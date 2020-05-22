export enum EventType {
  TurnLose = 'turn_lose',
  Replay = 'replay',
  Regularization = 'regularization',
  Report = 'report',
  Skill = 'skill',
  MiniGame = 'mini_game'
}

export enum ReportStatus {
  New = 'new',
  Confirmed = 'confirmed',
  Duplicated = 'duplicated',
  Reversed = 'reversed',
  Completed = 'completed'
}

export enum RegularizationName {
  Reward = 'reward',
  Penalty = 'penalty'
}

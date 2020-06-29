// party can't start if player number under
export const MIN_PLAYERS = 2
// user can't enter in room if player number upper
export const MAX_PLAYERS = 4

// confirm report if report score is under
export const CONFIRM_REPORT = -2
// reverse report if report score is upper
export const REVERSE_REPORT = 2
// cancel report if report score is upper
export const MAX_ROUNDS_REPORT = 3

// regularization penalty if avg score is under
export const PENALTY_SCORE = -1.5
// regularization reward if avg score is upper
export const REWARD_SCORE = 1.5

// nasty-winner reward if < to this score
// nice-winner either
export const NASTY_WINNER_SCORE = 0
// most uncivil reward < to this score
export const MOST_UNCIVIL_SCORE = -1
// most civil reward > to this score
export const MOST_CIVIL_SCORE = 1

// prevent mini-games in the first X rounds
export const MINI_GAME_FROM_NUMBER_OF_ROUND = 3

// mini game will be create on average every X rounds
export const MINI_GAME_AVG_ROUND_COUNT = 15

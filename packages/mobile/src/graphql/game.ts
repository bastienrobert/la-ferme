import gql from 'graphql-tag'

const START_GAME_MUTATION = gql`
  mutation StartGame($userUUID: UUID!, $boxID: UUID!) {
    startGame(boxID: $boxID, userUUID: $userUUID)
  }
`

const STOP_GAME_MUTATION = gql`
  mutation StopGame($winnerUUID: UUID!, $boxID: UUID!) {
    stopGame(boxID: $boxID, winnerUUID: $winnerUUID)
  }
`

const GAME_STATUS_SUBSCRIPTION = gql`
  subscription GameStatus($boxID: UUID!) {
    gameStatus(boxID: $boxID) {
      winnerUUID
      players {
        user
        character
        skill
        goal
      }
    }
  }
`

export { START_GAME_MUTATION, STOP_GAME_MUTATION, GAME_STATUS_SUBSCRIPTION }

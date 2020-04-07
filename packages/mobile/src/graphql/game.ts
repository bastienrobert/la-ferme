import gql from 'graphql-tag'

const START_GAME_MUTATION = gql`
  mutation StartGame($userUUID: UUID!, $boxID: UUID!) {
    startGame(boxID: $boxID, userUUID: $userUUID)
  }
`

const GAME_STARTED_SUBSCRIPTION = gql`
  subscription GameStarted($boxID: UUID!) {
    gameStarted(boxID: $boxID) {
      players {
        user
        character
        skill
        goal
      }
    }
  }
`

export { START_GAME_MUTATION, GAME_STARTED_SUBSCRIPTION }

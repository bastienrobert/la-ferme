import gql from 'graphql-tag'
import { fragments as playerFragments } from './player'

const READY_PLAYERS_QUERY = gql`
  query GetReadyPlayers($boxID: UUID!) {
    getReadyPlayers(boxID: $boxID) {
      ...PlayerInfos
    }
  }
  ${playerFragments.playerInfos}
`

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
      players {
        user
        character
        skill
        goal
      }
      ... on WonGame {
        winnerUUID
      }
    }
  }
`

export {
  READY_PLAYERS_QUERY,
  START_GAME_MUTATION,
  STOP_GAME_MUTATION,
  GAME_STATUS_SUBSCRIPTION
}

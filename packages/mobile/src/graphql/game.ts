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

const GAME_UPDATED_SUBSCRIPTION = gql`
  subscription GameUpdated($boxID: UUID!) {
    gameUpdated(boxID: $boxID) {
      type
      players {
        user
        character
        skill
        goal
      }
      ... on GameStatusWon {
        winnerUUID
      }
      ... on GameStatusReady {
        players {
          ready
        }
      }
      ... on GameStatusRound {
        round {
          user
          step
        }
      }
    }
  }
`

export {
  READY_PLAYERS_QUERY,
  START_GAME_MUTATION,
  STOP_GAME_MUTATION,
  GAME_UPDATED_SUBSCRIPTION
}

import gql from 'graphql-tag'
import { fragments as playerFragments } from './player'

const READY_PLAYERS_QUERY = gql`
  query GetReadyPlayers($gameUUID: UUID!) {
    getReadyPlayers(gameUUID: $gameUUID) {
      ...PlayerInfos
    }
  }
  ${playerFragments.playerInfos}
`

const START_GAME_MUTATION = gql`
  mutation StartGame($playerUUID: UUID!) {
    startGame(playerUUID: $playerUUID)
  }
`

const STOP_GAME_MUTATION = gql`
  mutation StopGame($winnerUUID: UUID!) {
    stopGame(winnerUUID: $winnerUUID)
  }
`

const GAME_UPDATED_SUBSCRIPTION = gql`
  subscription GameUpdated($gameUUID: UUID!) {
    gameUpdated(gameUUID: $gameUUID) {
      type
      players {
        uuid
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
        numberOfRounds
        round {
          player
          step
          ... on RoundStepCard {
            cards {
              civil
              uncivil
            }
          }
          ... on RoundStepConfirm {
            choice
            targets
            cards {
              civil
              uncivil
            }
          }
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

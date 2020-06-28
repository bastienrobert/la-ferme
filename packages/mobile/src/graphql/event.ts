import gql from 'graphql-tag'

const EVENT_TRIGGERED_SUBSCRIPTION = gql`
  subscription EventTriggered($gameUUID: UUID!) {
    eventTriggered(gameUUID: $gameUUID) {
      type
      ... on EventSkill {
        skill
        player
        targets
      }
      ... on EventReport {
        status
        targets
      }
      ... on EventRegularization {
        name
      }
      ... on EventMiniGame {
        name
        miniGameUUID
      }
      ... on EventMiniGameScore {
        gameUUID
        name
        winner
        miniGameUUID
      }
    }
  }
`

export { EVENT_TRIGGERED_SUBSCRIPTION }

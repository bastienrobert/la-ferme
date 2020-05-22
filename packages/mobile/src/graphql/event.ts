import gql from 'graphql-tag'

const EVENT_TRIGGERED_SUBSCRIPTION = gql`
  subscription EventTriggered($gameUUID: UUID!) {
    eventTriggered(gameUUID: $gameUUID) {
      type
      player
      ... on EventSkill {
        skill
        targets
      }
      ... on EventReport {
        status
      }
    }
  }
`

export { EVENT_TRIGGERED_SUBSCRIPTION }

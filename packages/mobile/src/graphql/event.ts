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
        player
        status
      }
      ... on EventRegularization {
        name
      }
    }
  }
`

export { EVENT_TRIGGERED_SUBSCRIPTION }

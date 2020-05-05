import gql from 'graphql-tag'

const EVENT_TRIGGERED_SUBSCRIPTION = gql`
  subscription EventTriggered($boxID: UUID!) {
    eventTriggered(boxID: $boxID) {
      type
    }
  }
`

export { EVENT_TRIGGERED_SUBSCRIPTION }

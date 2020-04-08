import gql from 'graphql-tag'

const READY_FOR_ROUND_MUTATION = gql`
  mutation ReadyForRound($userUUID: UUID!, $boxID: UUID!) {
    readyForRound(userUUID: $userUUID, boxID: $boxID)
  }
`

const PUSH_ROUND_MUTATION = gql`
  mutation PushRound($userUUID: UUID!, $boxID: UUID!) {
    pushRound(userUUID: $userUUID, boxID: $boxID)
  }
`

const NEW_ROUND_SUBSCRIPTION = gql`
  subscription NewRound($boxID: UUID!) {
    newRound(boxID: $boxID) {
      round {
        user
      }
    }
  }
`

export { READY_FOR_ROUND_MUTATION, PUSH_ROUND_MUTATION, NEW_ROUND_SUBSCRIPTION }

import gql from 'graphql-tag'

const READY_FOR_ROUND_MUTATION = gql`
  mutation ReadyForRound($userUUID: UUID!, $boxID: UUID!) {
    readyForRound(userUUID: $userUUID, boxID: $boxID)
  }
`

const SET_ROUND_MUTATION = gql`
  mutation SetRound(
    $userUUID: UUID!
    $boxID: UUID!
    $step: RoundStep!
    $choice: RoundChoice
  ) {
    setRound(userUUID: $userUUID, boxID: $boxID, step: $step, choice: $choice)
  }
`

const ROUND_UPDATED_SUBSCRIPTION = gql`
  subscription RoundUpdated($boxID: UUID!) {
    roundUpdated(boxID: $boxID) {
      round {
        user
        step
      }
    }
  }
`

export {
  READY_FOR_ROUND_MUTATION,
  SET_ROUND_MUTATION,
  ROUND_UPDATED_SUBSCRIPTION
}

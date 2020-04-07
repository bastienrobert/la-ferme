import gql from 'graphql-tag'

const PLAYER_READY_MUTATION = gql`
  mutation PlayerReady($userUUID: UUID!, $boxID: UUID!) {
    playerReady(boxID: $boxID, userUUID: $userUUID)
  }
`

const PLAYER_IS_READY_SUBSCRIPTION = gql`
  subscription PlayerIsReady($boxID: UUID!) {
    playerIsReady(boxID: $boxID) {
      players {
        user
        character
        skill
        goal
        ready
      }
    }
  }
`

export { PLAYER_READY_MUTATION, PLAYER_IS_READY_SUBSCRIPTION }

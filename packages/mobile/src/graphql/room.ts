import gql from 'graphql-tag'
import { fragments as userFragments } from './user'

const ROOM_USERS_QUERY = gql`
  query ConnectedUsers($boxID: UUID!) {
    connectedUsers(boxID: $boxID) {
      users {
        ...UserUUID
      }
    }
  }
  ${userFragments.userUUID}
`

const ROOM_JOIN_MUTATION = gql`
  mutation JoinRoom($userUUID: UUID!, $boxID: UUID!) {
    joinRoom(userUUID: $userUUID, boxID: $boxID)
  }
`

const ROOM_USERS_SUBSCRIPTION = gql`
  subscription ConnectedUsers($boxID: UUID!) {
    connectedUsers(boxID: $boxID) {
      boxID
      users {
        ...UserUUID
      }
    }
  }
  ${userFragments.userUUID}
`

export { ROOM_USERS_QUERY, ROOM_JOIN_MUTATION, ROOM_USERS_SUBSCRIPTION }

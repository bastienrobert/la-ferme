import gql from 'graphql-tag'
import { fragments as userFragments } from './user'

const ROOM_JOIN_MUTATION = gql`
  mutation JoinRoom($userUUID: UUID!, $boxID: UUID!) {
    joinRoom(userUUID: $userUUID, boxID: $boxID) {
      boxID
      creatorUUID
      playerUUID
      gameUUID
      users {
        ...UserUUID
      }
    }
  }
  ${userFragments.userUUID}
`

const NEW_USER_IN_ROOM_SUBSCRIPTION = gql`
  subscription ConnectedUsers($boxID: UUID!) {
    connectedUsers(boxID: $boxID) {
      users {
        ...UserUUID
      }
    }
  }
  ${userFragments.userUUID}
`

export { ROOM_JOIN_MUTATION, NEW_USER_IN_ROOM_SUBSCRIPTION }

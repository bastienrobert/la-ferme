import gql from 'graphql-tag'
import { fragments as userFragments } from './user'

const GET_BOX_ID = gql`
  {
    boxID @client
  }
`

const ROOM_JOIN_MUTATION = gql`
  mutation JoinRoom($userUUID: UUID!, $boxID: UUID!) {
    joinRoom(userUUID: $userUUID, boxID: $boxID) {
      creatorUUID
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

export { GET_BOX_ID, ROOM_JOIN_MUTATION, NEW_USER_IN_ROOM_SUBSCRIPTION }

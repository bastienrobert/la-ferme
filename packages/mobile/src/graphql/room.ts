import gql from 'graphql-tag'

const ROOM_JOIN = gql`
  mutation($user: UUID!, $box_id: UUID!) {
    joinRoom(user_uuid: $user, box_id: $box_id)
  }
`

const ROOM_USERS = gql`
  subscription($box_id: UUID!) {
    connectedUsers(box_id: $box_id) {
      box_id
      connectedUsers {
        user_uuid
      }
    }
  }
`

export { ROOM_JOIN, ROOM_USERS }

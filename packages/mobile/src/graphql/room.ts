import gql from 'graphql-tag'

const ROOM_JOIN = gql`
  mutation {
    joinRoom
  }
`

export { ROOM_JOIN }

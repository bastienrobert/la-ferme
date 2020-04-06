import gql from 'graphql-tag'

const fragments = {
  userUUID: gql`
    fragment UserUUID on User {
      uuid
    }
  `
}

const USER_GET_QUERY = gql`
  query GetUser($uuid: UUID) {
    getUser(uuid: $uuid) {
      ...UserUUID
      exists
    }
  }
  ${fragments.userUUID}
`

export { fragments, USER_GET_QUERY }

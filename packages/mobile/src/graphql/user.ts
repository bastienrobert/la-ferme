import gql from 'graphql-tag'

const fragments = {
  userUUID: gql`
    fragment UserUUID on User {
      uuid
    }
  `
}

const GET_USER_QUERY = gql`
  query GetUser($uuid: UUID) {
    getUser(uuid: $uuid) {
      ...UserUUID
      exists
    }
  }
  ${fragments.userUUID}
`

export { fragments, GET_USER_QUERY }

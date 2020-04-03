import gql from 'graphql-tag'

const USER_GET = gql`
  query($uuid: UUID) {
    getUser(uuid: $uuid) {
      uuid
      existed
    }
  }
`

export { USER_GET }

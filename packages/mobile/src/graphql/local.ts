import gql from 'graphql-tag'

const GET_BOX_ID = gql`
  {
    boxID @client
  }
`

export { GET_BOX_ID }

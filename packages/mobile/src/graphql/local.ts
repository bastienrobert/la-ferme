import gql from 'graphql-tag'

const GET_GAME_INFOS = gql`
  {
    boxID @client
    playerUUID @client
    gameUUID @client
  }
`

export { GET_GAME_INFOS }

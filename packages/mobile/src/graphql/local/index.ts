import gql from 'graphql-tag'

const GAME_INFOS_QUERY = gql`
  {
    boxID @client
    gameUUID @client
    player @client {
      uuid
    }
  }
`

const GAME_PLAYER_INFOS_QUERY = gql`
  {
    boxID @client
    gameUUID @client
    player @client {
      uuid
      character
      skill
      goal
    }
  }
`

const LAST_TARGETER_QUERY = gql`
  {
    targeter @client
  }
`

const GAME_INFOS_MUTATION = gql`
  mutation SetGameInfos($boxID: UUID!, $gameUUID: UUID!, $playerUUID: UUID!) {
    setGameInfos(boxID: $boxID, gameUUID: $gameUUID, playerUUID: $playerUUID)
      @client
  }
`

const CLEAR_PLAYER_MUTATION = gql`
  mutation ClearPlayer {
    clearPlayer @client
  }
`

const SET_PLAYER_INFOS_MUTATION = gql`
  mutation SetPlayerInfos(
    $character: String!
    $skill: String!
    $goal: String!
  ) {
    setPlayerInfos(character: $character, skill: $skill, goal: $goal) @client
  }
`

const SET_LAST_TARGETER_MUTATION = gql`
  mutation SetLastTargeter($targeter: UUID!) {
    setLastTargeter(targeter: $targeter) @client
  }
`

export {
  GAME_INFOS_QUERY,
  GAME_PLAYER_INFOS_QUERY,
  LAST_TARGETER_QUERY,
  GAME_INFOS_MUTATION,
  CLEAR_PLAYER_MUTATION,
  SET_LAST_TARGETER_MUTATION,
  SET_PLAYER_INFOS_MUTATION
}

import gql from 'graphql-tag'

const fragments = {
  playerInfos: gql`
    fragment PlayerInfos on Player {
      uuid
      ready
      character
      skill
      goal
    }
  `
}

const GET_PLAYER = gql`
  query GetPlayer($playerUUID: UUID!) {
    getPlayer(playerUUID: $playerUUID) {
      ...PlayerInfos
    }
  }
  ${fragments.playerInfos}
`

const PLAYER_READY_MUTATION = gql`
  mutation PlayerReady($playerUUID: UUID!) {
    playerReady(playerUUID: $playerUUID)
  }
`

export { fragments, GET_PLAYER, PLAYER_READY_MUTATION }

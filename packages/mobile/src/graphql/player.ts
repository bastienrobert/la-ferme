import gql from 'graphql-tag'

const fragments = {
  playerInfos: gql`
    fragment PlayerInfos on Player {
      user
      ready
      character
      skill
      goal
    }
  `
}

const GET_PLAYER = gql`
  query GetPlayer($userUUID: UUID!) {
    getPlayer(userUUID: $userUUID) {
      ...PlayerInfos
    }
  }
  ${fragments.playerInfos}
`

const PLAYER_READY_MUTATION = gql`
  mutation PlayerReady($userUUID: UUID!, $boxID: UUID!) {
    playerReady(boxID: $boxID, userUUID: $userUUID)
  }
`

export { fragments, GET_PLAYER, PLAYER_READY_MUTATION }

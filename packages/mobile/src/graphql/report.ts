import gql from 'graphql-tag'

const REPORT_PLAYER_MUTATION = gql`
  mutation ReportPlayer($playerUUID: UUID!, $targetUUID: UUID!) {
    reportPlayer(fromUUID: $playerUUID, toUUID: $targetUUID)
  }
`

export { REPORT_PLAYER_MUTATION }

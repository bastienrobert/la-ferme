import gql from 'graphql-tag'

const REPORT_PLAYER_MUTATION = gql`
  mutation ReportPlayer($userUUID: UUID!, $targetUUID: UUID!, $boxID: UUID!) {
    reportPlayer(boxID: $boxID, fromUUID: $userUUID, toUUID: $targetUUID)
  }
`

export { REPORT_PLAYER_MUTATION }

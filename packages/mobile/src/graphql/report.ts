import gql from 'graphql-tag'

const REPORT_PLAYER_MUTATION = gql`
  mutation ReportPlayer($userUUID: UUID!, $targetUUID: UUID!, $boxID: UUID!) {
    reportPlayer(boxID: $boxID, fromUUID: $userUUID, toUUID: $targetUUID)
  }
`

const PLAYER_IS_REPORT_SUBSCRIPTION = gql`
  subscription PlayerIsReport($userUUID: UUID!, $boxID: UUID!) {
    playerIsReport(boxID: $boxID, userUUID: $userUUID) {
      fromUUID
      toUUID
    }
  }
`

export { REPORT_PLAYER_MUTATION, PLAYER_IS_REPORT_SUBSCRIPTION }

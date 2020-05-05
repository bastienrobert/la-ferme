import gql from 'graphql-tag'

const READY_FOR_ROUND_MUTATION = gql`
  mutation ReadyForRound($userUUID: UUID!, $boxID: UUID!) {
    readyForRound(userUUID: $userUUID, boxID: $boxID)
  }
`

const CONFIRM_BOARD_ROUND_MUTATION = gql`
  mutation ConfirmBoardRound($userUUID: UUID!, $boxID: UUID!) {
    confirmBoardRound(userUUID: $userUUID, boxID: $boxID)
  }
`

const SET_CARD_ROUND_MUTATION = gql`
  mutation SetCardRound($userUUID: UUID!, $boxID: UUID!, $choice: RoundChoice) {
    setCardRound(userUUID: $userUUID, boxID: $boxID, choice: $choice)
  }
`

const COMPLETE_CARD_ROUND_MUTATION = gql`
  mutation CompleteCardRound($userUUID: UUID!, $boxID: UUID!) {
    completeCardRound(userUUID: $userUUID, boxID: $boxID)
  }
`

export {
  READY_FOR_ROUND_MUTATION,
  CONFIRM_BOARD_ROUND_MUTATION,
  SET_CARD_ROUND_MUTATION,
  COMPLETE_CARD_ROUND_MUTATION
}

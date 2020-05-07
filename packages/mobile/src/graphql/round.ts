import gql from 'graphql-tag'

const READY_FOR_ROUND_MUTATION = gql`
  mutation ReadyForRound($playerUUID: UUID!) {
    readyForRound(playerUUID: $playerUUID)
  }
`

const CONFIRM_BOARD_ROUND_MUTATION = gql`
  mutation ConfirmBoardRound($playerUUID: UUID!) {
    confirmBoardRound(playerUUID: $playerUUID)
  }
`

const SET_CARD_ROUND_MUTATION = gql`
  mutation SetCardRound(
    $playerUUID: UUID!
    $choice: RoundChoice!
    $targets: [UUID] = []
  ) {
    setCardRound(playerUUID: $playerUUID, choice: $choice, targets: $targets)
  }
`

const COMPLETE_CARD_ROUND_MUTATION = gql`
  mutation CompleteCardRound($playerUUID: UUID!) {
    completeCardRound(playerUUID: $playerUUID)
  }
`

export {
  READY_FOR_ROUND_MUTATION,
  CONFIRM_BOARD_ROUND_MUTATION,
  SET_CARD_ROUND_MUTATION,
  COMPLETE_CARD_ROUND_MUTATION
}

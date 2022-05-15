import gql from 'graphql-tag'

const SUBMIT_MINI_GAME_MUTATION = gql`
  mutation SubmitMiniGame(
    $playerUUID: UUID!
    $miniGameUUID: UUID!
    $score: Float!
  ) {
    submitMiniGame(
      playerUUID: $playerUUID
      miniGameUUID: $miniGameUUID
      score: $score
    )
  }
`

export { SUBMIT_MINI_GAME_MUTATION }

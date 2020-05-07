import gql from 'graphql-tag'

const USE_SKILL_MUTATION = gql`
  mutation UseSkill($playerUUID: UUID!) {
    useSkill(playerUUID: $playerUUID)
  }
`

export { USE_SKILL_MUTATION }

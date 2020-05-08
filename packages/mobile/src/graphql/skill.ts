import gql from 'graphql-tag'

const USE_SKILL_MUTATION = gql`
  mutation UseSkill($playerUUID: UUID!) {
    useSkill(playerUUID: $playerUUID) {
      name
      completed
      ... on UseSkillWithTargets {
        targets
      }
      ... on UseSkillWithTargetsData {
        targets
        data {
          uuid
          skill
          goal
        }
      }
    }
  }
`

export { USE_SKILL_MUTATION }

import gql from 'graphql-tag'

const USE_SKILL_MUTATION = gql`
  mutation UseSkill($playerUUID: UUID!, $targets: [UUID]) {
    useSkill(playerUUID: $playerUUID, targets: $targets) {
      name
      completed
      ... on UseSkillWithTargets {
        targets
      }
      ... on UseSkillWithTargetsData {
        targets
        data {
          uuid
          character
          goal
        }
      }
    }
  }
`

export { USE_SKILL_MUTATION }

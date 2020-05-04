import gql from 'graphql-tag'

const USE_SKILL_MUTATION = gql`
  mutation UseSkill($userUUID: UUID!) {
    useSkill(userUUID: $userUUID)
  }
`

export { USE_SKILL_MUTATION }

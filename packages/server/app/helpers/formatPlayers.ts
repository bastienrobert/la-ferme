export const formatPlayer = async player => {
  const skill = await player.skill().fetch()
  const user = player.related('user')
  const { ready, character, goal } = player.serialize()

  return {
    user: user.uuid,
    uuid: player.uuid,
    skill: skill.type,
    ready,
    character,
    goal
  }
}

export default players => Promise.all(players.map(formatPlayer))

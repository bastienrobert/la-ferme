export const formatPlayer = async player => {
  const user = await player.user().fetch()
  const { ready, character, skill, goal } = player.serialize()
  return {
    user: user.uuid,
    ready,
    character,
    skill,
    goal
  }
}

export default players => Promise.all(players.map(formatPlayer))

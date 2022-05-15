import Player from '@/app/models/Player'

export const formatPlayer = async (player: Player) => {
  const skill = await player.skill().fetch()
  const { ready, character, goal } = player.serialize()

  return {
    uuid: player.uuid,
    skill: skill.name,
    ready,
    character,
    goal
  }
}

export default players => Promise.all(players.map(formatPlayer))

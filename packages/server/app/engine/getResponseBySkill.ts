import { Collection } from 'bookshelf'

import Skill from '@/app/models/Skill'
import Player from '@/app/models/Player'

import formatPlayers from '@/app/helpers/formatPlayers'

const getUUID = (players: Collection<Player>) => {
  return players.map(player => player.uuid)
}

export default async (skill: Skill) => {
  const targets = await skill.targets().fetch()

  switch (skill.name) {
    case 'speaker':
    case 'shepherds-stick':
      return {
        completed: true,
        name: skill.name,
        targets: getUUID(targets)
      }
    case 'cellphone':
      return {
        completed: true,
        name: skill.name,
        targets: getUUID(targets),
        data: formatPlayers(targets)
      }
    default:
      return {
        completed: true,
        name: skill.name
      }
  }
}

// NAME in each object to type checking

// phone: target, goal
// happy: null
// speaker: target (automatic)
// sheapard-stick: target (automatic)

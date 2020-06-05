import { characters, goals, skills } from '@la-ferme/shared/data'

import { WalktroughCardType } from './WalktroughCard'
import { Character, Goal, Skill } from '@la-ferme/shared/typings'

const data = {
  character: characters,
  goal: goals,
  skill: skills
}

export default (
  type: WalktroughCardType,
  name: string
): Character | Goal | Skill => {
  return data[type].find(card => card.name === name)
}

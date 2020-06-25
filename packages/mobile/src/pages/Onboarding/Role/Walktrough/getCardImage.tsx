import { WalktroughCardType } from './WalktroughCard'

import { images as skill } from '@/utils/helpers/skills'
import { images as goal } from '@/utils/helpers/skills'

const data = {
  character: {
    isabelle: require('@/assets/images/role/animations/characters/isabelle.webp'),
    leon: require('@/assets/images/role/animations/characters/leon.webp'),
    monique: require('@/assets/images/role/animations/characters/monique.webp'),
    peter: require('@/assets/images/role/animations/characters/peter.webp')
  },
  goal,
  skill
}

export default (type: WalktroughCardType, name: string) => {
  return data[type][name] ?? null
}

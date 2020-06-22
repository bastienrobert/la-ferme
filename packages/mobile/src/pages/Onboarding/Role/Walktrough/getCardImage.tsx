import { WalktroughCardType } from './WalktroughCard'

import { images as skill } from '@/utils/helpers/skills'

const data = {
  character: {
    isabelle: require('@/assets/images/role/animations/characters/isabelle.webp'),
    leon: require('@/assets/images/role/animations/characters/leon.webp'),
    monique: require('@/assets/images/role/animations/characters/monique.webp'),
    peter: require('@/assets/images/role/animations/characters/peter.webp')
  },
  goal: {
    airport: require('@/assets/images/role/animations/goals/airport.webp'),
    cinema: require('@/assets/images/role/animations/goals/cinema.webp'),
    house: require('@/assets/images/role/animations/goals/house.webp'),
    library: require('@/assets/images/role/animations/goals/library.webp'),
    nightclub: require('@/assets/images/role/animations/goals/nightclub.webp'),
    pool: require('@/assets/images/role/animations/goals/pool.webp'),
    supermarket: require('@/assets/images/role/animations/goals/supermarket.webp'),
    'town-hall': require('@/assets/images/role/animations/goals/town-hall.webp')
  },
  skill
}

export default (type: WalktroughCardType, name: string) => {
  return data[type][name] ?? null
}

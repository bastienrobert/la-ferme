import { Goal } from '@la-ferme/shared/typings'
import { goals } from '@la-ferme/shared/data'

export const goalsByName: { [key: string]: Goal } = goals.reduce((acc, c) => {
  acc[c.name] = c
  return acc
}, {})

export const images = {
  airport: require('@/assets/images/role/animations/goals/airport.webp'),
  cinema: require('@/assets/images/role/animations/goals/cinema.webp'),
  house: require('@/assets/images/role/animations/goals/house.webp'),
  library: require('@/assets/images/role/animations/goals/library.webp'),
  nightclub: require('@/assets/images/role/animations/goals/nightclub.webp'),
  pool: require('@/assets/images/role/animations/goals/pool.webp'),
  supermarket: require('@/assets/images/role/animations/goals/supermarket.webp'),
  'town-hall': require('@/assets/images/role/animations/goals/town-hall.webp')
}

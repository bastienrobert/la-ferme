import { Statistic } from '@la-ferme/shared/typings'
import { statistics } from '@la-ferme/shared/data'

export const statisticsByName: { [key: string]: Statistic } = statistics.reduce(
  (acc, c) => {
    acc[c.name] = c
    return acc
  },
  {}
)

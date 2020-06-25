import { Skill } from '@la-ferme/shared/typings'
import { skills } from '@la-ferme/shared/data'

export const skillsByName: { [key: string]: Skill } = skills.reduce(
  (acc, c) => {
    acc[c.name] = c
    return acc
  },
  {}
)

export const images = {
  cellphone: require('@/assets/images/role/animations/skills/cellphone.webp'),
  happy: require('@/assets/images/role/animations/skills/happy.webp'),
  'shepherds-stick': require('@/assets/images/role/animations/skills/shepherds-stick.webp'),
  speaker: require('@/assets/images/role/animations/skills/speaker.webp')
}

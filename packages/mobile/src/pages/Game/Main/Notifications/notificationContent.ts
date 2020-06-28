import { global as globalData } from '@la-ferme/shared/data'
import { EventType } from '@la-ferme/shared/typings'

const content = globalData.notifications

export default {
  [EventType.Regularization]: content.regularization,
  [EventType.Skill]: content.skill
}

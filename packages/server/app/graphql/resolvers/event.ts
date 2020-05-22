import { withFilter } from 'apollo-server'
import { REPORT, SKILL } from '@la-ferme/shared/constants'
import { EventType } from '@la-ferme/shared/typings'

import pubsub from '@/app/pubsub'

const resolvers = {
  Event: {
    __resolveType({ type }) {
      switch (type) {
        case EventType.Skill:
          return 'EventSkill'
        case EventType.Report:
          return 'EventReport'
        default:
          return 'EventDefault'
      }
    }
  },
  EventType: {
    regularization: EventType.Regularization,
    report: EventType.Report,
    skill: EventType.Skill,
    miniGame: EventType.MiniGame
  },
  Subscription: {
    eventTriggered: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([REPORT.CREATE, SKILL.USE]),
        ({ eventTriggered }, variables) => {
          return eventTriggered.gameUUID === variables.gameUUID
        }
      )
    }
  }
}

export default resolvers

import { withFilter } from 'apollo-server'
import {
  REPORT,
  REGULARIZATION,
  SKILL,
  MINI_GAME
} from '@la-ferme/shared/constants'
import { EventType } from '@la-ferme/shared/typings'

import pubsub from '@/app/pubsub'

const resolvers = {
  EventType: {
    REGULARIZATION: EventType.Regularization,
    REPORT: EventType.Report,
    SKILL: EventType.Skill,
    MINI_GAME: EventType.MiniGame,
    MINI_GAME_SCORE: EventType.MiniGameScore
  },
  Event: {
    __resolveType({ type }) {
      switch (type) {
        case EventType.Skill:
          return 'EventSkill'
        case EventType.Report:
          return 'EventReport'
        case EventType.Regularization:
          return 'EventRegularization'
        case EventType.MiniGame:
          return 'EventMiniGame'
        default:
          return 'EventDefault'
      }
    }
  },
  Subscription: {
    eventTriggered: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator([
            REPORT.CREATE,
            REGULARIZATION.CREATE,
            SKILL.USE,
            MINI_GAME.CREATE
          ]),
        ({ eventTriggered }, variables) => {
          return eventTriggered.gameUUID === variables.gameUUID
        }
      )
    }
  }
}

export default resolvers

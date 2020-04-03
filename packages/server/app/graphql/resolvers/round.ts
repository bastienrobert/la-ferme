import { ROUND } from '@la-ferme/shared'

import pubsub from '../pubsub'

const resolvers = {
  Mutation: {
    // complete a round
    completeRound() {
      const id = Math.random()
      pubsub.publish(ROUND.COMPLETE, {
        round: id
      })
      return id
    }
  },
  Subscription: {
    round: {
      subscribe: () => pubsub.asyncIterator([ROUND.COMPLETE])
    }
  }
}

export default resolvers

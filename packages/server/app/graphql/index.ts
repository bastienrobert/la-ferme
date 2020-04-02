import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash.merge'

// Import typeDefs
import roomDefs from './types/room.graphql'
import gameDefs from './types/game.graphql'

// Import resolvers
import roomResolvers from './resolvers/room'
import gameResolvers from './resolvers/game'

const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`

// Export generated schema
export default makeExecutableSchema({
  typeDefs: [Query, roomDefs, gameDefs],
  resolvers: merge(roomResolvers, gameResolvers)
})

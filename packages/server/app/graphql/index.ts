import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash.merge'

// Import typeDefs
import roomDefs from './types/room.graphql'

// Import resolvers
import roomResolvers from './resolvers/room'

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
  typeDefs: [Query, roomDefs],
  resolvers: merge(roomResolvers)
})

import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash.merge'

// Import scalars
import {
  defs as uuidScalarDefs,
  resolvers as uuidScalarResolvers
} from './scalars/uuid'

// Import typeDefs
import roomDefs from './types/room.graphql'
import gameDefs from './types/game.graphql'
import roundDefs from './types/round.graphql'
import userDefs from './types/user.graphql'

// Import resolvers
import roomResolvers from './resolvers/room'
import gameResolvers from './resolvers/game'
import roundResolvers from './resolvers/round'
import userResolvers from './resolvers/user'

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
  typeDefs: [Query, uuidScalarDefs, userDefs, roomDefs, gameDefs, roundDefs],
  resolvers: merge(
    uuidScalarResolvers,
    userResolvers,
    roomResolvers,
    gameResolvers,
    roundResolvers
  )
})

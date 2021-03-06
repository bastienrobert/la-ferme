import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash.merge'

// Import scalars
import {
  defs as uuidScalarDefs,
  resolvers as uuidScalarResolvers
} from './scalars/uuid'

// Import typeDefs
import roomDefs from './types/room.graphql'
import userDefs from './types/user.graphql'
import gameDefs from './types/game.graphql'
import playerDefs from './types/player.graphql'
import roundDefs from './types/round.graphql'
import eventDefs from './types/event.graphql'
import reportDefs from './types/report.graphql'
import skillDefs from './types/skill.graphql'
import minigameDefs from './types/minigame.graphql'

// Import resolvers
import roomResolvers from './resolvers/room'
import userResolvers from './resolvers/user'
import gameResolvers from './resolvers/game'
import playerResolvers from './resolvers/player'
import roundResolvers from './resolvers/round'
import eventResolvers from './resolvers/event'
import reportResolvers from './resolvers/report'
import skillResolvers from './resolvers/skill'
import minigameResolvers from './resolvers/minigame'

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
  typeDefs: [
    Query,
    uuidScalarDefs,
    userDefs,
    roomDefs,
    gameDefs,
    playerDefs,
    roundDefs,
    eventDefs,
    reportDefs,
    skillDefs,
    minigameDefs
  ],
  resolvers: merge(
    uuidScalarResolvers,
    userResolvers,
    roomResolvers,
    gameResolvers,
    playerResolvers,
    roundResolvers,
    eventResolvers,
    reportResolvers,
    skillResolvers,
    minigameResolvers
  )
})

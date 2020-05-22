import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import unfetch from 'unfetch'
import ws from 'isomorphic-ws'

import cache from '@/graphql/local/cache'
import resolvers from '@/graphql/local/resolvers'

import auth from '@/services/auth'

import config from '@/utils/config'

// Create an http link:
const httpLink = new HttpLink({
  uri: `http://${config.api}/graphql`,
  fetch: unfetch
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://${config.api}/graphql`,
  webSocketImpl: ws,
  options: {
    reconnect: true,
    connectionParams: async () => {
      return new Promise(resolve => {
        if (typeof auth.uuid !== 'undefined') {
          return resolve({ user: auth.uuid })
        }
        auth.on('uuid', user => resolve({ user }))
      })
    }
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  resolvers,
  cache
})

export default client

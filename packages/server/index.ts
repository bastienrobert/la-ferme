import { ApolloServer } from 'apollo-server'

import schema from '@/app/graphql'
import subscriptions from '@/app/graphql/subscriptions'

const server = new ApolloServer({
  schema,
  subscriptions
})

// The `listen` method launches a web server.
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀  Server ready at ${url}`)
  console.log(`🚀  Subscriptions ready at ${subscriptionsUrl}`)
})

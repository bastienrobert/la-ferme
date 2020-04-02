import { ApolloServer } from 'apollo-server'

import schema from '@/app/graphql'

// import Room from '@/app/models/Room'
// import Game from '@/app/models/Game'

// async function init() {
//   // const f = await Room.fetchAll()

// const g = new Game().where('id', 1)
// const e = await g.fetch()
// console.log(e.room.serialize())
//   console.log('==========')
//   console.log(e.serialize())
//   console.log('==========')
//   console.log('==========')
//   const r = new Room().where({ id: 1 })
//   const e2 = await r.fetch()
//   const gg = await e2.games.fetch()
//   console.log(gg.serialize()) // has many
//   console.log('==========')
//   console.log(e2.serialize())
//   console.log('==========')
//   console.log('==========')
//   const r2 = await Room.fetchAll() // fetch all
//   console.log(r2.serialize())
//   console.log('==========')
//   const r3 = await Room.count() // count
//   console.log(r3)
// }

// init()

const server = new ApolloServer({ schema })

// The `listen` method launches a web server.
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀  Server ready at ${url}`)
  console.log(`🚀  Subscriptions ready at ${subscriptionsUrl}`)
})

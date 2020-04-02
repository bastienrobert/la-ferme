import Game from '@/app/models/Game'

const resolvers = {
  Query: {
    game: async (_, { id }) => {
      const game = await Game.find(id)
      return game.serialize()
    }
  },
  Mutation: {
    // set completed to true
    gameComplete: async (_, { id }) => {
      const game = await Game.find(id)
      game.set({ completed: true })
      const saved = await game.save()
      return saved.serialize()
    }
  }
}

export default resolvers

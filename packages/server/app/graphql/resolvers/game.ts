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
    gameComplete: async (_, { id, user_id }) => {
      const game = await Game.find(id)
      game.winner = user_id
      const saved = await game.save()
      return saved.serialize()
    }
  }
}

export default resolvers

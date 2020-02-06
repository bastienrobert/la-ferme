import { createModel } from '@rematch/core'

export type GameState = number

export default createModel({
  state: 0,
  reducers: {
    increment(state: GameState, payload: number): GameState {
      return state + payload
    }
  },
  effects: {
    async incrementAsync(payload: number) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment(payload)
    }
  }
})

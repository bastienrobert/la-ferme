import { createModel } from '@rematch/core'

export type GlobalState = number

export default createModel({
  state: 0,
  reducers: {
    increment(state: GlobalState, payload: number): GlobalState {
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

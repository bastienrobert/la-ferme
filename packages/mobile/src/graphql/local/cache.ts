import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: []
    }
  }
})

const DEFAULT_STATE = {
  boxID: null,
  gameUUID: null,
  targeter: null,
  player: {
    __typename: 'Player',
    uuid: null
  }
}

const cache = new InMemoryCache({ fragmentMatcher })
cache.writeData({
  data: DEFAULT_STATE
})

export { DEFAULT_STATE }
export default cache

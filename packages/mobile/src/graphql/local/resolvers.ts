import { GAME_INFOS_QUERY } from './'
import { DEFAULT_STATE } from './cache'

export default {
  Mutation: {
    setGameInfos: (_, { boxID, gameUUID, playerUUID }, { cache }) => {
      cache.writeData({
        data: {
          boxID,
          gameUUID,
          player: {
            __typename: 'Player',
            uuid: playerUUID
          }
        }
      })
      return true
    },
    clearGameInfos: (_, _vars, { cache }) => {
      cache.writeData({
        data: DEFAULT_STATE
      })
      return true
    },
    setPlayerInfos: (_, { character, skill, goal }, { cache }) => {
      const { player } = cache.readQuery({ query: GAME_INFOS_QUERY })
      cache.writeData({
        data: {
          player: Object.assign(player, {
            character,
            skill,
            goal
          })
        }
      })
      return true
    }
  }
}

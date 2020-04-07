import Home from '@/pages/Home'
import Room from '@/pages/Room'
import Role from '@/pages/Role'
import Game from '@/pages/Game'

export interface RootStackParamList {
  Home: undefined
  RoomJoin: undefined
}

export default {
  base: 'Home',
  pages: [
    {
      name: 'Home',
      component: Home
    },
    {
      name: 'Room',
      component: Room
    },
    {
      name: 'Role',
      component: Role
    },
    {
      name: 'Game',
      component: Game
    }
  ]
}

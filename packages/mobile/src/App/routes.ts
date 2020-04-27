import Introduction from '@/pages/Introduction'
import Home from '@/pages/Home'
import QRCode from '@/pages/Home/QRCode'
import Room from '@/pages/Room'
import Role from '@/pages/Role'
import Game from '@/pages/Game'
import GameOver from '@/pages/GameOver'

export interface RootStackParamList {
  Home: undefined
  RoomJoin: undefined
}

export default {
  base: 'Introduction',
  pages: [
    {
      name: 'Introduction',
      component: Introduction
    },
    {
      name: 'Home',
      component: Home
    },
    {
      name: 'Home:QRCode',
      component: QRCode
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
    },
    {
      name: 'GameOver',
      component: GameOver
    }
  ]
}

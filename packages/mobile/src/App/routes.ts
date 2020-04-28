import Introduction from '@/pages/Introduction'
import Home from '@/pages/Home'
import QRCode from '@/pages/Home/QRCode'
import Room from '@/pages/Onboarding/Room'
import Role from '@/pages/Onboarding/Role'
import Game from '@/pages/Game'
import GameOver from '@/pages/Game/GameOver'

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
      name: 'Onboarding:Room',
      component: Room
    },
    {
      name: 'Onboarding:Role',
      component: Role
    },
    {
      name: 'Game',
      component: Game
    },
    {
      name: 'Game:GameOver',
      component: GameOver
    }
  ]
}

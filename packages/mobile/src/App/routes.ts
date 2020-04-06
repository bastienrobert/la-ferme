import Home from '@/pages/Home'
import RoomJoin from '@/pages/room/Join'

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
      name: 'Room:Join',
      component: RoomJoin
    }
  ]
}

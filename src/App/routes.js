import Home from '@/pages/Home'
import JoinRoom from '@/pages/rooms/Join'
import CreateRoom from '@/pages/rooms/Create'

export default {
  base: 'home',
  pages: [
    {
      name: 'home',
      component: Home
    },
    {
      name: 'room/join',
      component: JoinRoom
    },
    {
      name: 'room/create',
      component: CreateRoom
    }
  ]
}

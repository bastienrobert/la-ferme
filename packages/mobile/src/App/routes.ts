import Home from '@/pages/Home'
import RoomCreate from '@/pages/rooms/Create'

export default {
  base: 'Home',
  pages: [
    {
      name: 'Home',
      component: Home
    },
    {
      name: 'Room:Create',
      component: RoomCreate
    }
  ]
}

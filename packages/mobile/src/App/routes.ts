import Introduction from '@/pages/Introduction'

import Home from '@/pages/Home'
import HomeQRCode from '@/pages/Home/QRCode'
import HomeRoom from '@/pages/Home/Room'

import OnboardingHello from '@/pages/Onboarding/Hello'
import OnboardingSetup from '@/pages/Onboarding/Setup'
import OnboardingRole from '@/pages/Onboarding/Role'
import OnboardingPending from '@/pages/Onboarding/Pending'

import Game from '@/pages/Game'
import GameOver from '@/pages/Game/GameOver'

export interface RootStackParamList {
  Home: undefined
  RoomJoin: undefined
}

export default {
  base: 'Onboarding:Setup',
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
      component: HomeQRCode
    },
    {
      name: 'Home:Room',
      component: HomeRoom
    },
    {
      name: 'Onboarding:Hello',
      component: OnboardingHello
    },
    {
      name: 'Onboarding:Setup',
      component: OnboardingSetup
    },
    {
      name: 'Onboarding:Role',
      component: OnboardingRole
    },
    {
      name: 'Onboarding:Pending',
      component: OnboardingPending
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

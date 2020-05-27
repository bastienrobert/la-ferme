import Introduction from '@/pages/Introduction'

import HomeMain from '@/pages/Home/Main'
import HomeQRCode from '@/pages/Home/QRCode'
import HomeRoom from '@/pages/Home/Room'

import OnboardingHello from '@/pages/Onboarding/Hello'
import OnboardingSetup from '@/pages/Onboarding/Setup'
import OnboardingRole from '@/pages/Onboarding/Role'
import OnboardingPending from '@/pages/Onboarding/Pending'

import GameMain, { GameMainParams } from '@/pages/Game/Main'
import GameOver, { GameOverParams } from '@/pages/Game/GameOver'

import Samples from '@/pages/samples'
import SamplePending from '@/pages/samples/Pending'
import SampleGame from '@/pages/samples/Game'

export type RootStackParamList = {
  Introduction: undefined
  'Home:Main': undefined
  'Home:QRCode': undefined
  'Home:Room': undefined
  'Onboarding:Hello': undefined
  'Onboarding:Setup': undefined
  'Onboarding:Role': undefined
  'Onboarding:Pending': undefined
  'Game:Main': GameMainParams
  'Game:GameOver': GameOverParams
  // samples
  Sample: undefined
  SamplePending: undefined
  SampleGame: undefined
}

export default {
  base: 'Samples',
  // base: 'Introduction',
  pages: [
    {
      name: 'Introduction',
      component: Introduction
    },
    {
      name: 'Home:Main',
      component: HomeMain
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
      name: 'Game:Main',
      component: GameMain
    },
    {
      name: 'Game:GameOver',
      component: GameOver
    },
    // samples
    {
      name: 'Samples',
      component: Samples
    },
    {
      name: 'Sample:Pending',
      component: SamplePending
    },
    {
      name: 'Sample:Game',
      component: SampleGame
    }
  ]
}

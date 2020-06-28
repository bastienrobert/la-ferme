import React, { FC, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components/native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { Button } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'

import { RootStackParamList } from '@/App/routes'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import FullscreenVideo from '@/components/shared/FullscreenVideo'

import useTheme from '@/hooks/useTheme'

export const general = globalData.general

type OnboardingSetupRouteProp = RouteProp<
  RootStackParamList,
  'Onboarding:Setup'
>
type OnboardingSetupNavigationProp = NavigationProp<
  RootStackParamList,
  'Onboarding:Setup'
>

export interface OnboardingSetupProps {
  route: OnboardingSetupRouteProp
  navigation: OnboardingSetupNavigationProp
}

const Setup: FC<OnboardingSetupProps> = ({ navigation }) => {
  const { setTheme } = useTheme()
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    setTheme('beige')
    return () => setPaused(true)
  }, [setTheme])

  const onSkipPress = useCallback(() => {
    navigation.navigate('Onboarding:Role')
  }, [navigation])

  return (
    <Component>
      <FullscreenVideo
        paused={paused}
        onEnd={onSkipPress}
        source={require('@/assets/videos/rules.mp4')}
      />
      <ButtonContainer alignSelf="center">
        <Button onPress={onSkipPress}>{general.skip}</Button>
      </ButtonContainer>
    </Component>
  )
}

const Component = styled(FullContainer)`
  justify-content: flex-end;
`

const ButtonContainer = styled(Container)`
  margin-bottom: 40px;
`

export default Setup

import React, { FC, useState, useContext, useCallback } from 'react'
import styled from 'styled-components/native'
import {
  useFocusEffect,
  RouteProp,
  NavigationProp
} from '@react-navigation/native'
import { Button } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'

import { RootStackParamList } from '@/App/routes'
import ThemeContext from '@/App/Theme/Context'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import FullscreenVideo from '@/components/shared/FullscreenVideo'

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
  const { setTheme } = useContext(ThemeContext)
  const [paused, setPaused] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setTheme('beige')
      return () => setPaused(true)
    }, [setTheme])
  )

  const onSkipPress = useCallback(() => {
    navigation.navigate('Onboarding:Role')
  }, [navigation])

  return (
    <Component>
      <FullscreenVideo
        paused={paused}
        onEnd={onSkipPress}
        source={{
          uri:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }}
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

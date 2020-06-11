import React, { FC, useState, useCallback } from 'react'
import styled from 'styled-components/native'
import {
  useFocusEffect,
  RouteProp,
  NavigationProp
} from '@react-navigation/native'
import { Button } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'

import { RootStackParamList } from '@/App/routes'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import FullscreenVideo from '@/components/shared/FullscreenVideo'

import useTheme from '@/hooks/useTheme'

export const general = globalData.general

type IntroductionRouteProp = RouteProp<RootStackParamList, 'Introduction'>
type IntroductionNavigationProp = NavigationProp<
  RootStackParamList,
  'Introduction'
>

export interface IntroductionProps {
  route: IntroductionRouteProp
  navigation: IntroductionNavigationProp
}

const Introduction: FC<IntroductionProps> = ({ navigation }) => {
  const { setTheme } = useTheme()
  const [paused, setPaused] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setTheme('gray')
      return () => setPaused(true)
    }, [setTheme])
  )

  const onSkipPress = () => {
    navigation.navigate('Home:Main')
  }

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

export default Introduction

import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { Button } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'

import { RootStackParamList } from '@/App/routes'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import FullscreenVideo from '@/components/shared/FullscreenVideo'

import useTheme from '@/hooks/useTheme'
import auth from '@/services/auth'

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
  const [paused, setPaused] = useState(true)

  useEffect(() => {
    setTheme('gray')
    return () => setPaused(true)
  }, [setTheme])

  useEffect(() => {
    if (!paused) return
    auth.on('uuid', () => setPaused(false))
  })

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

import React, { FC, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { global as globalData } from '@la-ferme/shared/data'

import { RootStackParamList } from '@/App/routes'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

export const content = globalData.join

type OnboardingHelloRouteProp = RouteProp<RootStackParamList, 'Home:Room'>
type OnboardingHelloNavigationProp = NavigationProp<
  RootStackParamList,
  'Home:Room'
>

export interface OnboardingHelloProps {
  route: OnboardingHelloRouteProp
  navigation: OnboardingHelloNavigationProp
}

const Hello: FC<OnboardingHelloProps> = ({ navigation }) => {
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    progress.setValue(0)
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (!finished) return
      navigation.navigate('Onboarding:Setup')
    })
  }, [navigation, progress])

  return (
    <Component alignSelf="center">
      <AnimationContainer alignSelf="center">
        <Animation
          source={require('@/assets/lottie/hello_stars.json')}
          autoPlay
        />
      </AnimationContainer>
      <Wrapper alignSelf="center">
        <TitleContainer alignSelf="center">
          <Title preset="H3" color="beige" textAlign="center">
            {content.introduction}
          </Title>
        </TitleContainer>
        <Text color="beige" textAlign="center">
          {content.text_1}
        </Text>
        <Text color="beige" textAlign="center">
          {content.text_2}
        </Text>
      </Wrapper>
    </Component>
  )
}

const Component = styled(FullContainer)`
  width: 100%;
  max-width: 400px;
  align-items: center;
  justify-content: center;
`

const AnimationContainer = styled(Container)`
  padding-bottom: 37px;
`

const Animation = styled(LottieView)`
  width: 100%;
`

const Wrapper = styled(Container)`
  width: 90%;
  max-width: 400px;
  margin-bottom: 20px;
`

const TitleContainer = styled(Container)`
  margin-bottom: 25px;
`

export default Hello

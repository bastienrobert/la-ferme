import React, { FC, useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import { global as globalData } from '@la-ferme/shared/data'
import { Colors } from '@la-ferme/components/native'

import Title from '@/components/typo/Title'
import Container from '@/components/shared/Container'

const content = globalData.cardStep.player

export interface YouChooseProps {
  visible: boolean
  color: Colors.Typo
}

const YouChoose: FC<YouChooseProps> = ({ color, visible }) => {
  const opacity = useRef(new Animated.Value(0)).current
  const animation = useRef()

  useEffect(() => {
    if (!visible || !animation.current) return

    animation.current.play()

    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true
    }).start()
  }, [opacity, visible])

  return (
    <Component as={Animated.View} alignSelf="center" style={{ opacity }}>
      <StyledLottieView
        ref={animation}
        source={require('@/assets/lottie/you_choose.json')}
        loop={false}
      />
    </Component>
  )
}

const Component = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
`

const StyledLottieView = styled(LottieView)`
  width: 100%;
  max-width: 400px;
`

export default YouChoose

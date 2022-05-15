import React, { FC, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { TouchableWithoutFeedback, Animated } from 'react-native'
// import FastImage from 'react-native-fast-image'
import LottieView from 'lottie-react-native'
// import { global as globalData } from '@la-ferme/shared/data'

import { InnerGameProps } from '../'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'

import CarCounterNeedle, {
  RATIO as CAR_COUNTER_NEEDLE_RATIO
} from '@/components/svgs/CarCounterNeedle'
import CarCounterPoints, {
  RATIO as CAR_COUNTER_POINTS_RATIO
} from '@/components/svgs/CarCounterPoints'

// const content = globalData.phoneCall

const CarCounterGame: FC<InnerGameProps> = ({ onFinish }) => {
  const rotate = useRef(new Animated.Value(Math.PI / 8)).current
  const base = useRef(new Animated.Value(0)).current
  const value = useRef(0)
  const tap = useRef(0)

  useEffect(() => {
    Animated.timing(base, {
      toValue: 1,
      duration: 20000,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (!finished) return
      const n = (value.current + Math.PI / 2) / Math.PI
      const score = n > 0.5 ? 1 - n : n
      onFinish(score)
    })

    base.addListener(() => {
      const decI = Math.PI / 100
      const decF = Math.PI / 160
      const incI = Math.PI / 50
      const incF = Math.PI / 260

      const n = (value.current + Math.PI / 2) / Math.PI
      const dec = decI + decF * (1 - n)
      const inc = tap.current * (incF * n + incI)
      value.current = Math.min(
        Math.max(value.current - dec + inc, -Math.PI / 2),
        Math.PI / 2
      )

      tap.current = Math.max(tap.current - 0.01, 0)
      rotate.setValue(value.current)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base])

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        tap.current = 1
      }}>
      <Component>
        <Timer>
          <StyledLottieView
            source={require('@/assets/lottie/chrono.json')}
            loop={false}
            autoPlay
          />
        </Timer>
        <TextContainer alignSelf="center">
          <StyledTitle preset="H5" color="beige" textAlign="center">
            Tape en rythme pour garder l'allure !
          </StyledTitle>
        </TextContainer>
        <CarCounterContainer alignSelf="center">
          <StyledCarCounterPoints />
          <NeedleContainer>
            <NeedleWrapper
              as={Animated.View}
              style={{ transform: [{ rotate }] }}>
              <StyledCarCounterNeedle />
            </NeedleWrapper>
          </NeedleContainer>
        </CarCounterContainer>
      </Component>
    </TouchableWithoutFeedback>
  )
}

const Component = styled(FullContainer)`
  justify-content: center;
`

const Timer = styled(Container)`
  position: absolute;
  top: 0;
  right: 30px;
  width: 70px;
`

const StyledLottieView = styled(LottieView)`
  width: 100%;
`

const CarCounterContainer = styled(Container)`
  width: 85%;
  max-width: 300px;
`

const StyledCarCounterPoints = styled(CarCounterPoints)`
  width: 100%;
  aspect-ratio: ${CAR_COUNTER_POINTS_RATIO};
`

const NeedleContainer = styled(Container)`
  position: absolute;
  left: 50%;
  top: 100%;
  width: 84px;
  height: 84px;
  transform: translate(-42px, -42px);
`

const NeedleWrapper = styled(Container)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
`

const StyledCarCounterNeedle = styled(CarCounterNeedle)`
  bottom: 50%;
  height: 50%;
  aspect-ratio: ${CAR_COUNTER_NEEDLE_RATIO};

  transform: translateY(10px);
`

const StyledTitle = styled(Title)`
  margin-bottom: 50px;
`

const TextContainer = styled(Container)`
  max-width: 250px;
`

export default CarCounterGame

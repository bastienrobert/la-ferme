import React, { FC, useRef, useEffect, useCallback } from 'react'
import {
  Animated,
  Easing,
  TouchableWithoutFeedback,
  LayoutRectangle,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle
} from 'react-native'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'

import { CardStepType } from '.'
import Container from '@/components/shared/Container'

import getCardData from './getCardData'
import { shadow } from '@/components/cards/cards.style'

import viewport from '@/services/viewport'

const getCardStyle = ({ opacity, translate }) => {
  return {
    opacity,
    transform: [
      { translateX: translate.x },
      { translateY: translate.y },
      { rotate: '-4.5deg' }
    ]
  }
}

export interface PickCardProps {
  type: CardStepType
  choice?: CardStepType
  onPress?: (type: CardStepType) => void
  style?: StyleProp<ViewStyle>
}

const PickCard: FC<PickCardProps> = ({ type, choice, onPress, style }) => {
  const layout = useRef<LayoutRectangle>()
  const opacity = useRef(new Animated.Value(1)).current
  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    layout.current = e.nativeEvent.layout
  }, [])

  const onComponentPress = () => {
    onPress(type)
  }

  useEffect(() => {
    if (!choice) return

    if (choice === type) {
      const height = layout.current.height / 2
      const translateY = type === CardStepType.Civil ? height : -height

      Animated.timing(translate, {
        toValue: { x: 0, y: translateY },
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      }).start()
    } else {
      const height = layout.current.height + viewport.height
      const translateX = type === CardStepType.Civil ? 300 : -300
      const translateY = type === CardStepType.Civil ? -height : height

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true
        }),
        Animated.timing(translate, {
          toValue: { x: translateX, y: translateY },
          duration: 1500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true
        })
      ]).start()
    }
  }, [type, choice, opacity, translate])

  const { Card, image, RATIO } = getCardData(type)
  const cardStyle = getCardStyle({
    opacity,
    translate
  })

  const Component = onPress ? TouchableWithoutFeedback : Container

  return (
    <Component onPress={onComponentPress}>
      <StyledContainer
        as={Animated.View}
        onLayout={onLayout}
        alignSelf="center"
        ratio={RATIO}
        style={[style, cardStyle]}>
        <StyledCard as={Card} />
        <StyledImage resizeMode={FastImage.resizeMode.contain} source={image} />
      </StyledContainer>
    </Component>
  )
}

const StyledContainer = styled(Container)<any>`
  width: 85%;
  max-width: 400px;
  aspect-ratio: ${({ ratio }) => ratio};
  margin-top: -0.5px;
`

const StyledCard = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  ${shadow}
`

const StyledImage = styled(FastImage)`
  flex: 1;
  width: 90%;
  align-self: center;
  justify-content: center;
`

export default PickCard

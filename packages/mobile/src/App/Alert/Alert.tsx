import React, { FC, useEffect, useRef } from 'react'
import { Animated, GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'
import { Colors, Icon } from '@la-ferme/components/native'

import Background, { RATIO as BACKGROUND_RATIO } from './Background'
import { SmallContent, LargeContent } from './Content'
import Container from '@/components/shared/Container'

import { hexToRgba } from '@/utils/colors'

export type AlertContent = AlertInside & AlertOptions

export interface AlertInside {
  title: string
  message?: string
}

interface AlertOptions {
  large?: boolean
}

export interface AlertProps extends AlertContent, AlertOptions {
  onPress: (e?: GestureResponderEvent) => void
}

const Alert: FC<AlertProps> = ({ onPress, large, ...content }) => {
  const overlayOpacity = useRef(new Animated.Value(0)).current
  const componentScale = useRef(new Animated.Value(1.15)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(componentScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start()
  }, [componentScale, overlayOpacity])

  const onIconPress = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start(({ finished }) => finished && onPress())
  }

  return (
    <Overlay as={Animated.View} style={{ opacity: overlayOpacity }}>
      <Component
        as={Animated.View}
        style={{ transform: [{ scale: componentScale }] }}>
        <StyledBackground />
        <Wrapper alignSelf="center">
          {large ? (
            <LargeContent {...content} />
          ) : (
            <SmallContent {...content} />
          )}
          <Container alignSelf="center">
            <Icon icon="cross" background="red" onPress={onIconPress} />
          </Container>
        </Wrapper>
      </Component>
    </Overlay>
  )
}

const Overlay = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${hexToRgba(Colors.black, 0.7)};
  z-index: 999;
`

const Component = styled(Container)`
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  max-width: 300px;
  width: 90%;
  aspect-ratio: ${BACKGROUND_RATIO};
  z-index: 999;
`

const StyledBackground = styled(Background)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
`

const Wrapper = styled(Container)`
  padding: 20px;
`

export default Alert

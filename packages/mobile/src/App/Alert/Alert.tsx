import React, { FC, useEffect, useRef } from 'react'
import { Animated, GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'
import { Colors, Icon } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'

import { hexToRgba } from '@/utils/colors'

export interface AlertContent {
  title: string
  message?: string
}

export interface AlertProps extends AlertContent {
  onPress: (e?: GestureResponderEvent) => void
}

const Alert: FC<AlertProps> = ({ title, message, onPress }) => {
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
        <Wrapper alignSelf="center">
          <TextContainer>
            <Text color="gray" textAlign="center" variant="bold">
              {title}
            </Text>
            {message && (
              <Message size="small" color="gray" textAlign="center">
                {message}
              </Message>
            )}
          </TextContainer>
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
  background-color: ${hexToRgba(Colors.beige, 0.9)};
  border-radius: 13px;
  max-width: 300px;
  width: 90%;
  z-index: 999;
`

const Wrapper = styled(Container)`
  padding: 20px;
`

const TextContainer = styled(Container)`
  margin-bottom: 30px;
`

const Message = styled(Text)`
  margin-top: 10px;
`

export default Alert

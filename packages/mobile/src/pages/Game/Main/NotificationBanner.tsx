import React, { FC, useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'

const NotificationBanner: FC<any> = ({ content }) => {
  const fadeAnim = useRef(new Animated.Value(0))

  useEffect(() => {
    fadeAnim.current.setValue(0)
    Animated.sequence([
      Animated.timing(fadeAnim.current, {
        toValue: 1,
        duration: 2000
      }),
      Animated.timing(fadeAnim.current, {
        toValue: 0,
        duration: 400,
        delay: 2000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      })
    ]).start()
  }, [content])

  return (
    <Component as={Animated.View} style={{ opacity: fadeAnim.current }}>
      <Text>{content}</Text>
    </Component>
  )
}

const Component = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${Colors.gray};
  padding: 50px;
`

export default NotificationBanner

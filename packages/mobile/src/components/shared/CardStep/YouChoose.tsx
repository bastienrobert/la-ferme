import React, { FC, useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '@la-ferme/components/native'

import Title from '@/components/typo/Title'
import Container from '@/components/shared/Container'

export interface YouChooseProps {
  visible: boolean
  color: Colors.Typo
}

const YouChoose: FC<YouChooseProps> = ({ color, visible }) => {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!visible) return

    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true
    }).start()
  }, [opacity, visible])

  return (
    <Component as={Animated.View} alignSelf="center" style={{ opacity }}>
      <Title preset="H1" color={color}>
        Vous avez
      </Title>
      <Title preset="H1" color={color}>
        Choisi
      </Title>
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

export default YouChoose

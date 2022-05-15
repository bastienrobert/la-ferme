import React, { FC, useRef, useEffect, useMemo } from 'react'
import { Animated, Easing } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '@la-ferme/components/native'
import { Button } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'

import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'
import NfcIcon from '@/components/svgs/NfcIcon'

export const general = globalData.general
export const content = globalData.main

const HEIGHT = 400

export interface AndroidNfcPopupProps {
  visible: boolean
  onCancelPress: () => void
}

const AndroidNfcPopup: FC<AndroidNfcPopupProps> = ({
  visible,
  onCancelPress
}) => {
  const opacity = useRef(new Animated.Value(0)).current
  const translate = useRef(new Animated.ValueXY({ x: 0, y: HEIGHT })).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 400,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true
      }),
      Animated.timing(translate, {
        toValue: { x: 0, y: visible ? 0 : HEIGHT },
        duration: 400,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true
      })
    ]).start()
  }, [visible, opacity, translate])

  const componentStyle = useMemo(() => {
    return {
      zIndex: visible ? 1 : -1,
      opacity,
      transform: [{ translateY: translate.y }]
    }
  }, [opacity, translate.y, visible])

  return (
    <Component as={Animated.View} style={componentStyle}>
      <Wrapper>
        <Title preset="H4" color="gray" textAlign="center">
          {content.nfc.title}
        </Title>
        <StyledNfcIcon />
        <TextContainer alignSelf="center">
          <Text color="gray" textAlign="center">
            {content.nfc.text}
          </Text>
        </TextContainer>
        <Container alignSelf="center">
          <Button onPress={onCancelPress}>{general.cancel}</Button>
        </Container>
      </Wrapper>
    </Component>
  )
}

export default AndroidNfcPopup

const Component = styled(Container)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${HEIGHT}px;
  padding: 20px;
`

const Wrapper = styled(Container)`
  flex: 1;
  width: 100%;
  background-color: ${Colors.beige};
  border-radius: 30px;
  padding: 40px;
  justify-content: space-between;
`

const TextContainer = styled(Container)`
  max-width: 200px;
`

const StyledNfcIcon = styled(NfcIcon)`
  width: 80px;
  height: 80px;
  align-self: center;
`

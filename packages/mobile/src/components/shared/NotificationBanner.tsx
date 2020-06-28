import React, { FC, useRef, useLayoutEffect, useCallback } from 'react'
import {
  Animated,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
  LayoutRectangle,
  Easing
} from 'react-native'
import styled from 'styled-components/native'
import { Icon, Icons, Colors } from '@la-ferme/components/native'

import Container from './Container'
import SmallCirclesWrapper from './SmallCirclesWrapper'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

export interface NotificationBannerProps {
  icon: Icons
  title: string
  subtitle: string
  onClose: () => void
}

const NotificationBanner: FC<NotificationBannerProps> = ({
  children,
  icon,
  title,
  subtitle,
  onClose
}) => {
  const layout = useRef<LayoutRectangle>()
  const locked = useRef<boolean>(false)
  const opacityBanner = useRef(new Animated.Value(1)).current
  const translateBanner = useRef(new Animated.ValueXY({ x: 0, y: -300 }))
    .current
  const translateLarge = useRef(new Animated.ValueXY({ x: 0, y: -12000 }))
    .current

  useLayoutEffect(() => {
    Animated.timing(translateBanner, {
      toValue: { x: 0, y: 0 },
      duration: 400,
      useNativeDriver: true
    }).start()
  }, [translateBanner])

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      layout.current = e.nativeEvent.layout
      translateLarge.setValue({ x: 0, y: -layout.current.height })
    },
    [translateLarge]
  )

  const onPress = useCallback(() => {
    if (locked.current) return
    Animated.timing(translateLarge, {
      toValue: { x: 0, y: 0 },
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true
    }).start()
  }, [locked, translateLarge])

  const onClosePress = useCallback(() => {
    locked.current = true
    Animated.parallel([
      Animated.timing(opacityBanner, {
        toValue: 0,
        duration: 0,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      }),
      Animated.timing(translateLarge, {
        toValue: { x: 0, y: -layout.current.height },
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      })
    ]).start(({ finished }) => {
      if (!finished) return
      onClose()
    })
  }, [locked, onClose, opacityBanner, translateLarge])

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Component
        as={Animated.View}
        onLayout={onLayout}
        style={{
          transform: [{ translateY: translateBanner.y }]
        }}>
        <InnerContainer>
          <BannerContainer
            as={Animated.View}
            style={{ opacity: opacityBanner }}>
            <SmallCirclesWrapper>
              <Icon icon={icon} />
            </SmallCirclesWrapper>
            <TextWrapper>
              <Title color="red" preset="H4">
                {title}
              </Title>
              <Text color="beige">{subtitle}</Text>
            </TextWrapper>
          </BannerContainer>
          <LargeContainer
            as={Animated.View}
            style={{
              transform: [{ translateY: translateLarge.y }]
            }}>
            {children}
            <Container alignSelf="center">
              <Icon icon="cross" background="red" onPress={onClosePress} />
            </Container>
          </LargeContainer>
        </InnerContainer>
      </Component>
    </TouchableWithoutFeedback>
  )
}

const Component = styled(Container)`
  position: absolute;
  padding: 11px;
  height: 100%;
  top: 23px;
  left: 0;
  width: 100%;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.35);
`

const InnerContainer = styled(Container)`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  border-radius: 20px;
  padding-bottom: 20px;
  overflow: hidden;
`

const BannerContainer = styled(Container)`
  flex: 1;
  flex-direction: row;
  padding: 13px 21px;
  background-color: ${Colors.gray};
  border-radius: 20px;
`

const LargeContainer = styled(BannerContainer)`
  position: absolute;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 22px;
  background-color: ${Colors.gray};
`

const TextWrapper = styled(Container)`
  flex: 1;
  align-self: center;
  margin-left: 20px;
  background-color: ${Colors.gray};
`

export default NotificationBanner

import React, { FC, useRef, useLayoutEffect, useCallback } from 'react'
import {
  Animated,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
  LayoutRectangle,
  Easing
} from 'react-native'
import styled from 'styled-components/native'
import { Icon, Colors } from '@la-ferme/components/native'

import Container from './Container'
import SmallCirclesWrapper from './SmallCirclesWrapper'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

export interface NotificationProps {
  icon: string
  title: string
  subtitle: string
}

const Notification: FC<NotificationProps> = ({
  children,
  icon,
  title,
  subtitle
}) => {
  const layout = useRef<LayoutRectangle>()
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
      translateLarge.setValue({ x: 0, y: -e.nativeEvent.layout.height })
    },
    [translateLarge]
  )

  const reveal = useCallback(() => {
    Animated.timing(translateLarge, {
      toValue: { x: 0, y: 0 },
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true
    }).start()
  }, [translateLarge])

  return (
    <TouchableWithoutFeedback onPress={reveal}>
      <Component
        as={Animated.View}
        onLayout={onLayout}
        style={{
          transform: [{ translateY: translateBanner.y }]
        }}>
        <InnerContainer>
          <BannerContainer as={Animated.View}>
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
`

const InnerContainer = styled(Container)`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  border-radius: 20px;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${Colors.gray};
`

const TextWrapper = styled(Container)`
  flex: 1;
  align-self: center;
  margin-left: 20px;
  background-color: ${Colors.gray};
`

export default Notification

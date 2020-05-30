import React, { FC, useState, useRef, useCallback, useMemo } from 'react'
import {
  Animated,
  PanResponder,
  LayoutChangeEvent,
  LayoutRectangle
} from 'react-native'
import styled from 'styled-components/native'
import { Colors, Icon } from '@la-ferme/components/native'

import Container from './Container'

const ICON_CONTAINER_DIMENSIONS = 70
const ICON_CONTAINER_MARGINS = 2.5
const ICON_DIMENSIONS = 30
const COMPONENT_HEIGHT = ICON_CONTAINER_DIMENSIONS + ICON_CONTAINER_MARGINS * 2
const RELEASE_OFFSET = 10

const clampToX = (value: number, pan: Animated.ValueXY) => {
  Animated.spring(pan, {
    toValue: { x: value, y: 0 },
    friction: 12,
    tension: 40,
    useNativeDriver: true
  }).start()
}

export interface SlideToAnswerProps {
  onHangUp?: () => void
  touchable?: boolean
}

const SlideToAnswer: FC<SlideToAnswerProps> = ({ onHangUp, touchable }) => {
  const [answer, setAnswer] = useState<boolean>(false)
  const pan = useRef(new Animated.ValueXY()).current
  const backgroundAnim = useRef(new Animated.Value(1)).current
  const crossAnim = useRef(new Animated.Value(0)).current
  const layout = useRef<LayoutRectangle>()

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    layout.current = e.nativeEvent.layout
  }, [])

  const panMove = useMemo(() => {
    return Animated.event(
      [
        null,
        {
          dx: pan.x
        }
      ],
      {
        useNativeDriver: false
      }
    )
  }, [pan.x])

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (
          answer ||
          gestureState.dx < 0 ||
          gestureState.dx + COMPONENT_HEIGHT > layout.current.width
        ) {
          return
        }

        return panMove(evt, gestureState)
      },
      onPanResponderRelease: (_, gestureState) => {
        if (answer) return
        if (
          gestureState.dx + COMPONENT_HEIGHT + RELEASE_OFFSET >
          layout.current.width
        ) {
          setAnswer(true)
          Animated.parallel([
            Animated.timing(backgroundAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true
            }),
            Animated.timing(crossAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true
            })
          ]).start()
          clampToX((layout.current.width - ICON_CONTAINER_DIMENSIONS) / 2, pan)
        } else {
          clampToX(0, pan)
        }
      }
    })
  }, [answer, backgroundAnim, crossAnim, pan, panMove])

  const onPress = useMemo(() => {
    return () => answer && onHangUp && onHangUp()
  }, [answer, onHangUp])

  return (
    <Component alignSelf="center" onLayout={onLayout}>
      <Background as={Animated.View} style={{ opacity: backgroundAnim }} />
      <IconContainer
        as={Animated.View}
        style={{
          transform: [...pan.getTranslateTransform()]
        }}
        {...panResponder.panHandlers}>
        <IconTouchable onPress={onPress} disabled={!touchable || !answer}>
          <IconWrapper as={Animated.View} style={{ opacity: crossAnim }}>
            <StyledIcon icon="cross" color="beige" />
          </IconWrapper>
          <IconWrapper as={Animated.View} style={{ opacity: backgroundAnim }}>
            <StyledIcon icon="angleBracket" color="beige" />
          </IconWrapper>
        </IconTouchable>
      </IconContainer>
    </Component>
  )
}

SlideToAnswer.defaultProps = {
  touchable: true
}

const Component = styled(Container)`
  width: 90%;
  max-width: 300px;
  height: ${COMPONENT_HEIGHT}px;
  border-radius: ${COMPONENT_HEIGHT / 2}px;
  overflow: hidden;
`

const Background = styled(Container)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${Colors.beige};
`

const IconContainer = styled(Container)`
  position: absolute;
  left: 0;
  top: 0;
  height: ${ICON_CONTAINER_DIMENSIONS}px;
  width: ${ICON_CONTAINER_DIMENSIONS}px;
  margin: ${ICON_CONTAINER_MARGINS}px;
  background-color: ${Colors.red};
  border-radius: ${ICON_CONTAINER_DIMENSIONS / 2}px;
`

const IconTouchable = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`

const IconWrapper = styled(Container)`
  position: absolute;
  top: ${(ICON_CONTAINER_DIMENSIONS - ICON_DIMENSIONS) / 2}px;
  left: ${(ICON_CONTAINER_DIMENSIONS - ICON_DIMENSIONS) / 2}px;
  height: ${ICON_DIMENSIONS}px;
  width: ${ICON_DIMENSIONS}px;
`

const StyledIcon = styled(Icon)`
  height: 100%;
  width: 100%;
`

export default SlideToAnswer

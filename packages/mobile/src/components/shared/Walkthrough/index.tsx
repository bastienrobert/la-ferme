import React, { FC, useState } from 'react'
import { Animated, PanResponder } from 'react-native'
import styled from 'styled-components/native'

import FullContainer from '@/components/shared/FullContainer'

import WalkthroughCard from './WalkthroughCard'
import viewport from '@/services/viewport'

const Walkthrough: FC<any> = () => {
  // const datas = [this.props.data.character, this.props.data.skill, this.props.data.goal]
  const datas = ['character_test', 'skill_test', 'goal_test']

  const [pan] = useState(new Animated.ValueXY())
  let [currentIndex, setIndex] = useState(0)

  const rotate = pan.x.interpolate({
    inputRange: [-viewport.width / 2, 0, viewport.width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  })

  const opacity = pan.x.interpolate({
    inputRange: [-viewport.width, 0, viewport.width],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp'
  })

  const cardStyle = {
    transform: [
      {
        rotate: rotate
      },
      ...pan.getTranslateTransform()
    ],
    opacity: opacity
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x,
        dy: pan.y
      }
    ]),
    onPanResponderRelease: (evt, gestureState) => {
      if (currentIndex >= 0 && currentIndex <= 2) {
        if (gestureState.dx > 120 || gestureState.dx < -120) {
          swipeCard(gestureState, Math.sign(gestureState.dx))
          setIndex(currentIndex + 1)
        } else {
          clampToCenter()
        }
      }
    }
  })

  const swipeCard = (gest, dir) => {
    Animated.spring(pan, {
      toValue: { x: (viewport.width + 100) * dir, y: gest.dy },
      useNativeDriver: true
    }).start()
  }

  const clampToCenter = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 6,
      useNativeDriver: true
    }).start()
  }

  // const getCardBack = cardId => {
  //   currentIndex -= 1
  //   console.log(cardId)
  // }

  return (
    <CardContainer>
      {datas
        .map((card, i) => {
          if (i < currentIndex) {
            return null
          } else if (i === currentIndex) {
            return (
              <StyledView
                key={i}
                as={Animated.View}
                style={cardStyle}
                {...panResponder.panHandlers}>
                <WalkthroughCard data={card} />
              </StyledView>
            )
          } else {
            return (
              <StyledView key={i} as={Animated.View}>
                <WalkthroughCard data={card} />
              </StyledView>
            )
          }
        })
        .reverse()}
    </CardContainer>
  )
}

export default Walkthrough

const CardContainer = styled(FullContainer)`
  height: ${viewport.height}px;
  width: ${viewport.width}px;
  flex: 1;
`

const StyledView = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
`

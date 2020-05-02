import React, { FC, useState } from 'react'
import { Animated, PanResponder } from 'react-native'
import styled from 'styled-components/native'

import FullContainer from '@/components/shared/FullContainer'

import WalkthroughCard from './WalkthroughCard'
import viewport from '@/services/viewport'

const Walkthrough: FC<any> = () => {
  const [pan] = useState(new Animated.ValueXY())
  let currentIndex = 0
  let rotate = null

  // const datas = [this.props.data.character, this.props.data.skill, this.props.data.goal]
  const datas = ['character_test', 'skill_test', 'goal_test']
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
      switch (currentIndex) {
        case 0:
          if (gestureState.dx > 120) {
            swipeCardRight(gestureState)
            currentIndex += 1
          } else {
            clampToCenter()
          }
          break
        case 1:
          if (gestureState.dx > 120) {
            swipeCardRight(gestureState)
            currentIndex += 1
          } else if (gestureState.dx < -120) {
            swipeCardLeft(gestureState)
            getCardBack(currentIndex)
            currentIndex -= 1
          } else {
            clampToCenter()
          }
          break
        case 2:
          if (gestureState.dx < -120 && currentIndex === 2) {
            swipeCardLeft(gestureState)
            getCardBack(currentIndex)
            currentIndex -= 1
          } else {
            clampToCenter()
          }
          break
      }

      if (currentIndex > 2) {
        currentIndex = 0
      }

      setTimeout(() => {
        console.log(currentIndex)
      }, 1000)
    }
  })

  const swipeCardLeft = gest => {
    Animated.spring(pan, {
      toValue: { x: -viewport.width - 100, y: gest.dy },
      useNativeDriver: true
    }).start()
  }
  const swipeCardRight = gest => {
    Animated.spring(pan, {
      toValue: { x: viewport.width + 100, y: gest.dy },
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

  const getCardBack = cardId => {
    console.log(cardId)
  }

  const renderCard = (card, i) => {
    switch (i) {
      case 0:
        rotate = pan.x.interpolate({
          inputRange: [-viewport.width / 2, 0, viewport.width / 2],
          outputRange: ['0deg', '0deg', '10deg'],
          extrapolate: 'clamp'
        })
        break
      case 1:
        rotate = pan.x.interpolate({
          inputRange: [-viewport.width / 2, 0, viewport.width / 2],
          outputRange: ['-10deg', '0deg', '10deg'],
          extrapolate: 'clamp'
        })
        break
      case 2:
        rotate = pan.x.interpolate({
          inputRange: [-viewport.width / 2, 0, viewport.width / 2],
          outputRange: ['-10deg', '0deg', '0deg'],
          extrapolate: 'clamp'
        })
        break
    }

    const rotateAndTranslate = {
      transform: [
        {
          rotate: rotate
        },
        ...pan.getTranslateTransform()
      ]
    }

    if (i < currentIndex) {
      return null
    } else if (i === currentIndex) {
      return (
        <StyledView
          key={i}
          as={Animated.View}
          style={rotateAndTranslate}
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
  }

  return (
    <Component>
      {datas.map((card, i) => renderCard(card, i)).reverse()}
    </Component>
  )
}

export default Walkthrough

const Component = styled(FullContainer)`
  height: ${viewport.height}px;
  width: ${viewport.width}px;
`

const StyledView = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
`

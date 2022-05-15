import { useState, useRef } from 'react'
import { Animated, PanResponder } from 'react-native'

import viewport from '@/services/viewport'

export default () => {
  const pan = useRef(new Animated.ValueXY()).current
  const [currentIndex, setIndex] = useState(0)

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y
        }
      ],
      {
        useNativeDriver: false
      }
    ),
    onPanResponderRelease: (_, gestureState) => {
      if (currentIndex >= 0 && currentIndex <= 2) {
        if (gestureState.dx > 120 || gestureState.dx < -120) {
          swipeCard(gestureState, Math.sign(gestureState.dx))
        } else clampToCenter()
      }
    }
  })

  const swipeCard = (gest, dir) => {
    Animated.timing(pan, {
      toValue: { x: (viewport.width + 100) * dir, y: gest.dy },
      duration: 300,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (!finished) return
      pan.setValue({ x: 0, y: 0 })
      setIndex(currentIndex + 1)
    })
  }

  const clampToCenter = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 6,
      useNativeDriver: true
    }).start()
  }

  return {
    pan,
    setIndex,
    currentIndex,
    panResponder
  }
}

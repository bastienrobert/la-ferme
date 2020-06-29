import React, { FC, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Circle } from 'react-native-svg'
import { Colors } from '@la-ferme/components/native'

const ACircle = Animated.createAnimatedComponent(Circle)

const INITIAL_OFFSET = 25
const STROKE_DASHARRAY = 2 * Math.PI * 24

const AnimatedCircle: FC = () => {
  const value = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Animated.timing(value, {
    //   toValue: STROKE_DASHARRAY,
    //   duration: 1000,
    //   useNativeDriver: true
    // }).start()
  }, [value])

  return (
    <Svg width="52" height="52" viewBox="0 0 52 52">
      <ACircle
        cx="26"
        cy="26"
        r="24"
        stroke={Colors.beige}
        strokeDashoffet={STROKE_DASHARRAY * (1 - 0.5)}
        strokeDasharray={STROKE_DASHARRAY}
        strokeWidth="4"
      />
    </Svg>
  )
}

export default AnimatedCircle

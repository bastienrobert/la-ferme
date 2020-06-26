import React, { FC, useLayoutEffect, useRef, useCallback, useMemo } from 'react'
import { Animated } from 'react-native'
import pathInterpolation from 'path-interpolation'
import styled from 'styled-components/native'

import Container from './Container'
import Title, { TitleProps } from '@/components/typo/Title'

const TRANSLATE =
  'M1 246C16.5 242.833 50.1 232.6 60.5 219C73.5 202 75.5 198.5 85 163C94.5 127.5 92.5 69.1246 98.5 66.4999C101 65.4063 103.033 89.5 104 104C105.667 129 112.6 184.7 127 207.5C145 236 173 243.5 194 243.5C207.5 243.5 210.5 218.667 213 206C215.333 189.833 220 150.1 220 120.5C220 83.5 223 0.5 224 0.5C224.8 0.5 225.333 31.1667 225.5 46.5C226.5 83 228.8 158.9 230 170.5C231.5 185 233 233.5 255 246H292'
const SCALE =
  'M1 180C19 179 56.8 176.311 64 173.512C72 170.401 84 168.137 90.5 153.515C95.3 142.716 99 140.017 102.5 146.516C105 152.015 107.23 160 114 164.513C121.5 169.512 139.5 180.01 182.5 179.011C218.047 178.184 230 221.504 233 234.002C234.08 238.501 234 245 237.5 245C240 245 241 239.001 241.5 232.502C242 226.003 245.976 188.5 254.5 178.011C261.5 169.397 261.17 163.991 261.5 161.513C262.5 154 264.5 110.022 264.5 103.523C264.5 97.0238 264.5 2.53898 264.5 1.53914C264.5 0.539298 265.5 -0.960427 265.5 16.5367C265.5 20.5361 266.5 147.516 267.5 155.014C268.5 162.513 269.5 175.501 283 180H292'
const ROTATION =
  'M1 246C20.3333 243 63.5 230.7 81.5 205.5C104 174 106 163 120.5 56C127.614 3.49997 125 1.0001 128 1.0001C128 1.0001 131 -0.5 131 13.5001C131 29.0495 140.477 145 160.5 186C183.209 232.5 222.5 245 254.5 246H273.5H292'

const translateInterpolation = pathInterpolation(TRANSLATE, { height: 247 })
const scaleInterpolation = pathInterpolation(SCALE, { height: 247 })
const rotationInterpolation = pathInterpolation(ROTATION, { height: 247 })

const SCALE_INITIAL = scaleInterpolation(1)

interface AnimatedTitleProps extends TitleProps {
  lines: string[]
}

interface AnimatedTitleRef {
  opacity: Animated.Value
  translate: Animated.ValueXY
  rotate: Animated.Value
  scale: Animated.Value
}

const getStyle = ({ opacity, translate, rotate, scale }: AnimatedTitleRef) => {
  return {
    opacity,
    transform: [
      { translateX: translate.x },
      { translateY: translate.y },
      { rotate },
      { scaleY: scale }
    ]
  }
}

const AnimatedTitle: FC<AnimatedTitleProps> = ({ lines, ...titleProps }) => {
  const refs = useRef<AnimatedTitleRef[]>([])
  refs.current = []

  const splittedLines = useMemo(() => lines.map(line => line.split('')), [
    lines
  ])

  const DURATION_MULTIPLY = 1

  const STAGING = 67

  useLayoutEffect(() => {
    Animated.parallel(
      refs.current.map((ref, i) =>
        Animated.parallel([
          Animated.timing(ref.opacity, {
            toValue: 1,
            duration: 1,
            delay: STAGING * i,
            useNativeDriver: true
          }),
          // Animated.timing(ref.translate, {
          //   toValue: { x: 0, y: -80 },
          //   duration: 866,
          //   delay: STAGING * i,
          //   easing: translateInterpolation,
          //   useNativeDriver: true
          // }),
          // Animated.timing(ref.rotate, {
          //   toValue: -0.35,
          //   duration: 866,
          //   delay: STAGING * i + 20,
          //   easing: rotationInterpolation,
          //   useNativeDriver: true
          // }),
          Animated.timing(ref.scale, {
            toValue: 1,
            duration: 966,
            delay: STAGING * i + 10,
            easing: t => scaleInterpolation(t) * 8 + 1 - SCALE_INITIAL * 8,
            useNativeDriver: true
          })
        ])
      )
    ).start()
  }, [lines])

  const saveRef = useCallback(() => {
    const values = {
      opacity: new Animated.Value(0),
      translate: new Animated.ValueXY({ x: 0, y: 0 }),
      rotate: new Animated.Value(0),
      scale: new Animated.Value(0.9)
    }
    refs.current.push(values)
    return values
  }, [])

  return (
    <>
      {splittedLines.map((line, i) => {
        return (
          <InlineContainer key={`line-${i}`}>
            {line.map((c, j) => {
              const isWhiteSpace = c === ' '
              const style = isWhiteSpace ? {} : getStyle(saveRef())

              return (
                <CharContainer
                  as={isWhiteSpace ? Container : Animated.View}
                  style={style}
                  key={`char-${i}-${j}`}>
                  <Title {...titleProps}>{c}</Title>
                </CharContainer>
              )
            })}
          </InlineContainer>
        )
      })}
    </>
  )
}

const InlineContainer = styled(Container)`
  flex-direction: row;
`

const CharContainer = styled(Container)``

export default AnimatedTitle

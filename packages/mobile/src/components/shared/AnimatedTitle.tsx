import React, { FC, useLayoutEffect, useRef, useCallback, useMemo } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

import Container from './Container'
import Title, { TitleProps } from '@/components/typo/Title'

interface AnimatedTitleProps extends TitleProps {
  lines: string[]
}

const AnimatedTitle: FC<AnimatedTitleProps> = ({ lines, ...titleProps }) => {
  const refs = useRef([])
  refs.current = []

  const splittedLines = useMemo(() => lines.map(line => line.split('')), [
    lines
  ])

  useLayoutEffect(() => {
    Animated.parallel(
      refs.current.map((ref, i) =>
        Animated.timing(ref, {
          toValue: 1,
          duration: 200,
          delay: 200 * i,
          useNativeDriver: true
        })
      )
    ).start()
  }, [lines])

  const saveRef = useCallback(() => {
    const value = new Animated.Value(0)
    refs.current.push(value)
    return value
  }, [])

  return (
    <>
      {splittedLines.map((line, i) => {
        return (
          <InlineContainer key={`line-${i}`}>
            {line.map((c, j) => {
              const isWhiteSpace = c === ' '
              const opacity = isWhiteSpace ? 1 : saveRef()

              return (
                <CharContainer
                  as={isWhiteSpace ? Container : Animated.View}
                  style={{ opacity }}
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

AnimatedTitle.defaultProps = {}

const InlineContainer = styled(Container)`
  flex-direction: row;
`

const CharContainer = styled(Container)``

export default AnimatedTitle

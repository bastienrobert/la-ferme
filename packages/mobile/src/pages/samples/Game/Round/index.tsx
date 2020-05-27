import React, { FC, useState, useRef, useEffect, useCallback } from 'react'
import { Animated, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import uuid from 'uuid/v4'

import Player from './Player'
import Viewer from './Viewer'
import Container from '@/components/shared/Container'

const getRandomColor = () => {
  return (
    '#' + ('00000' + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6)
  )
}

const getStyleFromRef = (ref): ViewStyle => {
  return { transform: [{ translateY: ref?.value ?? 0 }] }
}

const isCurrentPage = (content, id) => {
  return content.findIndex(c => c.uuid === id) === content.length - 1
}

const Round: FC<any> = ({ player, data }) => {
  const [content, setContent] = useState([])
  const currentComponent = useRef<String>()
  const refs = useRef({})

  useEffect(() => {
    const id = uuid()
    refs.current[id] = {}
    const ref = refs.current[id]
    ref.value = new Animated.Value(300)
    ref.animation = Animated.timing(refs.current[id].value, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true
    })
    currentComponent.current = id
    setContent(
      content.concat({
        uuid: id,
        background: getRandomColor(),
        data
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const registerRef = useCallback(
    (id, name) => el => {
      if (!el) return
      const ref = refs.current[id]
      ref[name] = el
      ref.animation.start(({ finished }) => {
        if (finished && isCurrentPage(content, currentComponent.current)) {
          setContent(content.filter(c => c.uuid === currentComponent.current))
        }
      })
    },
    [content, currentComponent]
  )

  return (
    <Component>
      {content.map(c => {
        const C = c.data.player === player.uuid ? Player : Viewer
        const style = getStyleFromRef(refs.current[c.uuid])
        return (
          <ContentWrapper
            as={Animated.View}
            ref={registerRef(c.uuid, 'wrapper')}
            background={c.background}
            style={style}
            key={c.data.uuid}>
            <C data={c.data} />
          </ContentWrapper>
        )
      })}
    </Component>
  )
}

const Component = styled(Container)`
  position: relative;
  height: 200px;
`

const ContentWrapper = styled(Container)<any>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${props => props.background};
`

export default Round

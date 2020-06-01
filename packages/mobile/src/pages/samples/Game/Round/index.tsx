import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useContext
} from 'react'
import { Animated, Easing, ViewStyle, LayoutChangeEvent } from 'react-native'
import styled from 'styled-components/native'
import uuid from 'uuid/v4'
import { Colors } from '@la-ferme/components/native'

import ThemeContext from '@/App/Theme/Context'

import Player from './Player'
import Viewer from './Viewer'
import Container from '@/components/shared/Container'

import viewport from '@/services/viewport'

const getWrapperStyleFromRef = (ref): ViewStyle => {
  return { transform: [{ translateY: ref?.wrapperValue ?? 0 }] }
}

const getOverlayStyleFromRef = (ref): ViewStyle => {
  return { transform: [{ translateY: ref?.overlayValue ?? 0 }] }
}

const isCurrentPage = (content, id) => {
  return content.findIndex(c => c.uuid === id) === content.length - 1
}

interface ComponentRef {
  wrapperValue: Animated.Value
  overlayValue: Animated.Value
  wrapperAnimation: Animated.CompositeAnimation
  overlayAnimation: Animated.CompositeAnimation
}

type ComponentRefs = { [key: string]: ComponentRef }

const Round: FC<any> = ({ player, data }) => {
  const { setTheme } = useContext(ThemeContext)
  const [content, setContent] = useState([])
  const [layerStyle, setLayerStyle] = useState<ViewStyle>()
  const currentComponent = useRef<String>()
  const refs = useRef<ComponentRefs>({})

  useEffect(() => {
    const id = uuid()
    currentComponent.current = id
    const wrapperValue = new Animated.Value(viewport.height)
    const overlayValue = new Animated.Value(viewport.height)
    refs.current[id] = {
      wrapperValue,
      overlayValue,
      wrapperAnimation: Animated.timing(wrapperValue, {
        toValue: 0,
        duration: 1200,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true
      }),
      overlayAnimation: Animated.timing(overlayValue, {
        toValue: -viewport.height - 100,
        duration: 1200,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true
      })
    }
    setContent(
      content.concat({
        uuid: id,
        data
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useLayoutEffect(() => {
    Object.entries(refs.current).forEach(([_, ref]: any) => {
      if (ref.animated) return
      ref.animated = true
      setTimeout(() => {
        if (isCurrentPage(content, currentComponent.current)) {
          const page = content.find(c => c.uuid === currentComponent.current)
          setTheme(page.data.background)
          setContent(content.filter(c => c.uuid === currentComponent.current))
        }
      }, 600)
      ref.overlayAnimation.start()
      ref.wrapperAnimation.start()
    })
  }, [content, currentComponent, setTheme])

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const layout = e.nativeEvent.layout
    setLayerStyle({
      top: -(layout?.y ?? 0),
      left: -(layout?.x ?? 0)
    })
  }, [])

  return (
    <StyledContainer onLayout={onLayout}>
      {content.map((c, i) => {
        const C = c.data.player === player.uuid ? Player : Viewer
        const wrapperStyle = getWrapperStyleFromRef(refs.current[c.uuid])
        const overlayStyle = getOverlayStyleFromRef(refs.current[c.uuid])

        return (
          <ContentContainer key={c.data.uuid} style={{ zIndex: i }}>
            <ContentWrapper
              as={Animated.View}
              background={c.data.background}
              style={wrapperStyle}>
              <C data={c.data} />
            </ContentWrapper>
            <Overlay as={Animated.View} style={[layerStyle, overlayStyle]} />
          </ContentContainer>
        )
      })}
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  position: relative;
  height: 100%;
`

const ContentContainer = styled(Container)<any>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex: 1;
`

const ContentWrapper = styled(Container)<any>`
  flex: 1;
  z-index: 1;
  background-color: ${({ background }) => Colors[background]};
  width: 100%;
`

const Overlay = styled(Container)<any>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${viewport.width}px;
  height: ${viewport.height}px;
  background-color: ${Colors.gray};
  z-index: -1;
`

export default Round

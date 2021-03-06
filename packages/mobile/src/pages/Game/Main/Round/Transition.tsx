import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react'
import { Animated, Easing, ViewStyle, LayoutChangeEvent } from 'react-native'
import styled from 'styled-components/native'
import uuid from 'uuid/v4'
import { Colors } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'

import useTheme from '@/hooks/useTheme'
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
  animated: boolean
  wrapperValue: Animated.Value
  overlayValue: Animated.Value
  animation: Animated.CompositeAnimation
}

type ComponentRefs = { [key: string]: ComponentRef }

type Data = any

export type PushContent = (c: Data) => void

export interface TransitionProps {
  children: (data: Data, forceUpdate: PushContent) => React.ReactNode
  data: Data
  shouldBackgroundUpdate?: boolean
  offset?: Offset
}

export interface Content {
  uuid: string
  data: Data
}

const Transition: FC<TransitionProps> = ({
  children,
  shouldBackgroundUpdate,
  data,
  offset = {}
}) => {
  const { setTheme } = useTheme()
  const [content, setContent] = useState<Content[]>([])
  const [layerStyle, setLayerStyle] = useState<ViewStyle>()
  const currentComponent = useRef<String>()
  const refs = useRef<ComponentRefs>({})

  const pushContent = (d: Data) => {
    const id = uuid()
    currentComponent.current = id
    const wrapperValue = new Animated.Value(viewport.height)
    const overlayValue = new Animated.Value(viewport.height)
    refs.current[id] = {
      wrapperValue,
      overlayValue,
      animated: false,
      animation: Animated.parallel([
        Animated.timing(wrapperValue, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(overlayValue, {
          toValue: -viewport.height - 100,
          duration: 1200,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true
        })
      ])
    }
    setContent(content.concat({ data: d, uuid: id }))
  }

  useEffect(() => {
    pushContent(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useLayoutEffect(() => {
    Object.values(refs.current).forEach((ref: ComponentRef) => {
      if (ref.animated) return
      ref.animated = true

      setTimeout(() => {
        if (isCurrentPage(content, currentComponent.current)) {
          const next = content.filter(c => c.uuid === currentComponent.current)
          if (!next || !next[0]) return
          if (shouldBackgroundUpdate) {
            setTheme(next[0].data.background)
          }
          setContent(next)
        }
      }, 600)
      ref.animation.start()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, setTheme])

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const layout = e.nativeEvent.layout
      setLayerStyle({
        top: -layout.y + (offset.y ?? 0),
        left: -layout.x + (offset.x ?? 0)
      })
    },
    [offset]
  )

  return (
    <Component onLayout={onLayout}>
      {content.map((c, i) => {
        const wrapperStyle = getWrapperStyleFromRef(refs.current[c.uuid])
        const overlayStyle = getOverlayStyleFromRef(refs.current[c.uuid])

        return (
          <ContentContainer key={c.uuid} style={{ zIndex: i }}>
            <ContentWrapper
              as={Animated.View}
              background={c.data.background}
              style={wrapperStyle}>
              {children(c.data, pushContent)}
            </ContentWrapper>
            <Overlay as={Animated.View} style={[layerStyle, overlayStyle]} />
          </ContentContainer>
        )
      })}
    </Component>
  )
}

const Component = styled(Container)`
  position: relative;
  flex: 1;
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

export default Transition

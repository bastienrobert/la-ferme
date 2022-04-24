import React, { FC, useState, useCallback } from 'react'
import { LayoutChangeEvent, LayoutRectangle, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { Fonts, Colors } from '@la-ferme/components/native'

import Container, { ContainerProps } from '../Container'
import Hashtag from '@/components/typo/Hashtag'

type WithHashtagAnchor = 'center' | 'right'

export interface WithHashtagProps extends ContainerProps {
  hashtag: string[]
  hashtagColor: Colors.Typo
  hashtagOffset?: Offset
  anchor?: WithHashtagAnchor
  textAlign?: Fonts.TextAlignOption
}

interface GetHashtagStyleOptions {
  anchor: WithHashtagAnchor
  offset: Offset
}

const getHashtagStyle = (
  layout: LayoutRectangle | undefined,
  { anchor, offset }: GetHashtagStyleOptions
) => {
  const style: ViewStyle = {
    transform: [
      {
        translateX: offset.x ?? 0
      },
      {
        translateY: offset.y ?? 0
      }
    ]
  }
  if (anchor === 'center') {
    style.transform.push({
      translateX: (layout?.width ?? 0) / 2
    })
  }
  style.transform.push({
    rotate: '-14deg'
  })

  return style
}

const WithHashtag: FC<WithHashtagProps> = ({
  children,
  hashtag,
  hashtagColor,
  hashtagOffset = {},
  anchor = 'center',
  ...props
}) => {
  const [layout, setLayout] = useState<LayoutRectangle>()

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout)
  }, [])

  return (
    <Component {...props}>
      {children}
      <HashtagContainer
        onLayout={onLayout}
        style={getHashtagStyle(layout, {
          anchor,
          offset: hashtagOffset
        })}>
        {hashtag.map((line, i) => (
          <Hashtag
            key={`title-hashtag-${i}`}
            textAlign="center"
            color={hashtagColor}>
            {line}
          </Hashtag>
        ))}
      </HashtagContainer>
    </Component>
  )
}

const Component = styled(Container)`
  position: relative;
  z-index: 1;
`

const HashtagContainer = styled(Container)`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
`

export default WithHashtag

import React, { FC, useState, useCallback } from 'react'
import { LayoutChangeEvent, LayoutRectangle, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '@la-ferme/components/native'

import Container from './Container'
import Title from '@/components/typo/Title'
import Hashtag from '@/components/typo/Hashtag'

type TitleWithHastagAnchor = 'center' | 'right'

export interface TitleWithHastagProps {
  title: string
  hashtag: string[]
  titleColor: Colors.Typo
  hashtagColor: Colors.Typo
  anchor?: TitleWithHastagAnchor
}

interface GetHastagStyleOptions {
  anchor: TitleWithHastagAnchor
}

const getHastagStyle = (
  layout: LayoutRectangle | undefined,
  { anchor }: GetHastagStyleOptions
) => {
  const style: ViewStyle = {
    transform: [
      {
        translateY: (2 * (layout?.height ?? 0)) / 3
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

const TitleWithHastag: FC<TitleWithHastagProps> = ({
  title,
  hashtag,
  titleColor,
  hashtagColor,
  anchor = 'center'
}) => {
  const [layout, setLayout] = useState<LayoutRectangle>()

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout)
  }, [])

  return (
    <Component>
      <Title preset="H1" color={titleColor}>
        {title}
      </Title>
      <HastagContainer
        onLayout={onLayout}
        style={getHastagStyle(layout, { anchor })}>
        {hashtag.map((line, i) => (
          <Hashtag
            key={`title-hashtag-${i}`}
            textAlign="center"
            color={hashtagColor}>
            {line}
          </Hashtag>
        ))}
      </HastagContainer>
    </Component>
  )
}

const Component = styled(Container)`
  position: relative;
`

const HastagContainer = styled(Container)`
  position: absolute;
  right: 0;
  bottom: 0;
`

export default TitleWithHastag

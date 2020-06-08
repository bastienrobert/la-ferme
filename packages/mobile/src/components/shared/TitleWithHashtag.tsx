import React, { FC, useState, useCallback } from 'react'
import { LayoutChangeEvent, LayoutRectangle, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { Fonts, Colors } from '@la-ferme/components/native'

import Container, { ContainerProps } from './Container'
import Title, { TitlePreset } from '@/components/typo/Title'
import Hashtag from '@/components/typo/Hashtag'

type TitleWithHastagAnchor = 'center' | 'right'
type Offset = number

export interface TitleWithHastagProps extends ContainerProps {
  title: string
  hashtag: string[]
  titleColor: Colors.Typo
  hashtagColor: Colors.Typo
  hashtagOffset?: Offset
  titlePreset?: TitlePreset
  anchor?: TitleWithHastagAnchor
  textAlign?: Fonts.TextAlignOption
}

interface GetHastagStyleOptions {
  anchor: TitleWithHastagAnchor
  offset: Offset
}

const getHastagStyle = (
  layout: LayoutRectangle | undefined,
  { anchor, offset }: GetHastagStyleOptions
) => {
  const style: ViewStyle = {
    transform: [
      {
        translateY: offset
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
  hashtagOffset = 0,
  titlePreset = 'H1',
  anchor = 'center',
  textAlign = 'center',
  ...props
}) => {
  const [layout, setLayout] = useState<LayoutRectangle>()

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout)
  }, [])

  return (
    <Component {...props}>
      <Title preset={titlePreset} color={titleColor} textAlign={textAlign}>
        {title}
      </Title>
      <HastagContainer
        onLayout={onLayout}
        style={getHastagStyle(layout, { anchor, offset: hashtagOffset })}>
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

import React, { FC, useRef, useLayoutEffect, useCallback } from 'react'
import styled from 'styled-components'

import Poster from './Poster'
import BackgroundColor from '@/components/shared/BackgroundColor'
import Point from '@/components/shared/Point'

import inlineStyles from './inlineStyles'
import useDraggable from '@/hooks/useDraggable'
import useOnResize from '@/hooks/useOnResize'

import useSection from '@/hooks/useSection'
import content from '@/content'
const t = content.posters

const PosterSlice: FC = () => {
  const container = useRef()
  const wrapper = useRef()

  const draggable = useDraggable(wrapper, {
    bounds: container.current,
    type: 'x',
    inertia: true,
    throwResistance: 2000,
    maxDuration: 0.5,
    overshootTolerance: 0.8,
    edgeResistance: 0.9
  })

  const setSliderSize = () => {
    if (draggable.current) {
      draggable.current[0].applyBounds(container.current)
    }
  }

  useLayoutEffect(() => {
    setSliderSize()
  }, [])

  const onResize = useCallback(setSliderSize, [])
  useOnResize(onResize)

  const ref = useSection('download')

  return (
    <Component ref={ref}>
      <BackgroundColor color="yellow">
        <PosterContainer ref={container}>
          <PosterWrapper ref={wrapper}>
            <PosterFlex>
              {t.images.map((image, i) => (
                <StyledPoster
                  key={`poster-${i}`}
                  extraStyle={inlineStyles[i]}
                  {...image}
                />
              ))}
            </PosterFlex>
          </PosterWrapper>
        </PosterContainer>
        <StyledPoint />
        <SecondPoint />
      </BackgroundColor>
    </Component>
  )
}

const Component = styled.section`
  position: relative;
  min-height: 850px;
  height: 1px;
`

const PosterContainer = styled.div`
  overflow: hidden;
  height: 150%;
  transform: translateY(-80px);
`

const PosterWrapper = styled.div`
  display: inline-block;
`

const PosterFlex = styled.div`
  display: flex;
`

const StyledPoster = styled(Poster)`
  flex-grow: 0;
  flex-shrink: 0;
  margin: 0 20px;
`

const StyledPoint = styled(Point)`
  position: absolute;
  left: 30%;
  bottom: 100px;
`

const SecondPoint = styled(StyledPoint)`
  transform: translate(-10px, 14px);
`

export default PosterSlice

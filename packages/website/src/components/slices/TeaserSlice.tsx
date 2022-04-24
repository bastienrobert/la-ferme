import React, { FC, useState } from 'react'
import styled from 'styled-components'

import Player from '@/components/shared/Player'
import Container from '@/components/shared/Container'

import useSection from '@/hooks/useSection'

import content from '@/content'
const t = content.teaser

const TeaserSlice: FC = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const ref = useSection('teaser')

  return (
    <Component
      as="section"
      id="teaser"
      ref={ref}
      onClick={() => setPlaying(!playing)}>
      <StyledPlayer url={t.url} playing={playing} />
      {!playing && <PlayButton src="/images/teaser/play.svg" />}
    </Component>
  )
}

const Component = styled(Container)`
  position: relative;
  padding-top: 200px;
  margin-bottom: 100px;
`

const StyledPlayer = styled(Player)`
  position: relative;
  width: 100%;
  padding-bottom: 56.5%;
  outline: none;
  cursor: pointer;
`

const PlayButton = styled.img`
  position: absolute;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
`

export default TeaserSlice

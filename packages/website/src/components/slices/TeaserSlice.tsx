import React, { FC } from 'react'
import styled from 'styled-components'

import Player from '@/components/shared/Player'
import Container from '@/components/shared/Container'

import useSection from '@/hooks/useSection'

import content from '@/content'
const t = content.teaser

const TeaserSlice: FC = () => {
  const ref = useSection('teaser')

  return (
    <Component as="section" id="teaser" ref={ref}>
      <StyledPlayer url={t.url} />
    </Component>
  )
}

const Component = styled(Container)`
  padding-top: 200px;
  margin-bottom: 100px;
`

const StyledPlayer = styled(Player)`
  position: relative;
  width: 100%;
  padding-bottom: 45%;
`

export default TeaserSlice

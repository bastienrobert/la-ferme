import React, { FC } from 'react'
import styled from 'styled-components'

import Player from '@/components/shared/Player'
import Container from '@/components/shared/Container'

import content from '@/content'
const t = content.teaser

const TeaserSlice: FC = () => {
  return (
    <Component as="section" id="teaser">
      <StyledPlayer url={t.url} />
    </Component>
  )
}

const Component = styled(Container)`
  margin-bottom: 140px;
`

const StyledPlayer = styled(Player)`
  position: relative;
  width: 100%;
  padding-bottom: 45%;
`

export default TeaserSlice

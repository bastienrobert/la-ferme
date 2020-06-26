import React, { FC } from 'react'
import styled from 'styled-components'

import Container from '@/components/shared/Container'
import Image from '@/components/shared/Image'

import content from '@/content'
const t = content.subway

const SubwaySlice: FC = () => {
  return (
    <Component as="section">
      <BigImage {...t.image} />
    </Component>
  )
}

const Component = styled(Container)`
  position: relative;
  z-index: 1;
  max-width: 100vw;
  width: 100%;
`

const BigImage = styled(Image)`
  width: 100%;
`

export default SubwaySlice

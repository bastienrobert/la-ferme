import React, { FC } from 'react'
import styled from 'styled-components'

import Container from '@/components/shared/Container'
import Image from '@/components/shared/Image'

import content from '@/content'
const t = content.board

const BoardSlice: FC = () => {
  return (
    <Component as="section">
      <BigImage {...t.image} />
    </Component>
  )
}

const Component = styled(Container)`
  position: relative;
  z-index: 1;
  @media (max-width: 600px) {
    margin-bottom: 50px;
  }
`

const BigImage = styled(Image)`
  width: 100%;
`

export default BoardSlice

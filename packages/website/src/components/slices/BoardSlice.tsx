import React, { FC } from 'react'
import styled from 'styled-components'

import Container from '@/components/shared/Container'
import Image from '@/components/shared/Image'

import useSection from '@/hooks/useSection'
import breakpoints from '@/utils/breakpoints'

import content from '@/content'
const t = content.board

const BoardSlice: FC = () => {
  const ref = useSection('project')

  return (
    <Component as="section" ref={ref}>
      <BigImage {...t.image} />
    </Component>
  )
}

const Component = styled(Container)`
  position: relative;
  z-index: 1;

  @media (max-width: ${breakpoints.sm}) {
    margin-bottom: 50px;
  }
`

const BigImage = styled(Image)`
  width: 100%;
`

export default BoardSlice

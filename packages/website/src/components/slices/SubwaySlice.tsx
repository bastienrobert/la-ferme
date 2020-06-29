import React, { FC } from 'react'
import styled from 'styled-components'

import useSection from '@/hooks/useSection'
import Image from '@/components/shared/Image'

import content from '@/content'
const t = content.subway

const SubwaySlice: FC = () => {
  const ref = useSection('download')

  return (
    <Component ref={ref}>
      <BigImage {...t.image} />
    </Component>
  )
}

const Component = styled.section`
  position: relative;
  z-index: 1;
  width: 100%;
`

const BigImage = styled(Image)`
  width: 100%;
`

export default SubwaySlice

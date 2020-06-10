import React, { FC } from 'react'
import styled from 'styled-components'

import Container from '@/components/shared/Container'

import content from '@/content'
const t = content.footer

const Footer: FC = () => {
  return <Component as="footer"></Component>
}

const Component = styled(Container)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
`

export default Footer

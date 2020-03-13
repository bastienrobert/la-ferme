import React, { ReactNode } from 'react'

import styled from 'styled-components'

export interface WrapperProps {
  children: ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  return <StyledWrapper>{children}</StyledWrapper>
}

const StyledWrapper = styled.div<WrapperProps>`
  display: block;
  margin: 20px;
`

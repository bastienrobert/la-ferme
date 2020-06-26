import React, { FC } from 'react'
import styled from 'styled-components'

import useScrollTo from '@/hooks/useScrollTo'

const Logo: FC = () => {
  const onClick = useScrollTo(0)

  return (
    <Component onClick={onClick}>
      <img src="/images/global/logo.svg" />
    </Component>
  )
}

const Component = styled.a`
  width: 150px;
  transform: rotate(-10deg);
  text-decoration: none;
  cursor: pointer;
  @media (max-width: 400px) {
    display: none;
  }
`

export default Logo

import React, { FC } from 'react'
import styled from 'styled-components'

import TypoNav from '@/components/typo/Nav'

import useScrollTo from '@/hooks/useScrollTo'

export interface NavItemProps {
  children: string
  href: string
  active?: boolean
}

const NavItem: FC<NavItemProps> = ({ children, href, active }) => {
  const onClick = useScrollTo(href)

  return (
    <Component>
      <TypoNav active={active}>
        <A onClick={onClick}>{children}</A>
      </TypoNav>
    </Component>
  )
}

const Component = styled.li`
  list-style: none;
  margin: 0 20px;
`

const A = styled.a`
  cursor: pointer;
  text-decoration: none;
`

export default NavItem

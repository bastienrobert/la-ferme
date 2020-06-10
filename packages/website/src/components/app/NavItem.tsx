import React, { FC, useCallback } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'

import TypoNav from '@/components/typo/Nav'

gsap.registerPlugin(ScrollToPlugin)

export interface NavItemProps {
  children: string
  href: string
  active?: boolean
}

const NavItem: FC<NavItemProps> = ({ children, href, active }) => {
  const onClick = useCallback(() => {
    if (typeof document === 'undefined') return null
    gsap.to(window, { duration: 0.4, scrollTo: href })
  }, [])

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

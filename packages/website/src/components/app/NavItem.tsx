import React, { FC } from 'react'
import styled from 'styled-components'

import Image from '@/components/shared/Image'
import TypoNav from '@/components/typo/Nav'

import useScrollTo from '@/hooks/useScrollTo'

import content from '@/content'
const t = content.global

export interface NavItemProps {
  children: string
  href: string
  active?: boolean
}

const NavItem: FC<NavItemProps> = ({ children, href, active }) => {
  const onClick = useScrollTo(href)

  return (
    <Component>
      {active && <Cross {...t.image} />}

      <TypoNav active={active}>
        <A onClick={onClick}>{children}</A>
      </TypoNav>
    </Component>
  )
}

const Cross = styled(Image)`
  display: flex;
  width: 20px;
  margin-right: 10px;
`

const Component = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin: 0 20px;
`

const A = styled.a`
  cursor: pointer;
  text-decoration: none;
  font-size: 12px;
`

export default NavItem

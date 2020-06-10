import React, { FC } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import NavItem from './NavItem'
import Container from '@/components/shared/Container'

import content from '@/content'
const t = content.header

const Header: FC = () => {
  return (
    <Component>
      <StyledContainer>
        <Logo />
        <nav>
          <Ul>
            <NavItem active href="#teaser">
              {t.nav.teaser}
            </NavItem>
            <NavItem href="#project">{t.nav.project}</NavItem>
            <NavItem href="#download">{t.nav.download}</NavItem>
            <NavItem href="#contact">{t.nav.contact}</NavItem>
          </Ul>
        </nav>
      </StyledContainer>
    </Component>
  )
}

const Component = styled.header`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 70px 0 80px;
  z-index: 999;
`

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`

const Ul = styled.ul`
  display: flex;
  align-items: center;
`

export default Header

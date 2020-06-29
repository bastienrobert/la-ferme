import React, { FC } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import NavItem from './NavItem'
import Container from '@/components/shared/Container'

import useMenu from '@/hooks/useMenu'
import breakpoints from '@/utils/breakpoints'

import content from '@/content'
const t = content.header

const Header: FC = () => {
  const section = useMenu()

  return (
    <Component>
      <StyledContainer>
        <Logo />
        <Nav>
          <Ul>
            <NavItem active={section === 'teaser'} href="#teaser">
              {t.nav.teaser}
            </NavItem>
            <NavItem active={section === 'project'} href="#project">
              {t.nav.project}
            </NavItem>
            <NavItem active={section === 'download'} href="#download">
              {t.nav.download}
            </NavItem>
            <NavItem active={section === 'contact'} href="#contact">
              {t.nav.contact}
            </NavItem>
          </Ul>
        </Nav>
      </StyledContainer>
    </Component>
  )
}

const Component = styled.header`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 40px 0 0;
  z-index: 999;
`

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Nav = styled.nav`
  display: block;
  margin-top: -30px;

  @media (max-width: ${breakpoints.sm}) {
    display: none;
  }
`

const Ul = styled.ul`
  display: flex;
  align-items: center;
`

export default Header

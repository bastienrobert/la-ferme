import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import NavItem from './NavItem'
import Container from '@/components/shared/Container'

import content from '@/content'
const t = content.header

export const useScrollHandler = () => {
  // setting initial value to true
  const [scroll, setScroll] = useState({})
  let slices = { teaser: true, project: false, download: false, contact: false }

  // running on mount
  useEffect(() => {
    const onScroll = () => {
      let sections = Array.from(document.querySelectorAll('section'))
        .filter(el => el.id.length > 0)
        .map(el => el.offsetTop)

      slices = {
        teaser:
          (window.scrollY + 10 > sections[0] && window.scrollY < sections[1]) ||
          window.scrollY <= 0
            ? true
            : false,
        project:
          window.scrollY + 10 > sections[1] && window.scrollY < sections[2]
            ? true
            : false,
        download:
          window.scrollY + 10 > sections[2] &&
          window.scrollY + 400 < sections[3]
            ? true
            : false,
        contact: window.scrollY + 400 > sections[3] ? true : false
      }

      sections.forEach(() => {
        setScroll({ ...scroll, slices })
      })
    }

    // setting the event handler from web API
    document.addEventListener('scroll', onScroll)

    // cleaning up from the web API
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [scroll, setScroll])

  return scroll
}

const Header: FC = () => {
  const scrollValue = useScrollHandler()
  return (
    <Component>
      <StyledContainer>
        <Logo />
        <Nav>
          <Ul>
            <NavItem
              active={
                scrollValue.slices !== undefined
                  ? scrollValue.slices.teaser
                  : true
              }
              href="#teaser">
              {t.nav.teaser}
            </NavItem>
            <NavItem
              active={
                scrollValue.slices !== undefined
                  ? scrollValue.slices.project
                  : false
              }
              href="#project">
              {t.nav.project}
            </NavItem>
            <NavItem
              active={
                scrollValue.slices !== undefined
                  ? scrollValue.slices.download
                  : false
              }
              href="#download">
              {t.nav.download}
            </NavItem>
            <NavItem
              active={
                scrollValue.slices !== undefined
                  ? scrollValue.slices.contact
                  : false
              }
              href="#contact">
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
  @media (max-width: 600px) {
    display: none;
  }
`

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Nav = styled.nav`
  margin-top: -30px;
`

const Ul = styled.ul`
  display: flex;
  align-items: center;
`

export default Header

import React, { FC } from 'react'
import styled from 'styled-components'

import FooterColumn from './FooterColumn'
import FooterContact from './FooterContact'
import Container from '@/components/shared/Container'
import BackgroundColor from '@/components/shared/BackgroundColor'
import Image from '@/components/shared/Image'
import Point from '@/components/shared/Point'

import useSection from '@/hooks/useSection'
import breakpoints from '@/utils/breakpoints'

import content from '@/content'
const t = content.footer

const Footer: FC = () => {
  const ref = useSection('contact')

  return (
    <Component ref={ref}>
      <BackgroundColor color="gray">
        <StyledContainer as="div" id="contact">
          <Columns>
            {t.columns.map((c, i) => (
              <FooterColumn key={`footer-col-${i}`} index={i} {...c} />
            ))}
            <FooterContact content={t.contact} />
          </Columns>
        </StyledContainer>
      </BackgroundColor>
      <StyledPoint />
      <SecondPoint />
      <ThirdPoint />
      <StyledImage {...t.image} />
    </Component>
  )
}

const Component = styled.footer`
  position: relative;
`

const StyledContainer = styled(Container)`
  height: 100%;
  padding: 148px 0 139px;
  position: relative;
`

const Columns = styled.div`
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 1;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
  }
`

const StyledImage = styled(Image)`
  position: absolute;
  max-width: 400px;
  min-width: 200px;
  width: 20%;
  right: 0;
  bottom: 0;
  z-index: 0;
`

const StyledPoint = styled(Point)`
  position: absolute;
  top: 20px;
  left: 50px;
`

const SecondPoint = styled(StyledPoint)`
  transform: translate(20px, 10px);
`

const ThirdPoint = styled(Point)`
  position: absolute;
  bottom: 20px;
  left: 50%;
`

export default Footer

import React, { FC } from 'react'
import styled from 'styled-components'
import { Button } from '@la-ferme/components'

import Container from '@/components/shared/Container'
import TitleAndSubtitle from '@/components/shared/TitleAndSubtitle'
import BackgroundColor from '@/components/shared/BackgroundColor'
import Image from '@/components/shared/Image'
import Title from '@/components/typo/Title'
import Subtitle from '@/components/typo/Subtitle'
import Text from '@/components/typo/Text'

import content from '@/content'
const t = content.footer

interface ColumnProps {
  number: number
  icon: string
  title: string
  text: string[]
  buttons: any
}

const Column: FC<ColumnProps> = ({ icon, number, title, text, buttons }) => {
  const disabled = number === 0 ? false : true
  const textTop = text && text.slice(0, 1)
  const textBottom = text && text.slice(1, 2)
  const buttonsTop = buttons && buttons.slice(0, 2)
  const buttonsBottom = buttons && buttons.slice(2, 4)

  return (
    <StyledColumn>
      <ColumnTop>
        <Icon active={disabled} src={icon} alt={`number icon ${number}`} />
        <ColumnTitle color="beige" textAlign="left" size="32px">
          <h3>{title}</h3>
        </ColumnTitle>
      </ColumnTop>

      <ColumnText>
        {textTop.map(p => (
          <StyledText color="beige" textAlign="left">
            <p>{p}</p>
          </StyledText>
        ))}
        {buttonsTop.map(({ label, href }) => (
          <A href={href}>{label}</A>
        ))}
        {textBottom.map(p => (
          <StyledText color="beige" textAlign="left">
            <p>{p}</p>
          </StyledText>
        ))}
        {buttonsBottom.map(({ label, href }) => (
          <A href={href}>{label}</A>
        ))}
      </ColumnText>
    </StyledColumn>
  )
}

const Footer: FC = () => {
  return (
    <MainContainer as="section" id="contact">
      <BackgroundColor color="gray">
        <Columns>
          {t.columns.map((c, i) => (
            <Column key={`play-col-${i}`} number={i} {...c} />
          ))}
        </Columns>
        <StyledImage {...t.image} />
      </BackgroundColor>
    </MainContainer>
  )
}

const MainContainer = styled(Container)`
  width: 100%;
  max-width: 100%;
  height: 100%;
  position: relative;
`

const Columns = styled.div`
  margin: auto;
  padding: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: 1000px) {
    flex-wrap: wrap;
  }
`

const ColumnTop = styled.div`
  position: relative;
`

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 350px;
  margin-right: 120px;
`

const Icon = styled(Image)`
  position: absolute;
  width: 30px;
  left: 150px;
  top: -30px;
  display: ${props => (props.active === true ? 'none' : 'flex')};
`

const ColumnTitle = styled(Title)`
  line-height: 1.2;
  letter-spacing: 4%;
  margin-bottom: 15px;
`

const ColumnText = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`

const StyledText = styled(Text)`
  margin: 25px 0;
  font-size: 18px;
  font-weight: bold;
`

const A = styled.a`
  align-self: flex-start;
  margin-bottom: 5px;
  font-family: FuturaLT-Book, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: beige;
`

const StyledImage = styled(Image)`
  position: absolute;
  width: 350px;
  right: 0;
  bottom: 0;
  z-index: 9999;
  @media (max-width: 400px) {
    display: none;
  }
`

export default Footer

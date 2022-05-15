import React, { FC } from 'react'
import styled from 'styled-components'
import { Button } from '@la-ferme/components'

import Container from '@/components/shared/Container'
import TitleAndSubtitle from '@/components/shared/TitleAndSubtitle'
import Image from '@/components/shared/Image'
import Title from '@/components/typo/Title'
import Subtitle from '@/components/typo/Subtitle'
import Text from '@/components/typo/Text'

import useSection from '@/hooks/useSection'
import breakpoints from '@/utils/breakpoints'

import content from '@/content'
const t = content.play

interface ColumnProps {
  number: number
  icon: string
  title: string
  text: string[]
  buttons: any
}

const Column: FC<ColumnProps> = ({ icon, number, title, text, buttons }) => {
  const disabled = number === 0 ? true : false
  return (
    <StyledColumn>
      <NumberIcon src={icon} alt={`number icon ${number}`} />
      <ColumnTitle size="34px">
        <h3>{title}</h3>
      </ColumnTitle>
      <ColumnText>
        {text &&
          text.map((p, i) => (
            <StyledText textAlign="center" key={i}>
              <p>{p}</p>
            </StyledText>
          ))}
      </ColumnText>
      {buttons &&
        buttons.map(({ label }, i) => (
          <StyledButton disabled={disabled} variant="primary" key={i}>
            {label}
          </StyledButton>
        ))}
    </StyledColumn>
  )
}

const PlaySlice: FC = () => {
  const ref = useSection('download')

  return (
    <Container as="section" ref={ref}>
      <TitleAndSubtitle title={t.title} subtitle={t.subtitle} />
      <Columns>
        {t.columns.map((c, i) => (
          <Column key={`play-col-${i}`} number={i} {...c} />
        ))}
      </Columns>
      <BottomTexts>
        {t.bottom.map((l, i) => (
          <BottomText key={i} color="red">
            <span>{l}</span>
          </BottomText>
        ))}
      </BottomTexts>
    </Container>
  )
}

const Columns = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 70px;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
    align-items: center;
  }
`

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;

  @media (max-width: ${breakpoints.sm}) {
    margin-bottom: 50px;
  }
`

const NumberIcon = styled(Image)`
  margin-bottom: 70px;
`

const ColumnTitle = styled(Title)`
  line-height: 1.2;
  letter-spacing: 1px;
  margin-bottom: 15px;
`

const ColumnText = styled.div`
  margin-bottom: 50px;
`

const StyledText = styled(Text)`
  margin-bottom: 25px;
`

const StyledButton = styled(Button)`
  align-self: center;
  margin-bottom: 30px;
`

const BottomTexts = styled.div`
  margin-bottom: 120px;
`

const BottomText = styled(Subtitle)`
  display: block;
  margin: 0 auto;
  transform: rotate(-2deg);
`

export default PlaySlice

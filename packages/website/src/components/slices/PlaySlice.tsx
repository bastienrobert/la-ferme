import React, { FC } from 'react'
import styled from 'styled-components'
import { Button } from '@la-ferme/components'

import Container from '@/components/shared/Container'
import TitleAndSubtitle from '@/components/shared/TitleAndSubtitle'
import Image from '@/components/shared/Image'
import Title from '@/components/typo/Title'
import Subtitle from '@/components/typo/Subtitle'
import Text from '@/components/typo/Text'

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
  return (
    <StyledColumn>
      <NumberIcon src={icon} alt={`number icon ${number}`} />
      <ColumnTitle size="34px">
        <h3>{title}</h3>
      </ColumnTitle>
      <ColumnText>
        {text &&
          text.map(p => (
            <Text textAlign="center">
              <p>{p}</p>
            </Text>
          ))}
      </ColumnText>
      {buttons &&
        buttons.map(({ label }) => (
          <StyledButton variant="primary">{label}</StyledButton>
        ))}
    </StyledColumn>
  )
}

const PlaySlice: FC = () => {
  return (
    <Container as="section">
      <TitleAndSubtitle title={t.title} subtitle={t.subtitle} />
      <Columns>
        {t.columns.map((c, i) => (
          <Column key={`play-col-${i}`} number={i} {...c} />
        ))}
      </Columns>
      <BottomTexts>
        {t.bottom.map(l => (
          <BottomText color="red">
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
  align-items: flex-start;
  margin-bottom: 70px;
`

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
`

const NumberIcon = styled(Image)`
  margin-bottom: 70px;
`

const ColumnTitle = styled(Title)`
  line-height: 1.2;
  letter-spacing: 4%;
  margin-bottom: 15px;
`

const ColumnText = styled.div`
  margin-bottom: 50px;
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

import React, { FC } from 'react'
import styled from 'styled-components'
import { Colors } from '@la-ferme/components'

import Title from '@/components/typo/Title'
import Subtitle from '@/components/typo/Subtitle'

export interface TitleAndSmallTextProps {
  title: string
  small: string[]
  titleColor?: Colors.Typo
  smallColor?: Colors.Typo
}

const TitleAndSmallText: FC<TitleAndSmallTextProps> = ({
  title,
  small,
  titleColor,
  smallColor
}) => {
  return (
    <Component>
      <TitleContainer>
        <StyledTitle color={titleColor}>
          <h1>{title}</h1>
        </StyledTitle>
        <SmallContainer>
          {small.map(l => (
            <StyledSubtitle color={smallColor}>
              <span>{l}</span>
            </StyledSubtitle>
          ))}
        </SmallContainer>
      </TitleContainer>
    </Component>
  )
}

TitleAndSmallText.defaultProps = {
  titleColor: 'beige'
}

const Component = styled.div`
  display: flex;
  margin-bottom: 70px;
  justify-content: center;
`

const TitleContainer = styled.div`
  position: relative;
`

const StyledTitle = styled(Title)`
  margin-bottom: 5px;
  @media (max-width: 600px) {
    font-size: 28px;
  }
`

const SmallContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%) rotate(-4.92deg);
  @media (max-width: 600px) {
    width: 200px;
    transform: translate(45%, 100%) rotate(-4.92deg);
  }
`

const StyledSubtitle = styled(Subtitle)`
  display: block;
  margin: 0 auto;
`

export default TitleAndSmallText

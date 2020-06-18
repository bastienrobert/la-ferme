import React, { FC } from 'react'
import styled from 'styled-components'
import { Colors } from '@la-ferme/components'

import Title from '@/components/typo/Title'
import Subtitle from '@/components/typo/Subtitle'

export interface TitleAndSubtitleProps {
  title: string
  subtitle: string
  titleColor?: Colors.Typo
  subtitleColor?: Colors.Typo
}

const TitleAndSubtitle: FC<TitleAndSubtitleProps> = ({
  title,
  subtitle,
  titleColor,
  subtitleColor
}) => {
  return (
    <Component>
      <StyledTitle color={titleColor}>
        <h1>{title}</h1>
      </StyledTitle>
      <StyledSubtitle color={subtitleColor}>
        <span>{subtitle}</span>
      </StyledSubtitle>
    </Component>
  )
}

TitleAndSubtitle.defaultProps = {
  titleColor: 'blue',
  subtitleColor: 'red'
}

const Component = styled.div`
  margin-bottom: 70px;
`

const StyledTitle = styled(Title)`
  margin-bottom: 5px;
`

const StyledSubtitle = styled(Subtitle)`
  display: block;
  margin: 0 auto;
`

export default TitleAndSubtitle

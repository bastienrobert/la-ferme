import React, { FC } from 'react'
import styled from 'styled-components/native'
import { global as globalData } from '@la-ferme/shared/data'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'
import Title from '@/components/typo/Title'

const content = globalData.report

const ReportComplete: FC = () => {
  return (
    <Container alignSelf="center">
      <StyledTitle preset="H2" color="red" textAlign="center">
        {content.title}
      </StyledTitle>
      <StyledText color="beige" textAlign="center">
        {content.complete}
      </StyledText>
    </Container>
  )
}

const StyledTitle = styled(Title)`
  margin-bottom: 16px;
`

const StyledText = styled(Text)`
  margin-bottom: 10px;
`

export default ReportComplete

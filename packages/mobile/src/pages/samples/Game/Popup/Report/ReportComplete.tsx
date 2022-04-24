import React, { FC } from 'react'
import styled from 'styled-components/native'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'
import Title from '@/components/typo/Title'

const ReportComplete: FC = () => {
  return (
    <Container alignSelf="center">
      <StyledTitle preset="H2" color="red" textAlign="center">
        La brigade
      </StyledTitle>
      <StyledText color="beige" textAlign="center">
        Votre appel a bien été pris en compte ! La brigade va étudier votre
        dossier.
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

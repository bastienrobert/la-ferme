import React, { FC } from 'react'
import styled from 'styled-components/native'

import { AlertInside } from './Alert'
import Text from '@/components/typo/Text'
import Container from '@/components/shared/Container'

export const SmallContent: FC<AlertInside> = ({ title, message }) => {
  return (
    <StyledSmallContent>
      <Text
        color="gray"
        family="bowlby"
        textTransform="uppercase"
        textAlign="center"
        variant="bold">
        {title}
      </Text>
      {message && (
        <SmallMessage size="small" color="gray" textAlign="center">
          {message}
        </SmallMessage>
      )}
    </StyledSmallContent>
  )
}

export const LargeContent: FC<AlertInside> = ({ title, message }) => {
  return (
    <StyledLargeContent>
      <Text
        size="h1"
        color="red"
        family="bowlby"
        textTransform="uppercase"
        textAlign="center"
        variant="bold">
        {title}
      </Text>
      {message && (
        <LargeMessage
          size="small"
          color="gray"
          family="bowlby"
          textTransform="uppercase"
          textAlign="center">
          {message}
        </LargeMessage>
      )}
    </StyledLargeContent>
  )
}

const StyledLargeContent = styled(Container)`
  margin-bottom: 30px;
`

const LargeMessage = styled(Text)`
  margin-top: 10px;
`

const StyledSmallContent = styled(Container)`
  margin-bottom: 30px;
`

const SmallMessage = styled(Text)`
  margin-top: 10px;
`

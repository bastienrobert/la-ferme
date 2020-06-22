import React, { FC, ReactNode } from 'react'
import styled from 'styled-components/native'

import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

export interface NotificationInnerProps {
  title: string
  text: string
  description: ReactNode
}

const NotificationInner: FC<NotificationInnerProps> = ({
  title,
  text,
  description
}) => {
  return (
    <Component>
      <StyledTitle preset="H1" color="red" textAlign="center">
        {title}
      </StyledTitle>
      <StyledText color="beige" textAlign="center">
        {text}
      </StyledText>
      <Title preset="H5" color="beige" textAlign="center">
        {description}
      </Title>
    </Component>
  )
}

const Component = styled(FullContainer)`
  align-items: center;
  justify-content: center;
`

const StyledTitle = styled(Title)`
  margin-bottom: 20px;
`

const StyledText = styled(Text)`
  margin-bottom: 15px;
  width: 90%;
`

export default NotificationInner

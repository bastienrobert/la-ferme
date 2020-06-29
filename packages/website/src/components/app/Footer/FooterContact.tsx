import React, { FC } from 'react'
import styled from 'styled-components'

import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

export interface FooterContactProps {
  content: any
}

const FooterContact: FC<FooterContactProps> = ({ content }) => {
  return (
    <Component>
      <StyledTitle color="beige" size="28px" textAlign="left">
        <h3>{content.title}</h3>
      </StyledTitle>
      <StyledText color="beige" textAlign="left">
        <p>{content.text}</p>
      </StyledText>
      {content.buttons.map((button, i) => (
        <Text color="beige" key={i}>
          <a href={button.href}>{button.label}</a>
        </Text>
      ))}
    </Component>
  )
}

const Component = styled.div``

const StyledTitle = styled(Title)`
  letter-spacing: 1px;
  margin-bottom: 35px;
`

const StyledText = styled(Text)`
  max-width: 270px;
  margin-bottom: 25px;
`

export default FooterContact

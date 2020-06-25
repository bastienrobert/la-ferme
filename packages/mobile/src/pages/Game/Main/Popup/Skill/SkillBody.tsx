import React, { FC, ReactNode } from 'react'
import styled from 'styled-components/native'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

export interface SkillBodyProps {
  text: string
  description: ReactNode
}

const SkillBody: FC<SkillBodyProps> = ({ text, description }) => {
  return (
    <Component alignSelf="center">
      <TextContainer alignSelf="center">
        <StyledText textAlign="center">{text}</StyledText>
        <Title preset="H5" textAlign="center">
          {description}
        </Title>
      </TextContainer>
    </Component>
  )
}

const Component = styled(FullContainer)`
  width: 100%;
  flex: 1;
  justify-content: center;
`

const TextContainer = styled(Container)`
  width: 90%;
  margin-bottom: 17px;
`

const StyledText = styled(Text)`
  margin-bottom: 20px;
`

export default SkillBody

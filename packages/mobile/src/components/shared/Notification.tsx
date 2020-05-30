import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Icon, Colors } from '@la-ferme/components/native'

import Container from './Container'
import SmallCirclesWrapper from './SmallCirclesWrapper'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

const NotificationSample: FC = () => {
  return (
    <Component>
      <StyledContainer>
        <SmallCirclesWrapper>
          <Icon icon="lightning" />
        </SmallCirclesWrapper>
        <TextWrapper>
          <Title color="red" preset="H4">
            Anonyme
          </Title>
          <Text color="beige">Une notification reçue...</Text>
        </TextWrapper>
      </StyledContainer>
    </Component>
  )
}

const Component = styled(Container)`
  position: absolute;
  flex-direction: row;
  padding: 11px;
  top: 23px;
  left: 0;
  width: 100%;
`

const StyledContainer = styled(Container)`
  flex: 1;
  flex-direction: row;
  padding: 13px 21px;
  background-color: ${Colors.gray};
  border-radius: 20px;
`

const TextWrapper = styled(Container)`
  flex: 1;
  align-self: center;
  margin-left: 20px;
  background-color: ${Colors.gray};
`

export default NotificationSample

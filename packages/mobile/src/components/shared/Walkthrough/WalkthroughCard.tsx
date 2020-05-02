import React, { FC } from 'react'
import styled from 'styled-components/native'

import background from '@/assets/images/role/ticket_01.png'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'
import Title from '@/components/typo/Title'

const WalkthroughCard: FC<any> = ({ data }) => {
  return (
    <Component>
      <StyledImage source={background} />
      <MainContainer>
        <Title preset="H1" color="gray">
          TITLE
        </Title>
        <Title preset="H2" color="gray">
          {data}
        </Title>
        <Text color="gray">#HASHTAG</Text>
        <Text color="gray">Description</Text>
      </MainContainer>
    </Component>
  )
}

export default WalkthroughCard

const Component = styled(Container)`
  width: 100%;
  height: 100%;
  margin: auto;
  margin-top: 8%;
  flex-direction: column;
  align-items: center;
`

const MainContainer = styled.View`
  padding: 10%;
`

const StyledImage = styled.Image`
  width: 95%;
  height: 85%;
  resize-mode: stretch;
  position: absolute;
`

import React, { FC } from 'react'
import styled from 'styled-components/native'

import { PopupProps } from './'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import SlideToAnswer from '@/components/shared/SlideToAnswer'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

const PhoneCall: FC<PopupProps> = () => {
  return (
    <Component>
      <Wrapper>
        <Container alignSelf="center">
          <Title preset="H1" color="red" textAlign="center">
            la brigade
          </Title>
          <Text color="beige" textAlign="center">
            Appel entrant
          </Text>
        </Container>
      </Wrapper>
      <SlideToAnswer
        onPickUp={() => console.log('PICK UP')}
        onHangUp={() => console.log('HANG UP')}
      />
    </Component>
  )
}

const Component = styled(FullContainer)`
  padding-bottom: 50px;
`

const Wrapper = styled(FullContainer)`
  justify-content: center;
`

export default PhoneCall

import React, { FC } from 'react'
import styled from 'styled-components/native'

import FullContainer from './FullContainer'
import Container from './Container'
import CardPickUp, {
  RATIO as CARD_PICK_UP_RATIO
} from '@/components/cards/pick/up'
import CardPickDown from '@/components/cards/pick/down'

const PickCard: FC<any> = () => {
  return (
    <Component>
      <StyledContainer>
        <StyledCard as={CardPickUp} />
        <StyledImage
          resizeMode="contain"
          source={require('@/assets/images/role/just_arrived.png')}
        />
      </StyledContainer>
      <StyledContainer>
        <StyledCard as={CardPickDown} />
        <StyledImage
          resizeMode="contain"
          source={require('@/assets/images/role/just_arrived.png')}
        />
      </StyledContainer>
    </Component>
  )
}

const Component = styled(FullContainer)``

const StyledContainer = styled(Container)`
  width: 90%;
  max-width: 400px;
  aspect-ratio: ${CARD_PICK_UP_RATIO};
`

const StyledCard = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const StyledImage = styled.Image`
  flex: 1;
  width: 90%;
  max-width: 200px;
  align-self: center;
  justify-content: center;
`

export default PickCard

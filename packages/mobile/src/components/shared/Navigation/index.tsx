import React, { FC } from 'react'

import styled from 'styled-components/native'

import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'

const Navigation: FC<any> = ({ changeCard, currentIndex, titles }) => {
  return (
    <NavigationContainer>
      {titles.map((title, i) => {
        if (i === currentIndex) {
          return (
            <StyledButton
              key={i}
              onPress={() => {
                changeCard(i)
              }}>
              <Title preset="H4" color="beige">
                {title}
              </Title>
            </StyledButton>
          )
        } else {
          return (
            <StyledButton
              key={i}
              onPress={() => {
                changeCard(i)
              }}>
              <Title preset="H4">{title}</Title>
            </StyledButton>
          )
        }
      })}
    </NavigationContainer>
  )
}

export default Navigation

const NavigationContainer = styled(Container)`
  width: 90%;
  margin-horizontal: 5%;
  position: absolute;
  bottom: 5%;
  flex-direction: row;
  justify-content: space-between;
`

const StyledButton = styled.TouchableOpacity``

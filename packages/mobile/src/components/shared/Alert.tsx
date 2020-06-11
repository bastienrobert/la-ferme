import React, { FC } from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components'
import { Colors, Icon } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'

import { hexToRgba } from '@/utils/colors'

export interface AlertProps {
  title: string
  message?: string
  onPress: (e?: GestureResponderEvent) => void
}

const Alert: FC<AlertProps> = ({ title, message, onPress }) => {
  return (
    <Component>
      <Wrapper alignSelf="center">
        <TextContainer>
          <Text color="gray" textAlign="center" variant="bold">
            {title}
          </Text>
          {message && (
            <Message size="small" color="gray" textAlign="center">
              {message}
            </Message>
          )}
        </TextContainer>
        <Container alignSelf="center">
          <Icon icon="cross" background="red" onPress={onPress} />
        </Container>
      </Wrapper>
    </Component>
  )
}

const Component = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${hexToRgba(Colors.beige, 0.85)};
  border-radius: 13px;
  max-width: 300px;
  width: 90%;
  z-index: 999;
`

const Wrapper = styled(Container)`
  padding: 20px;
`

const TextContainer = styled(Container)`
  margin-bottom: 30px;
`

const Message = styled(Text)`
  margin-top: 10px;
`

export default Alert

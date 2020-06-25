import React, { FC, ReactNode } from 'react'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'

import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import BigCirclesWrapper from '@/components/shared/BigCirclesWrapper'
import TextWithCharacter from '@/components/shared/TextWithCharacter'
import Title from '@/components/typo/Title'

export interface NotificationInnerProps {
  title: string
  text: ReactNode
  description: string
  params?: { [key: string]: any }
}

const NotificationInner: FC<NotificationInnerProps> = ({
  title,
  text,
  description,
  params = {}
}) => {
  const { character, ...rest } = params

  return (
    <Component>
      <BigCirclesWrapper alignSelf="center">
        <BigCirclesInner source={require('@/assets/tmp/call.webp')} />
      </BigCirclesWrapper>
      <StyledTitle preset="H1" color="red" textAlign="center">
        {title}
      </StyledTitle>
      <TextContainer alignSelf="center">
        <TextWithCharacter character={character} text={text} color="beige" />
      </TextContainer>
      <TextWithCharacter
        character={character}
        type="title"
        text={description}
        params={rest}
        color="beige"
      />
    </Component>
  )
}

const Component = styled(FullContainer)`
  align-items: center;
  justify-content: center;
`

const BigCirclesInner = styled(FastImage)`
  width: 100%;
  aspect-ratio: 1;
`

const StyledTitle = styled(Title)`
  margin-bottom: 20px;
`

const TextContainer = styled(Container)`
  margin-bottom: 15px;
  width: 90%;
`

export default NotificationInner

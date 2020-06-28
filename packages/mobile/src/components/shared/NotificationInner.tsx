import React, { FC, ReactNodeArray } from 'react'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'

import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import BigCirclesWrapper from '@/components/shared/BigCirclesWrapper'
import TextWithCharacter from '@/components/shared/TextWithCharacter'
import Title from '@/components/typo/Title'
import { Colors } from '@la-ferme/components/native'

export interface NotificationInnerProps {
  title: string
  text: string | ReactNodeArray
  description: string
  backgroundImage?: Colors.Any
  image: any
  params?: { [key: string]: any }
}

const NotificationInner: FC<NotificationInnerProps> = ({
  title,
  text,
  description,
  backgroundImage,
  image,
  params = {}
}) => {
  const { character, ...rest } = params

  return (
    <Component>
      <StyledBigCirclesWrapper background={backgroundImage} alignSelf="center">
        <BigCirclesInner source={image} />
      </StyledBigCirclesWrapper>
      <Wrapper alignSelf="center">
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
      </Wrapper>
    </Component>
  )
}

const Component = styled(FullContainer)`
  align-items: center;
  justify-content: center;
`
const StyledBigCirclesWrapper = styled(BigCirclesWrapper)`
  margin-top: -60px;
`

const BigCirclesInner = styled(FastImage)`
  width: 100%;
  aspect-ratio: 1;
`

const StyledTitle = styled(Title)`
  margin-bottom: 20px;
`

const Wrapper = styled(Container)`
  margin-top: -20px;
`

const TextContainer = styled(Container)`
  margin-bottom: 15px;
  width: 90%;
`

export default NotificationInner

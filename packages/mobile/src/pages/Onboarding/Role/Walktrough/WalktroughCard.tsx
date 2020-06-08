import React, { FC } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Button } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'

import WalktroughCardTitle from './WalktroughCardTitle'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'
import TitleWithHashtag from '@/components/shared/TitleWithHashtag'
import Container, { ContainerProps } from '@/components/shared/Container'

import getCardImage from './getCardImage'
import getCardBackground from './getCardBackground'
import getCardData from './getCardData'
import { shadow, inner } from '@/components/cards/cards.style'
import { Skill } from '@la-ferme/shared/typings'

export const content = globalData.role

export type WalktroughCardType = 'character' | 'skill' | 'goal'

export interface WalktroughCardData extends ContainerProps {
  name: string
  type: WalktroughCardType
}

export interface WalktroughCardProps
  extends ContainerProps,
    WalktroughCardData {
  onPress: () => void
}

const WalktroughCard: FC<WalktroughCardProps> = ({
  name,
  type,
  onPress,
  ...props
}) => {
  const { Up, Down, RATIO_UP, RATIO_DOWN } = getCardBackground(type)
  const data = getCardData(type, name)

  const isGoal = type === 'goal'

  return (
    <Component {...props}>
      <TopStyledContainer style={{ aspectRatio: RATIO_UP }}>
        <StyledCard as={Up} />
        {type !== 'character' && (
          <JustArrived
            source={require('@/assets/images/role/just_arrived.png')}
          />
        )}
        <BigImage
          source={getCardImage(type, name)}
          resizeMode={FastImage.resizeMode.contain}
        />
        <TopInner>
          <WalktroughCardTitle type={type} />
        </TopInner>
      </TopStyledContainer>
      <BottomStyledContainer style={{ aspectRatio: RATIO_DOWN }}>
        <StyledCard as={Down} />
        <BottomInner>
          <StyledTitleWithHashtag
            alignSelf="center"
            title={data.displayName}
            titlePreset={isGoal ? 'H3' : 'H1'}
            hashtag={[data.description]}
            titleColor="gray"
            hashtagColor="red"
          />
          <StyledText textAlign="center">{data.text}</StyledText>
          {type === 'skill' && (
            <StyledEffect preset="H5" textAlign="center">
              {(data as Skill).effect}
            </StyledEffect>
          )}
          {onPress && (
            <ButtonContainer alignSelf="center">
              <Button variant="secondary" onPress={onPress}>
                {content.button}
              </Button>
            </ButtonContainer>
          )}
        </BottomInner>
      </BottomStyledContainer>
    </Component>
  )
}

export default WalktroughCard

const Component = styled(Container)`
  width: 90%;
  height: 100%;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const TopStyledContainer = styled(Container)`
  width: 100%;
`

const TopInner = styled(Container)`
  ${inner}
  padding: 43px 12px;
`

const BigImage = styled(FastImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`

const BottomInner = styled(Container)`
  ${inner}
  padding: 28px 26px;
`

const BottomStyledContainer = styled(Container)`
  margin-top: -1px;
  width: 100%;
`

const JustArrived = styled.Image`
  position: absolute;
  top: -10px;
  right: -15px;
`

const StyledTitleWithHashtag = styled(TitleWithHashtag)`
  margin-bottom: 20px;
`

const StyledText = styled(Text)`
  margin-bottom: 20px;
`

const StyledEffect = styled(Title)``

const ButtonContainer = styled(Container)`
  margin-top: auto;
`

const StyledCard = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  ${shadow}
`

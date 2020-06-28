import React, { FC } from 'react'
import { css } from 'styled-components'
import styled from 'styled-components/native'
import { TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors, Button } from '@la-ferme/components/native'
import { Skill, Player } from '@la-ferme/shared/typings'
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

import { complementaries, buttons } from '@/utils/colors'
import { charactersByName } from '@/utils/helpers/players'

const content = globalData.role

export type WalktroughCardType = 'character' | 'skill' | 'goal'

export interface WalktroughCardData extends ContainerProps {
  name: string
  type: WalktroughCardType
}

export interface WalktroughCardProps
  extends ContainerProps,
    WalktroughCardData {
  player: Player
  onPress: () => void
}

const WalktroughCard: FC<WalktroughCardProps> = ({
  name,
  type,
  player,
  onPress,
  ...props
}) => {
  const { Up, Down, RATIO_UP, RATIO_DOWN } = getCardBackground(type)
  const data = getCardData(type, name)

  const character = charactersByName[player.character]

  return (
    <Component alignSelf="center" {...props}>
      <TopStyledContainer style={{ aspectRatio: RATIO_UP }}>
        <StyledCard as={Up} />
        {type !== 'character' && (
          <TopSecret
            resizeMode="contain"
            source={require('@/assets/images/role/top_secret.png')}
          />
        )}
        <BigImage
          source={getCardImage(type, name)}
          full={type === 'character'}
          resizeMode={FastImage.resizeMode.contain}
        />
        <TopInner>
          <WalktroughCardTitle
            color={character.color as Colors.Theme}
            type={type}
          />
        </TopInner>
      </TopStyledContainer>
      <BottomStyledContainer style={{ aspectRatio: RATIO_DOWN }}>
        <StyledCard as={Down} />
        <BottomInner>
          <TextContainer alignSelf="center">
            <StyledTitleWithHashtag
              alignSelf="center"
              title={data.displayName}
              titlePreset={'H1'}
              hashtag={[data.description]}
              anchor="right"
              hashtagOffset={{ x: 30, y: 10 }}
              titleColor="gray"
              hashtagColor={complementaries[character.color]}
            />
            <StyledScrollView alwaysBounceVertical={false}>
              <TouchableWithoutFeedback>
                <Container alignSelf="stretch">
                  <StyledText textAlign="center">{data.text}</StyledText>
                  {type === 'skill' && (
                    <StyledEffect preset="H5" textAlign="center">
                      {(data as Skill).effect}
                      {(data as Skill).effect}
                    </StyledEffect>
                  )}
                </Container>
              </TouchableWithoutFeedback>
            </StyledScrollView>
          </TextContainer>
          {onPress && (
            <ButtonContainer alignSelf="center">
              <Button variant={buttons[character.color]} onPress={onPress}>
                {content.cta_ready}
              </Button>
            </ButtonContainer>
          )}
        </BottomInner>
      </BottomStyledContainer>
    </Component>
  )
}

export default WalktroughCard

const Component = styled(Container)<any>`
  max-width: 100%;
  max-height: 100%;
  margin: auto 10px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  aspect-ratio: ${352 / 610};
`

const TopStyledContainer = styled(Container)`
  width: 100%;
`

const TopInner = styled(Container)`
  ${inner}
  padding: 43px 12px;
`

const BigImage = styled(FastImage)<any>`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 999;
  ${({ full }) =>
    full
      ? css`
          height: 100%;
        `
      : css`
          transform: scale(1.2);
          bottom: 8%;
          height: 70%;
        `}
`

const BottomInner = styled(Container)`
  ${inner}
  padding: 26px 26px 0 26px;
`

const BottomStyledContainer = styled(Container)`
  margin-top: -1px;
  width: 100%;
`

const TextContainer = styled(Container)`
  flex: 1;
`

const StyledScrollView = styled.ScrollView`
  margin-bottom: 20px;
`

const TopSecret = styled.Image`
  position: absolute;
  top: -15px;
  right: -20px;
  width: 111px;
  transform: rotate(-8deg);
`

const StyledTitleWithHashtag = styled(TitleWithHashtag)`
  margin-bottom: 30px;
`

const StyledText = styled(Text)`
  margin-bottom: 20px;
`

const StyledEffect = styled(Title)`
  margin-top: 20px;
`

const ButtonContainer = styled(Container)`
  margin-top: auto;
  margin-bottom: 26px;
`

const StyledCard = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  ${shadow}
`

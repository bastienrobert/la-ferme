import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Button } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'

import { GameStatisticsParams } from '../'
import TitlesContent from './TitlesContent'
import AppraisalContent from './AppraisalContent'
import Container, { ContainerProps } from '@/components/shared/Container'

import CardStatisticsUp, {
  RATIO as CARD_STATISTICS_UP_RATIO
} from '@/components/cards/statistics/up'
import CardStatisticsDown, {
  RATIO as CARD_STATISTICS_DOWN_RATIO
} from '@/components/cards/statistics/down'

import { shadow, inner } from '@/components/cards/cards.style'

const content = globalData.statistics

export type StatisticCardType = 'titles' | 'player' | 'game'

export interface StatisticCardData
  extends ContainerProps,
    GameStatisticsParams {
  type: StatisticCardType
}

export interface StatisticCardProps extends ContainerProps, StatisticCardData {
  onPress: () => void
}

const StatisticCard: FC<StatisticCardProps> = ({ onPress, ...props }) => {
  return (
    <Component alignSelf="center" {...props}>
      <TopStyledContainer>
        <StyledCard as={CardStatisticsUp} />
        <TopInner>
          {props.type === 'titles' ? (
            <TitlesContent {...props} />
          ) : (
            <AppraisalContent {...props} />
          )}
        </TopInner>
      </TopStyledContainer>
      <BottomStyledContainer>
        <StyledCard as={CardStatisticsDown} />
        <BottomInner>
          {onPress && (
            <ButtonContainer alignSelf="center">
              <Button onPress={onPress}>{content.cta_replay}</Button>
            </ButtonContainer>
          )}
        </BottomInner>
      </BottomStyledContainer>
    </Component>
  )
}

export default StatisticCard

const Component = styled(Container)<any>`
  max-width: 100%;
  max-height: 100%;
  margin: auto 10px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  aspect-ratio: ${352 / 659};
`

const TopStyledContainer = styled(Container)`
  width: 100%;
  aspect-ratio: ${CARD_STATISTICS_UP_RATIO};
`

const TopInner = styled(Container)`
  ${inner}
  padding: 43px 12px;
`

const BottomInner = styled(Container)`
  ${inner}
  padding: 26px 26px 0 26px;
`

const BottomStyledContainer = styled(Container)`
  margin-top: -1px;
  width: 100%;
  aspect-ratio: ${CARD_STATISTICS_DOWN_RATIO};
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

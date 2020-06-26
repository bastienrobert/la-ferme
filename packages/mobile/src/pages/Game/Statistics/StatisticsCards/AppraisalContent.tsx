import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Icon } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'

import { StatisticCardData } from './StatisticCard'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import TitleWithHashtag from '@/components/shared/TitleWithHashtag'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import Gauge from '@/components/svgs/Gauge'

import { statisticsByName } from '@/utils/helpers/statistics'
const content = globalData.statistics

const AppraisalContent: FC<StatisticCardData> = ({
  type,
  player,
  statistics
}) => {
  const data =
    type === 'player'
      ? statistics.players.find(p => p.player === player.uuid)
      : statistics.global

  const progress = data.civil / (data.civil + data.uncivil) || 0

  const text =
    type === 'player' ? statisticsByName[data.name]?.text : content[data.name]

  return (
    <Component>
      <Container alignSelf="center">
        <Title color="red" preset="H5" textAlign="center">
          {content[type].subtitle}
        </Title>
        <Title color="gray" preset="H2" textAlign="center">
          {content.appraisal.title_1}
        </Title>
        <TitleWithHashtag
          alignSelf="center"
          textAlign="center"
          title={content.appraisal.title_2}
          titlePreset="H2"
          hashtag={[content.appraisal.description]}
          anchor="right"
          hashtagOffset={{ x: 20, y: 10 }}
          titleColor="gray"
          hashtagColor="blue"
        />
      </Container>
      <Container alignSelf="center">
        <StyledGauge progress={progress} />
        <CivilCounter preset="H5" color="blue">
          {data.civil} {content.appraisal.civil}
        </CivilCounter>
        <UncivilCounter preset="H5" color="gray">
          {data.uncivil} {content.appraisal.uncivil}
        </UncivilCounter>
      </Container>
      <IconsContainer alignSelf="center">
        <IconContainer>
          <Icon icon="brigade" size={40} />
          <Title preset="H3" color="red">
            X{data.reports}
          </Title>
        </IconContainer>
        <IconContainer>
          <Icon icon="lightning" size={40} />
          <Title preset="H3" color="red">
            X{data.skill}
          </Title>
        </IconContainer>
      </IconsContainer>
      <Text textAlign="center">{text}</Text>
    </Component>
  )
}

const Component = styled(FullContainer)`
  justify-content: space-between;
  align-items: center;
`

const IconsContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 250px;
`

const IconContainer = styled(Container)`
  flex-direction: row;
  align-items: center;
`

const Counter = styled(Title)`
  position: absolute;
  width: 100px;
`

const CivilCounter = styled(Counter)`
  top: 0;
  left: -40px;
`

const UncivilCounter = styled(Counter)`
  bottom: 0;
  right: -10px;
`

const StyledGauge = styled(Gauge)`
  width: 201px;
  height: 201px;
`

export default AppraisalContent

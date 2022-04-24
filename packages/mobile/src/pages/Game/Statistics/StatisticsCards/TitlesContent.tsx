import React, { FC } from 'react'
import styled from 'styled-components/native'
import { TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import { global as globalData } from '@la-ferme/shared/data'

import { StatisticCardData } from './StatisticCard'
import TitleWithHashtag from '@/components/shared/TitleWithHashtag'
import Container from '@/components/shared/Container'
import PlayerImage from '@/components/shared/PlayerImage'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import { winImages, looseImages } from '@/utils/helpers/players'
import { statisticsByName } from '@/utils/helpers/statistics'

const content = globalData.statistics

const TitlesContent: FC<StatisticCardData> = ({
  player,
  players,
  statistics,
  winner
}) => {
  const isWinner = player.uuid === winner
  const sortedPlayers = players.sort(p => {
    return p.uuid === winner ? -1 : 0
  })

  const playerStatistic = statistics.players.find(p => {
    return p.player === player.uuid
  })
  const playerStatisticText = statisticsByName[playerStatistic?.name]
  const images = isWinner ? winImages : looseImages

  return (
    <>
      <Title color="red" preset="H5">
        {content.titles.subtitle}
      </Title>
      <BigImage source={images[player.character]} />
      <TitleWithHashtag
        alignSelf="center"
        title={content.titles.title}
        hashtag={[playerStatisticText.description]}
        titleColor="gray"
        hashtagColor="blue"
      />
      <StyledScrollView alwaysBounceVertical={false}>
        <TouchableWithoutFeedback>
          <PlayersContainer alignSelf="center">
            {sortedPlayers.map((player, index) => {
              const statistic = statistics.players.find(
                p => p.player === player.uuid
              )
              const text = statisticsByName[statistic?.name]

              return (
                <PlayerContainer key={index}>
                  <StyledPlayerImage player={player} />
                  <StyledText>{text.displayName}</StyledText>
                </PlayerContainer>
              )
            })}
          </PlayersContainer>
        </TouchableWithoutFeedback>
      </StyledScrollView>
    </>
  )
}

const BigImage = styled(FastImage)`
  width: 60%;
  max-width: 600px;
  aspect-ratio: 1;
`

const PlayersContainer = styled(Container)`
  align-items: center;
  margin-top: 11px;
`

const StyledScrollView = styled.ScrollView`
  flex: 1;
`

const PlayerContainer = styled(Container)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 22px;
`

const StyledPlayerImage = styled(PlayerImage)`
  width: 43px;
  height: 43px;
  border-radius: ${43 / 2}px;
`

const StyledText = styled(Text)`
  margin-left: 15px;
`

export default TitlesContent

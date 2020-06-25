import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'
import Title from '@/components/typo/Title'
import PlayerSelect from '@/components/shared/PlayerSelect'
import { global as globalData } from '@la-ferme/shared/data'

import { getAllExceptCurrent } from '@/utils/helpers/players'

const content = globalData.report

export interface ReportSelectProps {
  player: Player
  players: Player[]
  setPlayer: (player: Player) => void
}

const ReportSelect: FC<ReportSelectProps> = ({
  player,
  players,
  setPlayer
}) => {
  const filteredPlayers = getAllExceptCurrent(players, player)

  return (
    <Container alignSelf="center">
      <TextContainer>
        <StyledTitle preset="H2" color="red" textAlign="center">
          {content.title}
        </StyledTitle>
        <StyledText color="beige" textAlign="center">
          {content.select.text}
        </StyledText>
        <Title preset="H5" color="beige" textAlign="center">
          {content.select.description}
        </Title>
      </TextContainer>
      <PlayerSelectContainer alignSelf="center">
        <PlayerSelect players={filteredPlayers} onPress={setPlayer} />
      </PlayerSelectContainer>
    </Container>
  )
}

const TextContainer = styled(Container)`
  margin-bottom: 34px;
`

const StyledTitle = styled(Title)`
  margin-bottom: 16px;
`

const StyledText = styled(Text)`
  margin-bottom: 10px;
`

const PlayerSelectContainer = styled(Container)`
  margin-bottom: 38px;
`

export default ReportSelect

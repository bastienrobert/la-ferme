import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'
import { global as globalData } from '@la-ferme/shared/data'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'
import Title from '@/components/typo/Title'
import PlayerImage from '@/components/shared/PlayerImage'
import PlayerWithColor from '@/components/shared/PlayerWithColor'

const content = globalData.report

export interface ReportConfirmProps {
  player: Player
}

const ReportConfirm: FC<ReportConfirmProps> = ({ player }) => {
  return (
    <>
      <TextContainer alignSelf="center">
        <StyledTitle preset="H2" color="red" textAlign="center">
          {content.title}
        </StyledTitle>
        <StyledText color="beige" textAlign="center">
          {content.confirm.text_1}
          <PlayerWithColor character={player.character} size="xsmall" />
          {content.confirm.text_2}
        </StyledText>
        <Title preset="H5" color="beige" textAlign="center">
          {content.confirm.description}
        </Title>
      </TextContainer>
      <Container alignSelf="center">
        <PlayerImage player={player} />
      </Container>
    </>
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

export default ReportConfirm

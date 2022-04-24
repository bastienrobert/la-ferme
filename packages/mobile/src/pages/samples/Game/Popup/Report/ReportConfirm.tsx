import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'
import Title from '@/components/typo/Title'
import PlayerImage from '@/components/shared/PlayerImage'
import PlayerWithColor from '@/components/shared/PlayerWithColor'

export interface ReportConfirmProps {
  player: Player
}

const ReportConfirm: FC<ReportConfirmProps> = ({ player }) => {
  return (
    <>
      <TextContainer alignSelf="center">
        <StyledTitle preset="H2" color="red" textAlign="center">
          La brigade
        </StyledTitle>
        <StyledText color="beige" textAlign="center">
          Vous êtes sur le point de dénoncer{' '}
          <PlayerWithColor character={player.character} size="xsmall" /> à la
          brigade.
        </StyledText>
        <Title preset="H5" color="beige" textAlign="center">
          confirmez votre choix:
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

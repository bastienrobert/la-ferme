import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'
import Title from '@/components/typo/Title'
import PlayerSelect from '@/components/shared/PlayerSelect'

export interface ReportSelectProps {
  setPlayer: (player: Player) => void
  players: Player[]
}

const ReportSelect: FC<ReportSelectProps> = ({ setPlayer, players }) => {
  return (
    <>
      <TextContainer>
        <StyledTitle preset="H2" color="red" textAlign="center">
          La brigade
        </StyledTitle>
        <StyledText color="beige" textAlign="center">
          Vous trouvez qu’un joueur commet trop d’incivilités ? Les poulets sont
          là pour rétablir l’ordre dans la basse cour.
        </StyledText>
        <Title preset="H5" color="beige" textAlign="center">
          quel joueur dénoncer :
        </Title>
      </TextContainer>
      <PlayerSelectContainer alignSelf="center">
        <PlayerSelect players={players} onPress={setPlayer} />
      </PlayerSelectContainer>
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

const PlayerSelectContainer = styled(Container)`
  margin-bottom: 38px;
`

export default ReportSelect

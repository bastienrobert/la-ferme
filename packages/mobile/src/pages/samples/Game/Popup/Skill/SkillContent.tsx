import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'
import { Button } from '@la-ferme/components/native'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'
import PlayerSelect from '@/components/shared/PlayerSelect'
import PlayerImage from '@/components/shared/PlayerImage'

export interface SkillContentProps {
  player: Player
  players: Player[]
  onConfirm: (targets: Player[]) => void
}

interface SkillContentInnerProps extends SkillContentProps {
  onPlayerSelect: (player: Player) => void
  onConfirm: () => void
}

const Inner: FC<SkillContentInnerProps> = ({
  player,
  players,
  onConfirm,
  onPlayerSelect
}) => {
  switch (player.skill) {
    case 'cellphone':
      return <PlayerSelect players={players} onPress={onPlayerSelect} />
    case 'speaker':
    case 'shepherds-stick':
      return <PlayerImage player={player} />
    default:
      return <Button onPress={onConfirm}>YEP</Button>
  }
}

const SkillContent: FC<SkillContentProps> = ({
  player,
  players,
  onConfirm
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>()

  const onConfirmPress = () => {
    onConfirm([selectedPlayer])
  }

  const onResetPress = () => setSelectedPlayer(undefined)

  if (selectedPlayer) {
    return (
      <Component alignSelf="center">
        <Title preset="H5" textAlign="center">
          confirmez votre choix
        </Title>
        <Container alignSelf="center">
          <PlayerImage player={selectedPlayer} />
        </Container>
        <ButtonContainer alignSelf="center">
          <Button onPress={onConfirmPress}>YEP</Button>
          <Button onPress={onResetPress}>NOPE</Button>
        </ButtonContainer>
      </Component>
    )
  }

  return (
    <Component alignSelf="center">
      <TextContainer alignSelf="center">
        <StyledText textAlign="center">
          Vous avez une faim de loup, c'est l'heure de rassasier votre appetit.
          Au menu ?Un gros Big Meuh.
        </StyledText>
        <Title preset="H5" textAlign="center">
          ce tour-ci vous piochez deux cartes
        </Title>
      </TextContainer>
      <Container alignSelf="center">
        <Inner
          player={player}
          players={players}
          onConfirm={onConfirmPress}
          onPlayerSelect={setSelectedPlayer}
        />
      </Container>
    </Component>
  )
}

const Component = styled(FullContainer)`
  width: 100%;
  justify-content: space-between;
`

const TextContainer = styled(Container)`
  width: 90%;
  margin-bottom: 17px;
`

const StyledText = styled(Text)`
  margin-bottom: 10px;
`

const ButtonContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  max-width: 400px;
`

export default SkillContent

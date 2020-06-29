import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { Player, Skill } from '@la-ferme/shared/typings'
import { Button } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'
import PlayerSelect from '@/components/shared/PlayerSelect'
import PlayerImage from '@/components/shared/PlayerImage'

import { getAllExceptCurrent } from '@/utils/helpers/players'
import TextWithCharacter from '@/components/shared/TextWithCharacter'

const content = globalData.skill

export interface SkillContentProps {
  player: Player
  skill: Skill
  players: Player[]
  onConfirm: (targets?: Player[]) => void
}

interface SkillContentInnerProps {
  player: Player
  players: Player[]
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
      const filteredPlayers = getAllExceptCurrent(players, player)
      return <PlayerSelect players={filteredPlayers} onPress={onPlayerSelect} />
    case 'speaker':
    case 'shepherds-stick':
      return <PlayerImage player={player} />
    default:
      return <Button onPress={onConfirm}>YEP</Button>
  }
}

const SkillContent: FC<SkillContentProps> = ({
  player,
  skill,
  players,
  onConfirm
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>()

  const onConfirmPress = () => {
    selectedPlayer ? onConfirm([selectedPlayer]) : onConfirm()
  }

  const onResetPress = () => setSelectedPlayer(undefined)

  if (selectedPlayer) {
    return (
      <Component alignSelf="center">
        <Title preset="H5" textAlign="center">
          {content.content.confirm}
        </Title>
        <Container alignSelf="center">
          <PlayerImage player={selectedPlayer} />
        </Container>
        <ButtonContainer alignSelf="center">
          <Button onPress={onConfirmPress}>{content.cta_yes}</Button>
          <Button onPress={onResetPress}>{content.cta_no}</Button>
        </ButtonContainer>
      </Component>
    )
  }

  return (
    <Component alignSelf="center">
      <TextContainer alignSelf="center">
        <StyledText textAlign="center">{skill.text}</StyledText>
        <TextWithCharacter
          type="title"
          text={skill.use}
          character={player.character}
        />
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
  width: 95%;
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

import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'
import { Button, Icon } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'

export interface SkillActionsProps {
  player: Player
  confirm: boolean
  onConfirm: () => void
  onCancel: () => void
}

interface IconActionProps {
  onPress: () => void
}

const IconAction: FC<IconActionProps> = ({ onPress }) => {
  return (
    <Container alignSelf="center">
      <Icon icon="cross" background="red" onPress={onPress} />
    </Container>
  )
}

const SkillActions: FC<SkillActionsProps> = ({
  player,
  confirm,
  onConfirm,
  onCancel
}) => {
  const onConfirmPress = () => onConfirm()
  const onCancelPress = () => onCancel()

  if (confirm) return <IconAction onPress={onCancelPress} />

  switch (player.skill) {
    case 'speaker':
    case 'shepherds-stick':
      return (
        <ButtonContainer alignSelf="center">
          <Button onPress={onConfirmPress}>YEP</Button>
          <Button onPress={onCancelPress}>NOPE</Button>
        </ButtonContainer>
      )
    default:
      return <IconAction onPress={onCancelPress} />
  }
}

const ButtonContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  max-width: 400px;
`

export default SkillActions

import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'
import { Button, Icon } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'

import Container from '@/components/shared/Container'

const content = globalData.skill

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
    <IconContainer alignSelf="center">
      <Icon icon="cross" background="red" onPress={onPress} />
    </IconContainer>
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
          <Button onPress={onConfirmPress}>{content.cta_yes}</Button>
          <Button onPress={onCancelPress}>{content.cta_no}</Button>
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
  flex: 1;
`

const IconContainer = styled(Container)`
  flex: 1;
  justify-content: center;
`

export default SkillActions

import React, { FC, useState } from 'react'
import styled from 'styled-components/native'

import { CardStepProps, CardStepType } from '.'
import PickCard from './PickCard'
import YouChoose from './YouChoose'
import CardAnimation from './CardAnimation'
import { Component, Cards } from './cardStep.styles'

const PlayerCardStep: FC<CardStepProps> = ({
  player,
  onCivilPress,
  onUncivilPress
}) => {
  const [choice, setChoice] = useState<CardStepType>()

  const onCardPress = (type: CardStepType) => {
    if (choice) return
    setChoice(type)

    setTimeout(() => {
      if (type === CardStepType.Civil) onCivilPress && onCivilPress()
      else if (type === CardStepType.Uncivil) {
        onUncivilPress && onUncivilPress()
      }
    }, 1500)
  }

  return (
    <Component>
      <YouChoose color="beige" visible={!!choice} />
      <CardAnimation type={choice} player={player} />
      <Cards alignSelf="center">
        <UpperPickCard
          type={CardStepType.Civil}
          choice={choice}
          onPress={onCardPress}
        />
        <PickCard
          type={CardStepType.Uncivil}
          choice={choice}
          onPress={onCardPress}
        />
      </Cards>
    </Component>
  )
}

export const UpperPickCard = styled(PickCard)`
  margin-bottom: 30px;
`

export default PlayerCardStep

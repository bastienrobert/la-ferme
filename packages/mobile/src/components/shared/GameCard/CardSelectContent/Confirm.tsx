import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'
import { Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import PlayerImage from '@/components/shared/PlayerImage'
import Title from '@/components/typo/Title'

export interface ConfirmProps {
  player: Player
  onConfirm: () => void
  onCancel: () => void
}

const Confirm: FC<ConfirmProps> = ({ player, onConfirm, onCancel }) => {
  return (
    <>
      <TitleContainer alignSelf="center">
        <Title preset="H5" textAlign="center">
          Confirmez votre choix
        </Title>
      </TitleContainer>
      <Container alignSelf="center">
        <PlayerImage player={player} />
      </Container>
      <ButtonsContainer alignSelf="center">
        <Container>
          <Button onPress={onConfirm}>Yes</Button>
        </Container>
        <Container>
          <Button onPress={onCancel}>No</Button>
        </Container>
      </ButtonsContainer>
    </>
  )
}

const TitleContainer = styled(Container)`
  margin-bottom: 20px;
`

const ButtonsContainer = styled(Container)`
  width: 90%;
  max-width: 300px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: auto;
`

export default Confirm

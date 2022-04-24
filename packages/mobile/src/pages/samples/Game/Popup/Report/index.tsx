import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'
import { Button, Icon } from '@la-ferme/components/native'

import { PopupProps } from '../'
import ReportSelect from './ReportSelect'
import ReportConfirm from './ReportConfirm'
import ReportComplete from './ReportComplete'
import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'

const Report: FC<PopupProps> = ({ set, players }) => {
  const [player, setPlayer] = useState<Player>()
  const [confirm, setConfirm] = useState<Boolean>()

  const onClose = () => {
    set(undefined)
  }

  const onConfirm = () => setConfirm(true)

  const onCancel = () => setPlayer(undefined)

  return (
    <Component>
      <Wrapper alignSelf="center">
        {player ? (
          confirm ? (
            <ReportComplete />
          ) : (
            <ReportConfirm player={player} />
          )
        ) : (
          <ReportSelect players={players} setPlayer={setPlayer} />
        )}
      </Wrapper>
      <BottomContainer alignSelf="center">
        {player && !confirm ? (
          <ButtonContainer alignSelf="center">
            <Button onPress={onConfirm}>YEP</Button>
            <Button onPress={onCancel}>NOPE</Button>
          </ButtonContainer>
        ) : (
          <Container alignSelf="center">
            <Icon icon="cross" background="red" onPress={onClose} />
          </Container>
        )}
      </BottomContainer>
    </Component>
  )
}

const Component = styled(FullContainer)`
  padding-bottom: 20px;
`

const Wrapper = styled(FullContainer)`
  justify-content: center;
  max-width: 400px;
  width: 80%;
`

const BottomContainer = styled(Container)`
  max-width: 400px;
  width: 80%;
  margin-top: auto;
`

const ButtonContainer = styled(Container)`
  width: 100%;
  flex-direction: row;
  margin-bottom: 38px;
  justify-content: space-between;
`

export default Report

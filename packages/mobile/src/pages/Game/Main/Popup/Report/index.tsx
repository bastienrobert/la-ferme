import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { useMutation } from '@apollo/react-hooks'
import { Player } from '@la-ferme/shared/typings'
import { Button, Icon } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'

import { PopupProps } from '../'
import ReportSelect from './ReportSelect'
import ReportConfirm from './ReportConfirm'
import ReportComplete from './ReportComplete'
import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import BigCirclesWrapper from '@/components/shared/BigCirclesWrapper'

import { REPORT_PLAYER_MUTATION } from '@/graphql/report'

import alert from '@/services/alert'
import error from '@/utils/helpers/error'

const content = globalData.report

const Report: FC<PopupProps> = ({ set, player, players }) => {
  const [target, setTarget] = useState<Player>()
  const [confirm, setConfirm] = useState<Boolean>()

  const [
    reportPlayerMutation,
    { called: mutationCalled, loading: mutationLoading, error: mutationError }
  ] = useMutation(REPORT_PLAYER_MUTATION)
  const reportError = mutationError?.graphQLErrors

  useEffect(() => {
    if (!mutationCalled || mutationLoading) return
    if (reportError?.length > 0) {
      alert.error(error(reportError[0].message))
      set(undefined)
      return
    }
    setConfirm(true)
  }, [mutationCalled, mutationLoading, reportError, set])

  const onClose = () => {
    set(undefined)
  }

  const onConfirm = () => {
    reportPlayerMutation({
      variables: { playerUUID: player.uuid, targetUUID: target.uuid }
    })
  }

  const onCancel = () => setTarget(undefined)

  return (
    <Component>
      <StyledBigCirclesWrapper alignSelf="center">
        <BigCirclesInner
          source={require('@/assets/images/notifications/regularization/reward.webp')}
        />
      </StyledBigCirclesWrapper>
      <Wrapper alignSelf="center">
        {target ? (
          confirm ? (
            <ReportComplete />
          ) : (
            <ReportConfirm player={target} />
          )
        ) : (
          <ReportSelect
            player={player}
            players={players}
            setPlayer={setTarget}
          />
        )}
      </Wrapper>
      <BottomContainer alignSelf="center">
        {target && !confirm ? (
          <ButtonContainer alignSelf="center">
            <Button onPress={onConfirm}>{content.cta_yes}</Button>
            <Button onPress={onCancel}>{content.cta_no}</Button>
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

const StyledBigCirclesWrapper = styled(BigCirclesWrapper)`
  flex: 1;
`

const BigCirclesInner = styled(FastImage)`
  width: 100%;
  aspect-ratio: 1;
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

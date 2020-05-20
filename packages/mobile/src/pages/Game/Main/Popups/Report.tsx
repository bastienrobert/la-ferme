import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { useMutation } from '@apollo/react-hooks'
import { Icon, Colors } from '@la-ferme/components/native'
import { Player as PlayerType } from '@la-ferme/shared/typings'

import { PopupProps } from './'
import Text from '@/components/typo/Text'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import PlayerSelect from '@/components/shared/PlayerSelect'

import { REPORT_PLAYER_MUTATION } from '@/graphql/report'

import { getAllExceptCurrent } from '@/utils/helpers/players'

const Report: FC<PopupProps> = ({ set, players, player }) => {
  const [used, setUsed] = useState(false)
  const [reportPlayerMutation] = useMutation(REPORT_PLAYER_MUTATION)

  const onTargetPress = (target: PlayerType) => {
    setUsed(true)
    reportPlayerMutation({
      variables: { playerUUID: target.uuid, targetUUID: player.uuid }
    })
  }

  const onClosePress = () => set(null)

  return (
    <Component>
      {used ? (
        <Text color="beige">Report has already been used</Text>
      ) : (
        <PlayerSelect
          onPress={onTargetPress}
          players={getAllExceptCurrent(players, player)}
        />
      )}
      <CloseView>
        <CloseContainer>
          <Icon icon="cross" background="red" onPress={onClosePress} />
        </CloseContainer>
      </CloseView>
    </Component>
  )
}

const Component = styled(FullContainer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${Colors.gray};
`

const CloseContainer = styled(Container)`
  align-self: center;
`

const CloseView = styled.View`
  margin-bottom: 40px;
  z-index: 2;
`

export default Report

import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { useMutation } from '@apollo/react-hooks'
import { Icon, Colors } from '@la-ferme/components/native'
import { UUID, Player } from '@la-ferme/shared/typings'

import { PopupType } from '.'
import Text from '@/components/typo/Text'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import PlayerSelect from '@/components/shared/PlayerSelect'

import { REPORT_PLAYER_MUTATION } from '@/graphql/report'

export interface ReportProps {
  set: (type?: PopupType) => void
  userUUID: UUID
  boxID: UUID
  players: Player[]
}

const Report: FC<ReportProps> = ({ set, players, boxID, userUUID }) => {
  const [used, setUsed] = useState(false)
  const [reportPlayerMutation] = useMutation(REPORT_PLAYER_MUTATION)

  const onPlayerPress = (player: Player) => {
    setUsed(true)
    reportPlayerMutation({
      variables: { boxID, userUUID, targetUUID: player.user }
    })
  }

  const filteredPlayers = players.filter(player => player.user !== userUUID)

  const onClosePress = () => set(null)

  return (
    <Component>
      {used ? (
        <Text>Report has already been used</Text>
      ) : (
        <PlayerSelect onPress={onPlayerPress} players={filteredPlayers} />
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

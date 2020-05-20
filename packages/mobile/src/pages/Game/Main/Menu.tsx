import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { useMutation } from '@apollo/react-hooks'
import { Colors, Icon } from '@la-ferme/components/native'

import { PopupType } from './Popups'

import Container from '@/components/shared/Container'

import { STOP_GAME_MUTATION } from '@/graphql/game'
import { USE_SKILL_MUTATION } from '@/graphql/skill'

const Menu: FC<any> = ({ player, setPopup }) => {
  const [visible, setVisible] = useState(false)
  const [stopGameMututation] = useMutation(STOP_GAME_MUTATION)
  const [skillMutation] = useMutation(USE_SKILL_MUTATION)

  const onShowPress = () => setVisible(true)
  const onHidePress = () => setVisible(false)
  const onReportPress = () => setPopup(PopupType.REPORT)
  const onGameOverPress = () => {
    stopGameMututation({ variables: { winnerUUID: player.uuid } })
  }
  const onSkillPress = () => {
    skillMutation({ variables: { playerUUID: player.uuid } })
  }

  return (
    <Component>
      {visible ? (
        <VisibleWrapper>
          <Icon icon="end" background="gray" onPress={onGameOverPress} />
          <Icon icon="brigade" background="gray" onPress={onReportPress} />
          <Icon icon="lightning" background="gray" onPress={onSkillPress} />
          <Icon icon="cross" background="red" onPress={onHidePress} />
        </VisibleWrapper>
      ) : (
        <HiddenWrapper>
          <Icon icon="plus" background="blue" onPress={onShowPress} />
        </HiddenWrapper>
      )}
    </Component>
  )
}

const Component = styled(Container)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`

const VisibleWrapper = styled(Container)`
  flex-direction: row;
  background-color: ${Colors.yellow};
  padding: 22px 12px;
  justify-content: space-between;
  width: 100%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`

const HiddenWrapper = styled(Container)`
  margin-left: auto;
  padding: 22px 12px;
`

export default Menu

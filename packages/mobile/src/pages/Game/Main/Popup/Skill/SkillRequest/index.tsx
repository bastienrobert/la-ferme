import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

import SkillHeader from '../SkillHeader'
import SkillContent from './SkillContent'
import SkillConfirm from './SkillConfirm'

import { skillsByName, images } from '@/utils/helpers/skills'

export interface SkillRequestProps {
  confirm: boolean
  onConfirm: (targets: Player[]) => void
  player: Player
  players: Player[]
}

const SkillRequest: FC<SkillRequestProps> = ({
  player,
  players,
  confirm,
  onConfirm
}) => {
  const find = skillsByName[player.skill]

  return (
    <>
      <StyledScrollView>
        <SkillHeader data={find} image={images[player.skill]} />
        {confirm ? (
          <SkillConfirm player={player} skill={find} />
        ) : (
          <SkillContent
            onConfirm={onConfirm}
            player={player}
            skill={find}
            players={players}
          />
        )}
      </StyledScrollView>
    </>
  )
}

const StyledScrollView = styled.ScrollView`
  flex: 1;
`

export default SkillRequest

import React, { FC } from 'react'
import { Player, Skill } from '@la-ferme/shared/typings'

import SkillBody from '../SkillBody'
import TextWithCharacter from '@/components/shared/TextWithCharacter'

export interface SkillConfirmProps {
  player: Player
  skill: Skill
}

const SkillConfirm: FC<SkillConfirmProps> = ({ player, skill }) => {
  return (
    <SkillBody
      text={skill.text}
      description={
        <TextWithCharacter
          type="title"
          text={skill.effect}
          character={player.character}
        />
      }
    />
  )
}

export default SkillConfirm

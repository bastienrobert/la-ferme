import React, { FC } from 'react'
import { UUID, Player } from '@la-ferme/shared/typings'

import SkillHeader from './SkillHeader'
import SkillBody from './SkillBody'
import TextWithCharacter from '@/components/shared/TextWithCharacter'
import Title from '@/components/typo/Title'

import { goalsByName, images } from '@/utils/helpers/goals'
import { skillsByName } from '@/utils/helpers/skills'

export interface SkillGoalDataProps {
  players: Player[]
  targets: UUID[]
  data: any
}

const SkillGoalData: FC<SkillGoalDataProps> = ({ players, targets, data }) => {
  const target = targets[0]
  const firstData = data.find(d => d.uuid === target)
  const skill = skillsByName.cellphone

  const player = players.find(p => p.uuid === target)
  const find = goalsByName[firstData.goal]

  return (
    <>
      <SkillHeader data={find} image={images[firstData.goal]} />
      <SkillBody
        text={skill.completeText}
        description={
          <TextWithCharacter
            type="title"
            text={skill.complete}
            character={player.character}
            params={{
              goal: index => (
                <Title preset="H5" key={index}>
                  {find.displayNameWithPronounce}
                </Title>
              )
            }}
          />
        }
      />
    </>
  )
}

export default SkillGoalData

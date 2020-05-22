import React, { FC, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import styled from 'styled-components/native'
import { Icon, Colors } from '@la-ferme/components/native'
import { Player as PlayerType } from '@la-ferme/shared/typings'

import { PopupProps } from '../'
import ConfirmSkill from './ConfirmSkill'
import TargetSkill from './TargetSkill'
import Text from '@/components/typo/Text'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import ConfirmSkillOnLastTargeter from './ConfirmSkillOnLastTargeter'

import { USE_SKILL_MUTATION } from '@/graphql/skill'

const getSkillComponent = type => {
  switch (type) {
    case 'cellphone':
      return TargetSkill
    case 'speaker':
    case 'shepherds-stick':
      return ConfirmSkillOnLastTargeter
    default:
      return ConfirmSkill
  }
}

const Skill: FC<PopupProps> = ({ set, players, player }) => {
  const [used, setUsed] = useState(false)
  const [skillMutation, skillMutationResponse] = useMutation(USE_SKILL_MUTATION)
  const skillData = skillMutationResponse?.data?.useSkill?.data

  const confirm = (target: PlayerType) => {
    setUsed(true)

    let log = 'player ' + player.character + ' want to use ' + player.skill
    if (target) log += ' on target ' + target?.character
    console.log(log)

    const targets = target ? [target.uuid] : undefined
    skillMutation({ variables: { playerUUID: player.uuid, targets } })
  }

  const onClosePress = () => set(null)

  const SkillComponent = getSkillComponent(player.skill)

  return (
    <Component>
      {used ? (
        <Text color="beige">Skill has already been used</Text>
      ) : (
        SkillComponent && (
          <SkillComponent confirm={confirm} players={players} player={player} />
        )
      )}
      {skillData?.length > 0 &&
        skillData.map((d, i) => {
          console.log(d)
          return (
            <Text key={`skill-data-${i}`} color="beige">
              {d.character} - {d.goal}
            </Text>
          )
        })}
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

export default Skill

import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Player } from '@la-ferme/shared/typings'

import { PopupProps } from '../'
import SkillRequest from './SkillRequest'
import SkillGoalData from './SkillGoalData'
import SkillActions from './SkillActions'
import Container from '@/components/shared/Container'

import CardSkillUp, {
  RATIO as CARD_SKILL_UP_RATIO
} from '@/components/cards/skill/up'
import CardSkillDown, {
  RATIO as CARD_SKILL_DOWN_RATIO
} from '@/components/cards/skill/down'

import { shadow, inner } from '@/components/cards/cards.style'

import { LAST_TARGETER_QUERY } from '@/graphql/local'
import { USE_SKILL_MUTATION } from '@/graphql/skill'

import alert from '@/services/alert'
import error, { ERRORS } from '@/utils/helpers/error'

const TRANSLATE_SKILL_UNAVAILABLE = error(ERRORS.SKILL_UNAVAILABLE)

const skillNeedsLastTargetter = ['speaker', 'shepherds-stick']

const Skill: FC<PopupProps> = ({ set, player, players }) => {
  const [confirm, setConfirm] = useState<boolean>(false)
  const [skillMutation, skillMutationResponse] = useMutation(USE_SKILL_MUTATION)
  const skillError = skillMutationResponse?.error?.graphQLErrors
  const skillData = skillMutationResponse?.data?.useSkill

  useEffect(() => {
    if (skillError?.length > 0) {
      alert.error(error(skillError[0].message))
      set(undefined)
      return
    }
    if (!skillData?.completed) return
    // if (skillData?.data?.length > 0) {}
    console.log(skillData)
    setConfirm(true)
  }, [set, skillData, skillError])

  const lastTargeterQuery = useQuery(LAST_TARGETER_QUERY)
  const lastTargeter = lastTargeterQuery?.data
    ? players.find(p => p.uuid === lastTargeterQuery?.data?.targeter)
    : undefined

  if (!lastTargeter && skillNeedsLastTargetter.includes(player.skill)) {
    alert.error(TRANSLATE_SKILL_UNAVAILABLE)
    set(undefined)
    return null
  }

  const onConfirm = (targettedPlayers?: Player[]) => {
    const targets = targettedPlayers
      ? targettedPlayers.map(p => p.uuid)
      : undefined
    skillMutation({ variables: { playerUUID: player.uuid, targets } })
  }

  const onCancel = () => set(undefined)

  return (
    <Component>
      <TopStyledContainer style={{ aspectRatio: CARD_SKILL_UP_RATIO }}>
        <StyledCard as={CardSkillUp} />
        <TopInner>
          {skillData?.__typename === 'UseSkillWithTargetsData' ? (
            <SkillGoalData
              players={players}
              data={skillData.data}
              targets={skillData.targets}
            />
          ) : (
            <SkillRequest
              player={player}
              players={players}
              confirm={confirm}
              onConfirm={onConfirm}
            />
          )}
        </TopInner>
      </TopStyledContainer>
      <BottomStyledContainer style={{ aspectRatio: CARD_SKILL_DOWN_RATIO }}>
        <StyledCard as={CardSkillDown} />
        <BottomInner>
          <SkillActions
            confirm={confirm}
            player={player}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        </BottomInner>
      </BottomStyledContainer>
    </Component>
  )
}

const Component = styled(Container)`
  max-width: 90%;
  max-height: 100%;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  aspect-ratio: ${352 / 648};
`

const TopStyledContainer = styled(Container)`
  width: 100%;
`

const TopInner = styled(Container)`
  ${inner}
  padding: 0 12px 43px;
`

const BottomInner = styled(Container)`
  ${inner}
  padding: 28px 26px;
`

const BottomStyledContainer = styled(Container)`
  margin-top: -1px;
  width: 100%;
`

const StyledCard = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  ${shadow}
`

export default Skill

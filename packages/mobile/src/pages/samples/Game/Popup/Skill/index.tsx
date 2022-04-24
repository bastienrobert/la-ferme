import React, { FC, useState } from 'react'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

import { PopupProps } from '../'
import SkillContent from './SkillContent'
import SkillActions from './SkillActions'
import SkillConfirm from './SkillConfirm'
import Container from '@/components/shared/Container'
import TitleWithHashtag from '@/components/shared/TitleWithHashtag'

import CardSkillUp, {
  RATIO as CARD_SKILL_UP_RATIO
} from '@/components/cards/skill/up'
import CardSkillDown, {
  RATIO as CARD_SKILL_DOWN_RATIO
} from '@/components/cards/skill/down'

import { shadow, inner } from '@/components/cards/cards.style'
import { images } from '@/utils/helpers/skills'

const Skill: FC<PopupProps> = ({ set, player, players }) => {
  const [confirm, setConfirm] = useState<boolean>(false)

  const onConfirm = (targets?: Player[]) => {
    // map `targets` to get UUIDs
    console.log('SEND MUTATION', targets)
    setConfirm(true)
  }

  const onCancel = () => set(undefined)

  return (
    <Component>
      <TopStyledContainer style={{ aspectRatio: CARD_SKILL_UP_RATIO }}>
        <StyledCard as={CardSkillUp} />
        <TopInner>
          <BigImage
            source={images[player.skill]}
            resizeMode={FastImage.resizeMode.contain}
          />
          <TitleWithHashtag
            title="title"
            titleColor="gray"
            hashtag={['test']}
            hashtagColor="yellow"
            alignSelf="center"
          />
          {confirm ? (
            <SkillConfirm player={player} />
          ) : (
            <SkillContent
              onConfirm={onConfirm}
              player={player}
              players={players}
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

const BigImage = styled(FastImage)`
  width: 100%;
  height: 50%;
  margin-bottom: 10px;
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

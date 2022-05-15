import React, { FC } from 'react'
import { SvgProps } from 'react-native-svg'
import styled from 'styled-components/native'
import { Colors } from '@la-ferme/components/native'

import { WalktroughCardType } from './WalktroughCard'

import WalktroughCharacter from '@/components/svgs/WalktroughCharacter'
import WalktroughSkill from '@/components/svgs/WalktroughSkill'
import WalktroughGoal from '@/components/svgs/WalktroughGoal'

const titles = {
  character: WalktroughCharacter,
  skill: WalktroughSkill,
  goal: WalktroughGoal
}

export interface WalktroughCardTitleProps extends SvgProps {
  color: Colors.Theme
  type: WalktroughCardType
}

const WalktroughCardTitle: FC<WalktroughCardTitleProps> = ({
  type,
  ...props
}) => {
  const C = titles[type]

  return <Component as={C} {...props} />
}

const Component = styled.View`
  max-width: 90%;
`

export default WalktroughCardTitle

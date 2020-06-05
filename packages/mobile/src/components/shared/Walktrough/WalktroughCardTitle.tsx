import React, { FC } from 'react'
import { SvgProps } from 'react-native-svg'

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
  type: WalktroughCardType
}

const WalktroughCardTitle: FC<WalktroughCardTitleProps> = ({
  type,
  ...props
}) => {
  const Component = titles[type]

  return <Component {...props} />
}

export default WalktroughCardTitle

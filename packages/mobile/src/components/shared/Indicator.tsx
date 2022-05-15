import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import Container from '@/components/shared/Container'
import NavNumber from '@/components/typo/NavNumber'
import NavLabel from '@/components/typo/NavLabel'
import IndicatorIcon from '@/components/svgs/IndicatorIcon'

export interface Label {
  number: string
  text: string
}

export interface IndicatorProps {
  labels: Label[]
  onLabelPress: (id: number) => void
  currentIndex: number
}

const Indicator: FC<IndicatorProps> = ({
  labels,
  onLabelPress,
  currentIndex
}) => {
  return (
    <Component alignSelf="center">
      {labels.map(({ number, text }, i) => (
        <TouchableOpacity key={i} onPress={() => onLabelPress(i)}>
          <LabelWrapper opacity={i === currentIndex ? 1 : 0.5}>
            <StyledIndicatorIcon />
            <StyledTitle>
              <NavNumber>{number} </NavNumber>
              <NavLabel>{text}</NavLabel>
            </StyledTitle>
          </LabelWrapper>
        </TouchableOpacity>
      ))}
    </Component>
  )
}

export default Indicator

const Component = styled(Container)`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
`

const StyledIndicatorIcon = styled(IndicatorIcon)`
  width: 56px;
  height: 5px;
  margin-bottom: 5px;
`

const LabelWrapper = styled(Container)<any>`
  opacity: ${({ opacity }) => opacity};
`

const StyledTitle = styled(Container)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

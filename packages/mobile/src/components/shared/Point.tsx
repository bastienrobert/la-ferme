import React, { FC } from 'react'
import styled from 'styled-components/native'
import { ViewProps } from 'react-native'
import { Colors } from '@la-ferme/components/native'

export type PointProps = ViewProps

const Point: FC<PointProps> = props => {
  return <Component {...props} />
}

const Component = styled.View`
  width: 28px;
  height: 28px;
  border-radius: ${28 / 2}px;
  background-color: ${Colors.beige};
  box-shadow: 0px 3px 2px #423c39;
`

export default Point

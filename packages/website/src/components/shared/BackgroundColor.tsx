import styled from 'styled-components'
import { Colors } from '@la-ferme/components'

export interface BackgroundColorProps {
  color: Colors.Theme
}

const BackgroundColor = styled.div<BackgroundColorProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => Colors[color]};
`

export default BackgroundColor

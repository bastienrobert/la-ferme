import React, { FC } from 'react'
import styled from 'styled-components'
import ReactPlayer, { ReactPlayerProps } from 'react-player'

export interface PlayerProps extends ReactPlayerProps {}

const Player: FC<PlayerProps> = ({ className, style, ...props }) => {
  return (
    <Component className={className} style={style}>
      <StyledReactPlayer width="100%" height="100%" {...props} />
    </Component>
  )
}

const Component = styled.div``

const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  width: 100%;
  height: 100%;
`

export default Player

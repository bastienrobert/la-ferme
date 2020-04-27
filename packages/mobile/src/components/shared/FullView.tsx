import React, { FC } from 'react'
import styled from 'styled-components/native'

const FullscreenVideo: FC<any> = ({ children }) => {
  return <StyledView>{children}</StyledView>
}

const StyledView = styled.View`
  flex: 1;
`

export default FullscreenVideo

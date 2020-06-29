import styled from 'styled-components/native'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'

export const Component = styled(FullContainer)`
  elevation: 3;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const Cards = styled(Container)`
  flex: 1;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
`

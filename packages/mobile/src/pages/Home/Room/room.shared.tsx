import styled from 'styled-components/native'
import { global as globalData } from '@la-ferme/shared/data'

import Container from '@/components/shared/Container'

export const content = globalData.room

export const TitleContainer = styled(Container)`
  width: 80%;
  max-width: 400px;
  margin-top: 70px;
  align-self: center;
  margin-bottom: 30px;
`

export const ContentContainer = styled(Container)`
  width: 90%;
  max-width: 400px;
  align-self: center;
`

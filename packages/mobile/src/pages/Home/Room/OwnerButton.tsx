import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Button } from '@la-ferme/components/native'
import { User } from '@la-ferme/shared/typings'

import { content } from './room.shared'
import Container from '@/components/shared/Container'

export interface OwnerButtonProps {
  users: User[]
  onPress: () => void
}

const OwnerButton: FC<OwnerButtonProps> = ({ users, onPress }) => {
  return (
    <ButtonView>
      <ButtonContainer>
        <Button disabled={users?.length < 2} onPress={onPress}>
          {content.owner_button}
        </Button>
      </ButtonContainer>
    </ButtonView>
  )
}

const ButtonView = styled.View`
  justify-content: flex-end;
  margin-top: 40px;
  margin-bottom: 20px;
  z-index: 2;
`

const ButtonContainer = styled(Container)`
  align-self: center;
`

export default OwnerButton

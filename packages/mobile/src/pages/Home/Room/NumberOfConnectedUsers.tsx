import React, { FC } from 'react'
import styled from 'styled-components/native'
import { User } from '@la-ferme/shared/typings'
import { MAX_PLAYERS } from '@la-ferme/shared/settings'

import Title from '@/components/typo/Title'
import Container from '@/components/shared/Container'

export interface NumberOfConnectedUsersProps {
  users: User[]
}

const NumberOfConnectedUsers: FC<NumberOfConnectedUsersProps> = ({ users }) => {
  return (
    <Component alignSelf="center">
      <Title preset="H2" color="yellow">
        {users.length}
        <Title preset="H2" color="beige">
          {`/${MAX_PLAYERS}`}
        </Title>
      </Title>
    </Component>
  )
}

export default NumberOfConnectedUsers

const Component = styled(Container)`
  margin-bottom: 40px;
`

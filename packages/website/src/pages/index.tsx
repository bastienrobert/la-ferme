import React from 'react'
import { Typo, Button } from '@la-ferme/components'

import styled from 'styled-components'

function HomePage() {
  return (
    <Wrapper>
      <Typo size="h1">
        <h1>Welcome to Next.js!</h1>
      </Typo>
      <Button>Holà</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid black;
`

export default HomePage

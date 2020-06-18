import React, { FC } from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import { Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

export interface CardTextContentProps {
  onPress?: () => void
}

const CardTextContent: FC<CardTextContentProps> = ({ onPress }) => {
  return (
    <Container>
      <Description>
        <ScrollView alwaysBounceVertical={false}>
          <Text textAlign="center">
            Aujourd'hui, Monsieur Lane fait sa tête de mûle et ne veut pas cèder
            sa place prioritaire. Vous cedez votre place à Madame Henriette la
            biquette et elle vous remercie.
          </Text>
        </ScrollView>
      </Description>
      <Action alignSelf="center">
        <Title preset="H5" textAlign="center">
          Vous avancez de 2 cases !
        </Title>
      </Action>
      {onPress && (
        <Container alignSelf="center">
          <Button variant="secondary" onPress={onPress}>
            Okéé
          </Button>
        </Container>
      )}
    </Container>
  )
}

const Description = styled(Container)`
  flex: 1;
  margin-bottom: 15px;
`

const Action = styled(Container)`
  padding-bottom: 10px;
`

export default CardTextContent

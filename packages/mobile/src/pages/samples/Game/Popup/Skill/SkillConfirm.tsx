import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

export interface SkillConfirmProps {
  player: Player
}

const SkillConfirm: FC<SkillConfirmProps> = ({ player }) => {
  return (
    <Component alignSelf="center">
      <TextContainer alignSelf="center">
        <StyledText textAlign="center">
          Musique à fond vous n'entendez même pas le joueur qui manque de vous
          donner un coup de boule.
        </StyledText>
        <Title preset="H5" textAlign="center">
          vous avez annulé l’effet de la carte coup de boule que léon vous a
          agressé !
        </Title>
      </TextContainer>
    </Component>
  )
}

const Component = styled(FullContainer)`
  width: 100%;
  justify-content: space-between;
`

const TextContainer = styled(Container)`
  width: 90%;
  margin-bottom: 17px;
`

const StyledText = styled(Text)`
  margin-bottom: 10px;
`

const ButtonContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  max-width: 400px;
`

export default SkillConfirm

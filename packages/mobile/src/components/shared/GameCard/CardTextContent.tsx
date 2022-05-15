import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import { Card, Player } from '@la-ferme/shared/typings'
import { global as globalData } from '@la-ferme/shared/data'
import { Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import TextWithCharacter from '@/components/shared/TextWithCharacter'
import TextWithCharacterAndTargets from '@/components/shared/TextWithCharacterAndTargets'
import Text from '@/components/typo/Text'

const content = globalData.gameCard

export interface CardTextContentProps {
  card: Card
  player: Player
  self: boolean
  targets?: Player[]
  onPress?: () => void
}

const CardTextContent: FC<CardTextContentProps> = ({
  self,
  player,
  targets,
  card,
  onPress
}) => {
  const [disabled, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    if (!onPress || !disabled) return
    setTimeout(() => {
      setDisabled(false)
    }, 4000)
  }, [disabled, onPress])

  return (
    <Component alignSelf="center">
      <Wrapper>
        <Description alignSelf="center">
          <ScrollView
            alwaysBounceVertical={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center'
            }}>
            <InnerScrollView alignSelf="center">
              {self ? (
                <StyledText color="gray" textAlign="center">
                  {card.playerText}
                </StyledText>
              ) : (
                <StyledText
                  as={TextWithCharacter}
                  type="text"
                  text={card.viewerText}
                  playerColor={false}
                  character={player.character}
                />
              )}
            </InnerScrollView>
          </ScrollView>
        </Description>
        <Action alignSelf="center">
          {targets ? (
            <TextWithCharacterAndTargets
              type="title"
              text={self ? card.reward.playerText : card.reward.viewerText}
              character={player.character}
              targets={targets}
            />
          ) : (
            <TextWithCharacter
              type="title"
              text={self ? card.reward.playerText : card.reward.viewerText}
              character={player.character}
            />
          )}
        </Action>
        {onPress && (
          <Container alignSelf="center">
            <Button variant="secondary" disabled={disabled} onPress={onPress}>
              {content.cta_ok}
            </Button>
          </Container>
        )}
      </Wrapper>
    </Component>
  )
}

const Component = styled(Container)`
  justify-content: center;
`

const Wrapper = styled(Container)`
  justify-content: center;
`

const Description = styled(Container)`
  flex: 1;
  max-width: 350px;
  margin-bottom: 15px;
`

const InnerScrollView = styled(Container)`
  width: 100%;
  margin-top: auto;
`

const StyledText = styled(Text)`
  margin-top: auto;
`

const Action = styled(Container)`
  flex: 1;
  padding-bottom: 10px;
  margin-bottom: auto;
`

export default CardTextContent

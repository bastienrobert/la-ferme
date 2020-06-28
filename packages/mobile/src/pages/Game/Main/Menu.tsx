import React, { FC, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Icon } from '@la-ferme/components/native'

import { PopupType } from './Popup'
import Container from '@/components/shared/Container'

import useTheme from '@/hooks/useTheme'
import { complementaries } from '@/utils/colors'

export interface MenuProps {
  setPopup: (type: PopupType) => void
}

const MenuIcon: FC<any> = ({ onPress, ...style }) => {
  return (
    <IconContainer as={TouchableOpacity} onPress={onPress}>
      <Icon {...style} />
    </IconContainer>
  )
}

const Menu: FC<MenuProps> = ({ setPopup }) => {
  const [visible, setVisible] = useState(false)
  const { theme } = useTheme()

  const color = complementaries[theme]

  const onShowPress = () => setVisible(true)
  const onHidePress = () => setVisible(false)
  const onReportPress = () => setPopup(PopupType.Report)
  const onGameOverPress = () => setPopup(PopupType.GameOver)
  const onSkillPress = () => setPopup(PopupType.Skill)

  return (
    <Component alignSelf="flex-end">
      {visible ? (
        <Group>
          <MenuIcon icon="cross" background="red" onPress={onHidePress} />
          <EndIconWrapper>
            <MenuIcon
              icon="end"
              color={color === 'red' ? 'beige' : 'red'}
              background={color}
              onPress={onGameOverPress}
            />
          </EndIconWrapper>
          <BrigadeIconWrapper>
            <MenuIcon
              icon="brigade"
              color="beige"
              background={color}
              onPress={onReportPress}
            />
          </BrigadeIconWrapper>
          <LightningIconWrapper>
            <MenuIcon
              icon="lightning"
              color="beige"
              background={color}
              onPress={onSkillPress}
            />
          </LightningIconWrapper>
        </Group>
      ) : (
        <Group>
          <MenuIcon icon="plus" background={color} onPress={onShowPress} />
        </Group>
      )}
    </Component>
  )
}

const Component = styled(Container)`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 22px 12px 8px;
  z-index: 2;
`

const IconContainer = styled(Container)``

const AbsoluteIconWrapper = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
`

const BrigadeIconWrapper = styled(AbsoluteIconWrapper)`
  top: -100px;
`

const LightningIconWrapper = styled(AbsoluteIconWrapper)`
  top: -80px;
  left: -80px;
`

const EndIconWrapper = styled(AbsoluteIconWrapper)`
  left: -100px;
`

const Group = styled(Container)`
  margin-left: auto;
`

export default Menu

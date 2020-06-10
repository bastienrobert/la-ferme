import React, { FC, useState, useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Icon, Colors } from '@la-ferme/components/native'

import ThemeContext from '@/App/Theme/Context'

import Container from '@/components/shared/Container'

const complementaries: { [key: Colors.Theme]: Colors.Theme } = {
  red: 'yellow',
  blue: 'red',
  pink: 'blue',
  yellow: 'blue',
  gray: 'yellow'
}

const MenuIcon: FC<any> = ({ onPress, ...style }) => {
  return (
    <IconContainer as={TouchableOpacity} onPress={onPress}>
      <Icon {...style} />
    </IconContainer>
  )
}

const Menu: FC<any> = () => {
  const [visible, setVisible] = useState(false)
  const { theme } = useContext(ThemeContext)

  const color = complementaries[theme]

  const onShowPress = () => setVisible(true)
  const onHidePress = () => setVisible(false)

  return (
    <Component alignSelf="flex-end">
      {visible ? (
        <Group>
          <MenuIcon icon="cross" background="red" onPress={onHidePress} />
          <EndIconWrapper>
            <MenuIcon icon="end" background={color} />
          </EndIconWrapper>
          <BrigadeIconWrapper>
            <MenuIcon icon="brigade" color="beige" background={color} />
          </BrigadeIconWrapper>
          <LightningIconWrapper>
            <MenuIcon icon="lightning" color="beige" background={color} />
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
  padding: 22px 12px;
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

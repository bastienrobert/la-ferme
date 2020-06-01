import React, { FC, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Icon } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'

const MenuIcon: FC<any> = ({ onPress, ...style }) => {
  return (
    <IconContainer as={TouchableOpacity} onPress={onPress}>
      <Icon {...style} />
    </IconContainer>
  )
}

const Menu: FC<any> = () => {
  const [visible, setVisible] = useState(false)

  const onShowPress = () => setVisible(true)
  const onHidePress = () => setVisible(false)

  return (
    <Component>
      {visible ? (
        <Group>
          <MenuIcon icon="cross" background="red" onPress={onHidePress} />
          <EndIconWrapper>
            <MenuIcon icon="end" background="gray" />
          </EndIconWrapper>
          <BrigadeIconWrapper>
            <MenuIcon icon="brigade" background="gray" />
          </BrigadeIconWrapper>
          <LightningIconWrapper>
            <MenuIcon icon="lightning" background="gray" />
          </LightningIconWrapper>
        </Group>
      ) : (
        <Group>
          <MenuIcon icon="plus" background="blue" onPress={onShowPress} />
        </Group>
      )}
    </Component>
  )
}

const Component = styled(Container)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 22px 12px;
  z-index: 999;
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

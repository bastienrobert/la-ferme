import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Icon, { WebIconProps } from './'

// LOCAL INTERFACES
interface ClosureOption extends Partial<WebIconProps> {
  children?: string
}

// RENDER COMPONENT
const render = ({ icon, background, disabled = false }: ClosureOption = {}) => {
  return () => (
    <Icon
      icon={icon}
      background={background}
      onClick={action('onClick')}
      disabled={disabled}
    />
  )
}

// STORIES
const stories = storiesOf('Icon', module)

stories.add('camera', render({ icon: 'camera' }))
stories.add('background', render({ icon: 'camera', background: 'yellow' }))

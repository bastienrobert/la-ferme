import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'

import { Button, ButtonProps } from './'

// PROPS
const childrenProps = (value = '') => {
  return text('children', value)
}

// LOCAL INTERFACES
interface ClosureOption extends Partial<ButtonProps> {
  children?: string
}

// RENDER COMPONENT
const render = ({
  children = 'Hello world',
  size,
  variant,
  disabled = false
}: ClosureOption = {}) => {
  return () => (
    <Button
      size={size}
      variant={variant}
      onClick={action('onClick')}
      disabled={disabled}>
      {childrenProps(children)}
    </Button>
  )
}

// STORIES
const stories = storiesOf('Button', module)

stories.add('default', render())
stories.add('small', render({ size: 'small' }))
stories.add('medium', render({ size: 'medium' }))
stories.add('large', render({ size: 'large' }))
stories.add('secondary', render({ variant: 'secondary' }))
stories.add('disabled', render({ disabled: true }))

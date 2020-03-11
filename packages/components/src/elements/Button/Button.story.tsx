import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text } from '@storybook/addon-knobs'

import Button, {
  ButtonSize,
  ButtonVariant,
  ButtonSizeOptions,
  ButtonVariantOptions
} from './'

import { Wrapper } from '@/helpers/stories'

// PROPS
const sizeProps = (value: ButtonSize = 'medium') => {
  return select('size', ButtonSizeOptions, value)
}

const variantProps = (value: ButtonVariant = 'primary') => {
  return select('variant', ButtonVariantOptions, value)
}

const childrenProps = (value = '') => {
  return text('children', value)
}

// LOCAL INTERFACES
interface IClosureOption {
  size?: ButtonSize
  variant?: ButtonVariant
  disabled?: boolean
}

// CLOSURE GENERATOR
const closure = ({ size, variant, disabled }: IClosureOption = {}) => {
  return () => (
    <>
      <Wrapper>
        <Button
          size={sizeProps(size)}
          variant={variantProps(variant)}
          onClick={() => alert('click')}
          disabled={disabled}>
          {childrenProps('Hello world')}
        </Button>
      </Wrapper>
    </>
  )
}

// STORIES
const stories = storiesOf('Button', module)

stories.add('small', closure({ size: 'small' }))
stories.add('medium', closure({ size: 'medium' }))
stories.add('large', closure({ size: 'large' }))
stories.add('secondary', closure({ variant: 'secondary' }))
stories.add('disabled', closure({ disabled: true }))

import React from 'react'
import { storiesOf } from '@storybook/react'

import Typo from './'

import { Fonts } from '@/theme'

// LOCAL INTERFACES
interface IClosureOption {
  size?: Fonts.Sizes
}

// CLOSURE GENERATOR
const closure = ({ size }: IClosureOption = {}) => {
  return () => (
    <Typo size={size}>
      <span>Hello</span>
    </Typo>
  )
}

// STORIES
const stories = storiesOf('Typo', module)

stories.add('default', closure())
stories.add('h1', closure({ size: 'h1' }))
stories.add('h2', closure({ size: 'h2' }))
stories.add('h3', closure({ size: 'h3' }))
stories.add('h4', closure({ size: 'h4' }))
stories.add('h5', closure({ size: 'h5' }))
stories.add('h6', closure({ size: 'h6' }))

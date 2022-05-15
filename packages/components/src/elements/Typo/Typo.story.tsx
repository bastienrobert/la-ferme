import React from 'react'
import { storiesOf } from '@storybook/react'

import { Typo, TypoOptions } from './'

// CLOSURE GENERATOR
const closure = ({ size, family }: TypoOptions = {}) => {
  return () => (
    <Typo size={size} family={family}>
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

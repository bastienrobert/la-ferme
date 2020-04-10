import React from 'react'
import ReactDOM from 'react-dom'

import { configure, addParameters, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import GlobalStyle from '../styles/GlobalStyle'

const req = require.context('../src', true, /\.story\.tsx$/)
function loadStories() {
  req.keys().forEach(req)
  const globalStyleEl = (() => {
    const el = document.createElement('div')
    document.head.append(el)
    return el
  })()
  ReactDOM.render(<GlobalStyle />, globalStyleEl)
}

addDecorator(withKnobs)
addDecorator(withSmartKnobs())
addDecorator(withInfo({ inline: true }))
addParameters({
  options: {
    inline: true,
    showPanel: true,
    sortStoriesByKind: true
  }
})

configure(loadStories, module)

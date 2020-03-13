import { configure, addParameters, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

const req = require.context('../src', true, /\.story\.tsx$/)
function loadStories() {
  req.keys().forEach(req)
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

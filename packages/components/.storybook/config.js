import { configure, addParameters, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

const req = require.context('../src', true, /\.story\.tsx$/)
function loadStories() {
  req.keys().forEach(req)
}

addDecorator(withKnobs)
addParameters({
  options: {
    inline: true,
    showPanel: true,
    sortStoriesByKind: true
  }
})

configure(loadStories, module)

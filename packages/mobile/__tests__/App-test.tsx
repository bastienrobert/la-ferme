import 'react-native'
import 'styled-components/native'
import 'jest-styled-components/native'

import React from 'react'
import App from '../src/App'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  renderer.create(<App />)
})

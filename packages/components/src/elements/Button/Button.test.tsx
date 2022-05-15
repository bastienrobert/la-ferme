import React from 'react'
import { mount } from 'enzyme'

import { Button, ButtonProps } from './'

describe('<Button />', () => {
  it('should returns variants and sizes', () => {
    const getWrapper = props => {
      return mount(<Button {...props}>Foo</Button>)
    }

    const button = getWrapper({
      variant: 'primary'
    })
    expect((button.props() as ButtonProps).variant).toBe('primary')
  })

  it('should pass the `disabled` prop down to the DOM element', () => {
    const wrapper = mount(
      <>
        <Button>Foo</Button>
        <Button disabled>Disabled</Button>
      </>
    )

    expect(wrapper.find('button[disabled]')).toHaveLength(1)
  })
})

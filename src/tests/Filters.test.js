import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import Filters from '../components/Filters';

test('should render DebuggerApp correctly', () => {
  const renderer = new ReactShallowRenderer()
  renderer.render(<Filters/>)
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

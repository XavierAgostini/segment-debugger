import React from 'react';
import { shallow } from 'enzyme';
import DebuggerApp from '../../src/components/DebuggerApp'
import testEvents from '../seed/seed'

let wrapper = shallow(<DebuggerApp/>)
describe('<DebuggerApp/>', () => {
  test('should render DebuggerApp as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
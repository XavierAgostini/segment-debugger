import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CodeBox from '../../src/components/CodeBox'
import testEvents from '../seed/seed'

let wrapper, showPretty, event
beforeEach(() => {
  event = testEvents[0]
  showPretty = false
  wrapper = shallow(<CodeBox event={event} showPretty={showPretty}/>)
})
describe('<CodeBox/>', () => {
  test('should render CodeBox as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
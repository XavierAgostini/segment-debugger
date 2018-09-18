import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Event from '../../src/components/Event'
import testEvents from '../seed/seed'

let wrapper, testEvent, handleEventSelected, isSelected

beforeEach(() => {
  testEvent = testEvents[0]
  handleEventSelected = jest.fn()
  isSelected = false
  wrapper = shallow(<Event event={testEvent} handleEventSelected={handleEventSelected} isSelected={isSelected}/>)
})
describe('<Event/>', () => {
  test('should render Event correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
  test('should handle handleEventSelected', () => {
    wrapper.find('button').simulate('click')
    expect(handleEventSelected).toHaveBeenCalledWith(testEvent)
    expect(wrapper.find('div.eventNameText').text()).toEqual('/')
  })
})
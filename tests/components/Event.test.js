import React from 'react';
import { shallow } from 'enzyme';
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
    expect(wrapper.find('div.eventNameText').text()).toEqual('Notification Shown')
    expect(wrapper.find('div.eventType').text()).toEqual('track')
  })
  test('should handle handleEventSelected', () => {
    wrapper.simulate('click')
    expect(handleEventSelected).toHaveBeenCalledWith(testEvent)
  })
})
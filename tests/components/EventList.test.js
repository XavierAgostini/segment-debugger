import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EventList from '../../src/components/EventList'
import Event from '../../src/components/Event'
import testEvents from '../seed/seed'

let wrapper, events, handleEventSelected, selectedEvent

beforeEach(() => {
  events = testEvents
  selectedEvent = undefined
  handleEventSelected = jest.fn()
  wrapper = shallow(<EventList events={events} selectedEvent={selectedEvent} handleEventSelected={handleEventSelected}/>)
})
describe('<EventList/>', () => {
  test('should render EventList as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
  test('should populate with three events', () => {
    expect(wrapper.find(Event).length).toEqual(3)
  })
})
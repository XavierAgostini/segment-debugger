import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EventList from '../../src/components/EventList'
import Event from '../../src/components/Event'
import testEvents from '../seed/seed'
import {Button} from 'evergreen-ui'
let wrapper, wrapper1, events, handleEventSelectedSpy, selectedEvent

beforeEach(() => {
  events = testEvents
  selectedEvent = undefined
  handleEventSelectedSpy = jest.fn()
  wrapper = shallow(<EventList events={events} selectedEvent={selectedEvent} handleEventSelected={handleEventSelectedSpy}/>)
})
describe('<EventList/>', () => {
  test('should render an empty EventList', () => {
    wrapper1 = shallow(<EventList events={[]} selectedEvent={selectedEvent} handleEventSelected={handleEventSelectedSpy}/>)
    expect(wrapper1.find(Event).length).toEqual(0)
  })
  test('should render EventList with events', () => {
    expect(wrapper.find(Event).length).toEqual(3)
  })
})
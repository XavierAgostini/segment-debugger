import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ListPane from '../../src/components/ListPane'

let wrapper, handlePauseChange, handleSearchFilter, handleEventSelected, selectedEvent

beforeEach(() => {
  handlePauseChange = jest.fn()
  handleSearchFilter = jest.fn()
  handleEventSelected = jest.fn()
  selectedEvent = undefined
  wrapper = shallow(<ListPane handlePauseChange={handlePauseChange} handleSearchFilter={handleSearchFilter} handleEventSelected={handleEventSelected} selectedEvent={selectedEvent}/>)
})

describe('<ListPane/>', () => {
  test('should render ListPane as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
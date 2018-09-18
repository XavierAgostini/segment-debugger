import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ListControlBar from '../../src/components/ListControlBar'

let wrapper, handlePauseChange, handleSearchFilter

beforeEach(() => {
  handlePauseChange = jest.fn()
  handleSearchFilter = jest.fn()
  wrapper = shallow(<ListControlBar handlePauseChange={handlePauseChange} handleSearchFilter={handleSearchFilter}/>)
})

describe('<ListControlBar/>', () => {
  test('should render ListControlBar as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
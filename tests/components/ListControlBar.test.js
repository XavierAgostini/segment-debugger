import React from 'react';
import { shallow } from 'enzyme';
import ListControlBar from '../../src/components/ListControlBar'

let wrapper, handlePauseChange, handleSearchFilter

describe('<ListControlBar/>', () => {
  handlePauseChange = jest.fn()
  handleSearchFilter = jest.fn()
  wrapper = shallow(<ListControlBar handlePauseChange={handlePauseChange} handleSearchFilter={handleSearchFilter}/>)
  test('should render ListControlBar as expected', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
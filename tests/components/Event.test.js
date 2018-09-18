import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Event from '../../src/components/Event'

describe('<Event/>', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ListControlBar/>)
      const component = wrapper.dive()
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})
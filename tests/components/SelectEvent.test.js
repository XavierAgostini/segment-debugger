import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SelectEvent from '../../src/components/SelectEvent'

describe('<SelectEvent/>', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<SelectEvent/>)
      const component = wrapper.dive()
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CircleCheck from '../../src/components/CircleCheck'

describe('<CircleCheck/>', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<CircleCheck/>)
      const component = wrapper.dive()
      expect(toJson(component)).toMatchSnapshot()
    })
  })
})
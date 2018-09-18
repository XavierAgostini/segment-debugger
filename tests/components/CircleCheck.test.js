import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CircleCheck from '../../src/components/CircleCheck'

describe('<CircleCheck/>', () => {
  test('should render CircleCheck as expected', () => {
    const wrapper = shallow(<CircleCheck/>)
    const component = wrapper.dive()
    expect(toJson(component)).toMatchSnapshot()
  })
})
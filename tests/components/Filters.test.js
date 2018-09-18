import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Filters from '../../src/components/Filters'

// describe('<Filters/>', () => {
//   describe('render()', () => {
//     test('renders the component', () => {
//       const wrapper = shallow(<Filters/>)
//       const component = wrapper.dive()
//       expect(toJson(component)).toMatchSnapshot()
//     })
//   })
// })
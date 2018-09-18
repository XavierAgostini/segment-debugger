import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ListPane from '../../src/components/ListPane'

// describe('<ListPane/>', () => {
//   describe('render()', () => {
//     test('renders the component', () => {
//       const wrapper = shallow(<ListPane/>)
//       const component = wrapper.dive()
//       expect(toJson(component)).toMatchSnapshot()
//     })
//   })
// })
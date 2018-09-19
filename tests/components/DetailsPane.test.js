import React from 'react';
import { shallow } from 'enzyme';
import DetailsPane from '../../src/components/DetailsPane'
import SelectEvent from '../../src/components/SelectEvent' 
import CodeBox from '../../src/components/CodeBox' 
import { Tab } from 'evergreen-ui'
import testEvents from '../seed/seed'

let wrapper, selectedEvent

describe('<DetailsPane/>', () => {
  test('should show SelectEvent component on render', () => {
    selectedEvent = undefined
    wrapper = shallow(<DetailsPane selectedEvent={selectedEvent}/>)
    expect(wrapper.find(SelectEvent).length).toEqual(1)
    expect(wrapper.find(CodeBox).length).toEqual(0)
  })
  describe('when an event is selected', () => {
    beforeEach(() => {
      selectedEvent = testEvents[0]
      wrapper = shallow(<DetailsPane selectedEvent={selectedEvent}/>)
    })
    test('should populate header with expected event name title', () => {
      expect(wrapper.find('.detailsHeaderName > div').text()).toEqual('Notification Shown')
    })
    test('should show CodeBox component when a event is selected', () => {
      expect(wrapper.find('SelectEvent').length).toEqual(0)
      expect(wrapper.find('CodeBox').length).toEqual(1)
    })
    test('should show pretty code view by default', () => {
      expect(wrapper.state().showPretty).toEqual(true)
    })
    test('should show raw code view when Raw button clicked', () => {
      wrapper.find(Tab).at(1).simulate('click')
      expect(wrapper.state().showPretty).toEqual(false)
    })
    test('should show pretty code view when pretty button clicked', () => {
      wrapper.find(Tab).at(1).simulate('click')
      wrapper.find(Tab).at(0).simulate('click')
      expect(wrapper.state().showPretty).toEqual(true)
    })
  })  
})
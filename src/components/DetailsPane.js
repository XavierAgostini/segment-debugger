import React from 'react'
import CodeBox from './CodeBox'
import { Tab } from 'evergreen-ui'
import CircleCheck from './CircleCheck'
import SelectEvent from './SelectEvent'
import './DetailsPane.module.css'

const getEventName = (event) => {
  if (event.type === 'track') {
    return event.event
  }
  if (event.type === 'page' || event.type === 'screen') {
    if (event.properties.category && event.properties.name) {
      return event.properties.category + ' ' + event.properties.name
    } else if (event.properties.category) {
      return event.properties.category
    } else if (event.properties.name) {
      return event.properties.name
    }
    return event.properties.path
  }
  if (event.type === 'identify') {
    if (event.userId) {
      if (event.traits.email) {
         return `${event.userId} (${event.traits.email})`
      } else if (event.traits.name) {
        return `${event.userId} (${event.traits.name})`
      }
    } else {
      return `Anonymous Id: ${event.anonymousId}`
    }
  }
  if (event.type === 'group') return event.groupId
}
export default class DetailsPane extends React.Component {
  state={
    options: [
      { label: 'Pretty', value: 'pretty' },
      { label: 'Raw', value: 'raw' }
    ],
    showPretty: true
  }
  enablePretty = () => {
    console.log('enablePretty')
    this.setState(() => ({
      showPretty: true
    }))
  }
  enableRaw = () => {
    console.log('enableRaw')
    this.setState(() => ({
      showPretty: false
    }))
  }
  
  render() {
    const renderDetailsBox = () => {
      if (!!!this.props.selectedEvent) {
        return (
          <SelectEvent/>
        )
      } else {
        return (
          <div className="detailsWrapper">
            <div className="detailsHeader">
              <CircleCheck c="45px"/>
              <div className="detailsHeaderName">
                <div>{getEventName(this.props.selectedEvent)}</div>
                Allowed
              </div>  
            </div>
            <div className="viewButtonsWrapper">
                <Tab onClick={this.enablePretty} data-active={this.state.showPretty}>Pretty</Tab>
                <Tab onClick={this.enableRaw} data-active={!this.state.showPretty}>Raw</Tab>
              </div> 
            <CodeBox showPretty={this.state.showPretty} event={this.props.selectedEvent}/>
          </div>
        )
      }
    }
    return (
      <div className="detailsPaneWrapper">
        {renderDetailsBox()}
      </div>
    )
  }
}
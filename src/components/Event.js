import React from 'react'
import { CheckCircleIcon } from 'evergreen-ui'
import moment from 'moment'
import CircleCheck from './CircleCheck'
import './Event.module.css'

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

export default class Event extends React.Component {
  buttonClicked = () => {
    this.props.handleEventSelected(this.props.event)
  }

  render() {
    return (
      <button className="eventItem" onClick={this.buttonClicked} data-is-selected={this.props.isSelected}>
        <CircleCheck/>
        <div className="eventType">
          {this.props.event.type}
        </div>
        <div className="eventName">
          <div className="eventNameText">
            {getEventName(this.props.event)}
          </div>
        </div>
        <div className="eventTimeStamp">
          {moment(this.props.event.receivedAt).format('YYYY/MM/DD HH:mm:ss')}
        </div>
      </button>
    )
  }
}
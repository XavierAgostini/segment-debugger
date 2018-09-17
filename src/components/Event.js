import React from 'react'
import { CheckCircleIcon } from 'evergreen-ui'
import moment from 'moment'
import CircleCheck from './CircleCheck'
import css from './Event.module.css'

const typeStyle = {
  fontSize: '12px',
  fontWeight: '400',
  letterSpacing: '0',
  lineHeight: '16px',
  margin: '0 24px',
  minWidth: '56px',
  textTransform: 'uppercase'
}
const eventStyle = {
  WebkitBoxAlign: 'center',
  WebkitBoxFlex: '1',
  alignItems: 'center',
  display: '-webkit-box',
  display: '-ms-flexbox',
  display: 'flex',
  flex: '1',
  fontSize: '14px',
  fontWeight: '500',
  letterSpacing: '-.05px',
  lineHheight: '22px',
  marginRight: '24px',
  width: '0'
}
const timestampStyle = {
  minWidth: '144px',
  textAlign: 'right'
}
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
    console.log('btnClicked')
    this.props.handleEventSelected(this.props.event)
  }

  render() {
    return (
      <button className="eventItem" onClick={this.buttonClicked} data-is-selected={this.props.isSelected}>
        <CircleCheck/>
        <div style={typeStyle}>
          {this.props.event.type}
        </div>
        <div style={eventStyle}>
          <div className="eventNameText">
            {getEventName(this.props.event)}
          </div>
        </div>
        <div class="eventTimeStamp">
          {moment(this.props.event.receivedAt).format('YYYY/MM/DD HH:mm:ss')}
        </div>
      </button>
    )
  }
}
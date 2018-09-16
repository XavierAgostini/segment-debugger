import React from 'react'
import { CheckCircleIcon } from 'evergreen-ui'
import moment from 'moment'

const buttonStyle = {
  "WebkitAnimation": "slidein-dc00891e0a41806eb5d3 .4s cubic-bezier(.4,0,.2,1)",
  "WebkitBoxAlign": "center",
  "alignItems": "center",
  "animation": "slidein-dc00891e0a41806eb5d3 .4s cubic-bezier(.4,0,.2,1)",
  "background": "#fff",
  "border": "none",
  "borderBottom": "1px solid rgba(67,90,111,.079)",
  "borderRadius": "0",
  "display": "flex",
  "height": "56px",
  "overflow": "hidden",
  "paddingLeft": "32px",
  "paddingRight": "16px",
  "textAlign": "left",
  "width": "100%"
}
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
      <button style={buttonStyle} onClick={this.buttonClicked}>
        {/*<CheckCircleIcon fill="#016cd1"/>*/}
        <div style={typeStyle}>
          {this.props.event.type}
        </div>
        <div style={eventStyle}>
          {getEventName(this.props.event)}
        </div>
        <div style={timestampStyle}>
          {moment(this.props.event.receivedAt).format('YYYY/MM/DD HH:mm:ss')}
        </div>
      </button>
    )
  }
}
import React from 'react'
import Event from './Event'
import { Pane } from 'evergreen-ui'

const listStyle = {
  height:'100%',
  overflow: 'auto'
}
export default class EventList extends React.Component {
  render() {
    return (
      <div style={listStyle}>
        <Pane>
          {
            this.props.events.map((event, index) => (
              <Event
                key={JSON.stringify(event)}
                event={event}
                isSelected={this.props.selectedEvent===event}
                handleEventSelected={this.props.handleEventSelected}
              />
            ))
          }
        </Pane>
      </div>
    )
  }
}
import React from 'react'
import Event from './Event'
import { Pane } from 'evergreen-ui'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const listStyle = {
  height:'500px',
  overflow: 'auto'
}
export default class EventList extends React.Component {
  componentDidMount() {
    console.log(this.props.events)
  }
  render() {
    return (
      <div style={listStyle}>
        <Pane>
          {
            this.props.events.map((event, index) => (
              <Event
                key={JSON.stringify(event)}
                event={event} isSelected={false}
                handleEventSelected={this.props.handleEventSelected}
              />
            ))
          }
        </Pane>
      </div>
    )
  }
}
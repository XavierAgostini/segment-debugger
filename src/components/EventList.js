import React from 'react'
import Event from './Event'
import { Pane } from 'evergreen-ui'

const listStyle = {
  height:'500px'
}
export default class EventList extends React.Component {
  state = {
    events1: [{
      type: 'Track',
      event: 'Order Completed',
      timestamp: new Date().getTime()
    }, {
      type: 'Track',
      event: 'Product Added',
      timestamp: new Date().getTime()
    }, {
      type: 'Track',
      event: 'Product List Viewed',
      timestamp: new Date().getTime()
    }
  ]
  }
  render() {
    return (
      <div style={listStyle}>
        <Pane>
          {
            this.props.events.map((event, index) => (
              <Event key={index} event={event}/>
            ))
          }
        </Pane>
        
     
      </div>
    )
  }
}
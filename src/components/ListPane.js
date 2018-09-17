import React from 'react'
import ListControlBar from './ListControlBar'
import EventList from './EventList'

export default class ListPane extends React.Component {
  render() {
    return (
      <div>
        <ListControlBar 
          handlePauseChange={this.props.handlePauseChange}
          handleSearchFilter={this.props.handleSearchFilter}
        />
        <EventList
          events={this.props.events} 
          handleEventSelected={this.props.handleEventSelected} 
          selectedEvent={this.props.selectedEvent}
        />
      </div>
    )
  }
}
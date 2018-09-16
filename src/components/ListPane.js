import React from 'react'
import ListControlBar from './ListControlBar'
import EventList from './EventList'

export default class ListPane extends React.Component {
  render() {
    return (
      <div>
        <ListControlBar/>
        <EventList/>
      </div>
    )
  }
}
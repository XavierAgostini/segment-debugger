import React from 'react'
import DetailsPane from './DetailsPane'
import ListPane from './ListPane'
import { Button, Tabs } from 'evergreen-ui'

const divStyle = {
  display: 'flex'
}

const eventTypeFilter = (events, searchText) => {
  return events.filter(((event) => {
    const eventType = event.type.toLowerCase()
    return searchText.length === 0 || eventType.indexOf(searchText) > -1; 
  }))
}

export default class DebuggerApp extends React.Component {
  constructor(props) {
    super(props)
    this.eventSource = new EventSource('http://localhost:5000/debugger-stream')
  }
  state = {
    isPaused: false,
    selectedEvent: undefined,
    events: [],
    filteredEvents: [],
    searchText: ''
  }
  componentDidMount() {
    console.log('debugger app mounted')
    this.eventSource.addEventListener('message', (event) => {
      if(!this.state.isPaused) {
        this.setState((prevState) => ({
          events: [JSON.parse(event.data)].concat(prevState.events)
        }))
      } 
    })
  }
  
  handlePauseChange = (pauseStatus) => {
    this.setState(() => ({ isPaused: pauseStatus}))
  }

  handleSearchFilter = (searchText) => {
    console.log('handleSearchFilter')
    this.setState(()=>({ searchText }))
  }

  handleEventSelected = (event) => {
    console.log('handleEventSelected')
    this.setState(()=>({ selectedEvent: event }))
  }

  render() {
    return (
      <div style={divStyle}>
        <ListPane
          events={eventTypeFilter(this.state.events, this.state.searchText)}
          handlePauseChange={this.handlePauseChange}
          handleSearchFilter={this.handleSearchFilter}
          handleEventSelected={this.handleEventSelected}
        />
        <DetailsPane selectedEvent={this.state.selectedEvent}/>
      </div>
    )
  }
}
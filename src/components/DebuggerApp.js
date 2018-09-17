import React from 'react'
import DetailsPane from './DetailsPane'
import ListPane from './ListPane'
import { Button, Tabs } from 'evergreen-ui'

const divStyle = {
  display: 'flex',
  flex: 1,
  height: '100%'
}

const eventTypeFilter = (events, searchText) => {
  return events.filter(((event) => {
    const eventString = JSON.stringify(event).toLowerCase()
    // const eventTraits = event.traits ? JSON.stringify(event.traits).toLowerCase() : ''
    return searchText.length === 0 || eventString.indexOf(searchText) > -1
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
    if (this.state.selectedEvent === event) {
      event = undefined
    }
    this.setState(()=>({selectedEvent: event}))
   
  }

  render() {
    return (
      <div style={divStyle}>
        <ListPane
          events={eventTypeFilter(this.state.events, this.state.searchText)}
          handlePauseChange={this.handlePauseChange}
          handleSearchFilter={this.handleSearchFilter}
          handleEventSelected={this.handleEventSelected}
          selectedEvent={this.state.selectedEvent}
        />
        <DetailsPane selectedEvent={this.state.selectedEvent}/>
      </div>
    )
  }
}
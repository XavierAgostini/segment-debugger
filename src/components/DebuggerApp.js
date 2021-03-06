import React from 'react'
import DetailsPane from './DetailsPane'
import ListPane from './ListPane'
import { Button, Tabs, Alert, toaster } from 'evergreen-ui'
import EventSource from 'eventsource'

const divStyle = {
  display: 'flex',
  flex: 1,
  height: '100%'
}

const eventTypeFilter = (events, searchText) => {
  return events.filter(((event) => {
    const eventString = JSON.stringify(event).toLowerCase()
    // const eventTraits = event.traits ? JSON.stringify(event.traits).toLowerCase() : ''
    return searchText.length === 0 || eventString.indexOf(searchText.toLowerCase()) > -1
  }))
}

export default class DebuggerApp extends React.Component {
  state = {
    connectionError: false,
    isPaused: false,
    selectedEvent: undefined,
    events: [],
    filteredEvents: [],
    searchText: ''
  }
  componentDidMount() {
    const eventSource = new EventSource('http://localhost:5000/debugger-stream')

    eventSource.addEventListener('message', (event) => {
      if (event.data === 'server-error') {
        this.alertServerError()
      } else {
        this.alertServerSuccess()
        if(!this.state.isPaused) {
          this.setState((prevState) => ({
            events: [JSON.parse(event.data)].concat(prevState.events)
          }))
          if(this.state.events.length >= 500) this.state.events.length = 500
        } 
      }
    })
    eventSource.addEventListener('error', (error) => {
      this.alertServerError()
    })
  }

  alertServerError = () => {
    if(!this.state.connectionError) toaster.danger('Connection to server terminated. Trying to reconnect...', {duration: 30})
    this.setState(() => ({ connectionError: true})) 
  }

  alertServerSuccess = () => {
    if(this.state.connectionError) {
      this.setState(() => ({ connectionError: false}))
      toaster.closeAll()
      setTimeout(()=> {
        toaster.success('Server successfully reconnected!', {duration: 3})
      },100)   
    }
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
          onClick={() => toaster.notify('A simple general message')}
        />
        <DetailsPane selectedEvent={this.state.selectedEvent}/>
      </div>
    )
  }
}
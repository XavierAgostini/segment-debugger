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
    selectedEvent: '',
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
    this.setState(()=>({ searchText }))
    
  }

  render() {
    return (
      <div style={divStyle}>
        <ListPane
          events={eventTypeFilter(this.state.events, this.state.searchText)}
          handlePauseChange={this.handlePauseChange}
          handleSearchFilter={this.handleSearchFilter}
        />
        {/*<DetailsPane event={this.state.selectedEvent}/>*/}
      </div>
    )
  }
}
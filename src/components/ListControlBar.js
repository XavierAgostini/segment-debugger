import React from 'react'
import { Button, SegmentedControl, SearchInput } from 'evergreen-ui'
import './ListControlBar.module.css'

export default class ListControlBar extends React.Component {
  state={
    options: [
      { label: 'Live', value: 'live' },
      { label: 'Pause', value: 'pause' }
    ],
    value: 'live'
  }
  handleButtonChange = (value) => {``
    this.setState({ value })
    const isPaused = this.state.value === 'live'
    this.props.handlePauseChange(isPaused)
  }
  handleSearchChange = (e) => {
    const val = e.target.value
    this.props.handleSearchFilter(val)
  }

  render() {
    return (
      <div className="toolBar">
        <SegmentedControl
          width={160}
          height={40}
          options={this.state.options}
          value={this.state.value}
          onChange={value => this.handleButtonChange(value)}
        />
        <SearchInput
          name="searchBox"
          marginX='16px'
          placeholder='Type to search...'
          display="flex"
          flex="1 1 0%"
          height={40}
          onChange={this.handleSearchChange}
        />
        <Button
        alignItems='center'
        children='Advanced'
        display='inline-flex'
        disabled={true}
        is='button'
        justifyContent='center'
        secondary='true'
        >
          Advanced
        </Button>
      </div>    
    )
  }
}
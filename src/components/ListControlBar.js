import React from 'react'
import { Button, SegmentedControl, SearchInput } from 'evergreen-ui'

const toolBarStyle = {
  'WebKitBoxAlign': 'center',
  alignItems: 'center',
  borderBottom: '1px solid #d5dee6',
  display: '-webkit-box',
  display: '-ms-flexbox',
  display: 'flex',
  height: '72px',
  padding: '0 16px',
}
const buttonWrapper = {
  width: '160px',
  display: 'flex',
  margin: '0px -1px 0px 0px'
}
const searchBarWrapper = {
  position: 'relative',
  minWidth: '40px',
  minHeight: '40px',
  display: 'flex',
  margin: '0px 16px'
}
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
      <div style={toolBarStyle}>
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
          width='360px'
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
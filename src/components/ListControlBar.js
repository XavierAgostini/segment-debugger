import React from 'react'
import { Button, SegmentedControl, SearchInput } from 'evergreen-ui'

const toolBarStyle = {
  'WebKitBoxAlign': 'center',
  alignItems: 'center',
  borderBottom: '1px solid #d5dee6',
  display: '-webkit-box',
  display: '-ms-flexbox',
  display: 'flex',
  minHeight: '72px',
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

  render() {
    return (
      <div style={toolBarStyle}>
        <SegmentedControl
          width={240}
          options={this.state.options}
          value={this.state.value}
          onChange={value => this.setState({ value })}
        />
        <SearchInput
          marginX='16px'
          placeholder='Type to search...'
          width='280px'
        />
        <Button
        alignItems='center'
        children='Advanced'
        display='inline-flex'
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
import React from 'react'

export default class DebuggerApp extends React.Component {
  state = {
    events: []
  }
  componentDidMount() {
    console.log('debugger app mounted')
  }
  render() {
    return (
      <div>Segment Debugger</div>
    )
  }
}
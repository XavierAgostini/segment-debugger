import React from 'react'
import DetailsPane from './DetailsPane'
import ListPane from './ListPane'

export default class DebuggerApp extends React.Component {
  state = {
    events: []
  }
  componentDidMount() {
    console.log('debugger app mounted')
  }
  render() {
    return (
      <div>
        <ListPane/>
        {/*<DetailsPane/>*/}
      </div>
    )
  }
}
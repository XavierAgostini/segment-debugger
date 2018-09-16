import React from 'react'
// import DetailsControlBar from './DetailsControlBar'
import CodeBox from './CodeBox'
import { Button, Tab } from 'evergreen-ui'

export default class DetailsPane extends React.Component {
  state={
    options: [
      { label: 'Pretty', value: 'pretty' },
      { label: 'Raw', value: 'raw' }
    ],
    showPretty: true
  }
  enablePretty = () => {
    console.log('enablePretty')
    this.setState(() => ({
      showPretty: true
    }))
  }
  enableRaw = () => {
    console.log('enableRaw')
    this.setState(() => ({
      showPretty: false
    }))
  }
  render() {
    return (
      <div>
        <div>
          <Tab onClick={this.enablePretty}>Pretty</Tab>
          <Tab onClick={this.enableRaw}>Raw</Tab>
        </div> 
        <CodeBox view={this.state.showPretty} event={this.props.event}/>
      </div>
    )
  }
}
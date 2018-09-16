import React from 'react'
// import DetailsControlBar from './DetailsControlBar'
import CodeBox from './CodeBox'
import { Button, Tab, CheckCircleIcon } from 'evergreen-ui'

const divStyle = {
  diplay: 'flex',
  width: '50%'
}
const overflowStyle = {
  overflow: 'auto hidden'
}
export default class DetailsPane extends React.Component {
  state={
    options: [
      { label: 'Pretty', value: 'pretty' },
      { label: 'Raw', value: 'raw' }
    ],
    showPretty: true,
    eventName: JSON.parse(this.props.event).event
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
      <div style={overflowStyle}>
        <div>
          {/*<CheckCircleIcon/>*/}
          <div>{this.state.eventName}</div>
          <div>Allowed</div>
        </div>
        <div>
          <Tab onClick={this.enablePretty}>Pretty</Tab>
          <Tab onClick={this.enableRaw}>Raw</Tab>
        </div> 
        <CodeBox view={this.state.showPretty} event={this.props.event}/>
      </div>
    )
  }
}
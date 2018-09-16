import React from 'react'
import DetailsPane from './DetailsPane'
import ListPane from './ListPane'
import { Button, Tabs } from 'evergreen-ui'

const divStyle = {
  display: 'flex'
}
export default class DebuggerApp extends React.Component {
  constructor(props) {
    super(props)
    this.eventSource = new EventSource('http://localhost:5000/debugger-stream')
  }
  state = {
    events1: [],
    events: [
      '{"anonymousId":"78d263fd-729e-4d3a-a7d9-d5184b44100a","context":{"ip":"12.139.173.251","library":{"name":"analytics.js","version":"3.7.2"},"page":{"path":"/","referrer":"","search":"","title":"Test Workspace","url":"http://localhost:8081/"},"userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"},"event":"Finish Signup","integrations":{},"messageId":"ajs-70bbf0573ac6c6c9db2629701597bd51","originalTimestamp":"2018-09-16T02:56:08.512Z","properties":{"impersonator_roles":[],"is_impersonated":false,"platform":"Test","platform type":"Client-side"},"receivedAt":"2018-09-16T02:56:08.536Z","sentAt":"2018-09-16T02:56:08.514Z","timestamp":"2018-09-16T02:56:08.534Z","type":"track","userId":"d"}'
    ]
  }
  componentDidMount() {
    console.log('debugger app mounted')
    this.eventSource.addEventListener('message', (event) => {
      this.setState((prevState) => ({
        events: prevState.events.concat(event.data)
      }))
    })

  }
  render() {
    return (
      <div style={divStyle}>
        <ListPane events={this.state.events}/>
        <DetailsPane event={this.state.events[0]}/>
      </div>
    )
  }
}
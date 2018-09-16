import React from 'react'
import { Pane } from 'evergreen-ui'

const spanStyle1= {
  color: 'rgb(33, 145, 97)'
}
const spanStyle2 = {
  color: 'rgb(149, 65, 33)'
}

const preStyle = {
  overflow: 'hidden'
}
const prettyEvent = (event) =>  {
  var eventJSON = JSON.parse(event)
  var string = `analytics.${eventJSON.type}('${eventJSON.event}', \{\n`
  Object.entries(eventJSON.properties).forEach(([key, value]) => {
    string += `  ${key}: ${value},\n`
  })
  string = string.slice(0,-2)
  string += '\n});'
  return string
}
// const testEvent = '{"anonymousId":"78d263fd-729e-4d3a-a7d9-d5184b44100a","context":{"ip":"12.139.173.251","library":{"name":"analytics.js","version":"3.7.2"},"page":{"path":"/","referrer":"","search":"","title":"Test Workspace","url":"http://localhost:8081/"},"userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"},"event":"Finish Signup","integrations":{},"messageId":"ajs-70bbf0573ac6c6c9db2629701597bd51","originalTimestamp":"2018-09-16T02:56:08.512Z","properties":{"impersonator_roles":[],"is_impersonated":false,"platform":"Test","platform type":"Client-side"},"receivedAt":"2018-09-16T02:56:08.536Z","sentAt":"2018-09-16T02:56:08.514Z","timestamp":"2018-09-16T02:56:08.534Z","type":"track","userId":"d"}'
const rawEvent = (event) => {
  return JSON.stringify(JSON.parse(event), null, 2);
}
export default class CodeBox extends React.Component {
  render() {
    return (
      <div>
        <Pane
          flex='1'
          display='flex'
          minHeight='min-content'
        >
          <div>
            <pre style={preStyle}>
              <code>
                {this.props.view && rawEvent(this.props.event)}
                {!this.props.view && prettyEvent(this.props.event)}
              </code>
            </pre>
          </div>
        </Pane>
      </div>
    )
  }
}
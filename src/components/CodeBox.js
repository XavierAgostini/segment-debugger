import React from 'react'
import { Pane } from 'evergreen-ui'
import javascriptStringify from 'javascript-stringify'

const spanStyle1= {
  color: 'rgb(33, 145, 97)'
}
const spanStyle2 = {
  color: 'rgb(149, 65, 33)'
}

const preStyle = {
  // overflow: 'hidden'
}

const prettyEvent = (event) =>  {
  var string = `analytics.${event.type}(`
  if (event.type === 'track') {
    string += `'${event.event}'`
    if (event.properties) {
      string += ', \{\n'
      string += javascriptStringify(event.properties, null, 2);
    }
  }
  if (event.type === 'page' || event.type === 'screen') {
    if (event.name) {
      string += `${name}, `
    }
    string += javascriptStringify(event.properties, null, 2);
  }
  if (event.type === 'identify') {
    if (event.userId) {
      string += `'${event.userId}', `
    }
    string += javascriptStringify(event.traits, null, 2);
  }
  string+=')'
  return string
}

const rawEvent = (event) => {
  return JSON.stringify(event, null, 2);
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
                {!this.props.showPretty && rawEvent(this.props.event)}
                {this.props.showPretty && prettyEvent(this.props.event)}
              </code>
            </pre>
          </div>
        </Pane>
      </div>
    )
  }
}
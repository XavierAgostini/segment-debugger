import React from 'react'
import { Pane } from 'evergreen-ui'
import javascriptStringify from 'javascript-stringify'
import './CodeBox.module.css'

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

const generateLines = (objString) => {
  const numLines = objString.split('\n').length
  let lines = []
  for(var i = 0; i < numLines; i++) {
    let lineNum = i + 1
    lines.push(<Pane key={`line-pane-${i}`} display="flex" alignItems="center"><Pane marginLeft="auto">{lineNum}</Pane></Pane>)
  }
  return lines
}
export default class CodeBox extends React.Component {

  render() {
    return (
      <div className="codeBox">
        <Pane
          flex='1'
          display='flex'
          minHeight='min-content'
          height='100%'
        >
          <div className="lineNumbers">
            {!this.props.showPretty && generateLines(rawEvent(this.props.event))}
            {this.props.showPretty && generateLines(prettyEvent(this.props.event))}
          </div>
          <pre className="codeStyling">
            <code>
              {!this.props.showPretty && rawEvent(this.props.event)}
              {this.props.showPretty && prettyEvent(this.props.event)}
            </code>
          </pre>
        </Pane>
      </div>
    )
  }
}
import React from 'react'
// import DetailsControlBar from './DetailsControlBar'
import CodeBox from './CodeBox'
import { Button, Tab, Tabs, CheckCircleIcon } from 'evergreen-ui'

const divStyle = {
  diplay: 'flex',
  width: '50%'
}
const overflowStyle = {
  overflow: 'auto',
  height: '500px'
}
export default class DetailsPane extends React.Component {
  state={
    options: [
      { label: 'Pretty', value: 'pretty' },
      { label: 'Raw', value: 'raw' }
    ],
    showPretty: true,
    eventName: 'test'
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
    const renderDetailsBox = () => {
      if (!!!this.props.selectedEvent) {
        return (
          <div>
            <div className="ui-lib-box css-1c2r582" style={{width: 165, height: 52, display: 'inline-block', margin: '0px 0px 16px'}}><svg width="100%" height="100%" viewBox="0 0 165 52" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1)"><rect strokeOpacity=".7" stroke="#435A6F" fill="#F2F5F7" x=".0957" y=".9202" width="162.4963" height="32.0798" rx={4} /><path fill="#1F4160" fillRule="evenodd" d="M152.4288 46.335l-3.7173-7.972 6.4114-.202c.334-.0102.624-.231.725-.5495.101-.3186-.013-.666-.28-.866l-13.153-9.8033c-.233-.1724-.539-.2036-.801-.0818-.262.122-.436.3783-.453.6664l-.945 16.3767c-.0195.334.174.6427.483.771.3332.122.6723.0382.8873-.2012l4.2763-4.7823 3.7172 7.9718c.1833.3937.651.5638 1.0435.38l1.424-.664c.393-.184.563-.6512.38-1.044z" /><path stroke="#FFF" strokeWidth={3} d="M145.4658 42.3865l-2.7623 3.089c-.634.706-1.623.936-2.579.5842-.898-.373-1.4614-1.2728-1.4046-2.2426l.944-16.379c.049-.838.554-1.582 1.318-1.938.761-.353 1.652-.262 2.329.24l13.1543 9.805c.7773.582 1.105 1.592.811 2.52-.293.926-1.137 1.566-2.1076 1.596l-4.138.131 2.756 5.9104c.533 1.1433.0386 2.502-1.1054 3.0373l-1.422.663c-1.1443.5356-2.505.04-3.039-1.1045l-2.756-5.91z" /><path d="M9.7322 19.2678c.9763.9763 2.5593.9763 3.5356 0 .9763-.9763.9763-2.5593 0-3.5356-.9763-.9763-2.5593-.9763-3.5356 0-.9763.9763-.9763 2.5593 0 3.5356zM22.5 20h32c1.3807 0 2.5-1.1193 2.5-2.5S55.8807 15 54.5 15h-32c-1.3807 0-2.5 1.1193-2.5 2.5s1.1193 2.5 2.5 2.5zm107 0h24c1.3807 0 2.5-1.1193 2.5-2.5s-1.1193-2.5-2.5-2.5h-24c-1.3807 0-2.5 1.1193-2.5 2.5s1.1193 2.5 2.5 2.5zm-31 0h16c1.3807 0 2.5-1.1193 2.5-2.5s-1.1193-2.5-2.5-2.5h-16c-1.3807 0-2.5 1.1193-2.5 2.5s1.1193 2.5 2.5 2.5z" fillOpacity=".7" fill="#435A6F" /><ellipse fill="#E6EAED" cx={81} cy="47.5" rx={37} ry="2.5" /></g></svg></div>
            <h2>Select an Event</h2>
            <p>Select an event to view the code snippet (pretty view) or complete JSON payload (raw view).</p>
          </div>
        )
      } else {
        return (
          <div style={overflowStyle}>
            <div>
              {/*<CheckCircleIcon/>*/}
              <div>{this.state.eventName}</div>
              <div>Allowed</div>
            </div>
            <div>
            <Tabs/>
              <Tab onClick={this.enablePretty}>Pretty</Tab>
              <Tab onClick={this.enableRaw}>Raw</Tab>
            </div> 
            <CodeBox showPretty={this.state.showPretty} event={this.props.selectedEvent}/>
          </div>
        )
      }
    }
    
    const test = () => {
      return (<h1>Hello World</h1>)
    }
    return (
      renderDetailsBox()
    )
  }
}
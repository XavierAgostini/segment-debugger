import React from 'react'
// import DetailsControlBar from './DetailsControlBar'
import CodeBox from './CodeBox'
import { Tab } from 'evergreen-ui'
import CircleCheck from './CircleCheck'
import SelectEvent from './SelectEvent'
import './DetailsPane.module.css'

const divStyle = {
  diplay: 'flex',
  width: '50%'
}
const overflowStyle = {

}
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
    const renderDetailsBox = () => {
      if (!!!this.props.selectedEvent) {
        return (
          <SelectEvent/>
        )
      } else {
        return (
          <div className="detailsWrapper">
            <div className="detailsHeader">
              <CircleCheck c="45px"/>
              <div className="detailsHeaderName">
                <h2>{this.props.selectedEvent.event}</h2>
                Allowed
              </div>
            </div>
            <div>
              <Tab onClick={this.enablePretty}>Pretty</Tab>
              <Tab onClick={this.enableRaw}>Raw</Tab>
            </div> 
            <CodeBox showPretty={this.state.showPretty} event={this.props.selectedEvent}/>
          </div>
        )
      }
    }
    return (
      <div className="detailsPaneWrapper">
        {renderDetailsBox()}
      </div>
    )
  }
}
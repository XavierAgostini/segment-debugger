import React from 'react'

import DetailsControlBar from './DetailsControlBar'
import CodeBox from './CodeBox'
export default class DetailsPane extends React.Component {
  render() {
    return (
      <div>
        <h1>Details Pane</h1>
        <DetailsControlBar/>
        <CodeBox/>
      </div>
    )
  }
}
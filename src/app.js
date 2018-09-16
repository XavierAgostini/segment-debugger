import React from 'react'
import ReactDOM from 'react-dom'
import DebuggerApp from './components/DebuggerApp'
import { Button } from 'evergreen-ui'

ReactDOM.render(
  <div>
    <Button>I am using 🌲 Evergreen!</Button>
    <DebuggerApp/>
  </div>,
  document.getElementById('app')
)
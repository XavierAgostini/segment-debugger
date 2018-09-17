import React from 'react'
import { Pane } from 'evergreen-ui'

export default () => {
  return (
    <Pane
    display="inline-block"
    width="16px"
    height="17px"
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 17"
      xmlns="http://www.w3.org/2000/svg"
      fill='#086ed2'
    >
      <path d="M8 .51c-4.41 0-8 3.588-8 8 0 4.41 3.59 8 8 8s8-3.59 8-8c0-4.412-3.59-8-8-8zm0 14c-3.31 0-6-2.692-6-6 0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.308-2.69 6-6 6z" />
      <path d="M7 11.923L3.586 8.51 5 7.094l2 2 4-4 1.414 1.414" />
    </svg>
  </Pane>
  )
}
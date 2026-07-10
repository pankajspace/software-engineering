// https://react.dev/reference/react-dom/createPortal
// createPortal lets you render some children into a different part of the DOM.

import React from 'react'
import ReactDOM from 'react-dom'

// Inspect the text on this page using devtools to see the difference between the two p tags
export default function Portal(props) {
  return (
    <>
      <h3>Inspect the text on this page using devtools to see the difference between the two tags</h3>
      <p>Inside the root but Outside the Portal</p>
      {
        ReactDOM.createPortal(
          <p>Inside the Portal but Outside the root</p>,
          document.getElementById('portal')
        )
      }
    </>
  )
}
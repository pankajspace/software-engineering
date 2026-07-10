// https://react.dev/reference/react/useDebugValue
// useDebugValue is a React Hook that lets you add a label to a custom Hook in React DevTools.

import { useState, useDebugValue } from 'react'

export default function UseDebugValue() {
  const [value, setValue] = useState("")

  useDebugValue(value, value => {
    return value.toUpperCase()
  })

  return (
    <main>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
    </main>
  )
}
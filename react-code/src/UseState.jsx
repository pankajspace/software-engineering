// https://react.dev/reference/react/useState
// useState is a React Hook that lets you add a state variable to your component.

import { useState } from 'react'

function countInitial() {
  console.log("countInitial");
  return 0
}

export default function UseState() {
  // This will run countInitial on every render
  // const [count, setCount] = useState(countInitial());

  // This will run countInitial only once
  const [count, setCount] = useState(() => countInitial());

  function decrement() {
    setCount(prevCount => prevCount - 1)
  }

  function increment() {
    setCount(prevCount => prevCount + 1)
  }

  return (
    <main>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </main>
  )
}

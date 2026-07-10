// https://react.dev/reference/react/useReducer
// useReducer is a React Hook that lets you add a reducer to your component.

import { useState, useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + action.payload }
    case "decrement": return { count: state.count - action.payload }
    default: return state
  }
}

export default function UseReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  function decrement() {
    dispatch({ type: "decrement", payload: 1 })
  }

  function increment() {
    dispatch({ type: "increment", payload: 2 })
  }

  return (
    <main>
      <button onClick={decrement}>-</button>
      <span>{state.count}</span>
      <button onClick={increment}>+</button>
    </main>
  )
}

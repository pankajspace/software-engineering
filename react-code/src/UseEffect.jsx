// https://react.dev/reference/react/useEffect
// useEffect is a React Hook that lets you synchronize a component with an external system.

import { useEffect, useState } from 'react'

export default function UseEffect() {
  const [resource, setResource] = useState("users")
  const [data, setData] = useState([])

  // this useEffect will run every time the component renders
  useEffect(() => {
    console.log("Component rendered");
  })

  // this useEffect will run when the component mounts
  useEffect(() => {
    console.log("Component mounted");
  }, [])

  // this useEffect will run when the component mounts and when the resource changes
  useEffect(() => {
    console.log("resource mounted");

    async function loadData() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`)
      const json = await res.json()
      setData(json)
    }
    loadData()

    // cleanup function
    return () => {
      console.log("resource unmounted")
    }
  }, [resource])

  return (
    <main>
      <button onClick={() => setResource("users")}>users</button>
      <button onClick={() => setResource("posts")}>posts</button>
      <button onClick={() => setResource("comments")}>comments</button>

      <h3>{resource}</h3>
      {data.map(item => <pre key={item.id}> {JSON.stringify(item)} </pre>)}
    </main >
  )
}
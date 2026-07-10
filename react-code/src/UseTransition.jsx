// https://react.dev/reference/react/useTransition
// useTransition is a React Hook that lets you update the state without blocking the UI.

import { useTransition, useState } from "react";

export default function UseTransition() {
  const [value, setValue] = useState("")
  const [list, setList] = useState([])
  const [isPending, startTransation] = useTransition()

  const handleChange = (e) => {
    setValue(e.target.value);

    // // laggy code
    // const l = [];
    // for (let i = 0; i <= 20000; i++) {
    //   l.push(e.target.value)
    // }
    // setList(l)

    startTransation(() => {
      // laggy code moved here
      const l = [];
      for (let i = 0; i <= 20000; i++) {
        l.push(e.target.value)
      }
      setList(l)
    })
  }

  return (
    <>
      <input value={value} onChange={handleChange} />
      {isPending ? "Loading..." : list.map((item, index) => {
        return <div key={index}>{item}</div>
      })}
    </>
  )
}
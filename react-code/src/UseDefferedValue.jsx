// https://react.dev/reference/react/useDeferredValue
// useDeferredValue is a React Hook that lets you defer updating a part of the UI.

import { useState, useMemo, useDeferredValue, useEffect } from "react";

function List({ input }) {

  const deferredInput = useDeferredValue(input);

  // // the page and the input element will become slow here as it has to wait till the list is being prepared for rendering
  // const list = useMemo(() => {
  //   const l = [];
  //   for (let i = 0; i <= 20000; i++) {
  //     l.push(<div key={i}>{input}</div>)
  //   }
  //   return l;
  // }, [input])

  // fast as react will calculate this later and not wait for it for rendering the page
  const list = useMemo(() => {
    const l = [];
    for (let i = 0; i <= 10000; i++) {
      l.push(<div key={i}>{deferredInput}</div>)
    }
    return l;
  }, [deferredInput])

  useEffect(() => {
    console.log(`Input: ${input}, deferredInput: ${deferredInput},`)
  }, [input, deferredInput])

  return list;
}

export default function UseDefferedValue() {
  const [value, setValue] = useState("")

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <input value={value} onChange={handleChange} />
      <List input={value} />
    </>
  )
}
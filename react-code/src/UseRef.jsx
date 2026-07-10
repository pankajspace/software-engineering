// https://react.dev/reference/react/useRef
// useRef is a React Hook that lets you reference a value that’s not needed for rendering.

import React, { useState, useEffect, useRef } from "react";

export function UseRef1() {
  const inputRef = useRef();

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={() => inputRef.current.focus()}>Focus Textbox</button>
    </>
  );
}

// renderedTimes variable keeps it value even after re-render
let renderedTimes = 1;
export function UseRef2() {
  // we can't use state easily to count how many times the component rendered.
  const [count, setCount] = useState(0);

  const [value, setValue] = useState("");

  // renderCountRef variable also keeps it value even after re-render
  const renderCountRef = useRef(1);

  useEffect(() => {
    // we can't use state easily to count how many times the component rendered.
    // setCount(count + 1);

    renderCountRef.current = renderCountRef.current + 1;
    renderedTimes++;
  });

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>I am rendered {count} times.</div>
      <div>I am rendered {renderCountRef.current} times.</div>
      <div>I am rendered {renderedTimes} times.</div>
    </>
  );
}

let earlierName = "";
export function UseRef3() {
  const [name, setName] = useState("");

  // useRef is used to store previous value of the state i.e name
  const prevName = useRef("");

  useEffect(() => {
    prevName.current = name;
    earlierName = name;
  }, [name]);

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        My previous name was {prevName.current}.
        <br />
        My previous name was {earlierName}.
        <br />
        My Current name is {name}
      </div>
    </>
  );
}

export function UseRef4() {
  const inputRef = useRef();

  return (
    <>
      <CustomInput ref={inputRef} type="text" />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </>
  );
}

// we need to use React.forwardRef to use useRef with a custom component.
const CustomInput = React.forwardRef((props, ref) => {
  return <input ref={ref} type="text" />
});
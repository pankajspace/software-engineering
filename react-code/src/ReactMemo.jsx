// https://react.dev/reference/react/memo
// lets you skip re-rendering a component when its props are unchanged.
// By default it will only shallowly compare complex objects in the props object.
// If you want control over the comparison, you can also provide a custom comparison function as the second argument.

import { memo, useState } from "react";

const ReactMemo = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  return (
    <>
      <label>Name : <input value={name} onChange={e => setName(e.target.value)} /></label>
      <label>Address : <input value={address} onChange={e => setAddress(e.target.value)} /></label>
      <Greeting1 name={name} />
      <Greeting2 name={name} />
    </>
  );
};

// This Greeting1 component will rerender even if the address is 
// changed, to avoid this we need to use memo
function Greeting1({ name }) {
  console.log("Greeting1 was rendered at", new Date().toLocaleTimeString());
  return <h3>Hello {name}!</h3>;
};

// This Gretting component is a pure component, it will only 
// re-render when its prop(name in this case) changes.
const Greeting2 = memo(function Greeting({ name }) {
  console.log("Greeting2 was rendered at", new Date().toLocaleTimeString());
  return <h3>Hello {name}!</h3>;
});

export default ReactMemo;
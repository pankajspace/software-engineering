// https://react.dev/reference/react/useId
// useId is a React Hook for generating unique IDs that can be passed to accessibility attributes.
// useId is used to generate unique ids for html elements, a unique id is generated for each element even though the component is rendered multiple times.

import React, { useId } from "react";

function EmailForm() {
  const id = useId()

  return <>
    <label htmlFor={`${id}-email`} >Email</label>
    <input type="email" id={`${id}-email`} />
    <br />
    <label htmlFor={`${id}-name`} >Name</label>
    <input type="text" id={`${id}-name`} />
  </>
}

export default function UseId() {
  return <>
    <EmailForm></EmailForm>
    <p>Hello World!</p>
    <EmailForm></EmailForm>
  </>
}
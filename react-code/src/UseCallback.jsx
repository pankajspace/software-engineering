// https://react.dev/reference/react/useCallback
// useCallback is a React Hook that lets you cache a function definition between re-renders.

import { useEffect, useState, memo } from "react";

// even if we are using memo here this component will re render every time as 
// calculateTax function is created on every render in parent component so its 
// not the same as previous one. So we have to use useCallback to memoize the 
// function in parent component.
const Tax = memo(({ calculateTax }) => {
  const [tax, setTax] = useState(0);

  useEffect(() => {
    console.log("Calculating tax");
    setTax(calculateTax(20));
  }, [calculateTax])

  return <div>Tax is : {tax}</div>
})

export default function UseCallback() {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState(0);

  // inefficient, on every render this function is created again, so it will 
  // be called even if only name is changed.
  const calculateTax = (rate = 30) => salary * rate / 100;

  // efficient as useCallback will create the function only when salary changes, 
  // it will not be called if only name changes.
  // Since this function is memoized, it will not be created again on every render,
  // so the Tax component will not re-render on every render.
  // const calculateTax = useCallback((rate = 30) => salary * rate / 100, [salary]);

  return (
    <>
      Your Name: <input type="text" onChange={(e) => setName(e.target.value)} /> &nbsp;
      Salary: <input type="number" onChange={(e) => setSalary(parseInt(e.target.value || 0))} /> &nbsp;
      <Tax calculateTax={calculateTax}></Tax>
    </>
  );
}
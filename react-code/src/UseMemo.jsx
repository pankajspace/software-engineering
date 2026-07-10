// https://react.dev/reference/react/useMemo
// useMemo is a React Hook that lets you cache the result of a calculation between re-renders.


import { useState } from "react";

function calculateTax(number) {
  console.log("Calculating tax");
  return number * 30 / 100;
}

export default function UseMemo() {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState(0);

  // inefficient as it will run every time the component re-renders even if salary state value doesn't change and 
  // only name state value changes
  const tax = calculateTax(salary);

  // efficient as it will only run when salary state value changes
  // const tax = useMemo(() => calculateTax(salary), [salary]);

  return (
    <>
      Your Name: <input type="text" onChange={(e) => setName(e.target.value)} /> &nbsp;
      Your Salary: <input type="number" onChange={(e) => setSalary(parseInt(e.target.value))} />
      <b> &nbsp; Computed Tax: {tax}</b>
    </>
  );
}
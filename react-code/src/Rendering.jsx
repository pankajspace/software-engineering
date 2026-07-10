import React, { useEffect, useLayoutEffect, useMemo } from "react";

// Basic rendering example
export const Rendering1 = () => {
  useEffect(() => {
    console.log("useEffect");
    return () => {
      console.log("useEffect cleanup");
    };
  }, []);

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
  }, []);

  const memoText = useMemo(() => {
    console.log("useMemo");
    return "useMemo";
  }, []);

  return <>
    <div> Rendering {console.log("Rendering")}</div>
    <div>{memoText}</div>
  </>
}

// useEffect and useLayoutEffect example
export function Rendering2() {
  useEffect(() => {
    console.log('Use Effect from Parent Component!')
  }, [])

  useLayoutEffect(() => {
    console.log('Use Layout Effect from Parent Component!')
  }, [])

  return (
    <>
      <div>{console.log("Parent Component")}</div>
      <h3>Parent Component</h3>
      <ChildComponent />
    </>
  )
}

function ChildComponent() {
  useEffect(() => {
    console.log('Use Effect from Child Component!')
  }, [])

  useLayoutEffect(() => {
    console.log('Use Layout Effect from Child Component!')
  }, [])

  return (
    <>
      <div>{console.log("Child Component")}</div>
      <h3>Child Component</h3>
      <GrandChildComponent />
    </>
  )
}

function GrandChildComponent() {
  useEffect(() => {
    console.log('Use Effect from Grand Child Component!')
  }, [])

  useLayoutEffect(() => {
    console.log('Use Layout Effect from Grand Child Component!')
  }, [])

  return (
    <div>
      <div>{console.log("Grand Child Component")}</div>
      <h3>Grand Child Component</h3>
    </div>
  )
}
// Output

// Parent Component
// Child Component
// Grand Child Component

// Use Layout Effect from Grand Child Component!
// Use Layout Effect from Child Component!
// Use Layout Effect from Parent Component!

// Use Effect from Grand Child Component!
// Use Effect from Child Component!
// Use Effect from Parent Component!


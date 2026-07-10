import React from "react";

export default function LazyComponent() {
  return (
    <>
      <div>{console.log("Lazy Component")}</div>
      <h3>Lazy Component</h3>
    </>
  )
}


import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "./cakeSlice";

function CakeView() {
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of Cakes: {numOfCakes}</h2>
      <button onClick={() => dispatch(ordered())}>Order Cakes</button>
      <button onClick={() => dispatch(restocked(3))}>Restock Cakes</button>
    </div>
  );
}

export default CakeView;

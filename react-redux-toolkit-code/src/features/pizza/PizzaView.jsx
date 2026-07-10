import React from "react";
import { useSelector, useDispatch } from "react-redux";
import pizzaSlice from "./pizzaSlice";

function PizzaView() {
  const numOfPizzas = useSelector((state) => state.pizza.numOfPizzas);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of Pizzas: {numOfPizzas}</h2>
      <button onClick={() => dispatch(pizzaSlice.actions.ordered())}>
        Order Pizzas
      </button>
      <button onClick={() => dispatch(pizzaSlice.actions.restocked(3))}>
        Restock Pizzas
      </button>
    </div>
  );
}

export default PizzaView;

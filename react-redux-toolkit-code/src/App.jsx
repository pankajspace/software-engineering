import CakeView from "./features/cake/CakeView";
import PizzaView from "./features/pizza/PizzaView";
import UserView from "./features/user/UserView";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CakeView></CakeView>
      <PizzaView></PizzaView>
      <UserView></UserView>
    </div>
  );
}

export default App;

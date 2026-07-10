// https://react.dev/reference/react/useContext
// useContext is a React Hook that lets you read and subscribe to context from your component.

import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();

export default function UseContext() {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ChildComponent />
      </div>
    </ThemeContext.Provider>
  );
}

function ChildComponent() {
  const { theme, setTheme } = useContext(ThemeContext);

  const style = {
    display: "inline-block",
    padding: "5px",
    backgroundColor: theme == "dark" ? "black" : "white",
    color: theme == "dark" ? "white" : "black",
    border: "2px solid blue",
  }

  return (
    <div style={style}>
      <button onClick={() => { theme == "dark" ? setTheme("light") : setTheme("dark") }}>Toggle Theme</button>
      <br /> <br />
      <GrandChildComponent1 />
      <br />
      <GrandChildComponent2 />
    </div>
  );
}

// GrandChildComponent1 is a class component
class GrandChildComponent1 extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, setTheme }) => {
          return (
            <div>
              <button onClick={() => setTheme("light")}>To Light</button>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

// GrandChildComponent2 is a functional component
function GrandChildComponent2() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <button onClick={() => setTheme("dark")}>To Dark</button>
    </div>
  );
}
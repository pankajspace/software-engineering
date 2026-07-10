[<- react-quick](react-quick.md)

# Using TypeScript with React 
It can greatly enhance your development experience by providing static type checking, better tooling (e.g., autocompletion), and catching potential errors early during the development process. TypeScript integrates seamlessly with React, allowing you to define props, state, and hooks types in a way that ensures your components are type-safe.

Below, we'll walk through a detailed setup and examples to illustrate how you can use TypeScript in a React application.

## 1. Setting up a React Project with TypeScript

If you are starting a new React project, you can create a new React app with TypeScript support using the following command:

```bash
npx create-react-app my-app --template typescript
```

This command will set up a new project with all the necessary TypeScript dependencies configured.

If you're adding TypeScript to an existing React project, you can follow these steps:

1. Install the necessary TypeScript dependencies:

   ```bash
   npm install typescript @types/react @types/react-dom
   ```

2. Rename your existing `.js` files to `.tsx` (for React components) or `.ts` (for non-JSX files).

---

## 2. Creating a Functional Component with TypeScript

Here is a simple example of a React functional component written in TypeScript:

```tsx
// Greeting.tsx
import React from 'react';

// Define the type of props the component accepts
interface GreetingProps {
  name: string;
  age?: number; // Optional prop
}

const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
};

export default Greeting;
```

## Explanation:
- We define an interface `GreetingProps` to specify the types of the props that the component will accept. Here, `name` is a required `string` prop, while `age` is an optional `number` prop (denoted by the `?`).
- We use `React.FC` (Function Component) to type the functional component, which allows TypeScript to infer the return type and check the props.
- We destructure the props in the component and render them conditionally (only show the age if it's provided).

### Usage:

```tsx
import React from 'react';
import Greeting from './Greeting';

const App: React.FC = () => {
  return (
    <div>
      <Greeting name="John Doe" />
      <Greeting name="Jane Doe" age={28} />
    </div>
  );
};

export default App;
```

---

## 3. Typing State in Functional Components with Hooks

When using React hooks like `useState` in TypeScript, we need to specify the types of the state variables.

Here’s an example of how to use `useState` with TypeScript:

```tsx
import React, { useState } from 'react';

const Counter: React.FC = () => {
  // TypeScript will infer the type based on the initial value
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
```

## Explanation:
- We specify the type of the state (`number`) by passing it as a generic argument to `useState`.
- TypeScript will ensure that only a `number` can be passed to the `setCount` function.

---

## 4. Typing Event Handlers in React

React uses a specific type system for handling events. For example, when dealing with form inputs or button clicks, you need to use the correct event type.

Here’s an example of how to type a form input event:

```tsx
import React, { useState } from 'react';

const NameForm: React.FC = () => {
  const [name, setName] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={handleChange} />
        </label>
      </form>
      <p>Your name is: {name}</p>
    </div>
  );
};

export default NameForm;
```

## Explanation:
- The `onChange` handler uses the `React.ChangeEvent<HTMLInputElement>` type. This tells TypeScript that the event is an input change event, and it allows you to access `e.target.value` without errors.
- The state `name` is typed as a `string`, ensuring that `setName` can only accept strings.

---

## 5. Typing Props for Class Components

For class components, you need to type both props and state. Here’s how you can do that:

```tsx
import React, { Component } from 'react';

interface TimerProps {
  initialTime: number;
}

interface TimerState {
  time: number;
}

class Timer extends Component<TimerProps, TimerState> {
  state: TimerState = {
    time: this.props.initialTime,
  };

  tick = () => {
    this.setState((prevState) => ({ time: prevState.time - 1 }));
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  interval: NodeJS.Timeout | undefined;

  render() {
    return <h1>Time: {this.state.time}</h1>;
  }
}

export default Timer;
```

## Explanation:
- We define two interfaces: `TimerProps` for the props and `TimerState` for the state.
- The class component extends `Component<TimerProps, TimerState>` to define the types for props and state.
- We type the `interval` as `NodeJS.Timeout` (which is necessary for `setInterval`).
- TypeScript ensures that `initialTime` is provided as a prop and that the state is correctly initialized and updated.

---

## 6. Typing Custom Hooks

When creating custom hooks, you can use TypeScript generics to make them reusable across different types of data.

Here’s an example of a custom hook to fetch data from an API:

```tsx
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const useFetchData = <T,>(url: string): { data: T | null; loading: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading };
};

export default useFetchData;
```

## Explanation:
- The custom hook `useFetchData` takes a generic type `T` and returns the fetched data typed as `T` or `null`, along with a loading state.
- You can use this hook for any data type, making it reusable and type-safe.

### Usage:

```tsx
import React from 'react';
import useFetchData from './useFetchData';

const UserList: React.FC = () => {
  const { data, loading } = useFetchData<User[]>('https://jsonplaceholder.typicode.com/users');

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
```

Here, `useFetchData<User[]>` ensures that the hook fetches an array of `User` objects, and TypeScript will provide full type checking and autocompletion for the `data` object.

---

## 7. Typing Context in React with TypeScript

Context API is used to manage global state across components, and TypeScript can help enforce type safety when creating and using contexts.

Here’s an example:

```tsx
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (name: string) => {
    setUser(name);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
```

## Explanation:
- We define an `AuthContextType` interface to enforce the structure of the context, which includes the `user`, `login`, and `logout` properties.
- The `AuthProvider` wraps around the app and provides the context, and `useAuth` is a custom hook to access the context safely.

---

## Conclusion

Using TypeScript with React provides strong type safety, which can lead to fewer runtime errors and better tooling support. Whether you're typing props, state, events, or custom hooks, TypeScript helps ensure that your React components behave as expected and that the types of your data flow through your components properly.

---

[<- react-quick](react-quick.md)

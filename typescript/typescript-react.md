[<- TypeScript](ts-quick.md)

## TypeScript React

Using React with TypeScript can improve code quality, provide enhanced type safety, and improve IDE support. Here’s a detailed guide on setting up React with TypeScript, creating components, and using various TypeScript features.

### Step 1: Setting Up React with TypeScript

First, you’ll want to set up a React app with TypeScript. You can either add TypeScript to an existing React app or create a new one with TypeScript.

#### 1.1 Create a New React App with TypeScript

You can use `create-react-app` with a TypeScript template:

```bash
npx create-react-app my-app --template typescript
```

This command will set up a new React project with TypeScript support.

#### 1.2 Adding TypeScript to an Existing React Project

If you already have a React project and want to add TypeScript to it, you can install TypeScript and some type definitions as follows:

```bash
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

Next, rename any `.js` files you want to convert to TypeScript to `.tsx`. TypeScript files in React use `.tsx` for files that include JSX syntax.

### Step 2: TypeScript Basics in React

With TypeScript, you can define the types of props, state, and other variables, making your components more predictable and easier to debug.

#### 2.1 Defining Props Types

When creating a React component, you define an interface for the props to specify what props are expected.

##### Example: Defining a Component with Props

```tsx
import React from 'react';

interface GreetingProps {
  name: string;
  age?: number; // optional prop
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

In this example:
- `GreetingProps` is an interface that defines the types for the `name` and `age` props.
- `React.FC<GreetingProps>` tells TypeScript that `Greeting` is a functional component that expects props matching `GreetingProps`.

#### 2.2 Using State with TypeScript

When using state in functional components, you can specify the type of the state variable.

##### Example: Using State in a Component

```tsx
import React, { useState } from 'react';

const Counter: React.FC = () => {
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

In this example:
- `useState<number>(0)` tells TypeScript that `count` is of type `number`.

### Step 3: More Advanced Examples

#### 3.1 Using Context API with TypeScript

When using the Context API, you can type the context to ensure the data passed between components is type-safe.

##### Example: Setting Up Context

```tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
```

In this example:
- `ThemeContextProps` defines the shape of the context.
- `ThemeContext` is a context created with `createContext`, initially set to `undefined` for checking inside `useTheme`.
- `ThemeProvider` provides the context and ensures that any children passed can access `darkMode` and `toggleDarkMode`.

#### 3.2 Typing Component Refs

React refs are commonly used to access and modify DOM elements directly. TypeScript allows us to define the type of the referenced element.

##### Example: Using a Ref

```tsx
import React, { useRef } from 'react';

const TextInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

export default TextInput;
```

In this example:
- `useRef<HTMLInputElement>(null)` specifies that `inputRef` is of type `HTMLInputElement`, allowing TypeScript to check the `focus` method on `inputRef`.

### Step 4: Using Type Aliases and Enums

In more complex applications, you can use TypeScript features like type aliases and enums.

#### 4.1 Type Aliases

Type aliases let you define a custom type for a set of properties or values.

```tsx
type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  variant: ButtonVariant;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ variant, label }) => {
  return <button className={`btn btn-${variant}`}>{label}</button>;
};

export default Button;
```

In this example:
- `ButtonVariant` is a type alias that limits `variant` to specific string values, ensuring only those values are passed.

#### 4.2 Enums

Enums allow you to define a set of named constants.

```tsx
enum Status {
  Loading,
  Success,
  Error,
}

interface StatusMessageProps {
  status: Status;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  if (status === Status.Loading) return <p>Loading...</p>;
  if (status === Status.Success) return <p>Success!</p>;
  return <p>Error occurred.</p>;
};

export default StatusMessage;
```

In this example:
- `Status` is an enum with values for different statuses, making it easy to manage various states and check against them without magic strings.

### Step 5: Using Generics in React Components

Generics make components more flexible by allowing them to accept and work with different types.

```tsx
import React from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>;
};

export default List;
```

In this example:
- `ListProps<T>` is a generic interface where `T` represents the type of items in the list.
- `<T,>` syntax specifies `T` as the generic type and enforces type checking on `items` and `renderItem`.

### Summary

This guide covered:
1. Setting up React with TypeScript.
2. Typing props, state, and refs.
3. Using Context API with TypeScript.
4. Advanced types like enums, type aliases, and generics.

This setup provides type safety and predictability, making the development experience smoother and reducing potential runtime errors. Let me know if you have more questions on React with TypeScript, such as handling forms or API calls!

---

[<- TypeScript](ts-quick.md)

// https://react.dev/reference/react/useSyncExternalStore
// useSyncExternalStore is a React Hook that lets you subscribe to an external store.

import { useSyncExternalStore } from "react";

// For example, in the code below, todosStore is implemented as an external 
// store that stores data outside of React. The UseSyncExternalStore component connects 
// to that external store with the useSyncExternalStore Hook.
export default function UseSyncExternalStore() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  return (
    <>
      <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

// todoStore.js
// This is an example of a third-party store that you might need to integrate with React.
// If your app is fully built with React, we recommend using React state instead.
let nextId = 0;
let todos = [{ id: nextId++, text: 'Todo #1' }];
let listeners = [];

export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: 'Todo #' + nextId }]
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  }
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}
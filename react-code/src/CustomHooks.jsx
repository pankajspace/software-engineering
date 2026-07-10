// https://react.dev/reference/react/useDebugValue

import { useState, useEffect, useDebugValue, useCallback } from 'react';

// useLogger is a custom hook that logs the value passed to it
function useLogger(value) {
  useEffect(() => {
    console.log(value)
  }, [value])
}

export function Logger() {
  const [name, setName] = useState('');

  // simple custom hook
  useLogger(name);

  return (
    <main>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </main>
  )
}

// ------------------------------------------------------------

// useLocalStorage is a custom hook that saves the value passed to it in localStorage and retrieves it when the component mounts
function getSavedValue(key, initialValue) {
  const savedValue = JSON.parse(localStorage.getItem(key));

  if (savedValue) { return savedValue }

  //if someone passes function as argument to hook like we can pass to useState hook
  if (initialValue instanceof Function) { return initialValue() }

  return initialValue
}

function useLocalStorage(key, initialValue) {
  useDebugValue(key); // this will show key in react dev tools to help in debugging

  const [value, setValue] = useState(() => getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}

export function LocalStorage() {
  // simple version
  // const [name, setName] = useLocalStorage("name", '');

  // function version
  const [name, setName] = useLocalStorage("name", () => 'pankaj');

  return (
    <main>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </main>
  )
}

// ------------------------------------------------------------

// useToggle is a custom hook that toggles between true and false
function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);

  function toggleValue(value) {
    setValue(currentValue => typeof value == "boolean" ? value : !currentValue);
  }

  return [value, toggleValue];
}

export function Toggle() {
  // const [value, toggleValue] = useState(false);
  const [value, toggleValue] = useToggle(false)
  console.log(value);

  return (
    <div>
      <div>{value.toString()}</div>
      <button onClick={toggleValue}>Toggle</button>
      <button onClick={() => toggleValue(true)}>Make True</button>
      <button onClick={() => toggleValue(false)}>Make False</button>
    </div>
  )
}

// ------------------------------------------------------------

// useDebounce is a custom hook that debounces the value passed to it
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue;
}

export function Debounce() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);

  return (
    <main>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
      <p>{debouncedSearch}</p>
    </main>
  )
}

// ------------------------------------------------------------

// useAsync is a custom hook that fetches data from an API
function useAsync(asyncFunction) {
  const [status, setStatus] = useState(null);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return asyncFunction()
      .then(response => {
        setValue(response);
        setStatus('success');
      })
      .catch(error => {
        setError(error);
        setStatus('error');
      })
  }, [asyncFunction])

  return { execute, status, value, error }
}

export function Async() {
  const asyncFunction = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd = Math.floor(Math.random() * 10);
      rnd <= 5 ? reject("Error!") : resolve("Hello, world!")
    }, 1000)
  });

  const { execute, status, value, error } = useAsync(asyncFunction);

  return (
    <main>
      <button onClick={execute}>Fetch</button>
      {status === 'pending' && <p>Loading...</p>}
      {status === 'success' && <p>{value}</p>}
      {status === 'error' && <p>{error}</p>}
    </main>
  )
}

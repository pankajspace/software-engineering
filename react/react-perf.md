[<- Performance](../performance/perf-quick.md) | [<- react-quick](react-quick.md)

# React Performance Quick
1.  Use lazy loading for components
2.  Use keys for lists
3.  Use code splitting
4.  Lazy load images
5.  Debounce network requests
6.  Use React.memo for functional components
7.  Use useMemo and useCallback hooks
8.  Use server-side rendering
9.  Use Webpack for bundling and minification and various plugins for optimization
10. Use virtualization for large lists or tables (react-window, react-virtualized, intersection-observer)
11. Use Service Workers for caching
12. Use Web Workers for offloading tasks
13. Use useDefferedValue hook for deferring execution of laggy code
14. Use useTransition hook for deferring rendering of laggy code
15. Use React.StrictMode for identifying potential issues
16. Use React Profiler for performance monitoring
17. Use React DevTools for debugging
18. Use React.PureComponent for class components
19. Use shouldComponentUpdate for class components
20. Use `<img>` and `<picture>` tags for images using attribute properly (lazy loading, responsive images)

---

# React Performance Optimization Techniques

## 1. **Memoization Using `React.memo`**
`React.memo` is a higher-order component (HOC) that prevents unnecessary re-renders of functional components by memoizing the rendered output. If the props haven't changed, the component is not re-rendered.

**How to use `React.memo`:**
```js
const MyComponent = React.memo((props) => {
  return <div>{props.value}</div>;
});
```

**When to use it:**
- Use `React.memo` for functional components that don't need to re-render unless their props change.
- This is particularly useful in lists or large components where re-rendering would be expensive.

## 2. **Using `useMemo` and `useCallback` Hooks**
Both `useMemo` and `useCallback` help optimize expensive computations or function re-creations in React components.

- **`useMemo`:** Memoizes the result of a computation and recalculates only when its dependencies change. This is useful for avoiding expensive calculations on each render.

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

return <div>{memoizedValue}</div>;
```

- **`useCallback`:** Memoizes the function itself, ensuring that the same function reference is passed to child components, preventing unnecessary re-renders.

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

<button onClick={memoizedCallback}>Click</button>
```

## 3. **Avoiding Anonymous Functions in JSX**
When you pass anonymous functions directly in JSX, a new function is created on every render, which may trigger re-renders of child components.

**Example (Bad Practice):**
```js
<button onClick={() => handleClick(value)}>Click</button>
```

**Optimized (Good Practice):**
```js
const handleClick = useCallback(() => {
  // handle click logic
}, [value]);

<button onClick={handleClick}>Click</button>
```

## 4. **Code-Splitting with `React.lazy` and `Suspense`**
Code-splitting allows you to split your JavaScript bundles so that only the necessary code is loaded when it's needed. This helps reduce the initial load time of your app.

**Using `React.lazy` for code-splitting:**
```js
const MyComponent = React.lazy(() => import('./MyComponent'));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </React.Suspense>
  );
}
```

## 5. **Avoiding Prop Drilling with Context API or Redux**
Prop drilling occurs when you pass props down through multiple layers of components. This can cause unnecessary re-renders and clutter your component tree.

- Use **React Context API** or **Redux** for state management to avoid prop drilling and optimize the performance of deeply nested components.

**Example of using Context API:**
```js
const MyContext = React.createContext();

function ParentComponent() {
  return (
    <MyContext.Provider value={/* some value */}>
      <ChildComponent />
    </MyContext.Provider>
  );
}

function ChildComponent() {
  const contextValue = useContext(MyContext);
  return <div>{contextValue}</div>;
}
```

## 6. **Using `shouldComponentUpdate` or `PureComponent`**
In class components, you can use `shouldComponentUpdate` or extend `React.PureComponent` to avoid unnecessary renders.

- **`PureComponent`** does a shallow comparison of props and state, preventing re-renders if nothing has changed.

```js
class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.value}</div>;
  }
}
```

- **`shouldComponentUpdate`** allows you to control when a component should re-render based on custom logic.

```js
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }

  render() {
    return <div>{this.props.value}</div>;
  }
}
```

## 7. **Windowing or Virtualization for Large Lists**
If your app displays a large list or table of data, rendering all the elements at once can be expensive. Use libraries like **react-window** or **react-virtualized** to render only the visible items and dynamically load the rest as the user scrolls.

**Example with `react-window`:**
```js
import { FixedSizeList as List } from 'react-window';

const MyList = ({ items }) => (
  <List
    height={500}
    itemCount={items.length}
    itemSize={35}
    width={300}
  >
    {({ index, style }) => (
      <div style={style}>
        {items[index]}
      </div>
    )}
  </List>
);
```

## 8. **Lazy Loading Images with `loading="lazy"`**
For images in your app, you can use native HTML5 lazy loading to defer the loading of images until they are in the viewport. This helps reduce initial load time and saves bandwidth.

```html
<img src="image.jpg" alt="description" loading="lazy" />
```

## 9. **Debouncing and Throttling**
For inputs, search boxes, or scrolling events that require frequent updates, debouncing or throttling can prevent unnecessary rendering and performance issues.

- **Debouncing**: Delays a function call until a certain amount of time has passed without the event being triggered again.
- **Throttling**: Ensures that a function is called at most once in a specified interval.

```js
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const handleInput = debounce((event) => {
  // Handle input change
}, 300);
```

## 10. **Optimizing Bundle Size**
Reducing the size of your JavaScript bundle can significantly improve performance. Some strategies include:

- **Tree-shaking:** Remove unused code from your bundle by using tools like Webpack.
- **Minification:** Minify your JavaScript and CSS files for production using tools like Terser or UglifyJS.
- **Splitting Vendor Libraries:** Separate large libraries like `lodash` or `moment` into smaller bundles to avoid loading unnecessary code.

## 11. **Using Production Build**
Always ensure that your app is using the production build of React. The development build contains extra warnings and checks, which can slow down your app.

- To create a production build, use:
  ```bash
  npm run build
  ```
- Serve the optimized build folder for the best performance.

## 12. **Avoiding Reconciliation Issues**
React’s reconciliation process compares the new virtual DOM with the previous one to determine what needs to be updated. To help React avoid unnecessary reconciliations:

### **Use `key` properly in lists:** 
Ensure that each list item has a unique `key` to help React efficiently re-render only the changed items.
```js
const items = ['a', 'b', 'c'];
return items.map((item, index) => <div key={index}>{item}</div>);
```

### **Avoid deep object comparisons:** 
When passing objects or arrays as props, avoid mutating them directly. Instead, create new objects to trigger re-renders only when necessary.

```js
const [items, setItems] = useState([]);

// Bad practice (mutating the array directly)
const addItem = (item) => {
  items.push(item);
  setItems(items); // This may not trigger a re-render
};

// Good practice (creating a new array)
const addItem = (item) => {
  setItems([...items, item]); // This triggers a re-render
};
```

## 13. **Optimizing CSS and Animations**
### **Use `requestAnimationFrame` for smooth animations:** 
If your app includes animations, use `requestAnimationFrame` to ensure smooth rendering by syncing updates with the browser's refresh rate.
```js
const animate = () => {
  requestAnimationFrame(animate);
  // Update animation state
};
animate();
```

### **Limit CSS animations:** 
Reduce the number of CSS animations or transitions, and avoid applying them to properties that trigger expensive layout recalculations (e.g., `width` or `height`).
```css
.element {
  transition: opacity 0.3s; /* Good */
  transition: width 0.3s; /* Avoid */
}
```

---

## Summary

To summarize, here are the key performance optimization techniques for React apps:

1. **Memoization**: Use `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders and function re-creations.
2. **Code Splitting**: Use `React.lazy` and `Suspense` to load components dynamically.
3. **Avoid Prop Drilling**: Use Context API or state management libraries like Redux.
4. **Optimize Re-renders**: Use `PureComponent`, `shouldComponentUpdate`, or hooks to control when components re-render.
5. **Virtualization**: Render only visible list items using libraries like `react-window`.
6. **Lazy Load Assets**: Use lazy loading for images and non-critical resources.
7. **Debounce and Throttle**: Optimize frequent input or scroll events.
8. **Optimize Bundle Size**: Use tree-shaking, minification, and production builds to reduce bundle size.
9. **Ensure Proper Reconciliation**: Use proper `key` attributes and avoid deep comparisons in props.
10. **CSS and Animations**: Use `requestAnimationFrame` and minimize costly CSS animations.

These techniques collectively ensure that your React app remains fast and responsive, even as it scales.

---

[<- Performance](../performance/perf-quick.md) | [<- react-quick](react-quick.md)

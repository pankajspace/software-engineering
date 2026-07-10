[<- react-quick](react-quick.md)

# What is React Reconcliation? Explain in detail.
React reconciliation is the process by which React updates the **DOM** to match the desired state of your application. It is a key concept that underpins React's efficiency and user experience, enabling React to render changes in the most optimal way without re-rendering the entire application.

### **Key Concepts in React Reconciliation**

1. **Virtual DOM**:
   - React maintains a lightweight copy of the actual DOM called the **Virtual DOM**.
   - When the application state changes, React calculates the difference (or "diff") between the old Virtual DOM and the new Virtual DOM.

2. **Diffing Algorithm**:
   - React uses an efficient diffing algorithm to determine what has changed between the old Virtual DOM and the new Virtual DOM.
   - It compares the two Virtual DOM trees and calculates the minimal set of changes required to update the real DOM.

3. **Fiber Architecture**:
   - Since React 16, React uses a **Fiber architecture** for reconciliation.
   - Fiber breaks the rendering process into units of work and prioritizes tasks, allowing React to pause and resume work as needed. This improves responsiveness for large or complex applications.

### **Reconciliation Steps**

1. **Rendering to Virtual DOM**:
   - When a React component's state or props change, React re-renders the component to generate a new Virtual DOM tree.

2. **Comparing Virtual DOMs**:
   - React compares the previous Virtual DOM tree with the new Virtual DOM tree using the diffing algorithm.

3. **Updating the Real DOM**:
   - React identifies changes (e.g., new elements, updated attributes, removed elements).
   - Only the parts of the actual DOM that require updates are modified. This is what makes React fast and efficient.

### **Key Aspects of the Diffing Algorithm**

1. **Same Component Type**:
   - If two components are of the same type, React reuses the existing DOM node and only updates the changed attributes or properties.

2. **Different Component Types**:
   - If the component type changes (e.g., `<div>` becomes `<span>`), React destroys the old DOM node and creates a new one.

3. **Key Attribute for Lists**:
   - For lists, React uses the `key` attribute to identify items and minimize re-renders. Without `key`, React may re-render unnecessarily or create bugs during updates.

4. **Child Elements**:
   - React handles child elements efficiently by comparing lists of children using their keys. Elements with matching keys are reused.

### **Why is Reconciliation Important?**

1. **Performance**:
   - Direct manipulation of the DOM is slow because the browser needs to re-layout and repaint elements. React's reconciliation minimizes these operations.

2. **Predictability**:
   - The reconciliation process ensures that the DOM remains consistent with your application state.

3. **Developer Experience**:
   - React abstracts away the complexity of DOM manipulation, letting developers focus on writing declarative UI logic.

### **Optimization Techniques**

1. **Using `React.memo`**:
   - Prevents unnecessary re-rendering of functional components by memoizing their output.

2. **PureComponent**:
   - Similar to `React.memo`, but for class components. It performs a shallow comparison of props and state.

3. **Avoid Anonymous Functions in JSX**:
   - Passing new functions as props can trigger unnecessary re-renders.

4. **Use Keys for Lists**:
   - Properly set unique keys to help React optimize list updates.

5. **Avoid Deep Component Trees**:
   - Keep components shallow where possible to make reconciliation faster.

### **Example of Reconciliation**

#### **Initial Render**
```jsx
function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <button>Click Me</button>
    </div>
  );
}
```
The Virtual DOM is created as:
```json
{
  "type": "div",
  "props": {},
  "children": [
    { "type": "h1", "props": {}, "children": ["Hello, World!"] },
    { "type": "button", "props": {}, "children": ["Click Me"] }
  ]
}
```

#### **State Change**
After a state update, the rendered output changes:
```jsx
function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <button>Click Me</button>
    </div>
  );
}
```
React generates a new Virtual DOM:
```json
{
  "type": "div",
  "props": {},
  "children": [
    { "type": "h1", "props": {}, "children": ["Hello, React!"] },
    { "type": "button", "props": {}, "children": ["Click Me"] }
  ]
}
```

#### **Diffing and Patching**
- React identifies that only the text inside `<h1>` has changed (`"Hello, World!"` to `"Hello, React!"`).
- React updates the real DOM with this minimal change, leaving the rest of the DOM intact.

### **Conclusion**

React reconciliation is the backbone of React's efficient rendering system. By leveraging the Virtual DOM, diffing algorithm, and optimizations like the Fiber architecture, React ensures that UI updates are fast, efficient, and easy to manage. Understanding how reconciliation works helps developers write better, more performant React applications.

# How React fiber is different from the previous version of React?
React Fiber, introduced in **React 16**, is a complete reimplementation of the React reconciliation algorithm. It was designed to address limitations in React's previous version (often referred to as the **Stack Reconciler**) and improve its performance and flexibility. Here are the key differences:

### **1. Concurrency and Interruptibility**
- **React Fiber**:
  - Supports **concurrent rendering**, allowing React to pause, resume, or restart rendering work as needed.
  - Handles **high-priority updates** (e.g., user input) without blocking low-priority tasks (e.g., rendering a large list).
  - Enables features like **React Concurrent Mode**.
- **Previous React (Stack Reconciler)**:
  - Rendered components in a **synchronous and non-interruptible** manner, which could lead to blocking of the main thread during long-running renders.

### **2. Incremental Rendering**
- **React Fiber**:
  - Breaks the rendering work into **smaller units of work**, called "fibers," and processes them incrementally.
  - Spreads rendering work across multiple frames, ensuring smoother user interactions.
- **Previous React**:
  - Rendered the entire component tree in a single pass, which could cause noticeable delays and UI freezing for complex trees.

### **3. Improved Error Handling**
- **React Fiber**:
  - Introduced **error boundaries**, allowing developers to catch and handle JavaScript errors in the UI gracefully.
- **Previous React**:
  - Errors during rendering would bubble up and crash the entire application.

### **4. Better Animation and Gesture Handling**
- **React Fiber**:
  - Prioritizes animations, transitions, and user interactions by assigning different priorities to tasks.
  - Ensures smoother animations and better responsiveness.
- **Previous React**:
  - Did not differentiate between task priorities, often leading to UI jank during animations.

### **5. Support for Suspense**
- **React Fiber**:
  - Enables **React Suspense**, which allows components to "wait" for asynchronous data to load without blocking the entire UI.
- **Previous React**:
  - Did not support asynchronous rendering mechanisms like Suspense.

### **6. Backward Compatibility**
- **React Fiber**:
  - Maintains full compatibility with React's previous APIs, so developers could upgrade without rewriting existing components.

### **7. Architectural Differences**
- **React Fiber**:
  - Implements a **work loop** that schedules and processes units of work.
  - Uses a linked list of fibers to represent the component tree, allowing efficient traversals and updates.
- **Previous React**:
  - Used a simpler recursive algorithm to reconcile the component tree, which was less flexible and harder to optimize.

### **Summary of Key Improvements**

| **Feature**              | **React Fiber**                          | **Previous React**             |
| ------------------------ | ---------------------------------------- | ------------------------------ |
| **Rendering**            | Incremental, interruptible               | Synchronous, non-interruptible |
| **Concurrency**          | Supported (Concurrent Mode)              | Not supported                  |
| **Task Prioritization**  | Handles priority levels                  | No prioritization              |
| **Error Handling**       | Error Boundaries                         | Global error crashes           |
| **Animation Handling**   | Smooth animations with prioritized tasks | UI jank during heavy renders   |
| **Asynchronous Support** | Suspense for async rendering             | Not supported                  |

### **Why React Fiber Matters**
React Fiber was designed to make React more responsive and adaptable to modern application needs, such as:
- Handling complex animations.
- Supporting concurrent rendering.
- Managing large and dynamic component trees without blocking the main thread.

These improvements made React more efficient, flexible, and powerful, paving the way for features like **Concurrent Mode**, **Suspense**, and **React Server Components**.

---

[<- react-quick](react-quick.md)

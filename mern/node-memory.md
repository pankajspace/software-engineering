[<- MERN](mern-quick.md)


Memory leaks occur when memory that is no longer needed is inadvertently kept alive, causing increased memory usage over time. In JavaScript—including in Node.js—common memory leak sources involve references that prevent the garbage collector from reclaiming memory. Here are several types with examples and strategies to avoid them:

---

## 1. Global Leaks

### What It Is
Accidental creation of global variables can happen when variables are declared without the proper keyword (e.g., `var`, `let`, or `const`). This leads to unexpected retention of data in the global scope.

### Example
```js
function foo() {
  // 'leak' becomes a global variable because it is not declared properly.
  leak = 'This is a global leak';
}
foo();
```

### How to Avoid
- **Use Strict Mode:** Enabling strict mode (`"use strict";`) will throw errors on undeclared variables.
- **Always Declare Variables:** Use `let`, `const`, or `var` to explicitly declare variables.
  
---

## 2. Closure Leaks

### What It Is
Closures can inadvertently capture variables that are no longer needed. If a function retains a reference to a large object via a closure, the garbage collector cannot free that memory.

### Example
```js
function createClosure() {
  // A large array is created and held in the closure.
  let largeData = new Array(1000000).fill('data');
  return function() {
    // The inner function retains a reference to largeData.
    console.log('Data length:', largeData.length);
  };
}

let myClosure = createClosure();
// Even if largeData is not used directly elsewhere, it remains in memory.
```

### How to Avoid
- **Limit Captured Variables:** Only capture what you truly need.
- **Release References:** When possible, set large objects to `null` once they're no longer needed.

---

## 3. Timers and Callbacks

### What It Is
Timers (like `setInterval` and `setTimeout`) and callbacks can continue to reference objects if they are not properly cleared, leading to memory leaks.

### Example
```js
let dataHolder = [];
// This interval keeps adding timestamps to the array indefinitely.
const intervalId = setInterval(() => {
  dataHolder.push(new Date());
}, 1000);

// If you forget to clear the interval, dataHolder grows forever.
```

### How to Avoid
- **Clear Timers:** Always clear intervals and timeouts using `clearInterval()` or `clearTimeout()` when they are no longer needed.
- **Remove Unused Callbacks:** Detach or nullify callbacks that are no longer necessary.

---

## 4. Event Listener Leaks

### What It Is
Attaching event listeners without proper removal can cause memory leaks because the listeners retain references to the elements or objects they are bound to.

### Example
```js
function handleClick() {
  console.log('Button clicked');
}
const button = document.getElementById('myButton');
button.addEventListener('click', handleClick);

// If the button is later removed from the DOM but the event listener isn’t removed,
// the reference may persist.
```

### How to Avoid
- **Remove Listeners:** Always remove event listeners using `removeEventListener()` when they are no longer needed.
- **Use Weak References:** When possible, use weak maps or patterns that allow garbage collection of listeners.

---

## 5. Detached DOM Elements (Browser JavaScript)

### What It Is
When DOM elements are removed from the document, but JavaScript still holds references to them, memory isn’t freed.

### Example
```js
let element = document.getElementById('myElement');
// Remove the element from the DOM.
document.body.removeChild(element);
// If 'element' is still referenced, its memory remains allocated.
```

### How to Avoid
- **Nullify References:** After removing a DOM node, set its variable to `null` to allow garbage collection.
- **Proper Cleanup:** Use libraries or frameworks that handle DOM cleanup to ensure detached nodes are released.

---

## 6. Caching Leaks

### What It Is
Over-caching or improperly managed caches can hold onto objects longer than necessary, leading to increased memory usage.

### Example
```js
const cache = {};
function addToCache(key, value) {
  cache[key] = value;
}
// If cache is never cleared or pruned, it may grow indefinitely.
```

### How to Avoid
- **Implement Eviction Policies:** Use strategies like LRU (Least Recently Used) or TTL (Time-To-Live) to remove stale entries.
- **Monitor Cache Size:** Regularly check and clear unused cache entries.

---

## 7. Node.js Specific: EventEmitter Leaks

### What It Is
In Node.js, the EventEmitter can leak memory if too many listeners are attached to a single event without being removed. Node.js issues a warning if more than 10 listeners are added to an event.

### Example
```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

function listener() {
  console.log('Event triggered');
}

// Adding many listeners can cause memory issues.
for (let i = 0; i < 15; i++) {
  emitter.on('data', listener);
}
```

### How to Avoid
- **Limit Listeners:** Ensure that you do not add excessive listeners.
- **Remove Unused Listeners:** Use `emitter.removeListener()` or `emitter.off()` to remove listeners when they’re no longer needed.
- **Increase Limit (with caution):** If more listeners are required, use `emitter.setMaxListeners()` to raise the limit, but investigate whether this design is optimal.

---

## Summary

Memory leaks in JavaScript and Node.js often arise from:
- **Accidental Global Variables:** Mitigated by strict mode and proper declarations.
- **Closure Leaks:** Avoid capturing unnecessary data and release references.
- **Timers/Callbacks:** Clear timers and remove callbacks when done.
- **Event Listener Leaks:** Detach event listeners to free up memory.
- **Detached DOM Elements:** In browser environments, nullify references to removed elements.
- **Caching Leaks:** Manage cache size with proper eviction policies.
- **Node.js EventEmitter Leaks:** Remove excess listeners and manage emitter settings.

By following these best practices—careful variable declaration, diligent cleanup of timers and event listeners, and thoughtful management of closures and caches—you can significantly reduce the risk of memory leaks in your JavaScript and Node.js applications.

---

[<- MERN](mern-quick.md)

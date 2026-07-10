[<- JavaScript](js-quick.md)

# JS Objects vs Maps

Objects are collections of key-value pairs where keys are strings or symbols, while maps are collections of key-value pairs where keys can be of any type. Maps preserve insertion order, have a size property, and support iteration, making them more suitable for scenarios requiring key types other than strings.


# What are WeakMap and WeakSet in JavaScript, and how are they useful?
WeakMap and WeakSet store objects in a way that doesn't prevent them from being garbage collected if there are no other references. This makes them ideal for situations where you need a cache or to store metadata associated with an object without risking memory leaks.

```js
let wm = new WeakMap();
let obj = {};
wm.set(obj, 'some value');
obj = null; // The entry in WeakMap will be removed from memory
```

WeakMap keys are objects only and are weakly held, meaning they are automatically removed if there are no other references to the key object. WeakSet is similar but stores values as objects. This characteristic is helpful for caching purposes, as it prevents memory from being held indefinitely by objects that are no longer needed.

# Explain the this keyword in JavaScript, especially in an arrow function context.
In regular functions, this refers to the calling context, but in arrow functions, this lexically binds to the surrounding scope, meaning it does not change based on the calling context.

```js
function regularFunction() {
    console.log(this); // Depends on how the function is called
}
const arrowFunction = () => {
    console.log(this); // Inherits from surrounding scope
};
```

`this` in arrow functions is determined by the outer lexical scope when the function is defined, which makes arrow functions perfect for callbacks where this should not change. This behavior differs from regular functions, where this is determined by the context in which the function is called (e.g., calling a function as a method on an object assigns this to the object).

# What are JavaScript Proxies, and how do they work?
Proxies allow you to create objects with custom behavior for basic operations like property lookup, assignment, enumeration, and function invocation.

```js
let target = {};
let handler = {
    get: function(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} not found`;
    }
};
let proxy = new Proxy(target, handler);
console.log(proxy.name); // "Property name not found"
```

Proxies wrap an object and allow you to define custom behavior for fundamental operations. They are used for intercepting and customizing actions performed on objects, such as getting and setting properties. This makes them powerful tools for implementing validation, logging, or other custom logic.

# Describe the event loop and microtasks in JavaScript.
The event loop processes tasks in the call stack and manages the execution of asynchronous code by checking if the call stack is empty and then executing tasks from the microtask or callback queue accordingly.

```js
setTimeout(() => console.log('Macro Task'), 0);
Promise.resolve().then(() => console.log('Micro Task'));
// Output: "Micro Task" followed by "Macro Task"
```

JavaScript is single-threaded, and the event loop helps manage asynchronous tasks. Microtasks, such as Promise callbacks, have higher priority than macrotasks (e.g., setTimeout), so they are executed first. The event loop checks the call stack and clears microtasks before moving to macrotasks, allowing for smoother handling of asynchronous actions.

# What is memoization, and how does it optimize JavaScript code?
Memoization is a technique used to cache results of expensive function calls and return the cached result when the same inputs occur again. This reduces unnecessary computations.

```js
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const factorial = memoize((n) => (n <= 1 ? 1 : n * factorial(n - 1)));
console.log(factorial(5)); // Cached result used on repeated calls
```

Memoization works by storing the output of function calls along with their inputs. If the function is called again with the same inputs, it retrieves the result from the cache instead of recalculating it. This technique is beneficial for recursive functions and other scenarios with repeated computations, like in dynamic programming.

# Explain the concept of “closure” in JavaScript with an example.
A closure is a function that remembers its lexical scope even when the function is executed outside that scope. This allows it to access variables from the scope where it was created.

```js
function createCounter() {
    let count = 0;
    return function() {
        return ++count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

Closures enable functions to “remember” variables and their values from the outer scope in which they were defined, even after the outer function has completed execution. They are especially useful in callback functions, module patterns, and managing private variables.

# What is the difference between for...of and for...in loops in JavaScript?
for...of iterates over iterable objects like arrays, returning values, while for...in iterates over all enumerable properties of an object, returning property keys.

```js
const arr = ['a', 'b', 'c'];
for (let value of arr) {
    console.log(value); // Outputs 'a', 'b', 'c'
}

const obj = { name: 'John', age: 25 };
for (let key in obj) {
    console.log(key); // Outputs 'name', 'age'
}
```

for...of is useful when working with arrays, strings, and other iterable objects as it directly retrieves values. for...in should be used with objects since it retrieves all enumerable properties, including inherited ones, unless filtered with hasOwnProperty().

# How does JavaScript handle integer precision, and what is the BigInt type?
JavaScript numbers have a precision limit up to 253−12^{53} — 1253−1 due to the 64-bit floating-point format. BigInt was introduced to handle arbitrarily large integers without precision issues.

```js
let bigNumber = BigInt("9007199254740991") + BigInt(1);
console.log(bigNumber); // Outputs: 9007199254740992n
```

JavaScript uses Number type to represent numbers, which limits precision. Numbers larger than 253−12^{53} - 1253−1 lose precision. BigInt enables precise representation of large integers and supports typical arithmetic operations with other BigInt values, allowing for more accurate calculations with very large integers.

# Explain the difference between == and === in JavaScript.
== performs type coercion before comparing values, whereas === is strict and compares both value and type without coercion.

```js
console.log(1 == '1');  // true (type coercion occurs)
console.log(1 === '1'); // false (strict comparison)
```

Using == can lead to unexpected results because it converts operands to the same type before comparing them, which can mask errors. === should be preferred for precise, predictable comparisons, as it doesn’t perform type conversion and directly compares the values and types.

# What is destructuring in JavaScript, and how does it simplify code?
Destructuring is a syntax that lets you extract values from arrays or properties from objects into individual variables in a concise way.

```js
const [a, b] = [10, 20];
console.log(a); // 10
const {name, age} = { name: 'Alice', age: 30 };
console.log(name); // Alice
```

Destructuring makes code more readable and allows quick extraction of values from complex structures. It supports default values, renaming, and nested structures, enabling flexible and expressive assignment patterns, especially useful in function arguments and object manipulation.

# What are “nullish coalescing” and “optional chaining” operators?
The nullish coalescing (??) operator returns the right operand if the left is null or undefined. Optional chaining (?.) short-circuits and returns undefined if any reference in a chain is null or undefined.

```js
const foo = null ?? 'default'; // 'default'
const obj = { user: { name: 'Alice' } };
console.log(obj?.user?.name); // Alice
```

These operators simplify code by handling null and undefined checks directly. ?? avoids false positives from falsy values like 0, while ?. avoids errors from accessing properties of potentially nullish objects, making code more robust and readable.

# What is the purpose of Object.freeze() and Object.seal()?
Object.freeze() makes an object immutable, preventing modifications, additions, or deletions. Object.seal() prevents addition or deletion of properties but allows modification of existing ones.

```js
const obj = { name: 'Alice' };
Object.freeze(obj);
obj.name = 'Bob'; // No effect
const obj2 = { age: 25 };
Object.seal(obj2);
obj2.age = 30; // Allowed
```

These methods control object mutability. freeze() completely locks down the object, useful for defining constants, while seal() allows some flexibility with property values but prevents structural changes. They are useful for data integrity and enforcing immutability principles in applications.

# Explain Promise.all, Promise.race, Promise.allSettled, and Promise.any.
These are methods for handling multiple promises:

Promise.all resolves when all promises resolve; rejects if any promise fails.
Promise.race resolves or rejects as soon as one promise resolves or rejects.
Promise.allSettled waits for all promises to complete, regardless of outcome.
Promise.any resolves if any promise resolves, and rejects only if all promises fail.

```js
const p1 = Promise.resolve(1);
const p2 = Promise.reject("Error");
const p3 = Promise.resolve(3);

Promise.all([p1, p3]).then(console.log); // [1, 3]
Promise.race([p1, p2, p3]).then(console.log); // 1
Promise.allSettled([p1, p2]).then(console.log); // [{ status: "fulfilled", value: 1 }, { status: "rejected", reason: "Error" }]
Promise.any([p1, p2, p3]).then(console.log); // 1
```

These methods provide control over asynchronous operations. Promise.all is commonly used for simultaneous requests that all need to succeed, while Promise.race is helpful for timeouts. Promise.allSettled returns the status of each promise, useful for aggregated results. Promise.any is helpful for "first successful response" scenarios.

# How do you debounce and throttle a function in JavaScript, and what’s the difference?
Debounce delays execution until a specified time has passed since the last call, preventing rapid calls in quick succession. Throttle limits the function to be called at most once in a specified time frame.

```js
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn(...args);
        }
    };
}
```

Debouncing is ideal for limiting actions that should only execute after a user stops triggering an event (e.g., resize events). Throttling ensures that a function runs at most once in a specified period, which is helpful for continuous events like scrolling, ensuring performance without missing updates.

# What are generator functions, and how do they differ from normal functions?
Generator functions, defined with function*, can pause execution with yield and resume later, returning an iterator. This enables on-demand value generation.

```js
function* countUp() {
    let i = 1;
    while (i <= 3) yield i++;
}

const counter = countUp();
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
```

Generators enable functions to yield intermediate results, pausing execution while maintaining state. This behavior is useful for iterating through large data structures, asynchronous flow control, and implementing lazy evaluations, where values are only generated when needed.

# Explain the concept of async and await in JavaScript.
async functions automatically return a promise. await pauses the execution within an async function until a promise resolves, allowing asynchronous code to look and behave synchronously.

```js
async function fetchData() {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();
    console.log(data);
}
fetchData();
```

async/await syntax simplifies promise handling, improving code readability and structure. By pausing execution at await, async functions allow handling asynchronous operations in a sequential style, making it easier to catch and manage errors and control flow.

# How does Object.assign() differ from spread syntax {...obj} for copying objects?
Both Object.assign() and spread syntax {...obj} perform shallow copying, but Object.assign() can merge multiple objects and does not create nested copies.

```js
const target = { a: 1 };
const source = { b: 2 };
const result = Object.assign(target, source); // target modified, result is { a: 1, b: 2 }
const spreadResult = { ...target, ...source }; // Creates a new object
```

Spread syntax creates a new object without modifying the original, ideal for immutable patterns. Object.assign() mutates the target, which can affect existing references. Both are shallow, meaning nested objects aren’t deep-copied.

# What is the purpose of Reflect in JavaScript?
The Reflect API standardizes JavaScript’s reflection operations (like get, set, apply). It simplifies and standardizes object operations, with methods that correspond to object traps in proxies.

```js
let obj = { x: 10 };
Reflect.set(obj, 'y', 20);
console.log(obj.y); // 20
```

Reflect provides methods to perform common object operations, offering more flexibility. It’s especially useful in proxying, as each Reflect method has a one-to-one correspondence with proxy traps, allowing for enhanced control over object interactions.

# How does dynamic importing work in JavaScript?
Dynamic imports allow modules to be loaded asynchronously when needed, helping reduce initial load times by splitting code into smaller bundles.

```js
import('./module.js').then(module => {
    module.someFunction();
});
```

Using import(), JavaScript enables conditional or lazy loading of modules, especially useful in scenarios like loading large libraries on demand. This feature optimizes performance by allowing developers to load only what’s required at runtime rather than at the beginning of the script.

# What are the differences between localStorage, sessionStorage, and cookies?

localStorage: stores data with no expiration.

sessionStorage: stores data for the session duration.

cookies: store data with expiration and are sent with HTTP requests.

```js
localStorage.setItem('name', 'Alice');
sessionStorage.setItem('sessionData', '12345');
document.cookie = "username=JohnDoe; expires=Fri, 31 Dec 9999 23:59:59 GMT";

```

localStorage and sessionStorage are only accessible via JavaScript and are secure for storing non-sensitive client-side data. Cookies, on the other hand, are accessible by the server, making them useful for tracking or authentication but limited in storage capacity. These storage methods each serve different purposes based on persistence and privacy requirements.

# Explain the bind(), call(), and apply() methods in JavaScript.

bind(): returns a new function with bound this context and optional arguments.

call(): invokes a function with a specified this and individual arguments.

apply(): similar to call(), but accepts arguments as an array.

```js
function greet(greeting) {
    console.log(greeting + ', ' + this.name);
}
const person = { name: 'Alice' };
greet.call(person, 'Hello'); // Hello, Alice
greet.apply(person, ['Hi']); // Hi, Alice
const greetAlice = greet.bind(person);
greetAlice('Hey'); // Hey, Alice
```

These methods allow dynamic setting of the this context. bind() is commonly used to fix this in callbacks. call() and apply() are helpful for invoking functions with specific contexts and different argument formats, making JavaScript functions versatile in various contexts.

# How do arrow functions differ from regular functions?
Arrow functions do not have their own this, arguments, or prototype, and they cannot be used as constructors. They lexically bind this, making them useful for inline functions or callbacks.

```js
const regularFunc = function() { console.log(this); };
const arrowFunc = () => console.log(this);
```

Arrow functions are syntactically lighter and inherit this from the outer scope, avoiding common pitfalls with callbacks. They are concise and ideal for scenarios without reassignable this context, but unsuitable for methods or constructors where a dynamic this is needed.

# What is the purpose of the Proxy object in JavaScript?
A Proxy allows you to intercept and customize operations performed on objects, such as property access, assignment, enumeration, and function invocation.

```js
const target = { message: "Hello" };
const handler = {
    get: (obj, prop) => prop in obj ? obj[prop] : 'Property not found'
};
const proxy = new Proxy(target, handler);
console.log(proxy.message); // "Hello"
console.log(proxy.nonExistent); // "Property not found"
```

Proxies provide a way to define custom behavior for fundamental operations on objects. They are especially useful for logging, data validation, and security restrictions. With Proxy, you can set handlers (known as traps) that intercept operations like get, set, has, and apply, enabling flexible and powerful ways to manage object interactions dynamically.

# Explain what Map and Set are in JavaScript and their advantages over traditional objects and arrays.
Map is a collection of key-value pairs, while Set is a collection of unique values. Map provides ordered, iterable key-value pairs and supports any data type as a key. Set ensures all values are unique.

```js
const map = new Map();
map.set('name', 'Alice');
map.set(10, 'Age');
console.log(map.get('name')); // Alice
const set = new Set([1, 2, 3, 3]);
set.add(4);
console.log(set.has(3)); // true
```

Map offers more flexibility than objects for dynamic key-value pairs, allowing non-string keys and preserving insertion order. Set is highly useful for handling collections of unique items and eliminates duplicates, making it efficient for managing items where uniqueness is required. Both Map and Set support efficient iteration, improving performance for operations where order and uniqueness matter.

# What is tail call optimization, and does JavaScript support it?
Tail call optimization (TCO) is an optimization that allows functions to reuse stack frames in certain cases, reducing memory usage for recursive functions. JavaScript engines can support TCO, but it’s generally available only in strict mode and in certain JavaScript environments.

```js
"use strict";
function factorial(n, acc = 1) {
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc); // Tail-recursive call
}
console.log(factorial(5)); // 120
```

TCO allows recursive functions to avoid stack overflow errors by reusing stack frames in tail-recursive calls. A call is considered a tail call if it’s the last operation in the function. In supported environments, TCO can make recursion feasible for algorithms where iteration isn’t practical. While JavaScript supports TCO, the actual implementation depends on the JavaScript engine.

# How does JavaScript handle floating-point arithmetic, and what are common issues?
JavaScript uses 64-bit floating-point numbers, which can lead to precision issues, particularly with decimal arithmetic. Common problems include rounding errors with operations on fractional values.

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

Due to IEEE 754 floating-point standards, JavaScript may represent decimal fractions with slight inaccuracies, as certain numbers cannot be precisely represented in binary form. For example, 0.1 + 0.2 doesn’t result in an exact 0.3. Solutions include using methods like toFixed(), or libraries such as BigNumber.js to handle precise calculations, especially for financial or scientific applications.

# What are WeakMap and WeakSet, and how do they differ from Map and Set?
WeakMap and WeakSet are collections that store weak references to their keys and values, meaning that if no other references exist to an object stored in them, it can be garbage-collected.

```js
let obj = { name: "Alice" };
const weakMap = new WeakMap();
weakMap.set(obj, "data");
obj = null; // `obj` can now be garbage collected
```

WeakMap and WeakSet are used for scenarios where temporary storage without preventing garbage collection is needed. They don’t prevent their entries from being collected if the only remaining reference to an object is in the WeakMap or WeakSet. Unlike Map and Set, WeakMap keys must be objects, and entries are not enumerable, making these collections ideal for caching and tracking.

# What is the role of the Symbol type in JavaScript?
Symbol is a primitive data type that represents unique identifiers, commonly used as object keys that are guaranteed to be unique and don’t collide with other keys.

```js
const sym1 = Symbol("id");
const obj = {
    [sym1]: "uniqueIdentifier"
};
console.log(obj[sym1]); // "uniqueIdentifier"
```

Symbols prevent naming collisions, allowing for property keys that won’t interfere with other properties, even with similar names. This is useful for defining “hidden” properties on objects, enabling libraries to add metadata without the risk of overwriting existing keys. Symbols also support global access and are widely used in meta-programming.

# How do async iterators work in JavaScript?
Async iterators allow asynchronous iteration over data sources, especially useful for data that becomes available over time, like API calls or file streams.

```js
async function* asyncGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
}

(async () => {
    for await (let num of asyncGenerator()) {
        console.log(num); // 1, 2, 3
    }
})();
```

Async iterators enable for await...of loops, which pause execution at each await expression, resuming as values become available. They’re essential for processing asynchronous streams of data, allowing more readable and efficient handling of asynchronous sequences without nesting promises.

# What is the Atomics object in JavaScript, and how is it used in concurrency?
The Atomics object provides atomic operations on shared memory, enabling thread-safe modifications to data shared between Web Workers in JavaScript.

```js
const sharedBuffer = new SharedArrayBuffer(1024);
const view = new Int32Array(sharedBuffer);
Atomics.add(view, 0, 1); // Safely increments the value at index 0
```

Atomics operations like add, sub, and, or, and wait are useful in concurrent environments, where multiple threads modify shared data. Atomic operations ensure that these changes are completed without interruptions, preventing race conditions. This is particularly important in Web Workers, where shared memory helps improve performance in complex computations.

# What are Intl and Collator in JavaScript?
The Intl object in JavaScript provides internationalization features, like formatting numbers, dates, and strings based on locale. Intl.Collator helps compare strings in a language-sensitive manner.

```js
const collator = new Intl.Collator('en', { sensitivity: 'base' });
console.log(collator.compare('a', 'A')); // 0 (case insensitive comparison)
```

Intl supports localization by providing APIs for formatting dates, times, currencies, and comparing strings. Intl.Collator is especially useful for sorting, as it respects locale-specific rules, making comparisons consistent with the target audience's language.

# Explain JavaScript’s module system (ES6 modules) and how it differs from CommonJS.
ES6 modules (import/export) provide a standard, statically analyzable module system in JavaScript. Unlike CommonJS (Node.js modules), ES6 modules support tree shaking and work in browsers without transpilers.

```js
// math.js
export function add(x, y) { return x + y; }
// main.js
import { add } from './math.js';
console.log(add(2, 3)); // 5
```

ES6 modules support asynchronous loading and allow tools to optimize code by removing unused exports. CommonJS modules (require) are synchronous and primarily used in Node.js. ES6 modules are statically analyzed at compile time, enabling better optimization and support for circular dependencies.

# What is a generator function, and how does it differ from an iterator?
A generator function is a function that can yield multiple values over time, allowing you to pause and resume execution. An iterator is an object with a next() method returning { value, done }.

```js
function* generator() {
    yield 1;
    yield 2;
    yield 3;
}

const iter = generator();
console.log(iter.next().value); // 1
```

Generators, denoted by function*, provide an efficient way to produce values on demand. By yielding values one at a time, they can produce infinite sequences without blocking. Unlike standard iterators, generators maintain their state between next() calls, enabling advanced asynchronous programming patterns.

# What is Reflect in JavaScript, and how does it complement the Proxy object?
Reflect is a built-in object providing static methods to manipulate objects, similar to the methods on Proxy. It complements Proxy by offering low-level operations, making it easier to handle the default behavior in proxy traps.

```js
const target = { x: 1 };
const handler = {
    get: (obj, prop) => Reflect.get(obj, prop)
};
const proxy = new Proxy(target, handler);
console.log(proxy.x); // 1
```

Reflect methods match Proxy traps, ensuring consistency. For example, using Reflect.get within a get trap avoids the need to hardcode the default behavior. This makes Proxy code cleaner and more reliable, as you can always defer to the default object operations.

# How does memory management work in JavaScript, and what is garbage collection?
JavaScript uses automatic memory management with a garbage collector (GC) to free memory from objects no longer in use. Most engines use a mark-and-sweep algorithm to identify unreachable objects and remove them.

```js
let obj = { a: 1 };
obj = null; // `obj` is eligible for garbage collection
```

The garbage collector automatically deallocates memory, primarily using algorithms like mark-and-sweep to detect objects that cannot be reached by any reference chain from the root. Memory leaks can occur if objects are accidentally retained, especially with closures, global variables, and event listeners.

# What is the Event Loop, and how does it manage asynchronous operations in JavaScript?
The Event Loop is a JavaScript runtime mechanism that manages the execution of multiple tasks, handling asynchronous events and ensuring non-blocking I/O operations.

```js
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
console.log("End");
// Output: Start, End, Timeout
```

The Event Loop pulls functions from the call stack and processes them, prioritizing synchronous code. Asynchronous code like setTimeout and Promise callbacks are queued until the main stack is clear. This makes JavaScript single-threaded but able to handle concurrency, achieving non-blocking behavior in the browser and Node.js.

# What are WeakRef and FinalizationRegistry in JavaScript?
WeakRef allows weak references to objects, while FinalizationRegistry provides a way to register cleanup logic when objects are garbage collected.

```js
let ref = new WeakRef({ data: "Important" });
console.log(ref.deref()); // Possibly returns the object, or `undefined`
```

WeakRef enables storing references that don’t prevent garbage collection. FinalizationRegistry allows registering callbacks to execute when an object is collected, useful for managing resources like cache or external connections. These are mainly useful in advanced scenarios where manual resource cleanup is essential.

# What is the structuredClone function in JavaScript, and how does it differ from JSON.parse and JSON.stringify?
structuredClone provides a way to deeply clone objects, supporting non-serializable data like Date, Map, and Set, which JSON.parse/stringify cannot handle.

```js
const original = { date: new Date() };
const clone = structuredClone(original);
console.log(clone.date === original.date); // false
```

Unlike JSON.parse/stringify, structuredClone can clone complex types like File, Blob, and circular structures. This is especially helpful in modern applications needing deep copies of objects with non-primitive data types. It also avoids data loss and errors with undefined values and methods.

# What is the difference between postMessage and Web Workers in JavaScript?
postMessage is a method to communicate between JavaScript contexts (like iframe and main window) or to Web Workers. Web Workers are used to execute scripts in background threads, preventing UI blocking.

```js
const worker = new Worker("worker.js");
worker.postMessage("Hello");
worker.onmessage = (e) => console.log(e.data);
```

postMessage allows messaging between JavaScript contexts, but Web Workers execute code off the main thread, which is ideal for CPU-intensive tasks. Workers have a separate scope and don’t access DOM, making them perfect for handling complex computations without affecting the main thread.

# How does JavaScript handle integer limitations, and what are BigInt and Number.MAX_SAFE_INTEGER?
JavaScript integers have a limit (Number.MAX_SAFE_INTEGER), beyond which precision is lost. BigInt is a data type for handling arbitrarily large integers.

```js
const bigInt = BigInt("9007199254740991") + 1n;
console.log(bigInt); // 9007199254740992n
```

JavaScript numbers use 64-bit floating-point representation, meaning integers over 2^53 - 1 lose precision. BigInt overcomes this by providing exact integer values without size limitations, useful in high-precision calculations. Converting between Number and BigInt is possible but requires care to prevent overflow or rounding issues.

# Explain Generators
```js
const testingTeam = {
  lead: "Amanda",
  tester: "Bill",
  [Symbol.iterator]: function* () {
    yield this.lead;
    yield this.tester;
  }
}

const engineeringTeam = {
  testingTeam,
  lead: "Jill",
  engineer: "Dave",
  [Symbol.iterator]: function* () {
    yield this.lead;
    yield this.engineer;
    yield* this.testingTeam;
  }
}

const employees = []
for (let emp of engineeringTeam) {
  employees.push(emp);
}
console.log(employees);


// practicle application is iterating through Tree data structure recursively
class Comment{
  constructor(content, children){
    this.content = content;
    this.children = children;
  }

  *[Symbol.iterator](){
    yield this.content;
    for (let child of this.children){
      yield* child;
    }
  }
}

const children = [
  new Comment("Hi", []),
  new Comment("Hello", []),
  new Comment("How are you?", [new Comment("I am fine.", [])])
]

const tree = new Comment("Great Post!", children);

const comments = [];
for (let value of tree){
  comments.push(value);
}
console.log(comments);


// -----------------------------------------------------------

//Run in nodejs
//requires https://www.npmjs.com/package/co package
var co = require("co");

function getDetails(id) {
  return new Promise((resolve) => {
    setTimeout(function () {
      return resolve({ id });
    });
  });
}

function updateDetails(obj) {
  return new Promise((resolve) => {
    setTimeout(function () {
      return resolve({ updatedData: obj.id + 1 });
    });
  });
}

function* demoGen() {
  const data = yield getDetails(10);
  const res = yield updateDetails(data);
  console.log(res);
}

const demo = co.wrap(demoGen);
demo().then(console.log).catch(console.log);
```

# Difference between Promise.all, Promise.allSettled, Promise.any, Promise.race?

#### **1. `Promise.all`**
- **Behavior**: Resolves when **all promises** in the array resolve, or rejects as soon as **any promise rejects**.
- **Result**: Returns a single promise that resolves to an **array of resolved values** or rejects with the **reason of the first rejected promise**.
- **Use Case**: When you need all promises to succeed, and a single failure should result in rejection.

#### **2. `Promise.allSettled`**
- **Behavior**: Resolves when **all promises settle** (either resolve or reject). Does not reject.
- **Result**: Returns a single promise that resolves to an **array of objects** representing each promise's status and value or reason.
- **Use Case**: When you want to handle the outcome of all promises, regardless of their resolution or rejection.

#### **3. `Promise.any`**
- **Behavior**: Resolves as soon as **any promise resolves**, or rejects if **all promises reject**.
- **Result**: Returns a single promise that resolves with the **first fulfilled value** or rejects with an `AggregateError` containing all rejection reasons.
- **Use Case**: When you need the first successful result and can ignore other failures.

#### **4. `Promise.race`**
- **Behavior**: Resolves or rejects as soon as the **first promise settles** (resolves or rejects).
- **Result**: Returns a single promise that resolves/rejects with the **value or reason of the first settled promise**.
- **Use Case**: When you want the result of the first promise to settle, regardless of success or failure.

#### **Choosing the Right Method**
1. **`Promise.all`**: Use when all promises must succeed, and you care about individual rejections.
2. **`Promise.allSettled`**: Use when you want all results (success or failure) and don't want to stop on errors.
3. **`Promise.any`**: Use when you care only about the first successful promise.
4. **`Promise.race`**: Use when you want the result of the fastest promise, whether it resolves or rejects.

# How JavaScript knows internally to wait on a line where we have written await before executing the next line of code?

JavaScript achieves this behavior using an internal mechanism provided by the **JavaScript event loop** and **Promises**, which are the foundation of asynchronous programming in JavaScript. Here's a detailed explanation of how `await` works internally:

#### 1. **Understanding `await`**
- The `await` keyword is used inside an `async` function to pause the execution of the function until the Promise it is waiting for is resolved or rejected.
- It makes asynchronous code look and behave like synchronous code, improving readability.

#### 2. **How JavaScript Knows to Wait**
When JavaScript encounters an `await` expression:
1. **Promises are involved**:
   - The expression after `await` must return a Promise (or a value that can be coerced into a Promise).
   - If it's not already a Promise, it is wrapped in one.
2. **Execution gets paused**:
   - The JavaScript engine pauses execution of the `async` function at the `await` line.
   - Meanwhile, it returns control to the **event loop**, allowing other tasks to run.

#### 3. **Event Loop & Microtask Queue**
- **Event Loop**:
  The event loop is responsible for executing JavaScript code, handling events, and managing the call stack and the task queues.
- **Microtask Queue**:
  Promises and `await` work with the microtask queue, which has higher priority than the macrotask queue.

Steps:
1. When the `await` keyword is encountered, the function execution is paused.
2. The associated Promise is put into the **microtask queue**.
3. The JavaScript engine continues executing other synchronous code outside the `async` function.
4. Once the Promise is resolved:
   - The result of the Promise is passed back to the paused function.
   - The paused function continues execution from where it was paused.

#### 4. **Behind the Scenes**
Here's a closer look at how the `await` mechanism is implemented internally:
- The `await` keyword essentially splits the `async` function into two parts:
  - Before `await`: Code executes synchronously up to the `await` line.
  - After `await`: Code execution resumes only when the awaited Promise resolves.
- Underneath, `await` transforms the code into a chain of `.then()` calls on the Promise.

For example:

```javascript
async function example() {
  console.log("Start");
  const result = await new Promise((resolve) => setTimeout(() => resolve("Done"), 1000));
  console.log(result);
  console.log("End");
}

example();
```

Internally, it works like:

```javascript
function example() {
  console.log("Start");
  return new Promise((resolve) => {
    setTimeout(() => resolve("Done"), 1000);
  }).then((result) => {
    console.log(result);
    console.log("End");
  });
}

example();
```

#### 5. **Key Points**
- `await` does not block the entire thread; it only pauses the execution of the `async` function.
- This pause is achieved by breaking the function execution into segments and scheduling them on the microtask queue.
- The event loop ensures other tasks (like UI rendering, network requests, etc.) continue while the `async` function is paused.

#### 6. **Why Is It Efficient?**
The combination of `await`, Promises, and the event loop ensures:
1. Non-blocking behavior (the rest of the program continues).
2. Efficient scheduling of tasks via microtask prioritization.

This makes JavaScript's single-threaded nature ideal for handling asynchronous tasks smoothly without blocking other operations.

# What are web workers?
Web Workers are a browser feature that allows you to run JavaScript in background threads separate from the main execution thread. This means that computationally intensive tasks or long-running scripts can be offloaded to a Web Worker, ensuring that the user interface (UI) remains responsive and that the main thread isn't blocked. Here’s an overview of what Web Workers are and how they work:

## Key Characteristics

1. **Background Processing:**
   - **Separate Thread:**  
     Web Workers run in their own thread, independent of the main UI thread. This allows heavy computations, data processing, or network operations to be executed without causing UI jank or freezing.
   
2. **Message-Based Communication:**
   - **Asynchronous Messaging:**  
     Communication between the main thread and a Web Worker is done through message passing. The main thread sends messages to the worker, and the worker sends messages back using the `postMessage()` method.
   - **Data Serialization:**  
     Data passed between the main thread and the worker is serialized (using the structured clone algorithm), which means that complex objects can be shared without directly sharing memory.

3. **Limited Access to the DOM:**
   - **No DOM Access:**  
     Web Workers do not have access to the Document Object Model (DOM). This is a security and design feature to prevent background threads from directly manipulating the UI.
   - **Self-contained Environment:**  
     They have access to a subset of JavaScript features and some web APIs (such as timers, `XMLHttpRequest`, and the Fetch API), but cannot interact with the window or document objects.

4. **Types of Workers:**
   - **Dedicated Workers:**  
     These are tied to a single script that spawns them and communicate exclusively with that script.
   - **Shared Workers:**  
     Shared Workers can be accessed by multiple scripts, even across different browser windows or tabs, allowing for shared processing among them.

## Basic Example

Here’s a simple example that demonstrates how to use a Dedicated Web Worker:

### Main Script (e.g., `main.js`)
```javascript
// Check if the browser supports Web Workers
if (window.Worker) {
  // Create a new Worker, providing the script URL
  const myWorker = new Worker('worker.js');

  // Send a message to the Worker
  myWorker.postMessage('Hello, worker!');

  // Listen for messages from the Worker
  myWorker.onmessage = function(event) {
    console.log('Message from worker:', event.data);
  };

  // Handle potential errors from the Worker
  myWorker.onerror = function(error) {
    console.error('Worker error:', error);
  };
} else {
  console.error('Your browser does not support Web Workers.');
}
```

### Worker Script (e.g., `worker.js`)
```javascript
// Listen for messages from the main script
onmessage = function(event) {
  console.log('Worker received:', event.data);
  
  // Perform some background computation or processing here
  const result = event.data + ' - processed by worker';
  
  // Send the result back to the main script
  postMessage(result);
};
```

In this example, the main script spawns a worker by loading `worker.js`. The worker listens for messages, processes the received data, and sends a response back. This communication happens asynchronously, ensuring that any heavy processing in the worker does not block the UI in the main thread.

## Use Cases

- **Heavy Computations:**  
  Offload tasks like image processing, data crunching, or complex mathematical calculations to prevent freezing the UI.
  
- **Handling Large Data:**  
  Process large amounts of data (e.g., parsing large JSON files or running simulations) in the background.
  
- **Real-Time Processing:**  
  Use workers for real-time data processing in web applications, such as video or audio processing, without impacting user interactions.

## Conclusion

Web Workers are a powerful tool for improving the performance and responsiveness of web applications. By running scripts in background threads, they allow you to handle computationally intensive tasks without blocking the main thread and degrading the user experience. The message-based communication model keeps the design modular and secure, while the lack of DOM access helps maintain a clear separation between UI and background processing logic.

# What is a memory leak and how can I prevent it?
A **memory leak** occurs when a program allocates memory for use but fails to release it after it’s no longer needed. Over time, this leads to increasing memory consumption, which can slow down your application or even cause it to crash due to resource exhaustion. Memory leaks are particularly problematic in long-running applications (like servers or single-page applications) where the leaked memory accumulates over time.

## Common Causes of Memory Leaks

1. **Unreleased References:**
   - **Global Variables:**  
     Accidentally storing data in global scope can prevent the garbage collector from reclaiming memory.
   - **Closures:**  
     Closures that reference large objects or persist longer than necessary can hold onto memory.
   - **Event Listeners:**  
     Adding event listeners without removing them when they are no longer needed can keep objects in memory.
   - **Timers and Intervals:**  
     `setInterval` or `setTimeout` callbacks that retain references to objects may lead to memory leaks if not properly cleared.

2. **Detached DOM Nodes:**
   - When DOM elements are removed from the document but still referenced by JavaScript, the memory associated with them is not freed.

3. **Caches and Data Structures:**
   - Improperly managed caches or collections (like arrays or maps) that continually grow can lead to excessive memory usage.

## How to Prevent Memory Leaks

### 1. **Proper Memory Management**

- **Scope Management:**  
  Keep variable scope as narrow as possible. Avoid polluting the global namespace and use local variables when you can.

- **Manual Cleanup:**  
  Remove event listeners, timers, and intervals when they’re no longer needed.
  ```javascript
  // Example: Removing an event listener
  function onResize() {
    // Handle resize
  }
  window.addEventListener('resize', onResize);
  // When no longer needed:
  window.removeEventListener('resize', onResize);
  ```

- **Avoid Unintended References:**  
  Be cautious with closures. Ensure that functions do not unintentionally capture large objects or outdated state.

### 2. **Use Weak References Where Appropriate**

- **WeakMap and WeakSet:**  
  In JavaScript, using `WeakMap` or `WeakSet` allows objects to be garbage collected when there are no other references to them.
  ```javascript
  let cache = new WeakMap();
  let obj = { key: 'value' };
  cache.set(obj, 'cached data');
  // If 'obj' is no longer referenced elsewhere, it can be garbage collected.
  ```

### 3. **Monitoring and Profiling**

- **Memory Profiling Tools:**  
  Use built-in tools in browsers (like Chrome DevTools) or Node.js profiling tools to monitor memory usage over time. Look for signs of unbounded memory growth.
  
- **Heap Snapshots:**  
  Take regular heap snapshots during development and analyze them to detect objects that should have been freed but remain in memory.

- **Automated Testing:**  
  Incorporate automated tests that simulate prolonged usage and monitor memory consumption to catch leaks early.

### 4. **Design Patterns and Best Practices**

- **Modular Design:**  
  Break your code into smaller, manageable modules to reduce the risk of inadvertently holding onto large data structures.
  
- **Immutable Data Structures:**  
  In some cases, using immutable data structures (or libraries that enforce immutability) can help avoid accidental mutations that prevent memory from being freed.

- **Regularly Clear Caches:**  
  If your application uses caches, ensure they have eviction policies (like LRU – Least Recently Used) or timeouts to prevent indefinite growth.

## Example Scenario

Imagine a single-page application that adds event listeners every time a new component is rendered but never removes them. Over time, these listeners accumulate, keeping references to DOM elements and other data that should be released:

```javascript
function renderComponent() {
  let element = document.createElement('div');
  element.innerText = 'Hello, World!';
  document.body.appendChild(element);
  
  // Adding an event listener every time without removing it later
  element.addEventListener('click', () => {
    console.log('Element clicked');
  });
}

// If renderComponent is called repeatedly without cleanup,
// memory usage can increase due to accumulated event listeners.
```

**Prevention:**  
- When the component is unmounted or no longer needed, remove the event listener and detach the element.
- Use a framework or pattern that automatically handles component lifecycle and cleanup.

## Conclusion

A memory leak is a situation where memory that is no longer needed remains allocated because of lingering references. Preventing memory leaks involves careful management of variable scope, timely cleanup of event listeners, timers, and caches, and using tools like WeakMap/WeakSet when appropriate. Regular profiling and adhering to best practices in application design are essential for keeping your application’s memory usage under control, ensuring it remains efficient and stable over time.

# What is garbage collection and how does it work?
**Garbage collection** is an automatic memory management process used by many programming languages (such as JavaScript, Java, and C#) to reclaim memory that is no longer in use, thereby preventing memory leaks and ensuring efficient use of memory resources. Instead of developers having to manually free up memory, the garbage collector (GC) automatically identifies and disposes of objects that are no longer reachable by the program.

## How Garbage Collection Works

Garbage collection typically involves the following steps and concepts:

### 1. **Reachability Analysis**

- **Roots and References:**  
  The garbage collector begins by identifying a set of "root" objects, which usually include global variables, active function parameters, and variables currently in the call stack. From these roots, it traverses the object graph to mark every object that is directly or indirectly accessible.

- **Marking Reachable Objects:**  
  Any object that can be reached through a chain of references from these roots is considered "live" and is not eligible for garbage collection.

### 2. **Mark-and-Sweep Algorithm**

- **Mark Phase:**  
  The garbage collector marks all reachable objects starting from the root objects. This is done by traversing the reference graph and flagging each visited object as "in use."

- **Sweep Phase:**  
  Once the marking phase is complete, the collector scans through the heap (the area of memory allocated for dynamic objects) and reclaims memory allocated to objects that were not marked as reachable. These unmarked objects are considered garbage and their memory is freed.

### 3. **Generational Garbage Collection**

Many modern garbage collectors optimize the process using **generational collection**, based on the observation that most objects die young.

- **Young Generation:**  
  New objects are allocated in a "young" generation space. Since many objects become unreachable quickly, this space is collected frequently, making the process fast and efficient.

- **Old Generation:**  
  Objects that survive several rounds of garbage collection in the young generation are promoted to the "old" generation. Collections in this space are less frequent but involve more complex algorithms.

### 4. **Other Strategies and Algorithms**

- **Reference Counting:**  
  Some systems use reference counting, where each object maintains a count of references pointing to it. When this count reaches zero, the object is immediately deallocated. However, reference counting has challenges such as dealing with cyclic references (two objects referencing each other).

- **Incremental and Concurrent GC:**  
  To reduce pauses in program execution, some garbage collectors perform collection incrementally or concurrently with the application’s execution. This minimizes the “stop-the-world” time where the application is paused while the GC runs.

- **Compacting Collectors:**  
  After sweeping, some garbage collectors perform compaction, which moves live objects together to reduce memory fragmentation and improve allocation speed.

## Garbage Collection in JavaScript (Example)

JavaScript, which is often run in browsers or in Node.js, uses garbage collection to manage memory automatically. Although the specifics can vary between different JavaScript engines (like V8 in Chrome/Node.js, SpiderMonkey in Firefox, or JavaScriptCore in Safari), the general process is similar:

1. **Allocation:**  
   When you create objects, they are allocated on the heap.

2. **Mark Phase:**  
   The garbage collector periodically scans the call stack and global objects, marking all objects that are still accessible.

3. **Sweep Phase:**  
   It then sweeps through the heap and frees memory for any objects that were not marked.

4. **Optimization:**  
   Some engines employ generational garbage collection, where short-lived objects are collected more frequently, while long-lived objects are managed separately.

## Benefits of Garbage Collection

- **Developer Productivity:**  
  Developers don’t need to manually manage memory allocation and deallocation, reducing errors such as memory leaks and dangling pointers.
  
- **Safety and Security:**  
  Automatic memory management helps prevent many common bugs and vulnerabilities that can arise from incorrect memory handling.

- **Optimized Performance:**  
  Modern garbage collectors are highly optimized, balancing the trade-offs between memory usage, pause times, and overall application throughput.

## Conclusion

Garbage collection is a crucial component of modern programming languages that automatically manages memory by reclaiming resources from objects that are no longer reachable. It typically works by performing reachability analysis (marking reachable objects) and then freeing memory occupied by unmarked objects (sweeping). Optimizations like generational collection and concurrent collection help balance performance with minimal disruption to program execution. This automatic process not only simplifies development but also helps maintain application stability and performance over time.

# What is a closure? Can you provide a real-time example?
A **closure** in JavaScript (and many other programming languages) is a function that "remembers" the environment (scope) in which it was created, even after that environment has finished executing. This means that a closure can access variables from its outer (enclosing) function even after the outer function has returned.

## How Closures Work

When a function is defined inside another function, it forms a closure. The inner function retains access to the outer function's variables, even when it is executed outside of its original scope.

**Key Points:**
- **Lexical Scope:** Closures capture variables based on where they were defined in the code, not where they are executed.
- **Persistent State:** They allow functions to maintain state between calls by "remembering" the variables of the outer function.
- **Encapsulation:** Closures are often used to encapsulate private variables and functions.

## Real-Time Example: Creating a Counter

Imagine you want to build a simple counter that can be incremented over time. Using a closure, you can encapsulate the counter variable and expose only the functions that operate on it. This is useful in scenarios like managing state in a web application or controlling access to a private value.

### Code Example

```javascript
function createCounter() {
  // 'count' is a local variable in the createCounter function.
  // It is private and cannot be accessed directly from outside.
  let count = 0;

  // The inner function 'increment' forms a closure over 'count'.
  // It has access to 'count' even after createCounter() has finished executing.
  return function increment() {
    count += 1;
    return count;
  };
}

// Create a new counter instance
const counter = createCounter();

console.log(counter()); // Outputs: 1
console.log(counter()); // Outputs: 2
console.log(counter()); // Outputs: 3
```

### Explanation

1. **Defining the Closure:**  
   The function `createCounter` defines a local variable `count` and returns an inner function `increment`.  
   The `increment` function forms a closure that captures the `count` variable from its outer scope.

2. **Persistent State:**  
   Even after `createCounter` finishes executing, the returned `increment` function continues to have access to the `count` variable. This allows the counter to "remember" its previous value across multiple calls.

3. **Encapsulation:**  
   The `count` variable is not accessible directly from outside the closure, making it private. Users can only interact with `count` by calling the `counter` function.

## Real-World Use Cases for Closures

- **Event Handlers:**  
  In a web application, closures are used in event handlers to retain state or configuration. For example, a closure can capture the state of a form or element at the time the event is attached, and then use that state when the event fires.
  
  ```javascript
  function setupButton() {
    let clickCount = 0;
    const button = document.getElementById('myButton');
    
    button.addEventListener('click', function() {
      clickCount += 1;
      console.log(`Button clicked ${clickCount} times`);
    });
  }
  
  setupButton();
  ```

- **Module Pattern:**  
  Closures are the foundation for the module pattern in JavaScript, which allows you to create private variables and functions while exposing a public API.

  ```javascript
  const myModule = (function() {
    let privateVar = "I am private";
    
    function privateMethod() {
      console.log(privateVar);
    }
    
    return {
      publicMethod: function() {
        privateMethod();
      }
    };
  })();
  
  myModule.publicMethod(); // Logs: I am private
  // privateVar and privateMethod are not accessible directly
  ```

## Conclusion

A **closure** allows a function to access and manipulate variables that are defined in an outer function even after the outer function has completed execution. This is a powerful feature that enables persistent state, data encapsulation, and more modular code design. The counter example and real-world use cases like event handlers and the module pattern illustrate how closures are essential for managing state and behavior in JavaScript applications.

# What is global execution context and how does it work?
In JavaScript, **execution context** is an abstract concept that represents the environment within which your code is evaluated and executed. The **global execution context** is the default context that the JavaScript engine creates when your program starts running. Here's a detailed breakdown of what it is and how it works:

### What Is the Global Execution Context?

- **Default Environment:**  
  When a JavaScript program starts (for example, when a script is loaded in a web page), the JavaScript engine creates a global execution context. This context is the outermost scope and is not inside any function. All variables, functions, and objects defined outside of any functions belong to this context.

- **Global Object Association:**  
  In a browser environment, the global object is `window`, while in Node.js it is `global`. The global execution context attaches variables and functions defined in the global scope to this global object.

- **One-Time Creation:**  
  There is only one global execution context per program. All other execution contexts (like those for functions) are created as children of this global context when needed.

### Phases of the Global Execution Context

The creation of an execution context in JavaScript generally involves **two phases**:

1. **Creation Phase (or Memory Allocation Phase):**
   - **Global Object Creation:**  
     The JavaScript engine creates a global object (e.g., `window` in browsers).
   - **Scope Chain Establishment:**  
     A scope chain is set up which, for the global context, contains only the global object.
   - **Variable Object Initialization:**  
     The engine goes through the code and allocates memory for all variable and function declarations. During this phase, variables are hoisted (declared but not necessarily initialized) and function declarations are fully hoisted with their definitions.
   - **`this` Binding:**  
     In the global context, `this` refers to the global object.

2. **Execution Phase (or Code Execution Phase):**
   - **Code Execution:**  
     After the creation phase, the code is executed line by line. Variables may get assigned values, and functions are executed when they are called.
   - **Runtime Behavior:**  
     During this phase, JavaScript handles any dynamic aspects like variable assignments, function invocations, and event handling.

### How Does the Global Execution Context Work in Practice?

Consider the following example:

```javascript
// Global Execution Context starts here

var name = "Alice";          // Variable declaration and initialization
function greet() {           // Function declaration
    console.log("Hello, " + name);
}

greet();                     // Function call

// Global Execution Context ends here
```

1. **Creation Phase:**
   - A global object is created (`window` in a browser).
   - The variable `name` is declared and set aside (initially `undefined` until its assignment).
   - The function `greet` is declared, and its full definition is stored in memory.
   - The `this` keyword is bound to the global object.

2. **Execution Phase:**
   - The variable `name` is assigned the value `"Alice"`.
   - The function `greet` is now available to be called.
   - When `greet()` is invoked, a new function execution context is created for it (which is separate from the global context), but it can still access `name` via the scope chain established in the global execution context.

### Importance of the Global Execution Context

- **Foundation of Scope:**  
  The global execution context is the root of the scope chain. Every variable or function you define, unless isolated by a function or block scope, is accessible from here.

- **Memory Management:**  
  Since the global context is never destroyed until the program ends (or the page is closed), variables defined in it persist throughout the lifetime of the application. This is why it's generally advisable to minimize global variables to avoid potential memory leaks and conflicts.

- **Event Loop Integration:**  
  In environments like browsers, the global execution context plays a role in the event loop. While the global context sets up the initial execution environment, asynchronous callbacks (like those from event listeners, timers, etc.) create their own execution contexts when they run, but they always have access to the global context.

### Summary

- The **global execution context** is the default environment where your JavaScript code runs.
- It is created as soon as the JavaScript engine starts processing your script and consists of a global object, a scope chain, and memory for variables and functions.
- It goes through two main phases: the **creation phase** (setting up the environment) and the **execution phase** (running the code).
- Variables and functions declared in the global context remain available throughout the lifetime of your application, which emphasizes careful management of the global scope to avoid conflicts and potential issues.

Understanding the global execution context is fundamental to grasping how JavaScript handles scope, memory, and function execution, paving the way for more advanced concepts like closures and module patterns.

---

[<- JavaScript](js-quick.md)

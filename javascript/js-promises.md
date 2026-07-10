[<- JavaScript](js-quick.md)

## JavaScript Promises

### What are JavaScript Promises?

A **Promise** in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises make it easier to work with asynchronous code, improving readability and avoiding "callback hell."

---

### States of a Promise

A Promise has three states:

1. **Pending**: The initial state. The operation has not completed yet.
2. **Fulfilled**: The operation completed successfully.
3. **Rejected**: The operation failed.

A promise transitions from *pending* to either *fulfilled* or *rejected*. Once settled, the state is immutable.

---

### Creating a Promise

A Promise is created using the `Promise` constructor. It takes a function (executor) with two parameters: `resolve` and `reject`.

#### Example:
```javascript
const myPromise = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve("Operation succeeded!");
  } else {
    reject("Operation failed!");
  }
});

// Consuming the promise
myPromise
  .then((result) => {
    console.log(result); // "Operation succeeded!"
  })
  .catch((error) => {
    console.error(error);
  });
```

---

### Handling Promises

1. **`.then()`**: Called when the promise is fulfilled.
2. **`.catch()`**: Called when the promise is rejected.
3. **`.finally()`**: Executes regardless of whether the promise is resolved or rejected.

#### Example:
```javascript
const fetchData = new Promise((resolve, reject) => {
  let success = true;

  setTimeout(() => {
    if (success) {
      resolve("Data fetched successfully");
    } else {
      reject("Failed to fetch data");
    }
  }, 1000);
});

fetchData
  .then((result) => {
    console.log(result); // Logs after 1 second: "Data fetched successfully"
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Operation complete.");
  });
```

---

### Chaining Promises

You can chain multiple `.then()` calls to handle a sequence of asynchronous tasks.

#### Example:
```javascript
const step1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Step 1 completed"), 1000);
  });
};

const step2 = (prevResult) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${prevResult} -> Step 2 completed`), 1000);
  });
};

const step3 = (prevResult) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${prevResult} -> Step 3 completed`), 1000);
  });
};

step1()
  .then((result) => step2(result))
  .then((result) => step3(result))
  .then((finalResult) => {
    console.log(finalResult); // Logs after 3 seconds: "Step 1 completed -> Step 2 completed -> Step 3 completed"
  });
```

---

### Error Handling in Promises

Errors can occur at any stage in a promise chain. Use `.catch()` to handle them.

#### Example:
```javascript
const riskyOperation = () => {
  return new Promise((resolve, reject) => {
    let success = Math.random() > 0.5;

    setTimeout(() => {
      if (success) {
        resolve("Operation succeeded!");
      } else {
        reject("Operation failed!");
      }
    }, 1000);
  });
};

riskyOperation()
  .then((result) => {
    console.log(result);
    return riskyOperation();
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Error:", error); // Catches any error in the chain
  });
```

---

### Combining Promises

#### `Promise.all`
Waits for all promises to resolve. Rejects if any promise fails.
```javascript
const p1 = Promise.resolve("Task 1 done");
const p2 = Promise.resolve("Task 2 done");
const p3 = Promise.reject("Task 3 failed");

Promise.all([p1, p2, p3])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error("Error:", error); // Logs: "Task 3 failed"
  });
```

#### `Promise.race`
Returns the result of the first settled promise.
```javascript
const p1 = new Promise((resolve) => setTimeout(resolve, 500, "First"));
const p2 = new Promise((resolve) => setTimeout(resolve, 100, "Second"));

Promise.race([p1, p2])
  .then((result) => {
    console.log(result); // Logs: "Second" (p2 settles first)
  });
```

#### `Promise.allSettled`
Waits for all promises to settle (resolve or reject).
```javascript
const p1 = Promise.resolve("Task 1 done");
const p2 = Promise.reject("Task 2 failed");
const p3 = Promise.resolve("Task 3 done");

Promise.allSettled([p1, p2, p3]).then((results) => {
  console.log(results);
  // Logs:
  // [
  //   { status: "fulfilled", value: "Task 1 done" },
  //   { status: "rejected", reason: "Task 2 failed" },
  //   { status: "fulfilled", value: "Task 3 done" }
  // ]
});
```

#### `Promise.any`
Resolves as soon as any promise is fulfilled. Rejects if all promises fail.
```javascript
const p1 = Promise.reject("Task 1 failed");
const p2 = Promise.resolve("Task 2 succeeded");
const p3 = Promise.reject("Task 3 failed");

Promise.any([p1, p2, p3])
  .then((result) => {
    console.log(result); // Logs: "Task 2 succeeded"
  })
  .catch((error) => {
    console.error(error); // Only if all promises reject
  });
```

---

### Summary of Key Points

| **Feature**        | **Description**                                                            |
| ------------------ | -------------------------------------------------------------------------- |
| **Pending**        | The promise is waiting for the asynchronous operation to complete.         |
| **Fulfilled**      | The asynchronous operation completed successfully.                         |
| **Rejected**       | The asynchronous operation failed.                                         |
| **then()**         | Handles the fulfillment of a promise.                                      |
| **catch()**        | Handles the rejection of a promise.                                        |
| **finally()**      | Executes code regardless of promise fulfillment or rejection.              |
| **Chaining**       | Allows sequential execution of asynchronous operations.                    |
| **Error Handling** | Errors propagate down the promise chain and can be caught with `.catch()`. |

---

### Real-World Example: Fetching Data
```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // Logs the array of posts
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
``` 

---

## Promise.any vs Promise.race vs Promise.all vs Promise.allSettled

Here’s a detailed comparison of `Promise.any`, `Promise.race`, `Promise.all`, and `Promise.allSettled` in JavaScript, with examples for better understanding:

---

### 1. **Promise.any**
- **Purpose**: Resolves as soon as *any* of the promises in the iterable resolve. If all promises reject, it rejects with an `AggregateError` containing all rejection reasons.
- **Use Case**: When you are interested in the **first successfully resolved promise**.

#### Syntax:
```javascript
Promise.any(iterable);
```

#### Example:
```javascript
const p1 = Promise.reject("Error 1");
const p2 = Promise.resolve("Success 2");
const p3 = new Promise((resolve) => setTimeout(resolve, 100, "Success 3"));

Promise.any([p1, p2, p3])
  .then((value) => console.log(value)) // "Success 2" (first resolved promise)
  .catch((error) => console.error(error));
```

#### Key Points:
- Returns the **first fulfilled promise**.
- If all promises reject, it throws an `AggregateError`.

---

### 2. **Promise.race**
- **Purpose**: Resolves or rejects as soon as the **first promise settles** (either resolves or rejects).
- **Use Case**: When you want to act on whichever promise settles first, regardless of its outcome.

#### Syntax:
```javascript
Promise.race(iterable);
```

#### Example:
```javascript
const p1 = new Promise((resolve) => setTimeout(resolve, 200, "Success 1"));
const p2 = new Promise((_, reject) => setTimeout(reject, 100, "Error 2"));

Promise.race([p1, p2])
  .then((value) => console.log(value)) // "Error 2" (first promise to settle)
  .catch((error) => console.error(error));
```

#### Key Points:
- Returns the result of the **first settled promise**.
- Ignores all other promises once one settles.

---

### 3. **Promise.all**
- **Purpose**: Resolves when **all promises** in the iterable resolve. If any promise rejects, it immediately rejects with the first rejection reason.
- **Use Case**: When you need results from all promises, or if even one fails, you want to catch that error.

#### Syntax:
```javascript
Promise.all(iterable);
```

#### Example:
```javascript
const p1 = Promise.resolve("Success 1");
const p2 = Promise.resolve("Success 2");
const p3 = Promise.reject("Error 3");

Promise.all([p1, p2, p3])
  .then((values) => console.log(values))
  .catch((error) => console.error(error)); // "Error 3" (first rejection)
```

#### Key Points:
- Returns an array of results if all promises succeed.
- Short-circuits on the first rejection.

---

### 4. **Promise.allSettled**
- **Purpose**: Resolves when **all promises settle** (either resolve or reject). It never rejects and provides the results of all promises as an array of objects.
- **Use Case**: When you want to know the outcome of all promises, regardless of success or failure.

#### Syntax:
```javascript
Promise.allSettled(iterable);
```

#### Example:
```javascript
const p1 = Promise.resolve("Success 1");
const p2 = Promise.reject("Error 2");
const p3 = Promise.resolve("Success 3");

Promise.allSettled([p1, p2, p3])
  .then((results) => console.log(results));
```

#### Output:
```javascript
[
  { status: "fulfilled", value: "Success 1" },
  { status: "rejected", reason: "Error 2" },
  { status: "fulfilled", value: "Success 3" }
]
```

#### Key Points:
- Returns an array with the status (`fulfilled` or `rejected`) and corresponding value/reason.
- Useful for logging or handling mixed outcomes.

---

### Summary Comparison

| **Method**           | **Resolves When**                                | **Rejects When**                                 | **Output**                                       |
| -------------------- | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `Promise.any`        | The first promise resolves.                      | All promises reject.                             | First resolved value or `AggregateError`.        |
| `Promise.race`       | The first promise settles (resolves or rejects). | The first promise rejects (if it settles first). | First settled value or rejection reason.         |
| `Promise.all`        | All promises resolve.                            | Any promise rejects.                             | Array of resolved values or rejection reason.    |
| `Promise.allSettled` | All promises settle (resolve or reject).         | Never rejects.                                   | Array of result objects (status + value/reason). |

Choose the appropriate method based on your requirements for handling multiple asynchronous operations!

---

[<- JavaScript](js-quick.md)


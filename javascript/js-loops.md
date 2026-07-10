[<- JavaScript](js-quick.md)

## JavaScript Loops

JavaScript provides several types of loops, each suited to specific scenarios. Here's a breakdown of the **main types of loops** and when to use them:

---

### **1. `for` Loop**
**Syntax:**
```javascript
for (initialization; condition; increment) {
    // code to be executed
}
```

**When to Use:**
- When you know the exact number of iterations in advance.
- Ideal for iterating over sequences like arrays with a fixed number of elements.

**Example:**
```javascript
for (let i = 0; i < 5; i++) {
    console.log(i); // Outputs 0, 1, 2, 3, 4
}
```

---

### **2. `while` Loop**
**Syntax:**
```javascript
while (condition) {
    // code to be executed
}
```

**When to Use:**
- When the number of iterations is not predetermined, but you have a stopping condition.
- Great for loops that rely on external factors, like user input or data fetching.

**Example:**
```javascript
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
```

---

### **3. `do...while` Loop**
**Syntax:**
```javascript
do {
    // code to be executed
} while (condition);
```

**When to Use:**
- When you want the loop body to execute at least once, regardless of the condition.
- Useful for prompting users or ensuring a block runs before condition checking.

**Example:**
```javascript
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);
```

---

### **4. `for...in` Loop**
**Syntax:**
```javascript
for (key in object) {
    // code to be executed
}
```

**When to Use:**
- For iterating over the **properties** of an object.
- Avoid using with arrays; it might lead to unexpected behavior due to inherited properties.

**Example:**
```javascript
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
    console.log(`${key}: ${obj[key]}`);
}
// Outputs: a: 1, b: 2, c: 3
```

---

### **5. `for...of` Loop**
**Syntax:**
```javascript
for (element of iterable) {
    // code to be executed
}
```

**When to Use:**
- For iterating over **iterable objects** like arrays, strings, maps, sets, or any object with an iterable protocol.
- Preferred over `for` or `forEach` when dealing with values directly.

**Example:**
```javascript
const arr = [10, 20, 30];
for (let num of arr) {
    console.log(num);
}
// Outputs: 10, 20, 30

const str = "Hello";
for (let char of str) {
    console.log(char);
}
// Outputs: H, e, l, l, o

const obj = { a: 1, b: 2 };
for (let [key, value] of Object.entries(obj)) {
    console.log(`${key}: ${value}`);
}
// Outputs: a: 1, b: 2
```

---

### **6. `forEach` Method**
**Syntax:**
```javascript
array.forEach((element, index) => {
    // code to be executed
});
```

**When to Use:**
- When iterating over arrays and you don’t need to break out of the loop early.
- Provides cleaner syntax for handling arrays but is less flexible than `for` or `for...of`.

**Example:**
```javascript
const arr = [1, 2, 3];
arr.forEach(num => console.log(num));
// Outputs: 1, 2, 3
```

---

### **Choosing the Right Loop**

| **Loop**         | **Best For**                                                                     |
| ---------------- | -------------------------------------------------------------------------------- |
| **`for`**        | Iterating over a range or array when you know the index or number of iterations. |
| **`while`**      | Conditional loops with an unknown number of iterations.                          |
| **`do...while`** | Ensuring at least one execution before condition evaluation.                     |
| **`for...in`**   | Iterating over object properties (avoid for arrays).                             |
| **`for...of`**   | Iterating over iterable objects like arrays, strings, maps, or sets.             |
| **`forEach`**    | Clean and concise iteration over arrays where early exit is not required.        |

---

[<- JavaScript](js-quick.md)

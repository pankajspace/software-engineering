[<- README](README.md) | [Cypress IQA](qa/cypress-iqa.md)

# React
1. What is React Reconciliation [React Reconciliation](react/react-reconciliation.md)
2. Explain useEffect in detail [useEffect](code/react/src/UseEffect.jsx)
3. useMemo vs useCallback [useMemo](code/react/src/UseMemo.jsx) [useCallback](code/react/src/UseCallback.jsx)
4. Redux flow. Middleware and why it is used [React Redux](react/react-redux.md)
5. React performance optimization techniques [React Performance Optimization](react/react-perf.md)

# Node & Express
1. Event Loop and its working [Event Loop](mern/node-event-loop.md)
2. Commonly used npm packages
3. Different types of middleware and why it is used [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
4. Cluster module & Worker threads. When to use which? [Cluster vs Worker Threads vs Child Process](mern/cluster-wt-cp.md)
5. Different types Streams & Pipes and why they are used [Node Streams](mern/node-streams.md)
6. Event Emitter and its use cases [Event Emitter](mern/node-event-emitter.md)
7. Node and Express security best practices [Security](https://expressjs.com/en/advanced/best-practice-security.html)
8. Node and Express performance optimization techniques [Performance](https://expressjs.com/en/advanced/best-practice-performance.html)

# MongoDB
1. Commonly used Mongoose methods
2. What is aggregation in MongoDB
3. MongoDB transactions
4. MongoDB performance optimization techniques

# JavaScript
1. Data types
2. Difference between `==` and `===`
3. Arrow functions vs Regular functions.
4. Difference between `var`, `let` and `const`
5. Closures
6. Rest
7. Spread
8. Destructuring
9. Event Bubbling

# CSS
1. Display
2. Cascade, Inheritance, Specificity
3. Position
4. Media Queries

# HTML
1. Semantic Elements

# General
1. AWS services used and why they are used
2. Docker and Kubernetes and why they are used

# Problem Solving

## Get name of the employee with the third highest salary using sql and mongodb

```sql
SELECT name
FROM Employee
ORDER BY Salary DESC
LIMIT 1
OFFSET 2;
```

```js
// MongoDB query
Employee.find().sort({ Salary: -1 }).skip(2).limit(1).select({ name: 1 });

// Using aggregation
Employee.aggregate([
  { $sort: { Salary: -1 } },
  { $skip: 2 },
  { $limit: 1 },  
  { $project: { _id: 0, name: 1 } } // to exclude _id field and include name field
]);
```

## Event Loop

### Basic Event Loop Output
```javascript
setImmediate(() => console.log("setImmediate 1"));

setImmediate(() => {
  process.nextTick(() => console.log("nextTick 1"));
  setImmediate(() => console.log("setImmediate 2"));
});

setImmediate(() => console.log("setImmediate 3"));
setTimeout(() => console.log("setTimeout 1"), 0);
Promise.resolve().then(() => console.log("Promise 1"));
process.nextTick(() => console.log("nextTick 2"));

// Promise 1
// nextTick 2
// setTimeout 1
// setImmediate 1
// nextTick 1
// setImmediate 3
// setImmediate 2
```

### Advanced Event Loop Output
```javascript
const fs = require("fs");

fs.readFile(__filename, () => { console.log("readFile 1"); });

setImmediate(() => console.log("setImmediate 1"));

setImmediate(() => {
  process.nextTick(() => console.log("nextTick 1"));
  setImmediate(() => console.log("setImmediate 2"));
});

setImmediate(() => console.log("setImmediate 3"));
setTimeout(() => console.log("setTimeout 1"), 0);
Promise.resolve().then(() => console.log("Promise 1"));
process.nextTick(() => console.log("nextTick 2"));

const readableStream = fs.createReadStream(__filename);
readableStream.close();
readableStream.on("close", () => { console.log("Close 1"); });

// nextTick 2
// Promise 1
// setTimeout 1
// setImmediate 1
// nextTick 1
// setImmediate 3
// Close 1
// setImmediate 2
// readFile 1
```

## 1. Find the unique elements in an array
```js
function getUniqueElements(arr) {
    const frequency = arr.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {});

    // Alternatively, you can use forEach to create the frequency object
    // const frequency = {};
    // arr.forEach(num => {
    //     frequency[num] = (frequency[num] || 0) + 1;
    // });

    return arr.filter(num => frequency[num] === 1);
}

const arr = [1, 1, 2, 3, 4, 2, 5, 6, 7, 8, 7];
console.log(getUniqueElements(arr)); // Output: [3, 4, 5, 6, 8]
```

## 2. Get pairs of numbers from an array whose sum is equal to zero
```js
// Write a function that takes an integer array as input and finds pairs of numbers whose sum equals 0.
function findPairs(arr) {
  const result = [];
  // Build a frequency map for negative numbers.
  const negatives = {};
  for (const num of arr) {
    if (num < 0) {
      negatives[num] = (negatives[num] || 0) + 1;
    }
  }

  console.log(negatives); // { '-4': 3, '-3': 1 }

  // Iterate over the array and, for each positive number,
  // check if its negative exists (and is available) in the map.
  for (const num of arr) {
    if (num > 0 && negatives[-num]) {
      result.push([num, -num]);
      negatives[-num]--;
    }
  }

  return result;
}
const arr = [4, -3, 2, -4, 3, 1, 4, -4, 4];
console.log(findPairs(arr));
// Expected output: [[4, -4], [3, -3], [4, -4]]
```

## 3. Multiply array values except current index value.
```js
// using mapreduce approach
let arr = [1, 2, 3, 4, 5];
let result = arr.map((val, index) => {
  return arr.reduce((acc, curr, i) => {
    return i !== index ? acc * curr : acc;
  }, 1);
});
console.log(result); // [120, 60, 40, 30, 24]

// optimized approach using two separate loops
let arr = [1, 2, 3, 4, 5];
// first multiply all the values
let total = arr.reduce((acc, curr) => acc * curr, 1);
// then divide the total by each value
let result = arr.map(val => total / val);
console.log(result); // [120, 60, 40, 30, 24]
```

## 4. Find the first non-repeating character in a string
```js
function firstNonRepeatingChar(str) {
  let charMap = {};
  for (let char of str) {
    charMap[char] = (charMap[char] || 0) + 1;
  }

  for (let char of str) {
    if (charMap[char] === 1) {
      return char;
    }
  }

  return null;
}
console.log(firstNonRepeatingChar("aabbccd")); // Output: d
console.log(firstNonRepeatingChar("ababkek")); // Output: e
console.log(firstNonRepeatingChar("aabbcc")); // Output: null
```

## 5. Maximum subarray sum of size k
```js
function maxSumSubarray(arr, k) {
  let sum = 0;
  // Calculate sum of first k elements
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }

  let maxSum = sum;

  let start = 0;
  let end = k;
  while (end < arr.length) {
    sum = sum - arr[start] + arr[end];
    maxSum = Math.max(maxSum, sum);
    start++;
    end++;
  }

  return maxSum;
}
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // Output: 9
console.log(maxSumSubarray([2, 3, 4, 1, 5], 2)); // Output: 7
// Time Complexity: O(n)
// Space Complexity: O(1)
```

## 6. Concat message
```js
function concat(...args) {
  return args.join(" ");
}
const msg = concat("Hi", "how", "are", "you", " ");
console.log(msg)
```

## 7. Sum of two numbers
```js
function sum(a, b) {
  if (b !== undefined) {
    return a + b
  } else {
    return function (b) {
      return a + b
    }
  }
}
console.log(sum(1, 2))
console.log(sum(1)(2))
```

## 8. Check Anagram
```js
function checkAnagram(word1, word2) {
  if (word1.length !== word2.length) return false;

  const frequency = {};

  for (const letter of word1.toLowerCase()) {
    frequency[letter] = (frequency[letter] || 0) + 1;
  }

  console.log(frequency); // { c: 1, h: 1, e: 2, a: 1, t: 1, r: 1 }

  for (const letter of word2.toLowerCase()) {
    // If letter not found or frequency is 0
    if ( frequency[letter] === undefined || frequency[letter] === 0 ) {
      return false;
    }
    frequency[letter] -= 1;
  }

  return true;
}
console.log(checkAnagram("cheater", "teacher")); // true
console.log(checkAnagram("Test", "Best")); // false
```

## 9. Count all the substrings starting with a vowel
```js
function countVowelSubstrings(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (isVowel(str.charAt(i))) {
      count += str.length - i;
    }
  }
  return count;
}
function isVowel(ch) {
  return ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u';
}
console.log(countVowelSubstrings("cat")); // 2 // "a", "at"
console.log(countVowelSubstrings("abcde")); // 6 // "a", "ab", "abc", "abcd", "abcde", "e"
console.log(countVowelSubstrings("aeiou")); // 15 // "a", "ae", "aei", "aeio", "aeiou", "e", "ei", "eio", "eiou", "i", "io", "iou", "o", "ou", "u"
```

## 10. Round Sum
```
Round a number up to the next multiple of 10 if its rightmost digit is 5 or more, so 15 rounds up to 20.
Alternately, round down to the previous multiple of 10 if its rightmost digit is less than 5, so 12 rounds down to 10. Given 3 ints, a b c, return the sum of their rounded values.
```

```js
function round10(num) {
  // return Math.round(num / 10) * 10;

  // Alternative approach
  let remainder = num % 10;
  if (remainder >= 5) {
    return num + (10 - remainder);
  } else {
    return num - remainder;
  }
}

function roundSum(a, b, c) {
  return round10(a) + round10(b) + round10(c);
}

console.log(roundSum(14, 17, 18)); // Output: 50
console.log(roundSum(22, 23, 25)); // Output: 70
console.log(roundSum(6, 4, 4)); // Output: 10
```

## 11. First occurrence of a number in a sorted array
```js
function firstOccurrence(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      result = mid;
      right = mid - 1; // continue searching in the left half
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

console.log(firstOccurrence([1, 2, 2, 2, 3, 4, 5], 2)); // 1
console.log(firstOccurrence([1, 1, 1, 1, 1], 1)); // 0
console.log(firstOccurrence([1, 2, 3, 4, 5], 6)); // -1
```

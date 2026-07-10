[<- JavaScript](js-quick.md)

# JavaScript Programs

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
const arr = [4, -3, 2, -4, 3, 1, 4, -4];
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
```

## 6. Concat message 
```js
function concat(...args) {
  const last = args.pop()
  return args.join(last);
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

## Combine 3 arrays and sort. 
```js
let arr1 = [1, 3, 2, 4, 5];
let arr2 = [6, 7, 8, 9, 10];
let arr3 = [11, 12, 13, 14, 15];
let arr = arr1.concat(arr2, arr3);
// Alternative
// let arr = [...arr1, ...arr2, ...arr3];
arr.sort();
console.log(arr);
```

# Sort array by date and time ascending/descending
```js
const dateTime = [
  { "id": 1, "time": "10:30:55 AM", "date": "10-29-2020" },
  { "id": 2, "time": "5:30:55 AM", "date": "10-15-2020" },
  { "id": 3, "time": "8:30:55 AM", "date": "10-19-2020" },
  { "id": 4, "time": "1:30:55 AM", "date": "10-29-2019" },
  { "id": 5, "time": "9:30:55 AM", "date": "10-29-2019" },
]

const sortByDate = (arr) => {
  console.log(arr);
}
sortByDate(dateTime);

const sortByTime = (arr) => {
  console.log(arr);
}

sortByTime(dateTime);
```

## How to Empty a js array?
```js
A = []; 
A.length = 0; 
A.splice(0, A.length);
```

## How to check arrays in JavaScript?
```js
let A = [1, 2, 3];
console.log(A.constructor == Array); // true
console.log(Array.isArray(A)); // true
```

## How to check objects in JavaScript?
```js
let O = {a: 1, b: 2};
console.log(O.constructor === Object); // true
console.log(typeof O === "object" && O !== null && !Array.isArray(O)); // true
```

## How to get all non undefined values from an array?
```js
let Arr = [1, 2, undefined, 3, undefined, 4];
Arr = Arr.filter(element => element !== undefined);
// Alternative
Arr = Arr.filter( Boolean );
console.log(Arr); // [1, 2, 3, 4]
```

## How to create an array from function arguments?
```js
function myFunc() {
  let args = Array.prototype.slice.call(arguments); // when we pass something to slice it will return a new array
  // Alternative
  let args = Array.from(arguments);
  return args;
}
console.log(myFunc(1, 2, 3)); // [1, 2, 3]
```

## Get unique values from array or Remove duplicates from an array.
```js
let myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let unique = myArray.filter((v, i) => myArray.indexOf(v) === i); 
console.log(unique); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Alternative
// let unique = [...new Set(myArray)];
// console.log(unique); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Change the Person function so that method 1 & method 2 behaves the same way.
```js
let Person = function(){ }
let p = new Person(); //method 1
let p = Person()  //method 2

// Solution
let Person = function() {
  if (!(this instanceof Person)) {
    return new Person();
  }
}
let p = new Person(); //method 1
let p = Person();  //method 2
```

## Write a cache function that caches a function.
```js
function cacheFn(fn) {
  var cache = {};
  return function(arg) {
    if (cache[arg]) {
      return cache[arg];
    }
    else {
      cache[arg] = fn(arg);
      return cache[arg];
    }
  }
}
```

## Sum of maximum numbers in three arrays.
```js
let array1 = [15, 45, 30, 9, 5, 45];
let array2 = [8, 6, 25, 4, 9, 20];
let array3 = [5.8, 6, 7, 30, 9, 9];

const sortFn = (a, b) => {
  return a - b;
}

let max1 = array1.sort(sortFn)[array1.length - 1];
let max2 = array2.sort(sortFn)[array2.length - 1];
let max3 = array3.sort(sortFn)[array3.length - 1];

let sum = max1 + max2 + max3;
console.log(sum);
```

## Write a reverse method in javascript String object
```js
String.prototype.reverse = function() {
  let s = "";
  let i = this.length;
  while (i > 0) {
    s += this.substring(i-1, i);
    i--;
  }
  return s;
}
```

## Write a function to return modified values of the variable mac , replace E with 0 and T with 1
```js
// response "0C:B0:81:04"
let mac = "EC:B0:8T:E4";
const mapper = {
  E: 0,
  T: 1
}
const macArr = mac.split("");
const keys = Object.keys(mapper);
let str = '';
macArr.forEach((item) => {
  keys.includes(item) ? str += mapper[item] : str += item;
})
console.log(str);
```

## Get list of students whose marks are above 70%
```js
const students = [{
  name: 'John',
  age: 12,
  percentage: '81%'
},
{
  name: 'Sean',
  age: 12,
  percentage: '60%'
},
{
  name: 'Tony',
  age: 12,
  percentage: '72%'
}];
console.log(students.filter(student => parseInt(student.percentage) > 70));
```

## Get total sum of value
```js
const inventory = [
  { type: "machine", value: 5000, isPresent: true },
  { type: "machine", value: 650, isPresent: true },
  { type: "chairs", value: 10, isPresent: false },
  { type: "furniture", value: 2400, isPresent: false },
  { type: "furniture", value: 1200, isPresent: true },
  { type: "machine", value: 77, isPresent: true }
];
console.log(inventory.reduce((acc, item) => acc += (item.value), 0));
```

## find the largest sum of continuous 1's in the following example
```js
const arr = [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1];
let max = 0;
let count = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 1) {
    count++;
    max = Math.max(max, count);
  } else {
    count = 0;
  }
}
console.log(max); // 4
```

## Subarray Sum using Kadane's Algorithm
```javascript
function maxSubArraySum(a) {
  let max_so_far = a[0];
  let curr_max = a[0];
  for (let i = 1; i < a.length; i++) {
    curr_max = Math.max(a[i], curr_max + a[i]);
    max_so_far = Math.max(max_so_far, curr_max);
  }
  return max_so_far;
}
console.log(maxSubArraySum([-2, -3, 4, -1, -2, 1, 5, -3])); // 7 // [4, -1, -2, 1, 5]
```

## Matching Braces
```javascript
// finding balanced paranthesis
function checkBalancedParanthesis(str) {
  return !str.split("").reduce(function(acc, curr) {
    if (acc < 0) {
      return ++acc;
    }
    if (curr == "(") {
      return ++acc;
    }
    if (curr == ")") {
      return --acc;
    }
    return acc;
  }, 0);
}
// console.log(checkBalancedParanthesis(")())(("));
// console.log(checkBalancedParanthesis("(())"));

// complex check balanced paranthesis
const params = ["{[()}]", ")]}{[(", "{[()]}", "()[]{}"];
// isMatchingBrackets(params);

let isMatchingBrackets = function(str) {
  let stack = [];
  let map = {
    '(': ')',
    '[': ']',
    '{': '}'
  }

  for (let brace of str) {

    // If character is an opening brace add it to a stack
    if (brace === '(' || brace === '{' || brace === '[') {
      stack.push(brace);
    }
    //  If that character is a closing brace, pop from the stack, which will also reduce the length of the stack each time a closing bracket is encountered.
    else {
      let last = stack.pop();

      //If the popped element from the stack, which is the last opening brace doesn’t match the corresponding closing brace in the map, then return false
      if (brace !== map[last]) { return false };
    }
  }
  // By the completion of the for loop after checking all the brackets of the str, at the end, if the stack is not empty then fail
  if (stack.length !== 0) { return false };

  return true;
}

console.log(isMatchingBrackets(params[0]));
console.log(isMatchingBrackets(params[1]));
console.log(isMatchingBrackets(params[2]));
console.log(isMatchingBrackets(params[3]));
```

---

# Match Words : Asked in Barclays
```javascript
function matchWords(wordsArr, queryArr) {
  const results = {};
  queryArr.forEach((query) => {
    let count = 0;
    wordsArr.forEach((word) => {
      let regExQuery = new RegExp(query.replace(/\?/g, '[\\w]*', '/g'));
      // console.log(regExQuery, word, results[query], regExQuery.test(word));
      if (regExQuery.test(word)) {
        count += 1;
      }
      // let finalQuery = query.replace(/\?/g, "");
      // console.log(finalQuery)
      // if(word.includes(finalQuery)){
      //   results[query] += 1;
      // }
    });
    console.log(count);
  });
}

const wordsArr = ['cat', 'hat', 'man', 'pen', 'sit'];
const queryArr = ['?at', '??n', '??t'];
matchWords(wordsArr, queryArr);
```

## Optimized Solution
```javascript
function matchWords(wordsArr, queryArr) {
  // Group words by their length
  const wordsByLength = {};
  wordsArr.forEach((word) => {
    const len = word.length;
    if (!wordsByLength[len]) {
      wordsByLength[len] = [];
    }
    wordsByLength[len].push(word);
  });
  console.log(wordsByLength); 

  // Precompute regex patterns for queries
  const queryPatterns = queryArr.map((query) => ({
    query,
    length: query.length,
    regex: new RegExp('^' + query.replace(/\?/g, '.') + '$'),
  }));
  console.log(queryPatterns);

  // Iterate over each query
  const results = queryPatterns.map(({ query, length, regex }) => {
    const words = wordsByLength[length] || []; // Fetch words of the same length
    const matches = [];
    for (const word of words) {
      if (regex.test(word)) {
        matches.push(word);
      }
    }
    return { query, matches };
  });
  console.log(results);

  // Display results
  results.forEach(({ query, matches }) => {
    console.log(`Query: "${query}" -> Matches: ${matches.length > 0 ? matches.join(', ') : 'No matches'}`);
  });
  console.log(results);
}

// Example usage
const wordsArr = ["cats", "hats", "man", "pen", "sit"];
const queryArr = ["?at?", "??n", "??t"];

matchWords(wordsArr, queryArr);
```

## Explanation

### **Purpose**
The function `matchWords` takes two arrays:
1. `wordsArr`: List of words to be matched.
2. `queryArr`: List of queries with wildcards (`?`) to match against the words.

The goal is to efficiently find and print all words in `wordsArr` that match each query in `queryArr`.

### **Key Idea**
1. **Group Words by Length**: Since a query only matches words of the same length, we group words in `wordsArr` by their length to reduce unnecessary comparisons.
2. **Precompute Regex Patterns**: For each query, we convert the wildcard query into a regular expression once, rather than repeatedly converting it during matching.
3. **Efficient Matching**: For each query, we only test the words of the appropriate length, saving time.

### **Step-by-Step Explanation**

#### **Step 1: Group Words by Length**
We create a dictionary `wordsByLength` where the keys are word lengths, and the values are arrays of words of that length.

Example for `wordsArr = ['cat', 'hat', 'man', 'pen', 'sit']`:
```javascript
{
  3: ['cat', 'hat', 'man', 'pen', 'sit']
}
```

This grouping allows us to quickly fetch only the relevant words for each query based on its length.

Code snippet:
```javascript
const wordsByLength = {};
wordsArr.forEach((word) => {
  const len = word.length;
  if (!wordsByLength[len]) {
    wordsByLength[len] = [];
  }
  wordsByLength[len].push(word);
});
```

Time complexity for this step is O(n), where (n) is the number of words in `wordsArr`.

#### **Step 2: Precompute Regex Patterns**
Each query in `queryArr` (e.g., `?at`, `??n`, `??t`) is converted into a **regular expression**. Wildcards (`?`) are replaced with `.` in regex, which matches any single character.

Example for `queryArr = ['?at', '??n', '??t']`:
- `?at` -> `^.{1}at$`
- `??n` -> `^..n$`
- `??t` -> `^..t$`

Code snippet:
```javascript
const queryPatterns = queryArr.map((query) => ({
  query,
  length: query.length,
  regex: new RegExp('^' + query.replace(/\?/g, '.') + '$'),
}));
```

This step runs in O(q), where q is the number of queries.

#### **Step 3: Match Queries to Words**
For each query:
1. Look up words in `wordsByLength` that have the same length as the query.
2. Use the precomputed regex to test each word in that group.

Example:
- For query `?at` (length = 3, regex = `^.{1}at$`), fetch the group of 3-letter words: `['cat', 'hat', 'man', 'pen', 'sit']`.
- Test each word against the regex:
  - `cat`: matches
  - `hat`: matches
  - `man`: doesn’t match
  - `pen`: doesn’t match
  - `sit`: doesn’t match
- Result: `['cat', 'hat']`

Code snippet:
```javascript
const results = queryPatterns.map(({ query, length, regex }) => {
  const words = wordsByLength[length] || []; // Fetch words of the same length
  const matches = [];
  for (const word of words) {
    if (regex.test(word)) {
      matches.push(word);
    }
  }
  return { query, matches };
});
```

Time complexity for matching:
- For each query (q), iterate over only the relevant group of words (m), the average size of groups).
- Total complexity: O(q x m).

#### **Step 4: Display Results**
Finally, we loop through the `results` array and print the matches for each query:
```javascript
results.forEach(({ query, matches }) => {
  console.log(`Query: "${query}" -> Matches: ${matches.length > 0 ? matches.join(', ') : 'No matches'}`);
});
```

Output for the example:
```
Query: "?at" -> Matches: cat, hat
Query: "??n" -> Matches: man, pen
Query: "??t" -> Matches: sit
```

### **Optimization Insights**
1. **Reduced Comparisons**:
   - Instead of testing all (n) words for each query, we only test (m) words, where (m) is the size of the relevant group.
2. **Precomputing Regex**:
   - Each query is converted into a regex once, avoiding repetitive conversions during matching.
3. **Separation of Concerns**:
   - Grouping, regex creation, and matching are distinct steps, making the code modular and efficient.

### **Time Complexity Summary**
1. **Preprocessing** (grouping words): O(n)
2. **Regex Precomputation**: O(q)
3. **Query Matching**:
   - Fetch group: O(1) per query.
   - Match words in the group: O(m) per query.
```
Overall: O(n) + O(q) + O(q x m)
Worst Case (m = n): O(q x n) 
Best Case (m < n): O(n + q x m), where m is small.
```

---

# Rock Paper Scissors
- Two players are needed to play the game
- Both players state their move at the same time
  That means:
      - Neither of the player knows what is the other player's move
      - Player cannot change the move once selected
- Three different moves are available - Rock, Paper, Scissors
- Winner is determined based on the following rules:
    - Rock crushes Scissors
    - Scissors cuts Paper
    - Paper covers Rock

```
Rock crushes Scissors 
Rock crushes Lizard

Paper covers Rock
Paper disproves Spock

Scissors cuts Paper
Scissors decapitates Lizard

Lizard poisons Spock
Lizard eats Paper

Spock smashes Scissors
Spock vaporizes Rock
```

## Implementation

### Simple rock paper scissors game
```js
const options = ["rock", "paper", "scissor"];

const amit = {
  name: "Amit",
  value: getRandomSelection(options)
}

const bipin = {
  name: "Bipin",
  value: getRandomSelection(options)
}

function getRandomSelection(options) {
  return options[Math.floor(Math.random() * 3)];
}

const getWinner = (player, opponent) => {
  const pairs = {
    rock: "scissor",
    scissor: "paper",
    paper: "rock",
  }

  console.log(player, opponent)

  if (player.value == opponent.value) {
    return `Draw`;
  }

  if (pairs[player.value] == opponent.value) {
    return `Winner: ${player.name}`;
  }

  return `Winner: ${opponent.name}`
}
console.log(getWinner(amit, bipin));
```

### Rock paper scissors game with lizard and spock
```js
const options = ["rock", "paper", "scissors", "spock", "lizard"];

const amit = {
  name: "Amit",
  value: getRandomSelection(options)
}

const bipin = {
  name: "Bipin",
  value: getRandomSelection(options)
}

function getRandomSelection(options) {
  return options[Math.floor(Math.random() * 5)];
}

const getWinner = (player, opponent) => {
  const pairs = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper"],
    spock: ["scissors", "rock"],
  }

  console.log(player, opponent)

  if (player.value == opponent.value) {
    return `Draw`;
  }

  if (pairs[player.value].includes(opponent.value)) {
    return `Winner: ${player.name}`;
  }

  return `Winner: ${opponent.name}`
}
console.log(getWinner(amit, bipin));
```

---

# Sum of Multilevel Array : Asked in Xoriant
```javascript
// add all numbers in multidimensional array
const getNumber = (item) => {
  if (isNaN(item)) {
    return 0;
  } else {
    return item;
  }
}

const sumArray = (array) => {
  let sum = 0;
  array.forEach(item => {
    if (Array.isArray(item)) {
      sum = sum + sumArray(item)
    } else {
      sum = sum + getNumber(item)
    }
  })
  return sum;
}

const array = [1, 2, [[null, 5], "q", [null]], [[[2]]]]; //10
// const array = [1, [2, [3, [4, 5]]]]; //15
// sumArray(array);
```

# Return all the employees name and total number of projects allocated to that employee: Asked in Nagarro

```javascript
const emp = [{id:1, name:'pankaj'}, {id:2, name:'amit'}, {id:3, name:'sanjay'}];
const proj = [{id:1, name:'proj1'}, {id:2, name:'proj2'}, {id:3, name:'proj3'}, {id:4, name:'proj4'}, {id:5, name:'proj5'}];  
const allo = [{id:1, eid: 1, pid:1}, {id: 2, eid:1, pid:2}, {id: 3, eid:2, pid:3}, {id: 4, eid:2, pid:4}, {id: 5, eid:3, pid:5}]; 

// Solution 1
const countObj = {};
allo.forEach((a)=>{
  countObj[a.eid] = (countObj[a.eid] || 0) + 1;
})
console.log(allo);

emp.forEach((e)=>{
  e.projectsCount = countObj[e.id]
})
console.log(emp); // [{id:1, name:'pankaj', projectsCount:2}, {id:2, name:'amit', projectsCount:2}, {id:3, name:'sanjay', projectsCount:1}] 


// Solution 2
// Step 1: Create a map to store the total projects for each employee
const projectCountMap = allo.reduce((acc, allocation) => {
    acc[allocation.eid] = (acc[allocation.eid] || 0) + 1;
    return acc;
}, {});
console.log(projectCountMap);

// Step 2: Map over the employees and fetch the project count from the map
const result = emp.map(employee => ({
    name: employee.name,
    totalProjects: projectCountMap[employee.id] || 0 // default to 0 if no projects
}));
console.log(result);
```

---

[<- JavaScript](js-quick.md)
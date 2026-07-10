[<- JavaScript](js-quick.md)

# JavaScript common functions and use cases

# Array methods
JavaScript provides a rich set of array methods for common operations like searching, transforming, sorting, and more. Here are some of the most widely used array methods with brief descriptions and examples:

### 1. **`Array.push(element)`**
- Adds one or more elements to the end of an array and returns the new length of the array.
   
```javascript
const arr = [1, 2];
arr.push(3);
console.log(arr); 
// Output: [1, 2, 3]
```

### 2. **`Array.pop()`**
- Removes the last element from an array and returns that element.
   
```javascript
const arr = [1, 2, 3];
const lastElement = arr.pop();
console.log(lastElement); 
// Output: 3
console.log(arr); 
// Output: [1, 2]
```

### 3. **`Array.unshift(element)`**
- Adds one or more elements to the beginning of an array and returns the new length.
   
```javascript
const arr = [2, 3];
arr.unshift(1);
console.log(arr); 
// Output: [1, 2, 3]
```

### 4. **`Array.shift()`**
- Removes the first element from an array and returns that element.
   
```javascript
const arr = [1, 2, 3];
const firstElement = arr.shift();
console.log(firstElement); 
// Output: 1
console.log(arr); 
// Output: [2, 3]
```

### 5. **`Array.concat(array)`**
- Merges two or more arrays and returns a new array.
   
```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2);
console.log(combined);
// Output: [1, 2, 3, 4]

// Using spread operator or array destructuring
const combined = [...arr1, ...arr2];
console.log(combined);
// Output: [1, 2, 3, 4]

// Combining multiple arrays
const arr3 = [5, 6];
const combined = arr1.concat(arr2, arr3); 
// Output: [1, 2, 3, 4, 5, 6]

// Combining arrays with additional elements using spread operator
const combined = [...arr1, 3, 4, ...arr3]; 
// Output: [1, 2, 3, 4, 5, 6]
```

### 6. **`Array.slice(start, end)`**
- Returns a shallow copy of a portion of an array from `start` up to, but not including, `end`.
   
```javascript
const arr = [1, 2, 3, 4, 5];
const sliced = arr.slice(1, 4);
console.log(sliced); 
// Output: [2, 3, 4]
```

### 7. **`Array.splice(start, deleteCount, ...items)`**
- Changes an array by removing or replacing existing elements and/or adding new elements in place.
   
```javascript
// remove 1 element starting from index 1
const arr = [1, 2, 3, 4];
arr.splice(1, 1); // removes '2'
console.log(arr);
// Output: [1, 3, 4]

// replace 2 elements starting from index 1 with 'a' and 'b'
const arr = [1, 2, 3, 4];
arr.splice(1, 2, 'a', 'b'); // removes '2' and '3', adds 'a' and 'b'
console.log(arr); 
// Output: [1, 'a', 'b', 4]
```

### 8. **`Array.forEach(callback)`**
- Executes a provided function once for each array element. Does not return a new array.
   
```javascript
const arr = [1, 2, 3];
arr.forEach(element => console.log(element * 2));
// Output: 2, 4, 6
```

### 9. **`Array.map(callback)`**
- Creates a new array with the results of calling a function on every element in the array.
   
```javascript
const arr = [1, 2, 3];
const doubled = arr.map(num => num * 2);
console.log(doubled); 
// Output: [2, 4, 6]
```

### 10. **`Array.filter(callback)`**
- Creates a new array with all elements that pass the test implemented by the provided function.
   
```javascript
const arr = [1, 2, 3, 4];
const evens = arr.filter(num => num % 2 === 0);
console.log(evens); 
// Output: [2, 4]
```

### 11. **`Array.reduce(callback, initialValue)`**
- Reduces an array to a single value by executing a reducer function on each element.
   
```javascript
const arr = [1, 2, 3, 4];
const sum = arr.reduce((acc, num) => acc + num, 0);
console.log(sum); 
// Output: 10
```

### 12. **`Array.find(callback)`**
- Returns the first element in the array that satisfies the provided testing function.
   
```javascript
const arr = [1, 2, 3, 4];
const found = arr.find(num => num > 2);
console.log(found); 
// Output: 3
```

### 13. **`Array.findIndex(callback)`**
- Returns the index of the first element that satisfies the testing function, or -1 if no element is found.
   
```javascript
const arr = [1, 2, 3, 4];
const index = arr.findIndex(num => num > 2);
console.log(index); 
// Output: 2
```

### 14. **`Array.includes(element)`**
- Determines whether an array includes a certain value, returning `true` or `false`.
   
```javascript
const arr = [1, 2, 3];
console.log(arr.includes(2)); 
// Output: true
```

### 15. **`Array.some(callback)`**
- Tests whether at least one element in the array passes the provided function, returning a boolean.
   
```javascript
const arr = [1, 2, 3];
console.log(arr.some(num => num > 2)); 
// Output: true
```

### 16. **`Array.every(callback)`**
- Tests whether all elements in the array pass the test provided by the function.
   
```javascript
const arr = [1, 2, 3];
console.log(arr.every(num => num > 0)); 
// Output: true
```

### 17. **`Array.sort(compareFunction)`**
- Sorts the elements of an array in place and returns the sorted array.
   
```javascript
const arr = [3, 1, 4, 1, 2];
arr.sort((a, b) => a - b); // ascending order
console.log(arr); 
// Output: [1, 1, 2, 3, 4]
arr.sort((a, b) => b - a); // descending order
console.log(arr);
// Output: [4, 3, 2, 1, 1]
```

### 18. **`Array.reverse()`**
- Reverses the order of elements in an array in place.
   
```javascript
const arr = [1, 2, 5, 3];
arr.reverse();
console.log(arr); 
// Output: [3, 5, 2, 1]
```

### 19. **`Array.join(separator)`**
- Joins all elements of an array into a string, separated by the specified separator.
   
```javascript
const arr = ['Hello', 'world'];
console.log(arr.join(' ')); 
// Output: 'Hello world'
```

### 20. **`Array.flat(depth)`**
- Flattens nested arrays by the specified depth into a single array.
   
```javascript
const arr = [1, [2, [3, [4]]]];
console.log(arr.flat(2)); 
// Output: [1, 2, 3, [4]]
```

# Array methods with examples

## Array.map()

The `Array.map()` method in JavaScript is used to create a new array by applying a function to each element of an existing array. This method is especially useful for transforming data without altering the original array. Here are some practical use cases with examples:

### 1. **Extracting Specific Property from an Array of Objects**

If you have an array of objects and want only one property from each object, `map` can extract that into a new array.

```javascript
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];

// Get an array of just names
const names = users.map(user => user.name);
console.log(names); 
// Output: ['Alice', 'Bob', 'Charlie']
```

### 2. **Appending or Modifying Object Properties**

You might have an array of user data and want to add or update a property for each object.

```javascript
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];

// Add a new property "isAdult" based on age
const updatedUsers = users.map(user => ({
  ...user,
  isAdult: user.age >= 18
}));
console.log(updatedUsers); 
// Output: [ { name: 'Alice', age: 25, isAdult: true }, ... ]
```

### 3. **Generating Unique Identifiers**

If you want to add unique identifiers to each item in an array, `map` can help.

```javascript
const items = ['Apple', 'Banana', 'Cherry'];

// Generate unique identifiers
const itemsWithIds = items.map((item, index) => ({ id: index + 1, name: item }));
console.log(itemsWithIds); 
// Output: [ { id: 1, name: 'Apple' }, { id: 2, name: 'Banana' }, { id: 3, name: 'Cherry' } ]
```

### 4. **Formatting Strings (e.g., Capitalizing)**

Suppose you have an array of strings and want to capitalize each word.

```javascript
const words = ['hello', 'world', 'javascript'];

// Capitalize each word
const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
console.log(capitalizedWords); 
// Output: ['Hello', 'World', 'Javascript']
```

### 5. **Calculating Age from Birth Year**

If you have an array of birth years, `map` can calculate the age based on the current year.

```javascript
const birthYears = [1990, 1985, 2000, 1995];

// Calculate current age
const ages = birthYears.map(year => new Date().getFullYear() - year);
console.log(ages); 
// Output: [34, 39, 24, 29] (assuming the current year is 2024)
```

Each of these examples illustrates how versatile `Array.map()` is for transforming data, extracting properties, and formatting content in a concise way.

## Array.reduce()

The `Array.reduce()` function is a powerful tool in JavaScript for transforming arrays into a single value, which can be a number, object, string, or even a new array. Here are some practical use cases and examples of how to use `reduce()` effectively.

### 1. **Sum & Avg of Array Elements**
You can use `reduce()` to find the sum of all numbers in an array.

```javascript
const numbers = [10, 20, 30, 40];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
const avg = sum / numbers.length;

console.log(sum, avg); // Output: 100, 25
```

### 2. **Flattening an Array of Arrays**
If you have an array of arrays, `reduce()` can flatten it into a single array.

```javascript
const nestedArray = [[1, 2], [3, 4], [5, 6]];
const flattenedArray = nestedArray.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]
```

### 3. **Counting Occurrences of Array Elements**
`reduce()` can help you count how many times each element appears in an array.

```javascript
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const fruitCount = fruits.reduce((accumulator, fruit) => {
  accumulator[fruit] = (accumulator[fruit] || 0) + 1;
  return accumulator;
}, {});

console.log(fruitCount); // Output: { apple: 3, banana: 2, orange: 1 }
```

### 4. **Grouping Objects by a Property**
You can use `reduce()` to group an array of objects by a specific property.

```javascript
const people = [
  { name: "Alice", age: 21 },
  { name: "Bob", age: 21 },
  { name: "Charlie", age: 23 },
];

const groupedByAge = people.reduce((accumulator, person) => {
  const age = person.age;
  if (!accumulator[age]) {
    accumulator[age] = [];
  }
  accumulator[age].push(person);
  return accumulator;
}, {});

console.log(groupedByAge);
// Output:
// {
//   "21": [{ name: "Alice", age: 21 }, { name: "Bob", age: 21 }],
//   "23": [{ name: "Charlie", age: 23 }]
// }
```

### 5. **Finding Maximum and Minimum Values**
You can use `reduce()` to find the maximum or minimum value in an array.

```javascript
const numbers = [10, 5, 20, 30, 15];
const max = numbers.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue), -Infinity);
const min = numbers.reduce((accumulator, currentValue) => Math.min(accumulator, currentValue), Infinity);

console.log(max, min); // Output: 30 5
```

### 6. **Transforming an Array into an Object**
If you have an array of key-value pairs, `reduce()` can convert it into an object.

```javascript
const keyValuePairs = [["name", "Alice"], ["age", 25], ["city", "Wonderland"]];
const obj = keyValuePairs.reduce((accumulator, [key, value]) => {
  accumulator[key] = value;
  return accumulator;
}, {});

console.log(obj); // Output: { name: "Alice", age: 25, city: "Wonderland" }
```

### 7. **Removing Duplicates from an Array**
`reduce()` can help you remove duplicates by checking if the element has already been added.

```javascript
const array = [1, 2, 3, 4, 4, 5, 1];
const uniqueArray = array.reduce((accumulator, currentValue) => {
  if (!accumulator.includes(currentValue)) {
    accumulator.push(currentValue);
  }
  return accumulator;
}, []);

console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
```

### 8. **Calculating the Average**
You can calculate the average of an array of numbers by using `reduce()`.

```javascript
const numbers = [10, 20, 30, 40, 50];
const average = numbers.reduce((accumulator, currentValue, _, array) => accumulator + currentValue / array.length, 0);

console.log(average); // Output: 30
```

### 9. **Building a Dictionary from an Array of Objects**
You can use `reduce()` to create an object where each key is derived from a property of each array element.

```javascript
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const userDictionary = users.reduce((accumulator, user) => {
  accumulator[user.id] = user.name;
  return accumulator;
}, {});

console.log(userDictionary); // Output: { 1: "Alice", 2: "Bob", 3: "Charlie" }
```

### 10. **Transforming Data Structures**
Using `reduce()` to transform arrays into other types of data structures.

#### Example: Array to Map
```javascript
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const userMap = users.reduce((accumulator, user) => {
  accumulator.set(user.id, user.name);
  return accumulator;
}, new Map());

console.log(userMap); // Output: Map { 1 => "Alice", 2 => "Bob", 3 => "Charlie" }
```

### 11. **Checking balanced parentheses**

You can use `reduce()` to check if a string of parentheses is balanced.

```javascript
const isBalanced = (str) => {
  return !str.split("").reduce((acc, char) => {
    if (acc < 0) return acc;
    if (char === "(") return ++acc;
    if (char === ")") return --acc;
    return acc;
  }, 0);
};

const str1 = "((()))";
console.log(isBalanced(str1)); // Output: true
const str2 = "(()))";
console.log(isBalanced(str2)); // Output: false
```

These use cases demonstrate how versatile `reduce()` can be for various transformations and calculations in JavaScript. The `reduce()` method is especially useful when working with arrays of data in complex data processing tasks.

---

[<- JavaScript](js-quick.md)

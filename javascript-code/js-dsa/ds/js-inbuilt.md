[<- JS DSA](../README.md)

# Inbuilt Data Structures
1. Array
2. Object
3. Set
4. Map
5. WeakSet
6. WeakMap

# In built Data Structures in JavaScript

## 1. Array
An array is an ordered collection of elements. Elements in an array are indexed, starting from 0. Arrays can hold values of any data type, including numbers, strings, objects, or even other arrays.

```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // Output: "apple"
```

### Operations: 
  - Add/Modify: `push()`, `unshift()`
  - Access: `array[index]`
  - Remove: `pop()`, `shift()`, `splice()`
  - Size: `array.length`
  - Check: `Array.isArray(array)`
  - Iterate: `forEach()`, `map()`, `filter()`
  - Searching: `indexOf()`, `includes()`

## 2. Object
Objects store data as key-value pairs. Each property (or key) in an object is associated with a value.

```javascript
let person = {
  name: "John",
  age: 30,
  occupation: "developer"
};
console.log(person.name); // Output: "John"
```

### Operations:
  - Add/Modify: `object.key = value`
  - Access: `object.key` or `object["key"]`
  - Remove: `delete object.key`
  - Size: `Object.keys(object).length`
  - Check: `object.hasOwnProperty(key)`
  - Iterate: `for..in`, `Object.keys()`, `Object.values()`, `Object.entries()`

## 3. Set
A `Set` is a collection of unique values. It does not allow duplicates, and elements are stored in insertion order.

```javascript
let mySet = new Set([1, 2, 3, 4, 4]);
console.log(mySet); // Output: Set(4) { 1, 2, 3, 4 }

const mySet1 = new Set();

mySet1.add(1); // Set(1) { 1 }
mySet1.add(5); // Set(2) { 1, 5 }
mySet1.add(5); // Set(2) { 1, 5 }
mySet1.add("some text"); // Set(3) { 1, 5, 'some text' }
const o = { a: 1, b: 2 };
mySet1.add(o);
mySet1.add({ a: 1, b: 2 }); // o is referencing a different object, so this is okay
mySet1.has(1); // true
mySet1.has(3); // false, since 3 has not been added to the set
mySet1.has(5); // true
mySet1.has(Math.sqrt(25)); // true
mySet1.has("Some Text".toLowerCase()); // true
mySet1.has(o); // true
mySet1.size; // 5
mySet1.delete(5); // removes 5 from the set
mySet1.has(5); // false, 5 has been removed
mySet1.size; // 4, since we just removed one value
mySet1.add(5); // Set(5) { 1, 'some text', {...}, {...}, 5 } - a previously deleted item will be added as a new item, it will not retain its original position before deletion
console.log(mySet1); // Set(5) { 1, "some text", {…}, {…}, 5 }
```

### Operations:
  - Add/Modify: `set.add(value)`
  - Access: `set.get(value)`
  - Remove: `set.delete(value)`
  - Size: `set.size`
  - Check: `set.has(value)`
  - Iterate: `for..of`, `set.forEach()`

## 4. Map
A `Map` is a collection of key-value pairs where keys can be of any type (not just strings or symbols like in objects).

```javascript
let myMap = new Map();
myMap.set('name', 'Alice');
myMap.set(1, 'numberKey');
console.log(myMap.get('name')); // Output: "Alice"

const map1 = new Map();
map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);
console.log(map1.get('a'));
// Expected output: 1

map1.set('a', 97);
console.log(map1.get('a'));
// Expected output: 97

console.log(map1.size);
// Expected output: 3

map1.delete('b');
console.log(map1.size);
// Expected output: 2
```

### Operations:
  - Add/Modify: `map.set(key, value)`
  - Access: `map.get(key)`
  - Remove: `map.delete(key)`
  - Size: `map.size`
  - Check: `map.has(key)`
  - Iterate: `for..of`, `map.forEach()`

## 5. WeakSet
A `WeakSet` is similar to a `Set`, but it only holds objects, and these objects can be garbage collected.

```javascript
let weakSet = new WeakSet();
let obj1 = {};
weakSet.add(obj1); // WeakSet {Object {}}
weakSet.has(obj1); // true
weakSet.delete(obj1); // true
weakSet.has(obj1); // false
```

### Operations:
  - Add/Modify: `weakSet.add(object)`
  - Access: `weakSet.get(object)`
  - Remove: `weakSet.delete(object)`
  - Check: `weakSet.has(object)`

## 6. WeakMap
A `WeakMap` is similar to a `Map`, but its keys must be objects, and it allows for garbage collection of those keys. This is useful for managing memory.

```javascript
let weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, 'value');
weakMap.get(obj); // "value"
weakMap.has(obj); // true
weakMap.delete(obj); // true
weakMap.has(obj); // false
```

### Operations:
  - Add/Modify: `weakMap.set(obj, value)`
  - Access: `weakMap.get(obj)`
  - Remove: `weakMap.delete(obj)`
  - Check: `weakMap.has(obj)`

---

# WeakSet & WeakMap in detail

### **WeakMaps and WeakSets in JavaScript**

WeakMaps and WeakSets are special types of collections in JavaScript that provide unique functionality for handling objects. Here's a detailed explanation of each:

---

### **1. WeakMap**

#### **Definition**
A `WeakMap` is a collection of key-value pairs where:
- **Keys** must be objects.
- **Values** can be any type.
- References to keys are held weakly, meaning they do not prevent garbage collection if there are no other references to the key object.

#### **Key Characteristics**
1. **Weak References**: If the object used as a key is no longer reachable, it can be garbage-collected, even if it’s still a key in a `WeakMap`.
2. **No Iteration**: You cannot iterate over a `WeakMap` or retrieve its size because the keys may be garbage-collected at any time.
3. **Use Case**: Typically used for managing private data or caching.

---

#### **Practical Use Case**

##### Example: Associating private data with objects
You can use `WeakMap` to attach private data to objects without the risk of memory leaks.

```javascript
const privateData = new WeakMap();

class User {
  constructor(name, secret) {
    this.name = name;
    privateData.set(this, { secret });
  }

  getSecret() {
    return privateData.get(this).secret;
  }
}

const user1 = new User("Alice", "I love chocolate");
console.log(user1.getSecret()); // "I love chocolate"

// After user1 is no longer referenced, its entry in privateData will be garbage-collected
```

---

### **2. WeakSet**

#### **Definition**
A `WeakSet` is a collection of objects where:
- Only objects can be added as elements.
- Objects are held weakly, meaning they can be garbage-collected if there are no other references.

#### **Key Characteristics**
1. **Weak References**: Objects in a `WeakSet` do not prevent garbage collection.
2. **No Iteration**: Similar to `WeakMap`, a `WeakSet` does not support iteration or retrieval of its size.
3. **Use Case**: Useful for tracking objects without preventing their garbage collection.

---

#### **Practical Use Case**

##### Example: Tracking objects for specific operations
You can use `WeakSet` to track objects that are "processed" or need special handling.

```javascript
const processedObjects = new WeakSet();

function process(obj) {
  if (processedObjects.has(obj)) {
    console.log("Object has already been processed");
  } else {
    console.log("Processing object...");
    processedObjects.add(obj);
    // Perform some operation
  }
}

let obj1 = { name: "Object1" };
let obj2 = { name: "Object2" };

process(obj1); // "Processing object..."
process(obj1); // "Object has already been processed"
process(obj2); // "Processing object..."

// After obj1 and obj2 are no longer referenced, they will be garbage-collected
```

---

### **Key Differences Between WeakMap and WeakSet**
| Feature                | WeakMap                                  | WeakSet                            |
| ---------------------- | ---------------------------------------- | ---------------------------------- |
| **Keys/Elements**      | Keys must be objects, values can be any. | Only objects can be elements.      |
| **Garbage Collection** | Keys are weakly held.                    | Elements are weakly held.          |
| **Iteration**          | Not iterable.                            | Not iterable.                      |
| **Use Case**           | Storing private data or caching.         | Tracking object presence or state. |

---

### **When to Use WeakMap and WeakSet**
1. **WeakMap**:
   - When associating metadata or private data with objects.
   - Implementing caching for expensive computations or DOM elements.

2. **WeakSet**:
   - When tracking objects for operations like deduplication or marking.

---

### **Comparison with Map and Set**
- **Maps and Sets** keep strong references to keys/elements and are iterable.
- **WeakMaps and WeakSets** are designed for memory-sensitive use cases where automatic cleanup is required.

Understanding these distinctions can help you write memory-efficient JavaScript code!

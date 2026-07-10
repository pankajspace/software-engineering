[<- JavaScript](js-quick.md)

# JavaScript common functions and use cases

# Object methods
In JavaScript, objects have a wide range of built-in methods for working with their properties, values, and prototypes. Here’s a list of the most widely used JavaScript object methods with brief descriptions:

### 1. **`Object.keys(obj)`**
- Returns an array of the object's property names (keys).
- Useful for iterating over properties.

```javascript
const user = { name: 'Alice', age: 25 };
console.log(Object.keys(user)); 
// Output: ['name', 'age']
```

### 2. **`Object.values(obj)`**
- Returns an array of the object's values.
- Great for quickly accessing all values in an object.

```javascript
const user = { name: 'Alice', age: 25 };
console.log(Object.values(user)); 
// Output: ['Alice', 25]
```

### 3. **`Object.entries(obj)`**
- Returns an array of `[key, value]` pairs.
- Useful for looping through key-value pairs.

```javascript
const user = { name: 'Alice', age: 25 };
console.log(Object.entries(user)); 
// Output: [['name', 'Alice'], ['age', 25]]
```

### 4. **`Object.assign(target, ...sources)`**
- Copies properties from one or more source objects to a target object.
- Commonly used for shallow copying or merging objects.

```javascript
const target = { a: 1 };
const source = { b: 2, c: 3 };
const result = Object.assign(target, source);
console.log(result); 
// Output: { a: 1, b: 2, c: 3 }
```

### 5. **`Object.freeze(obj)`**
- Freezes an object, making it immutable (prevents adding, removing, or changing properties).
- Commonly used to create constant objects.

```javascript
const config = { apiUrl: 'https://api.example.com' };
Object.freeze(config);
config.apiUrl = 'https://new-url.com'; // No effect
console.log(config.apiUrl); 
// Output: 'https://api.example.com'
```

### 6. **`Object.seal(obj)`**
- Seals an object, allowing modification of existing properties but preventing new properties from being added or removed.
- Useful for partial immutability.

```javascript
const user = { name: 'Alice' };
Object.seal(user);
user.age = 30; // Cannot add new properties
user.name = 'Bob'; // Existing properties can still be modified
console.log(user); 
// Output: { name: 'Bob' }
```

### 7. **`Object.create(proto, propertiesObject)`**
- Creates a new object with the specified prototype and optional properties.
- Useful for creating objects with a specific prototype chain.

```javascript
const proto = { greet() { return 'Hello'; } };
const obj = Object.create(proto);
console.log(obj.greet()); 
// Output: 'Hello'
```

### 8. **`Object.fromEntries(iterable)`**
- Converts an iterable of key-value pairs into an object.
- Useful for transforming `Map` structures or converting arrays to objects.

```javascript
const entries = [['name', 'Alice'], ['age', 25]];
const obj = Object.fromEntries(entries);
console.log(obj); 
// Output: { name: 'Alice', age: 25 }
```

### 9. **`Object.hasOwn(obj, property)`**
- Checks if an object has a specific property as its own (not inherited).
- Safer alternative to `hasOwnProperty`.

```javascript
const user = { name: 'Alice' };
console.log(Object.hasOwn(user, 'name')); 
// Output: true
console.log(Object.hasOwn(user, 'age')); 
// Output: false
```

### 10. **`Object.getPrototypeOf(obj)`**
- Returns the prototype of an object.
- Often used in combination with prototype-based inheritance.

```javascript
const obj = {};
console.log(Object.getPrototypeOf(obj) === Object.prototype); 
// Output: true
```

### 11. **`Object.setPrototypeOf(obj, prototype)`**
- Sets the prototype of an object.
- Can be used to dynamically change an object's prototype.

```javascript
const animal = { eats: true };
const dog = {};
Object.setPrototypeOf(dog, animal);
console.log(dog.eats); 
// Output: true
```

### 12. **`Object.is(value1, value2)`**
- Determines if two values are the same value (similar to `===`, but more accurate for edge cases).
- Useful for checking `NaN` and `-0` values.

```javascript
console.log(Object.is(NaN, NaN)); 
// Output: true
console.log(Object.is(0, -0)); 
// Output: false
```

### 13. **`Object.getOwnPropertyNames(obj)`**
- Returns an array of all properties (enumerable or not) found directly on an object.
- Useful for inspecting all properties of an object, including non-enumerable ones.

```javascript
const obj = { a: 1 };
Object.defineProperty(obj, 'b', { value: 2, enumerable: false });
console.log(Object.getOwnPropertyNames(obj)); 
// Output: ['a', 'b']
```

### 14. **`Object.getOwnPropertyDescriptor(obj, prop)`**
- Returns the property descriptor for a specific property.
- Often used to inspect property attributes like `writable`, `configurable`, and `enumerable`.

```javascript
const obj = { a: 1 };
const descriptor = Object.getOwnPropertyDescriptor(obj, 'a');
console.log(descriptor);
// Output: { value: 1, writable: true, enumerable: true, configurable: true }
```

### 15. **`Object.defineProperty(obj, prop, descriptor)`**
- Defines or modifies a property on an object with a specific descriptor.
- Useful for creating or altering properties with custom attributes (e.g., `writable`, `enumerable`).

```javascript
const obj = {};
Object.defineProperty(obj, 'a', { value: 1, writable: false });
obj.a = 2; // No effect, as writable is set to false
console.log(obj.a); 
// Output: 1
```

### 16. **`Object.defineProperties(obj, props)`**
- Defines multiple properties on an object at once.
- Useful for initializing objects with several custom properties.

```javascript
const obj = {};
Object.defineProperties(obj, {
 a: { value: 1, writable: true },
 b: { value: 2, writable: false }
});
console.log(obj); 
// Output: { a: 1, b: 2 }
```

# Object methods with examples

## Object.assign()

The `Object.assign()` function in JavaScript is used to copy properties from one or more source objects to a target object. It can be useful in many scenarios, from merging objects to creating shallow copies. Here are several use cases and examples for `Object.assign()`:

### 1. **Merging Objects**
One of the most common uses of `Object.assign()` is to merge multiple objects into one.

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const mergedObj = Object.assign({}, obj1, obj2);

console.log(mergedObj); // Output: { a: 1, b: 3, c: 4 }
```

**Note**: Properties from later objects (like `obj2`) will overwrite properties with the same key in earlier objects.

### 2. **Creating a Shallow Copy of an Object**
`Object.assign()` can create a shallow copy of an object, meaning that nested objects will not be deeply copied (only references to nested objects are copied).

```javascript
const original = { name: "Alice", details: { age: 25, city: "Wonderland" } };
const copy = Object.assign({}, original);

console.log(copy); // Output: { name: "Alice", details: { age: 25, city: "Wonderland" } }

// Modify the nested object
copy.details.age = 26;
console.log(original.details.age); // Output: 26, demonstrating a shallow copy
```

### 3. **Cloning with Additional Properties**
You can clone an object and add new properties or override existing properties in one step.

```javascript
const person = { name: "Alice", age: 25 };
const updatedPerson = Object.assign({}, person, { age: 26, city: "Wonderland" });

console.log(updatedPerson); // Output: { name: "Alice", age: 26, city: "Wonderland" }
```

### 4. **Setting Default Values**
`Object.assign()` is useful for setting default values, especially in functions. You can merge a default options object with user-defined options.

```javascript
function createUser(options) {
  const defaultOptions = { role: "user", isActive: true };
  const userOptions = Object.assign({}, defaultOptions, options);
  return userOptions;
}

console.log(createUser({ name: "Alice", role: "admin" }));
// Output: { role: "admin", isActive: true, name: "Alice" }
```

### 5. **Adding Properties to an Existing Object**
`Object.assign()` can add properties to an existing object without creating a new one.

```javascript
const obj = { a: 1 };
Object.assign(obj, { b: 2, c: 3 });

console.log(obj); // Output: { a: 1, b: 2, c: 3 }
```

### 6. **Converting an Array to an Object**
You can use `Object.assign()` to convert an array to an object, where the array indices become the keys.

```javascript
const arr = ["apple", "banana", "cherry"];
const obj = Object.assign({}, arr);

console.log(obj); // Output: { "0": "apple", "1": "banana", "2": "cherry" }
```

### 7. **Creating Immutable Objects**
While `Object.assign()` itself does not create deeply immutable objects, it can help in creating shallowly immutable objects by freezing the resulting object.

```javascript
const obj = Object.assign({}, { name: "Alice", age: 25 });
Object.freeze(obj);

try {
  obj.age = 26; // This will not change the age property as the object is frozen
} catch (e) {
  console.log(e); // TypeError: Cannot assign to read-only property 'age'...
}

console.log(obj); // Output: { name: "Alice", age: 25 }

// unfreeze the object
Object.assign(obj, { age: 26 });
console.log(obj); // Output: { name: "Alice", age: 26 }
```

### 8. **Copying Symbol Properties**
`Object.assign()` copies not only string-keyed properties but also symbol-keyed properties from source objects.

```javascript
const sym = Symbol("id");
const obj1 = { [sym]: 123, name: "Alice" };
const obj2 = Object.assign({}, obj1);

console.log(obj2[sym]); // Output: 123
console.log(obj2.name); // Output: "Alice"
```

### 9. **Merging Objects with Getters/Setters**
`Object.assign()` also works with objects that have getter and setter methods.

```javascript
const source = {
  _count: 0,
  get count() {
    return this._count;
  },
  set count(value) {
    this._count = value;
  }
};

const target = {};
Object.assign(target, source);

target.count = 5;
console.log(target.count); // Output: 5
```

### 10. **Copying Objects with Prototypes**
You can use `Object.assign()` to copy properties to an object created with a specific prototype.

```javascript
const proto = { greet() { return "Hello"; } };
const obj = Object.assign(Object.create(proto), { name: "Alice" });

console.log(obj.name); // Output: Alice
console.log(obj.greet()); // Output: Hello
```

---

[<- JavaScript](js-quick.md)

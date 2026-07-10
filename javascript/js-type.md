[<- JavaScript](js-quick.md)

# JavaScript Data Types: Comprehensive Guide with Examples

JavaScript has a variety of **data types**, which are broadly classified into two categories: **Primitive Types** and **Reference Types (Objects)**. Here, we’ll explore each data type in detail with examples.

## **Primitive Data Types**

Primitive types represent a single value and are **immutable**, meaning their values cannot be altered after creation. There are 7 primitive data types:

1. **Number**
2. **String**
3. **Boolean**
4. **Null**
5. **Undefined**
6. **Symbol**
7. **BigInt**

### 1. **Number**

The `Number` type in JavaScript includes both **integers** and **floating-point numbers** (decimals). JavaScript uses **64-bit floating-point representation**, which means all numbers, whether whole or fractional, are stored the same way.

#### Example: Working with Numbers

```javascript
let integer = 42;
let float = 3.14;
let negative = -5;

console.log(integer);  // 42
console.log(float);    // 3.14
console.log(negative); // -5
```

#### Special Numeric Values:
- **`Infinity`**: A value that represents numbers that exceed the largest possible number.
- **`-Infinity`**: A value for numbers that are smaller than the most negative number.
- **`NaN`**: Stands for "Not-a-Number" and is used when a calculation or conversion doesn't yield a valid number.

```javascript
console.log(10 / 0);   // Infinity
console.log(-10 / 0);  // -Infinity
console.log("abc" * 10);  // NaN
```

### 2. **String**

Strings are sequences of characters (text) enclosed in single (`'`), double (`"`), or template literals (`` ` ``). Strings are **immutable**—once created, they cannot be changed, but you can create new strings based on them.

#### Example: Creating and Using Strings

```javascript
let str1 = 'Hello';
let str2 = "World";
let str3 = `Welcome, ${str1}!`;  // Template literal allows embedding expressions

console.log(str1);  // "Hello"
console.log(str2);  // "World"
console.log(str3);  // "Welcome, Hello!"
```

#### String Operations:

```javascript
let concatenated = str1 + " " + str2;  // String concatenation
console.log(concatenated);  // "Hello World"

let length = str1.length;  // String length property
console.log(length);  // 5
```

### 3. **Boolean**

Booleans represent logical values: **`true`** or **`false`**. Booleans are used in control structures and conditional logic to represent whether a condition is met or not.

#### Example: Boolean Values and Conditional Logic

```javascript
let isTrue = true;
let isFalse = false;

console.log(isTrue);   // true
console.log(isFalse);  // false

if (isTrue) {
    console.log("This will run because isTrue is true.");
}
```

### 4. **Null**

`null` represents an **intentional absence of any object value**. It is often used to indicate that a variable is empty or has no value.

#### Example: Null Usage

```javascript
let emptyValue = null;
console.log(emptyValue);  // null
```

Even though `null` represents an absence of value, it is considered an **object** in JavaScript. This is a well-known quirk:

```javascript
console.log(typeof null);  // "object" (this is a known bug in JavaScript)
```

### 5. **Undefined**

`undefined` is a special value that indicates a variable has been declared but **not assigned** a value. It is the default value of variables and function parameters that haven't been explicitly initialized.

#### Example: Undefined Variables

```javascript
let uninitializedVar;
console.log(uninitializedVar);  // undefined

function myFunc(a) {
    console.log(a);  // Will be undefined if no argument is passed
}
myFunc();  // undefined
```

### 6. **Symbol**

Introduced in **ES6**, a `Symbol` is a unique and immutable primitive value, commonly used as object property keys to ensure no name conflicts occur. Every time you create a `Symbol`, it is guaranteed to be unique, even if you provide the same description.

#### Example: Creating and Using Symbols

```javascript
let sym1 = Symbol("description");
let sym2 = Symbol("description");

console.log(sym1 === sym2);  // false (each Symbol is unique)

let obj = {};
obj[sym1] = "Value associated with sym1";
console.log(obj[sym1]);  // "Value associated with sym1"
```

### 7. **BigInt**

`BigInt` was introduced in **ES11 (ES2020)** to represent large integers that cannot be handled by the `Number` type. Numbers in JavaScript are limited to 2^53 - 1 for performance reasons. `BigInt` allows you to store and operate on numbers larger than that limit.

#### Example: Using BigInt

```javascript
let bigNumber = BigInt(123456789012345678901234567890);
let anotherBigNumber = 123456789012345678901234567890n;

console.log(bigNumber);  // 123456789012345678901234567890n
console.log(anotherBigNumber);  // 123456789012345678901234567890n
```

## **Reference Data Types (Objects)**

Reference types are **mutable** and store references to memory locations. They include **objects**, **arrays**, **functions**, and other built-in objects like **Date** and **RegExp**.

### 1. **Object**

An `Object` is a collection of key-value pairs. The keys can be strings or `Symbols`, and the values can be any data type, including other objects.

#### Example: Creating an Object

```javascript
let person = {
    name: "Alice",
    age: 30,
    isEmployed: true
};

console.log(person.name);  // "Alice"
console.log(person.age);   // 30
console.log(person.isEmployed);  // true
```

#### Adding and Modifying Object Properties:

```javascript
person.jobTitle = "Engineer";  // Add a new property
person.age = 31;               // Modify an existing property

console.log(person.jobTitle);  // "Engineer"
console.log(person.age);       // 31
```

## **Primitive vs Reference Types**

**Primitive Types** are passed by **value**, meaning the value itself is copied when assigned to a new variable or passed into a function.

#### Example: Primitive Type Assignment

```javascript
let x = 10;
let y = x;  // y is assigned a copy of x's value
y = 20;

console.log(x);  // 10 (x is unaffected by changes to y)
console.log(y);  // 20
```

**Reference Types** are passed by **reference**, meaning the reference (or memory address) is copied, not the actual value. Changes made to the reference will affect the original object.

#### Example: Reference Type Assignment

```javascript
let obj1 = { name: "John" };
let obj2 = obj1;  // obj2 points to the same object as obj1
obj2.name = "Alice";

console.log(obj1.name

);  // "Alice" (Changes to obj2 reflect on obj1)
```

---

## Summary of Data Types in JavaScript:

| Type          | Example                         | Description                                           |
| ------------- | ------------------------------- | ----------------------------------------------------- |
| **Number**    | `42`, `3.14`, `NaN`, `Infinity` | Represents numeric values (both integers and floats). |
| **String**    | `"Hello"`, `'World'`            | Represents text.                                      |
| **Boolean**   | `true`, `false`                 | Represents logical values.                            |
| **Null**      | `null`                          | Represents an intentional absence of value.           |
| **Undefined** | `undefined`                     | Represents uninitialized variables.                   |
| **Symbol**    | `Symbol("description")`         | Represents a unique and immutable value.              |
| **BigInt**    | `123n`, `BigInt(123)`           | Represents large integers beyond `Number`'s limit.    |
| **Object**    | `{ name: "Alice" }`             | Represents a collection of properties.                |

---

[<- JavaScript](js-quick.md)
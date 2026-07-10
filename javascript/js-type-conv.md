[<- JavaScript](js-quick.md)

# JavaScript Type Conversion: Comprehensive Explanation with Detailed Examples

JavaScript type conversion happens when JavaScript automatically or explicitly converts a value from one data type to another. The two types of type conversions are:

1. **Explicit Type Conversion (Type Casting)**: You manually convert one data type into another using functions.
2. **Implicit Type Conversion (Type Coercion)**: JavaScript automatically converts values when it encounters operations between incompatible types.

We’ll go into even more depth and provide more examples for each scenario.

---

## 1. **Explicit Type Conversion (Type Casting)**

Explicit conversion involves using JavaScript functions to deliberately change a data type. Let’s break it down by conversions to strings, numbers, and booleans.

### A. **Converting to a String**

You can explicitly convert values to strings using:
- `String()`
- `.toString()`

#### Example 1: Converting Numbers to Strings

```javascript
let num = 100;
let str1 = String(num);       // "100"
let str2 = num.toString();    // "100"

console.log(typeof str1);     // "string"
console.log(typeof str2);     // "string"
```

#### Example 2: Converting Booleans to Strings

```javascript
let bool = true;
let str = String(bool);      // "true"

console.log(typeof str);     // "string"
```

#### Example 3: Converting `null` and `undefined` to Strings

```javascript
let nullValue = null;
let undefinedValue = undefined;

let strFromNull = String(nullValue);          // "null"
let strFromUndefined = String(undefinedValue); // "undefined"

console.log(strFromNull);       // "null"
console.log(strFromUndefined);  // "undefined"
```

### B. **Converting to a Number**

You can explicitly convert values to numbers using:
- `Number()`
- `parseInt()` (for integers)
- `parseFloat()` (for floating-point numbers)

#### Example 1: Converting Strings to Numbers

```javascript
let str = "123";
let num = Number(str);        // 123
let intNum = parseInt(str);   // 123
let floatNum = parseFloat(str); // 123

console.log(typeof num);      // "number"
```

#### Example 2: Converting Booleans to Numbers

```javascript
let boolTrue = true;
let boolFalse = false;

let numTrue = Number(boolTrue);    // 1
let numFalse = Number(boolFalse);  // 0

console.log(numTrue);   // 1
console.log(numFalse);  // 0
```

#### Example 3: Converting `null` and `undefined` to Numbers

```javascript
let nullValue = null;
let undefinedValue = undefined;

let numFromNull = Number(nullValue);         // 0
let numFromUndefined = Number(undefinedValue); // NaN

console.log(numFromNull);         // 0
console.log(numFromUndefined);    // NaN
```

#### Example 4: Converting Non-Numeric Strings to Numbers

```javascript
let invalidNum = Number("abc");   // NaN (Not-a-Number)
let validNum = Number("123abc");  // NaN (Invalid number)

console.log(invalidNum);  // NaN
console.log(validNum);    // NaN
```

### C. **Converting to a Boolean**

You can explicitly convert values to booleans using:
- `Boolean()`

#### Example 1: Truthy and Falsy Values

In JavaScript, these values are considered **falsy**:
- `0`
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

All other values are considered **truthy**.

```javascript
let str = "";
let num = 0;
let undefinedValue = undefined;
let nullValue = null;
let nanValue = NaN;

console.log(Boolean(str));      // false
console.log(Boolean(num));      // false
console.log(Boolean(undefinedValue)); // false
console.log(Boolean(nullValue)); // false
console.log(Boolean(nanValue));  // false


let nonEmptyStr = "Hello";
let nonZeroNum = 42;

console.log(Boolean(nonEmptyStr));   // true
console.log(Boolean(nonZeroNum));    // true
```

### Summary of Explicit Type Conversion Functions

| Value            | `String()`          | `Number()` | `Boolean()` |
| ---------------- | ------------------- | ---------- | ----------- |
| `123`            | `"123"`             | `123`      | `true`      |
| `"123"`          | `"123"`             | `123`      | `true`      |
| `"123.45"`       | `"123.45"`          | `123.45`   | `true`      |
| `"abc"`          | `"abc"`             | `NaN`      | `true`      |
| `true`           | `"true"`            | `1`        | `true`      |
| `false`          | `"false"`           | `0`        | `false`     |
| `null`           | `"null"`            | `0`        | `false`     |
| `undefined`      | `"undefined"`       | `NaN`      | `false`     |
| `""` (empty str) | `""`                | `0`        | `false`     |
| `[1, 2, 3]`      | `"1,2,3"`           | `NaN`      | `true`      |
| `{a: 1}`         | `"[object Object]"` | `NaN`      | `true`      |

---

## 2. **Implicit Type Conversion (Type Coercion)**

In JavaScript, type coercion happens automatically in certain operations, such as when combining different data types or evaluating conditions. Let's explore common scenarios.

### A. **String Coercion in Concatenation**

When you use the `+` operator with a string and another type (like a number or boolean), JavaScript implicitly converts the other type to a string.

#### Example 1: Number to String Coercion

```javascript
let num = 10;
let str = "The number is ";

let result = str + num;  // "The number is 10"
console.log(result);     // "The number is 10"
typeof result;           // "string"
```

#### Example 2: Boolean to String Coercion

```javascript
let bool = true;
let str = "The value is ";

let result = str + bool;  // "The value is true"
console.log(result);      // "The value is true"
typeof result;            // "string"
```

### B. **Numeric Coercion in Arithmetic Operations**

When you perform arithmetic operations (like `-`, `*`, `/`), JavaScript tries to convert the operands to numbers.

#### Example 1: String to Number Coercion

```javascript
let str = "10";
let num = 20;

let result = str - num;   // -10 (string "10" is converted to number 10)
console.log(result);      // -10
```

#### Example 2: Non-Numeric String in Arithmetic

```javascript
let str = "abc";
let num = 20;

let result = str - num;   // NaN (string "abc" cannot be converted to number)
console.log(result);      // NaN
typeof result;            // "number" (NaN is considered a number)
```

### C. **Boolean Coercion in Logical Operations**

When JavaScript encounters a non-boolean value in logical operations (`&&`, `||`), it coerces the value to a boolean.

#### Example 1: Boolean Coercion in `if` Conditions

```javascript
let value = "Hello";
if (value) {
  console.log("Truthy value");  // Executed because non-empty string is truthy
}

value = 0;
if (value) {
  console.log("Falsy value");  // Not executed because 0 is falsy
}
```

#### Example 2: Boolean Coercion with `&&` and `||` Operators

- `&&` returns the first falsy value or the last value if all are truthy.
- `||` returns the first truthy value or the last value if all are falsy.

```javascript
let result = "Hello" && 0 && "World";   // 0 (first falsy value)
console.log(result);   // 0

result = 0 || "Hello" || "World";       // "Hello" (first truthy value)
console.log(result);   // "Hello"
```

### D. **Type Coercion in Equality Comparisons**

#### Example 1: `==` vs `===`
- `==` allows type coercion: values are converted to the same type before comparison.
- `===` checks both value and type: no type conversion takes place.

```javascript
console.log(1 == "1");   // true (string "1" is converted to number 1)
console.log(1 === "1");  // false (different types: number and string)
```

#### Example 2: Comparing Booleans and Numbers

```javascript
console.log(true == 1);   // true (true is coerced to 1)
console.log(false == 0);  // true (false is coerced to 0)
console.log(true === 1);  // false (different types: boolean and number)
```

---

## Common Scenarios of Type Coercion

### A. **Addition vs Subtraction**
Addition (`+`) can trigger string concatenation, while other operations like subtraction (`-`) perform numeric coercion.

```javascript
let result = 10 + "5";  // "105" (string concatenation)
console.log(result);    // "105"

result = 10 - "5";      // 5 (string "5" is converted to number 5)
console.log(result);    // 5
```

### B. **Falsy Values in Conditional Statements**
Falsy values like `0`, `""`, `null`, `undefined`, and `NaN` behave as `false` in conditions.

```javascript
if (0) {
    console.log("This will not run");  // 0 is falsy
}

if ("") {
    console.log("This will not run");  // Empty string is falsy
}
```

---

## Conclusion

### Key Takeaways:
1. **Explicit Conversion** involves using functions like `String()`, `Number()`, and `Boolean()`.
2. **Implicit Conversion** happens automatically in JavaScript during operations or comparisons.
3. Be cautious when using `==` because of its type coercion; prefer `===` for strict comparison.
4. JavaScript treats `0`, `""`, `null`, `undefined`, and `NaN` as **falsy** and almost everything else as **truthy**.

Understanding these conversions is critical in writing reliable JavaScript code and avoiding unexpected behavior.

---

[<- JavaScript](js-quick.md)
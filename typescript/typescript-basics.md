[<- TypeScript](ts-quick.md)

# TypeScript: All Key Concepts with Detailed Examples

TypeScript is a statically typed superset of JavaScript that adds optional static types, classes, interfaces, and more to the language. It helps developers catch errors early and make the code more maintainable. Here, we will cover the main TypeScript concepts in detail.

---

## 1. Type Annotations

In TypeScript, you can add type annotations to variables, function parameters, and return types. Type annotations make the type of a variable explicit.

Example:
```typescript
let age: number = 30;
let userName: string = "Alice";
let isStudent: boolean = false;
```

If you try to assign a value of a different type, TypeScript will throw an error.

Invalid Example:
```typescript
age = "thirty";  // Error: Type 'string' is not assignable to type 'number'
```

You can also annotate function parameters and return types:

```typescript
function greet(name: string): string {
    return `Hello, ${name}`;
}
```

---

## 2. Type Inference

TypeScript can automatically infer the type of a variable based on its initial value.

Example:
```typescript
let count = 10;  // TypeScript infers 'count' as type 'number'
count = 20;      // Valid
count = "ten";   // Error: Type 'string' is not assignable to type 'number'
```

---

## 3. Union Types

Union types allow a variable to hold more than one type of value.

Example:
```typescript
let id: number | string;
id = 101;         // Valid
id = "ABC123";    // Valid

function printId(id: number | string) {
    console.log(`ID: ${id}`);
}
```

---

## 4. Interfaces

Interfaces define the structure of an object. They specify the shape of an object by describing its properties and their types.

Example:
```typescript
interface User {
    name: string;
    age: number;
    isActive?: boolean;  // Optional property
}

const user: User = {
    name: "Bob",
    age: 25,
};
```

You can also use interfaces to enforce object types in function parameters:

```typescript
function printUserInfo(user: User): void {
    console.log(`Name: ${user.name}, Age: ${user.age}`);
}
```

---

## 5. Classes and Inheritance

Classes in TypeScript are similar to those in JavaScript, but with type checking and access modifiers.

Example:
```typescript
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    move(distance: number): void {
        console.log(`${this.name} moved ${distance} meters.`);
    }
}

class Dog extends Animal {
    bark(): void {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog("Buddy");
dog.bark();       // Woof! Woof!
dog.move(10);     // Buddy moved 10 meters.
```

Classes support inheritance, where a class can extend another class and inherit its properties and methods.

---

## 6. Access Modifiers (public, private, protected)

TypeScript provides access modifiers to control the visibility of properties and methods within a class.

- `public`: Accessible anywhere (default).
- `private`: Accessible only within the class.
- `protected`: Accessible within the class and its subclasses.

Example:
```typescript
class Person {
    public name: string;
    private age: number;
    protected isEmployee: boolean;

    constructor(name: string, age: number, isEmployee: boolean) {
        this.name = name;
        this.age = age;
        this.isEmployee = isEmployee;
    }

    public getAge(): number {
        return this.age;
    }
}

class Employee extends Person {
    constructor(name: string, age: number) {
        super(name, age, true);
    }

    getStatus(): string {
        return this.isEmployee ? `${this.name} is an employee.` : `${this.name} is not an employee.`;
    }
}

const employee = new Employee("Alice", 30);
console.log(employee.name);        // Valid (public)
console.log(employee.getAge());    // Valid (public method)
console.log(employee.isEmployee);  // Error: Property 'isEmployee' is protected
```

---

## 7. Generics

Generics allow you to write reusable code that works with different types. It enables you to create functions, classes, and interfaces that work with any data type.

Example:
```typescript
function identity<T>(value: T): T {
    return value;
}

let numberIdentity = identity<number>(10);  // Returns 10
let stringIdentity = identity<string>("Hello");  // Returns "Hello"

// Type inference
let boolIdentity = identity(true);  // TypeScript infers 'boolean' type


// Generic class
class Box<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }
}

let box = new Box<number>(10);
console.log(box.value);  // Output: 10

let box2 = new Box<string>("Hello, TypeScript!");
console.log(box2.value);  // Output: "Hello, TypeScript!"


// Generic interface
interface Pair<T, U> {
    first: T;
    second: U;
}

let pair: Pair<number, string> = { first: 1, second: "two" };
console.log(pair);  // Output: { first: 1, second: "two" }


// Generic function
function printArray<T>(arr: T[]): void {
    arr.forEach(item => console.log(item));
}

printArray<number>([1, 2, 3]);  // Output: 1, 2, 3
printArray<string>(["a", "b", "c"]);  // Output: a, b, c


// Generic constraints
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
    console.log(arg.length);
}

logLength("Hello");  // Output: 5
```

Generics are commonly used in data structures like arrays, linked lists, or stacks.

---

## 8. Enums

Enums allow you to define a set of named constants.

Example:
```typescript
enum Color {
    Red,
    Green,
    Blue
}

let favoriteColor: Color = Color.Green;
console.log(favoriteColor);  // Output: 1 (index of Green in the enum)
```

You can also assign custom values to enums:
```typescript
enum Status {
    Success = "SUCCESS",
    Failure = "FAILURE"
}

let currentStatus: Status = Status.Success;
console.log(currentStatus);  // Output: "SUCCESS"
```

---

## 9. Tuples

Tuples are arrays with a fixed number of elements where each element can have a different type.

Example:
```typescript
let user: [string, number] = ["Alice", 25];
```

Accessing tuple elements works like arrays:
```typescript
console.log(user[0]);  // Output: "Alice"
console.log(user[1]);  // Output: 25
```

---

## 10. Type Assertions

Type assertions tell the compiler to treat a value as a specific type. This is useful when TypeScript is not able to infer the correct type.

Example:
```typescript
let someValue: unknown = "Hello, TypeScript!";
let strLength: number = (someValue as string).length;
```

You can also use angle brackets syntax:
```typescript
let strLength2: number = (<string>someValue).length;
```

---

## 11. Modules

Modules allow you to split your code into multiple files and import/export code between them.

Export Example:
```typescript
// mathUtils.ts
export function add(a: number, b: number): number {
    return a + b;
}
```

Import Example:
```typescript
// app.ts
import { add } from './mathUtils';

console.log(add(5, 10));  // Output: 15
```

---

## 12. Namespaces

Namespaces provide a way to logically group related code, especially when the codebase becomes large.

Example:
```typescript
namespace Geometry {
    export function areaOfSquare(side: number): number {
        return side * side;
    }

    export function areaOfCircle(radius: number): number {
        return Math.PI * radius * radius;
    }
}

console.log(Geometry.areaOfSquare(4));  // Output: 16
console.log(Geometry.areaOfCircle(3));  // Output: 28.27
```

---

## 13. Decorators

Decorators are special declarations that can be attached to classes, methods, properties, or parameters. They are widely used in frameworks like Angular.

Example:
```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    let originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyKey} with arguments`, args);
        return originalMethod.apply(this, args);
    }
}

class Calculator {
    @log
    add(a: number, b: number): number {
        return a + b;
    }
}

const calculator = new Calculator();
calculator.add(5, 3);  // Console output: "Calling add with arguments [5, 3]"
```

---

## 14. Type Guards

Type guards are used to narrow down the type of a variable within a block of code.
Type guards are especially useful when working with union types.

Example:
```typescript
function isNumber(value: any): value is number {
    return typeof value === 'number';
}

function printValue(value: string | number): void {
    if (isNumber(value)) {
        console.log(`The number is ${value}`);
    } else {
        console.log(`The string is ${value}`);
    }
}

printValue(10);      // Output: The number is 10
printValue("Hello"); // Output: The string is Hello
```

## 15. Type Definitions

Type definitions are files that describe the types and properties of JavaScript libraries. They are used by TypeScript to provide type information for external libraries. You can install type definitions using npm packages like `@types/library-name`. For example, to install type definitions for Node.js, you can run `npm install @types/node`. This allows you to use TypeScript with third-party libraries.

Example:
```typescript
import * as fs from 'fs';

fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
```

---

## Conclusion

TypeScript offers powerful features like static typing, classes, interfaces, generics, and more to enhance the robustness of JavaScript. By leveraging these TypeScript concepts, you can write more maintainable, scalable, and bug-free code. These core concepts provide a foundation for developing large-scale applications with TypeScript.

---

# Data Types in TypeScript.
TypeScript provides a variety of data types to ensure type safety in your applications. These types can be categorized as **primitive types**, **special types**, **complex types**, and **user-defined types**.

### **1. Primitive Types**
These are the basic data types in TypeScript, similar to JavaScript.

| **Type**    | **Description**                                                    | **Example**                           |
| ----------- | ------------------------------------------------------------------ | ------------------------------------- |
| `number`    | Represents numeric values (integer, float, etc.).                  | `let age: number = 30;`               |
| `string`    | Represents text or string values.                                  | `let name: string = "John";`          |
| `boolean`   | Represents `true` or `false` values.                               | `let isActive: boolean = true;`       |
| `bigint`    | Represents integers of arbitrary precision.                        | `let bigNumber: bigint = 123456789n;` |
| `symbol`    | Represents a unique value, typically used as object property keys. | `let sym: symbol = Symbol("unique");` |
| `undefined` | Represents an uninitialized variable or absence of value.          | `let x: undefined = undefined;`       |
| `null`      | Represents the absence of a value or object.                       | `let y: null = null;`                 |

### **2. Special Types**
Special-purpose types in TypeScript.

| **Type**  | **Description**                                                                                    | **Example**                 |
| --------- | -------------------------------------------------------------------------------------------------- | --------------------------- |
| `any`     | Represents any value. Avoids type-checking, but use sparingly as it defeats TypeScript's benefits. | `let random: any = 42;`     |
| `unknown` | Similar to `any`, but safer as you must type-check before using it.                                | `let input: unknown;`       |
| `void`    | Used for functions that do not return any value.                                                   | `function log(): void {}`   |
| `never`   | Represents values that never occur (e.g., functions that throw errors or run indefinitely).        | `function fail(): never {}` |

### **3. Complex Types**
Types used to describe collections, objects, or custom structures.

| **Type**   | **Description**                                                     | **Example**                                   |
| ---------- | ------------------------------------------------------------------- | --------------------------------------------- |
| `Array`    | Represents a collection of elements of a specific type.             | `let nums: number[] = [1, 2, 3];`             |
| `Tuple`    | Represents an array with fixed-length and types for each element.   | `let pair: [string, number] = ["A", 10];`     |
| `Object`   | Represents an object with key-value pairs.                          | `let person: { name: string; age: number; };` |
| `Function` | Represents a function type with specific arguments and return type. | `let greet: (name: string) => void;`          |

### **4. Union and Intersection Types**

| **Type**       | **Description**                                                                       | **Example**                     |
| -------------- | ------------------------------------------------------------------------------------- | ------------------------------- |
| `Union`        | Combines multiple types where a variable can be any of the specified types.           | `let value: string              | number;` |
| `Intersection` | Combines multiple types into a single type that includes all properties of the types. | `type User = Person & Account;` |

### **5. Type Aliases and Interfaces**
Custom types for complex structures.

| **Type**     | **Description**                                                  | **Example**                                     |
| ------------ | ---------------------------------------------------------------- | ----------------------------------------------- |
| `Type Alias` | Defines a custom type name for a specific type or structure.     | `type ID = string                               | number;` |
| `Interface`  | Defines a contract for objects, often used for class structures. | `interface User { name: string; age: number; }` |

### **6. Enums**
Used to define named constants.

| **Type** | **Description**                                                             | **Example**                       |
| -------- | --------------------------------------------------------------------------- | --------------------------------- |
| `enum`   | Represents a collection of named constants. Can be numeric or string-based. | `enum Color { Red, Green, Blue }` |

### **7. Literal Types**
Specifies exact values as types.

| **Type**  | **Description**                           | **Example**            |
| --------- | ----------------------------------------- | ---------------------- |
| `Literal` | Restricts a variable to a specific value. | `let direction: "left" | "right";` |

### **8. Type Assertions**
Used to override inferred types.

| **Type** | **Description**                     | **Example**                                       |
| -------- | ----------------------------------- | ------------------------------------------------- |
| `as`     | Asserts a value as a specific type. | `let id: any = "123"; let userId = id as string;` |

### **9. Utility Types**
Built-in types for common operations.

| **Type**   | **Description**                                 | **Example**          |
| ---------- | ----------------------------------------------- | -------------------- |
| `Partial`  | Makes all properties in a type optional.        | `Partial<User>`      |
| `Readonly` | Makes all properties in a type readonly.        | `Readonly<User>`     |
| `Pick`     | Creates a type by picking specific properties.  | `Pick<User, "name">` |
| `Omit`     | Creates a type by omitting specific properties. | `Omit<User, "age">`  |

---

### **10. Advanced Types**
| **Type**            | **Description**                         | **Example**                 |
| ------------------- | --------------------------------------- | --------------------------- |
| `Mapped Types`      | Modifies properties of a type.          | `{ [P in keyof T]: T[P]; }` |
| `Conditional Types` | Represents conditional logic for types. | `T extends U ? X : Y;`      |

### Summary
TypeScript's rich type system ensures type safety and expressiveness, supporting simple primitives and advanced user-defined types. It helps in catching errors during development and improves code maintainability.

---

[<- TypeScript](ts-quick.md)

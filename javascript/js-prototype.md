[<- JavaScript](js-quick.md)

# JavaScript Prototype and Prototypal Inheritance
JavaScript’s approach to inheritance is based on prototypes rather than the classical class-based model found in many other languages. This means that objects in JavaScript can directly inherit properties and methods from other objects. Let’s explore this concept in depth.

---

## 1. The Prototype Concept

Every JavaScript object (except for the root object) has an internal link to another object called its **prototype**. This linkage is not directly visible in the object’s own properties but is used by the engine during property lookup. When you try to access a property on an object:

- **Step 1:** JavaScript checks if the object itself (its “own properties”) contains the property.
- **Step 2:** If not, the JavaScript engine follows the object’s internal prototype pointer (often accessible via `__proto__` or, more reliably, with `Object.getPrototypeOf`) to look for the property in the prototype.
- **Step 3:** This lookup continues along the chain until the property is found or until an object with a `null` prototype is reached.

For instance, the very top of this chain is `Object.prototype`, which is the prototype for most objects, and its prototype is `null`.

---

## 2. Prototypal Inheritance

**Prototypal inheritance** refers to the mechanism that enables an object to inherit properties and methods from another object. Unlike classical inheritance where a class defines a blueprint, prototypal inheritance uses objects as the basis for inheritance. There are several ways to create such inheritance structures:

- **Constructor Functions and the `.prototype` Property**  
- **`Object.create()` for direct object linkage**  
- **ES6 Classes which are syntactic sugar over the prototype system**

Let’s look at examples for each.

---

### Example 1: Constructor Functions and the Prototype Property

Before ES6, the typical pattern involved using constructor functions. Every function in JavaScript automatically gets a `prototype` property, which is an object that becomes the prototype for all objects created using that function with the `new` operator.

```javascript
// Define a constructor function for a generic Animal.
function Animal(name) {
  this.name = name;
}

// Add a method to Animal's prototype.
Animal.prototype.speak = function() {
  console.log(`${this.name} makes a noise.`);
};

// Define a constructor for a Dog that "inherits" from Animal.
function Dog(name) {
  // Inherit the properties from Animal.
  Animal.call(this, name);
}

// Establish inheritance: Dog's prototype is an object that inherits from Animal.prototype.
Dog.prototype = Object.create(Animal.prototype);

// Restore the constructor pointer because it now points to Animal.
Dog.prototype.constructor = Dog;

// Override the speak method for Dog.
Dog.prototype.speak = function() {
  console.log(`${this.name} barks.`);
};

// Create an instance of Dog.
const myDog = new Dog('Rex');
myDog.speak();  // Output: Rex barks.
```

**Explanation:**

- **Constructor Function:**  
  The `Animal` function sets up the property `name` for each instance.

- **Shared Methods on the Prototype:**  
  Adding `speak` to `Animal.prototype` means that all objects created with `new Animal()` (or inherited from Animal) share the same `speak` method. This is memory efficient because the function is not re-created for each object.

- **Inheritance Using `Object.create`:**  
  Setting `Dog.prototype = Object.create(Animal.prototype)` creates a new object whose prototype is `Animal.prototype`. This way, instances of `Dog` inherit properties and methods from `Animal`.

- **Resetting Constructor:**  
  Since `Dog.prototype` was replaced, its `constructor` property (which typically points back to the function that created the instance) must be reset to `Dog`.

- **Method Overriding:**  
  `Dog.prototype.speak` is defined to override the inherited method with behavior specific to dogs.

---

### Example 2: Using Object.create

`Object.create` is a more modern and straightforward way to create objects with a specific prototype without needing a constructor function.

```javascript
// Define a simple object which will act as the prototype.
const personPrototype = {
  greet() {
    console.log('Hello!');
  }
};

// Create a new object that uses personPrototype as its prototype.
const john = Object.create(personPrototype);
john.name = 'John';
john.greet();  // Output: Hello!
```

**Explanation:**

- **Prototype Object:**  
  The object `personPrototype` has a method `greet`.

- **Direct Inheritance:**  
  Calling `Object.create(personPrototype)` creates a new object (`john`) that inherits from `personPrototype`. Any properties or methods not found on `john` will be looked up on `personPrototype`.

---

### Example 3: ES6 Classes (Syntactic Sugar Over Prototypes)

ES6 introduced the `class` syntax, which makes the pattern appear more like classical inheritance. However, under the hood, the class methods are added to the prototype.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  // This method is added to Animal.prototype.
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  // The constructor of Dog can call super() to inherit properties.
  constructor(name) {
    super(name);
  }

  // Overrides the speak method.
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const myDog = new Dog('Rex');
myDog.speak();  // Output: Rex barks.
```

**Explanation:**

- **Class Declaration:**  
  The `Animal` class defines a constructor and a method `speak`. These methods are automatically placed on `Animal.prototype`.

- **Class Inheritance:**  
  The `Dog` class uses the `extends` keyword to indicate it inherits from `Animal`. Internally, JavaScript sets up the prototype chain so that `Dog.prototype` is linked to `Animal.prototype`.

- **Method Overriding:**  
  By redefining `speak()` inside `Dog`, we override the inherited method.

---

## 3. How the Prototype Chain Works

When you access a property or method on an instance, for example `myDog.speak`, JavaScript follows these steps:

1. **Own Properties:** The engine first checks if `myDog` has a direct property `speak`.
2. **Prototype Lookup:**  
   - If not found, it checks `myDog.__proto__` (which is `Dog.prototype`).  
   - If still not found, it then checks `Dog.prototype.__proto__` (which is `Animal.prototype`).
3. **End of Chain:**  
   - Finally, if the property isn’t found anywhere, JavaScript returns `undefined`.

This chain of objects linked by the internal `[[Prototype]]` is known as the **prototype chain**.

---

## 4. Key Characteristics of Prototypal Inheritance

- **Dynamic Inheritance:**  
  If you add a new method to a prototype after objects have been created, they gain access to that method immediately. For example:

  ```javascript
  Animal.prototype.sleep = function() {
    console.log(`${this.name} is sleeping.`);
  };

  myDog.sleep();  // Output: Rex is sleeping.
  ```

- **Shared vs. Own Properties:**  
  Properties defined on the prototype are shared among all instances. This is useful for methods but can be problematic for mutable properties (like arrays or objects) if not handled correctly.

- **Prototype Mutation Caution:**  
  Changing properties on the prototype affects all objects inheriting from it. Hence, use caution when modifying prototypes, especially for built-in constructors.

- **Inheritance Flexibility:**  
  Since any object can serve as a prototype for another (using `Object.create` or by setting a prototype explicitly), JavaScript allows very flexible object composition.

---

## 5. Conclusion

JavaScript’s prototype-based inheritance allows objects to share properties and methods without the overhead of defining them per instance. Whether you use constructor functions, `Object.create`, or ES6 classes, the underlying mechanism remains the same: a chain of prototypes from which objects inherit behavior. This system provides both flexibility and efficiency, making JavaScript a highly dynamic language.

Understanding prototypes and the prototype chain is fundamental to mastering JavaScript, as it demystifies property lookup and inheritance, enabling you to write cleaner, more efficient code.

---

[<- JavaScript](js-quick.md)

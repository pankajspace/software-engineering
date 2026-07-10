[<- Design Patterns](design-patterns-quick.md)

# What is the difference between the Factory pattern and the Strategy pattern?
The **Factory pattern** and the **Strategy pattern** are two distinct design patterns that serve different purposes:

## Factory Pattern

### **Purpose:**
- **Creation:**  
  The Factory pattern is a **creational pattern**. Its main goal is to create objects without specifying the exact class of the object that will be created. It abstracts and encapsulates the instantiation process.

### **Key Characteristics:**
- **Encapsulation of Object Creation:**  
  The client code calls a factory method or uses a factory class to create objects. The factory handles the decision of which concrete class to instantiate.
- **Loose Coupling:**  
  The client code remains decoupled from the specifics of object creation. It only knows about an interface or an abstract class.
- **Variations:**  
  There are variations like the Simple Factory, Factory Method, and Abstract Factory, each offering different levels of abstraction and flexibility.

### **Example Use Case:**
Imagine you have a system that works with different types of notifications (e.g., Email, SMS, Push). A factory can decide which type of notification object to create based on input parameters:

```javascript
// Define a common interface
class Notification {
  send(message) {
    throw new Error("Method 'send()' must be implemented.");
  }
}

// Concrete classes
class EmailNotification extends Notification {
  send(message) {
    console.log("Sending email:", message);
  }
}

class SMSNotification extends Notification {
  send(message) {
    console.log("Sending SMS:", message);
  }
}

// Factory Function
function notificationFactory(type) {
  if (type === 'email') {
    return new EmailNotification();
  } else if (type === 'sms') {
    return new SMSNotification();
  } else {
    throw new Error("Unknown notification type");
  }
}

// Client code
const notification = notificationFactory('email');
notification.send("Hello, World!");
```

## Strategy Pattern

### **Purpose:**
- **Behavioral Flexibility:**  
  The Strategy pattern is a **behavioral pattern**. It is used to define a family of algorithms, encapsulate each one, and make them interchangeable. This allows the algorithm or behavior to vary independently from the clients that use it.

### **Key Characteristics:**
- **Encapsulation of Algorithms:**  
  Each algorithm is defined in its own class and implements a common interface. The client can switch between different algorithms dynamically.
- **Interchangeability:**  
  Clients can choose the appropriate strategy (algorithm) at runtime without changing their code.
- **Focus on Behavior:**  
  It emphasizes how objects interact and perform certain tasks rather than how they are created.

### **Example Use Case:**
Imagine you have a sorting feature in your application. You can define different sorting strategies (e.g., Bubble Sort, Quick Sort, Merge Sort) and switch between them based on the dataset size or performance needs:

```javascript
// Define a common strategy interface
class SortStrategy {
  sort(data) {
    throw new Error("Method 'sort()' must be implemented.");
  }
}

// Concrete strategies
class BubbleSortStrategy extends SortStrategy {
  sort(data) {
    console.log("Sorting using bubble sort");
    // Implement bubble sort algorithm
    return data.sort(); // simplified for illustration
  }
}

class QuickSortStrategy extends SortStrategy {
  sort(data) {
    console.log("Sorting using quick sort");
    // Implement quick sort algorithm
    return data.sort(); // simplified for illustration
  }
}

// Context that uses a strategy
class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sortData(data) {
    return this.strategy.sort(data);
  }
}

// Client code
const data = [5, 3, 8, 1];
const sorter = new Sorter(new BubbleSortStrategy());
console.log(sorter.sortData(data));  // Uses bubble sort

// Dynamically change strategy
sorter.setStrategy(new QuickSortStrategy());
console.log(sorter.sortData(data));  // Uses quick sort
```

## Summary of Differences

- **Focus:**
  - **Factory Pattern:**  
    Focuses on object creation. It abstracts the instantiation process and allows the system to create objects without specifying the exact class.
  - **Strategy Pattern:**  
    Focuses on encapsulating and switching between algorithms or behaviors. It allows clients to choose an algorithm at runtime.

- **Pattern Category:**
  - **Factory:**  
    Creational design pattern.
  - **Strategy:**  
    Behavioral design pattern.

- **Usage Scenario:**
  - **Factory:**  
    When you need to decouple the creation of objects from their usage.
  - **Strategy:**  
    When you need to allow different behaviors or algorithms to be swapped in and out dynamically.

In short, while the **Factory pattern** is all about **how objects are created**, the **Strategy pattern** is concerned with **how objects behave or perform tasks**.

# What design pattern do you use for TypeScript?
TypeScript, being a statically typed superset of JavaScript, supports virtually all design patterns that you might use in object-oriented programming. There isn’t one "default" design pattern that you must use with TypeScript; instead, you choose patterns based on the problem you’re trying to solve. However, some design patterns are particularly popular or naturally suited for TypeScript due to its language features. Here are a few common ones:

## 1. **Module Pattern**

- **Purpose:**  
  Encapsulate code in modules, exposing only the public API while hiding implementation details.
  
- **Why TypeScript?**  
  TypeScript’s ES6 module syntax (using `import`/`export`) naturally supports the module pattern, helping you organize code into self-contained units.

- **Example:**
  ```typescript
  // mathUtils.ts
  export function add(a: number, b: number): number {
    return a + b;
  }
  export function subtract(a: number, b: number): number {
    return a - b;
  }
  ```

## 2. **Singleton Pattern**

- **Purpose:**  
  Ensure a class has only one instance and provide a global point of access to it.
  
- **Why TypeScript?**  
  With TypeScript’s support for classes and private constructors, implementing singletons is straightforward and type-safe.

- **Example:**
  ```typescript
  class Logger {
    private static instance: Logger;

    // Private constructor prevents direct instantiation
    private constructor() {}

    public static getInstance(): Logger {
      if (!Logger.instance) {
        Logger.instance = new Logger();
      }
      return Logger.instance;
    }

    public log(message: string) {
      console.log(message);
    }
  }

  // Usage
  const logger = Logger.getInstance();
  logger.log("This is a singleton logger.");
  ```

## 3. **Factory Pattern**

- **Purpose:**  
  Abstract object creation, allowing a system to instantiate objects without exposing the creation logic.
  
- **Why TypeScript?**  
  TypeScript’s interfaces and generics help in defining clear contracts for objects, making factories easier to implement and use.

- **Example:**
  ```typescript
  interface Notification {
    send(message: string): void;
  }

  class EmailNotification implements Notification {
    send(message: string): void {
      console.log(`Email sent: ${message}`);
    }
  }

  class SMSNotification implements Notification {
    send(message: string): void {
      console.log(`SMS sent: ${message}`);
    }
  }

  class NotificationFactory {
    static createNotification(type: string): Notification {
      switch (type) {
        case "email":
          return new EmailNotification();
        case "sms":
          return new SMSNotification();
        default:
          throw new Error("Unknown notification type");
      }
    }
  }

  // Usage
  const notification = NotificationFactory.createNotification("email");
  notification.send("Hello!");
  ```

## 4. **Strategy Pattern**

- **Purpose:**  
  Define a family of algorithms, encapsulate each one, and make them interchangeable at runtime.
  
- **Why TypeScript?**  
  With strong typing and interfaces, you can clearly define and enforce the contract for strategies.

- **Example:**
  ```typescript
  interface SortingStrategy {
    sort(data: number[]): number[];
  }

  class BubbleSortStrategy implements SortingStrategy {
    sort(data: number[]): number[] {
      console.log("Sorting using Bubble Sort");
      return data.sort((a, b) => a - b);
    }
  }

  class QuickSortStrategy implements SortingStrategy {
    sort(data: number[]): number[] {
      console.log("Sorting using Quick Sort");
      return data.sort((a, b) => a - b);
    }
  }

  class Sorter {
    constructor(private strategy: SortingStrategy) {}

    setStrategy(strategy: SortingStrategy) {
      this.strategy = strategy;
    }

    sortData(data: number[]): number[] {
      return this.strategy.sort(data);
    }
  }

  // Usage
  const sorter = new Sorter(new BubbleSortStrategy());
  console.log(sorter.sortData([5, 3, 8, 1]));

  sorter.setStrategy(new QuickSortStrategy());
  console.log(sorter.sortData([5, 3, 8, 1]));
  ```

## 5. **Dependency Injection (DI)**

- **Purpose:**  
  Manage and inject dependencies into classes in a decoupled way.
  
- **Why TypeScript?**  
  TypeScript’s decorators and interfaces work well with DI frameworks like **TypeDI** or **InversifyJS**, promoting cleaner, testable, and modular code.

- **Example (using InversifyJS):**
  ```typescript
  // types.ts
  const TYPES = {
    Warrior: Symbol.for("Warrior"),
    Weapon: Symbol.for("Weapon")
  };

  export default TYPES;
  ```

  ```typescript
  // interfaces.ts
  export interface Weapon {
    hit(): string;
  }

  export interface Warrior {
    fight(): string;
  }
  ```

  ```typescript
  // katana.ts
  import { injectable } from "inversify";
  import { Weapon } from "./interfaces";

  @injectable()
  export class Katana implements Weapon {
    public hit(): string {
      return "cut!";
    }
  }
  ```

  ```typescript
  // ninja.ts
  import { injectable, inject } from "inversify";
  import TYPES from "./types";
  import { Warrior, Weapon } from "./interfaces";

  @injectable()
  export class Ninja implements Warrior {
    private _weapon: Weapon;

    public constructor(@inject(TYPES.Weapon) weapon: Weapon) {
      this._weapon = weapon;
    }

    public fight(): string {
      return this._weapon.hit();
    }
  }
  ```

  ```typescript
  // inversify.config.ts
  import { Container } from "inversify";
  import TYPES from "./types";
  import { Ninja } from "./ninja";
  import { Katana } from "./katana";
  import { Warrior, Weapon } from "./interfaces";

  const container = new Container();
  container.bind<Warrior>(TYPES.Warrior).to(Ninja);
  container.bind<Weapon>(TYPES.Weapon).to(Katana);

  export default container;
  ```

  ```typescript
  // main.ts
  import container from "./inversify.config";
  import TYPES from "./types";
  import { Warrior } from "./interfaces";

  const ninja = container.get<Warrior>(TYPES.Warrior);
  console.log(ninja.fight());  // Outputs: cut!
  ```

## Conclusion

In TypeScript, you can leverage a variety of design patterns depending on your application’s requirements. Whether you choose the module pattern for organization, the singleton or factory pattern for object creation, the strategy pattern for algorithmic flexibility, or dependency injection for decoupling, TypeScript’s strong typing, classes, interfaces, and decorator support make these patterns robust and maintainable. The choice ultimately depends on your specific problem domain and design goals.

---

[<- Design Patterns](design-patterns-quick.md)

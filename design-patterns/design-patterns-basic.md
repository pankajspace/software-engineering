[<- Design Patterns](design-patterns-quick.md)

## JS Design Patterns
1. [JavaScript Design Patterns](https://www.dofactory.com/javascript/design-patterns)

### Creational Design Patterns
These patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation. Creational patterns solve this problem by somehow controlling this object creation.

1. **Singleton**: Ensures a class has only one instance and provides a global point of access to it.
2. **Factory Method**: Defines an interface for creating objects, but lets subclasses decide which class to instantiate.

### Structural Design Patterns
These patterns focus on how classes and objects are composed to form larger structures. Structural patterns ease the design by identifying a simple way to realize relationships among entities.

1. **Adapter (Wrapper)**: Allows incompatible interfaces to work together by wrapping one interface with another.
2. **Decorator**: Dynamically adds new responsibilities to objects by wrapping them without modifying their structure.

### Behavioral Design Patterns
These patterns are concerned with algorithms and the assignment of responsibilities between objects. They characterize complex control flow that's difficult to follow at run-time. Behavioral patterns shift your focus away from flow of control to let you concentrate just on the way objects are interconnected.

1. **Observer**: Defines a one-to-many dependency where observers are notified of state changes in a subject.
2. **Strategy**: Encapsulates interchangeable algorithms and allows them to be selected at runtime.


## Creational design patterns
These creational design patterns focus on ways to efficiently manage and create objects in a system. Each pattern addresses a specific problem, such as managing single instances (Singleton), abstracting object creation (Factory Method and Abstract Factory), simplifying complex constructions (Builder).

### 1. Singleton Pattern:
The Singleton pattern ensures that a class has only one instance throughout the lifetime of an application and provides a global point of access to that instance. This is useful when exactly one object is needed to manage shared resources, such as a configuration manager, logging system, or connection pool.

#### Implementation:
```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.data = "I am a Singleton!";
    Singleton.instance = this;
  }

  getData() {
    return this.data;
  }
}

// Usage
const singleton1 = new Singleton();
const singleton2 = new Singleton();

console.log(singleton1 === singleton2); // true
console.log(singleton1.getData()); // "I am a Singleton!"
console.log(singleton2.getData()); // "I am a Singleton!"
```
   
#### Key Characteristics:
- A private constructor prevents direct instantiation.
- A static method provides controlled access to the single instance.
- The instance is often created lazily (only when it is first needed).
   
#### Common Use Cases:
- Logging services
- Database connection managers
- Configuration settings across an application

### 2. Factory Method Pattern:
The Factory Method pattern defines an interface for creating objects but allows subclasses to alter the type of objects that will be created. It delegates the process of instantiation to subclasses, which can provide their own implementation of object creation.

#### Implementation:
```javascript
class Animal {
  speak() {
    throw "Subclass must implement this method!";
  }
}

class Dog extends Animal {
  speak() {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Meow!");
  }
}

class AnimalFactory {
  createAnimal(type) {
    switch (type) {
      case 'dog':
        return new Dog();
      case 'cat':
        return new Cat();
      default:
        throw new Error("Unknown animal type");
    }
  }
}

// Usage
const factory = new AnimalFactory();
const dog = factory.createAnimal('dog');
dog.speak(); // "Woof!"

const cat = factory.createAnimal('cat');
cat.speak(); // "Meow!"
```

#### Key Characteristics:
- A method in a superclass (or interface) is responsible for object creation.
- Subclasses decide which class to instantiate.
- It promotes loose coupling between client code and the actual classes being instantiated.
   
#### Common Use Cases:
- GUI frameworks to create platform-specific UI components (buttons, text fields, windows).
- Document processing systems where different types of documents (PDF, Word, Excel) need to be created.
- Game development for creating different character types (hero, enemy, NPC).


## Structural design patterns
These structural design patterns focus on how to organize and compose objects and classes to form larger systems, making them flexible, scalable, and easier to manage. Each pattern helps manage complexity by promoting loose coupling and reusable object structures.

### 1. Adapter or Wrapper Pattern:
The Adapter pattern (also known as Wrapper) allows objects with incompatible interfaces to work together. It acts as a bridge between two incompatible interfaces by converting the interface of a class into another interface that a client expects.

#### Implementation:
```javascript
// Existing class with an incompatible interface
class OldSystem {
  oldRequest() {
    console.log("Old system request");
  }
}

// New interface expected by the client
class NewSystem {
  request() {
    console.log("New system request");
  }
}

// Adapter wraps the old system to make it compatible with the new system interface
class Adapter {
  constructor(oldSystem) {
    this.oldSystem = oldSystem;
  }

  request() {
    this.oldSystem.oldRequest(); // Adapting the old interface
  }
}

// Usage
const oldSystem = new OldSystem();
const adaptedSystem = new Adapter(oldSystem);

adaptedSystem.request(); // "Old system request"
```

#### Key Characteristics:
- Converts the interface of an existing class to match the one expected by the client.
- Used when integrating legacy systems or third-party libraries that have a different interface.
- The adapter wraps the original class and translates its methods or data into a format understood by the client.

#### Common Use Cases:
- Connecting a new system to a legacy system that uses a different interface.
- Integrating third-party libraries into a system where the interface differs from the required one.
- Adapting the interface of a class to make it compatible with a system without modifying its source code.

### 2. Decorator Pattern:
The Decorator pattern allows behavior to be added to individual objects, either statically or dynamically, without affecting the behavior of other objects from the same class. It provides a flexible alternative to subclassing for extending functionality.

#### Implementation:
```javascript
class Coffee {
  cost() {
    return 5;
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 1;
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 0.5;
  }
}

// Usage
let coffee = new Coffee();
console.log(coffee.cost()); // 5

coffee = new MilkDecorator(coffee);
console.log(coffee.cost()); // 6

coffee = new SugarDecorator(coffee);
console.log(coffee.cost()); // 6.5
```

#### Key Characteristics:
- Allows you to dynamically add new responsibilities (behaviors) to an object by wrapping it in an object of the same type.
- Avoids subclassing and promotes composition over inheritance.
- Multiple decorators can be applied to an object to add multiple behaviors.

#### Common Use Cases:
- Enhancing UI components by wrapping them in decorators that add features like borders, scrollbars, or color themes.
- In a data stream, decorators can be used to add behaviors like encryption, compression, or buffering.
- In a coffee shop ordering system, decorators can be used to add ingredients (e.g., milk, sugar, whipped cream) to a base coffee order.


## Behavioral design patterns
These behavioral design patterns focus on how objects interact, communicate, and handle responsibilities in complex systems. They help streamline control flows and promote better management of object behaviors and interactions.

### 1. Observer Pattern:
The Observer pattern defines a one-to-many dependency between objects where one object (the subject) notifies all its dependents (observers) of any state changes. This pattern is often used to decouple objects in event-driven systems.

#### Implementation:
```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log(`Observer received data: ${data}`);
  }
}

// Usage
const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notifyObservers('Hello, Observers!');
// Output:
// Observer received data: Hello, Observers!
// Observer received data: Hello, Observers!
```

#### Key Characteristics:
- When the state of the subject changes, all its observers are automatically notified.
- Observers can subscribe or unsubscribe to the subject dynamically.
- Promotes loose coupling between the subject and its observers.
   
#### Common Use Cases:
- Event systems where multiple components need to react to changes (e.g., UI updates in response to data changes).
- A stock price update system where multiple clients (observers) need to be notified when the stock price changes.
- Publishing-subscribing models in messaging systems.

### 2. Strategy Pattern:
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. The algorithm can vary independently from the clients that use it.

#### Implementation:
```javascript
class Strategy {
  execute() {
    throw new Error("This method should be overridden!");
  }
}

class StrategyA extends Strategy {
  execute() {
    return "Strategy A";
  }
}

class StrategyB extends Strategy {
  execute() {
    return "Strategy B";
  }
}

class Context {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  executeStrategy() {
    return this.strategy.execute();
  }
}

// Usage
const context = new Context();

context.setStrategy(new StrategyA());
console.log(context.executeStrategy()); // Strategy A

context.setStrategy(new StrategyB());
console.log(context.executeStrategy()); // Strategy B
```

#### Key Characteristics:
- Encapsulates interchangeable algorithms within separate strategy classes.
- Allows dynamic selection of the algorithm at runtime.
- Promotes open-closed principle, as new strategies can be added without modifying existing code.
   
#### Common Use Cases:
- Sorting algorithms where different sorting strategies (quick sort, merge sort, bubble sort) can be applied dynamically.
- Payment systems that allow different payment methods (credit card, PayPal, bank transfer).
- A navigation app that allows the user to choose different routing algorithms (fastest route, scenic route, eco-friendly route).

---

[<- Design Patterns](design-patterns-quick.md)

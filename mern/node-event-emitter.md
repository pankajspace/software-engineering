[<- MERN](mern-quick.md)

## Event Emitter
1. [Events](https://nodejs.org/api/events.html)

```js
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.emit('event');
```

The eventEmitter.emit() method allows an arbitrary set of arguments to be passed to the listener functions. Keep in mind that when an ordinary listener function is called, the standard this keyword is intentionally set to reference the EventEmitter instance to which the listener is attached.
```js
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
  // Prints:
  //   a b MyEmitter {
  //     _events: [Object: null prototype] { event: [Function (anonymous)] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined,
  //     [Symbol(shapeMode)]: false,
  //     [Symbol(kCapture)]: false
  //   } true
});

myEmitter.emit('event', 'a', 'b');
```

It is possible to use ES6 Arrow Functions as listeners, however, when doing so, the this keyword will no longer reference the EventEmitter instance:
```js
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // Prints: a b {}
});
myEmitter.emit('event', 'a', 'b');
```

### Asynchronous vs. synchronous
The EventEmitter calls all listeners synchronously in the order in which they were registered. This ensures the proper sequencing of events and helps avoid race conditions and logic errors. When appropriate, listener functions can switch to an asynchronous mode of operation using the setImmediate() or process.nextTick() methods:
```js
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('this happens asynchronously');
  });
  console.log('this happens synchronously');
});

myEmitter.emit('event', 'a', 'b');
```

---

## Node Event Emitter

An **Event Emitter** is a design pattern that allows objects (or components) to communicate with one another by emitting events and having other parts of the application listen for and react to those events. This pattern is especially useful in asynchronous programming, where decoupling the sender of an event from the receiver helps keep your code modular and easier to maintain.

In Node.js, the Event Emitter pattern is implemented in the built-in [`events`](https://nodejs.org/api/events.html) module. Here's a simple example to illustrate how it works:

### Example: Using Node.js EventEmitter

```javascript
// Import the EventEmitter class from the 'events' module
const EventEmitter = require('events');

// Create a class that extends EventEmitter
class MyEmitter extends EventEmitter {}

// Instantiate the custom event emitter
const myEmitter = new MyEmitter();

// Register a listener for the 'event' event
myEmitter.on('event', () => {
  console.log('An event occurred!');
});

// Emit the 'event' event
myEmitter.emit('event');
```

### Explanation

1. **Import and Extend:**  
   We start by importing the `EventEmitter` class from Node.js's built-in `events` module. We then create our own class (`MyEmitter`) that extends `EventEmitter`. This allows our class to inherit all the event-handling capabilities.

2. **Instantiate:**  
   We create an instance of `MyEmitter`.

3. **Register a Listener:**  
   The `.on()` method is used to register a listener for a specific event—in this case, an event named `'event'`. Whenever this event is emitted, the provided callback function will be executed.

4. **Emit the Event:**  
   The `.emit()` method is used to trigger the event. When `myEmitter.emit('event')` is called, all listeners registered for the `'event'` event are invoked, and you'll see `"An event occurred!"` logged to the console.

### When to Use an Event Emitter

- **Decoupled Communication:**  
  They are ideal for scenarios where you want to decouple different parts of your application. For example, an HTTP server might emit events for different request types, and various parts of your application can listen for and handle those events.

- **Asynchronous Operations:**  
  They help manage asynchronous operations by allowing parts of your code to react when an operation completes, without needing to pass callbacks through multiple layers of function calls.

- **Modularity:**  
  Using event emitters can make your application more modular, as components communicate through well-defined events rather than direct method calls.

This simple example should give you a clear idea of what an event emitter is and how it can be used to build flexible, event-driven applications.

# Use case of the Event Emitter
An **Event Emitter** is especially useful in scenarios where you want to decouple the production of events from their consumption. This pattern enables you to create modular, maintainable code by having components communicate via events rather than direct method calls. Below are some common use cases along with an example to illustrate the concept.

## Common Use Cases

### 1. **Decoupled Communication Between Modules**

**Scenario:**  
Imagine an e-commerce application where several actions should occur when an order is placed. For instance:
- Updating the inventory.
- Sending a confirmation email.
- Logging the transaction.
- Recording analytics data.

**How It Helps:**  
Using an event emitter, the order processing module can emit an `orderPlaced` event. Each of the other modules can listen for that event and perform its specific task without being tightly coupled to the order processing code.

### 2. **Asynchronous and Non-blocking Operations**

**Scenario:**  
In a web server, you might want to log requests, process data, or update caches asynchronously. Instead of making the main request-handling logic wait for all these tasks to finish, you can emit events and let separate listeners handle these tasks in the background.

**How It Helps:**  
This makes your application more responsive and scalable by not blocking the main thread with additional processing.

### 3. **Real-Time Data and Notifications**

**Scenario:**  
In a chat application, when a new message is received, the server can emit a `messageReceived` event. Various parts of the system (e.g., message history service, notification service, or even real-time updates to connected clients) can listen to this event.

**How It Helps:**  
This design facilitates real-time updates and notifications across different parts of the system with minimal coupling.

### 4. **Centralized Error Handling and Monitoring**

**Scenario:**  
An application can emit an `errorOccurred` event whenever an error is detected. A centralized error monitoring service can listen for these events and log them, alert administrators, or even trigger auto-recovery processes.

**How It Helps:**  
This centralizes error management and decouples error detection from error handling logic.

## Example: Order Processing in an E-commerce Application

Below is an example that demonstrates using an event emitter to handle an `orderPlaced` event:

```javascript
// Import the EventEmitter class from Node.js
const EventEmitter = require('events');

// Create a custom emitter for order processing
class OrderProcessor extends EventEmitter {}

// Instantiate the order processor
const orderProcessor = new OrderProcessor();

// Listener for inventory updates
orderProcessor.on('orderPlaced', (order) => {
  console.log(`Updating inventory for order: ${order.id}`);
  // Insert inventory update logic here
});

// Listener for sending confirmation emails
orderProcessor.on('orderPlaced', (order) => {
  console.log(`Sending confirmation email for order: ${order.id}`);
  // Insert email sending logic here
});

// Listener for analytics tracking
orderProcessor.on('orderPlaced', (order) => {
  console.log(`Tracking analytics for order: ${order.id}`);
  // Insert analytics tracking logic here
});

// Function to simulate placing an order
function placeOrder(order) {
  console.log(`Placing order: ${order.id}`);
  // Order processing logic goes here (e.g., saving to database)
  
  // Emit the 'orderPlaced' event with the order data
  orderProcessor.emit('orderPlaced', order);
}

// Simulate placing an order
placeOrder({ id: '12345', item: 'Laptop', quantity: 1 });
```

### Explanation of the Example

1. **OrderProcessor Class:**  
   We create a custom class that extends `EventEmitter`. This class will handle our custom events.

2. **Registering Listeners:**  
   Three listeners are registered for the `orderPlaced` event:
   - One updates the inventory.
   - One sends out a confirmation email.
   - One tracks the order for analytics.
   
3. **Emitting the Event:**  
   When `placeOrder` is called, it simulates order processing and then emits the `orderPlaced` event. Each registered listener responds to this event independently.

4. **Decoupled and Modular:**  
   The `placeOrder` function does not need to know about the details of inventory updating, email notifications, or analytics tracking. Each responsibility is encapsulated within its own listener.

## Conclusion

The Event Emitter pattern is a powerful tool for decoupling different parts of your application. It’s particularly useful in scenarios like:

- **Multi-module communication:** Where one action triggers multiple, independent processes.
- **Asynchronous tasks:** Where you want to avoid blocking the main thread.
- **Real-time updates:** Where events need to be broadcast to multiple listeners.

By using event emitters, you create a flexible, scalable architecture where components can operate independently while still communicating effectively through events.

# Explain the lifecycle of the Event Emitter
The lifecycle of an Event Emitter isn’t a rigid, step-by-step process imposed by Node.js, but rather a conceptual flow that describes how an event emitter is used throughout its lifetime. Here’s an overview of its lifecycle:

### 1. **Instantiation**

- **Creation:**  
  The lifecycle begins when you create an instance of an Event Emitter (or a class that extends it). At this point, the internal registry of event listeners is empty.
  
  ```javascript
  const EventEmitter = require('events');
  const emitter = new EventEmitter();
  ```

- **Optional Setup:**  
  You can configure certain properties such as the maximum number of listeners to avoid potential memory leak warnings:
  
  ```javascript
  emitter.setMaxListeners(20);  // Increase max listeners if needed
  ```

### 2. **Registration of Listeners**

- **Adding Listeners:**  
  Listeners (callback functions) are registered for specific event types using methods like `.on()` (or `.addListener()`) and `.once()`.  
  - **`.on()`** registers a listener that will be called every time the event is emitted.
  - **`.once()`** registers a listener that will be invoked only the first time the event occurs and then removed automatically.
  
  ```javascript
  // Regular listener
  emitter.on('data', (payload) => {
    console.log(`Data received: ${payload}`);
  });

  // One-time listener
  emitter.once('end', () => {
    console.log('End event received. This listener will now be removed.');
  });
  ```

- **Lifecycle Hooks:**  
  Special events like `'newListener'` and `'removeListener'` can also be listened to. These events let you react whenever a new listener is added or removed.
  
  ```javascript
  emitter.on('newListener', (event, listener) => {
    console.log(`New listener added for event: ${event}`);
  });
  ```

### 3. **Event Emission**

- **Triggering Events:**  
  When an event occurs, you call `.emit()` with the event name and any necessary arguments. The emitter looks up all the listeners registered for that event and synchronously calls each one.
  
  ```javascript
  emitter.emit('data', 'Hello, World!'); // Triggers all 'data' listeners
  emitter.emit('end');                  // Triggers the one-time 'end' listener
  ```

- **Error Handling:**  
  A special case is the `'error'` event. If an error is emitted and there is no listener for `'error'`, Node.js will throw and potentially crash the application.
  
  ```javascript
  emitter.on('error', (err) => {
    console.error('Error encountered:', err);
  });
  
  // Emitting an error
  emitter.emit('error', new Error('Something went wrong'));
  ```

### 4. **Listener Management and Modification**

- **Dynamic Changes:**  
  Listeners can be added or removed at any time during the emitter’s lifetime. Methods such as `.removeListener()` and `.removeAllListeners()` allow for explicit cleanup or changes in behavior.
  
  ```javascript
  const onData = (payload) => console.log(`Data: ${payload}`);
  emitter.on('data', onData);

  // Later on, remove a specific listener
  emitter.removeListener('data', onData);

  // Or remove all listeners for an event
  emitter.removeAllListeners('data');
  ```

- **Repeating Events:**  
  The emitter can handle multiple cycles of event registration and emission over its lifetime. After handling an event, it remains active and ready to process future events as long as the instance is in use.

### 5. **Cleanup and Termination**

- **Natural End:**  
  There isn’t a formal “shutdown” method for an Event Emitter. Once it’s no longer referenced (and after you’ve removed any listeners if needed), it becomes eligible for garbage collection.
  
- **Explicit Cleanup:**  
  In long-running applications, you might explicitly remove listeners to prevent memory leaks, especially if listeners hold onto resources or if the emitter is used in a dynamic environment (like a web server handling multiple connections).

### **Summary of the Lifecycle**

1. **Instantiation:**  
   - An Event Emitter instance is created.
   - Its internal list of listeners starts empty.

2. **Registration:**  
   - Listeners are added for various events (using `.on()`, `.once()`, etc.).
   - Optionally, lifecycle events like `'newListener'` can be used to track these registrations.

3. **Event Emission:**  
   - The `.emit()` method is called to trigger events.
   - All registered listeners for the event are synchronously executed.
   - Special handling applies for the `'error'` event.

4. **Listener Management:**  
   - Listeners can be added, removed, or updated dynamically.
   - The emitter remains in an active state, ready to handle future events.

5. **Cleanup/Termination:**  
   - When no longer needed, listeners can be removed to free resources.
   - The emitter itself will be garbage collected once there are no more references to it.

This lifecycle illustrates how an Event Emitter serves as a flexible mechanism for decoupled communication within your application, allowing you to register, trigger, manage, and eventually clean up event-driven behavior as needed.

---

[<- MERN](mern-quick.md)


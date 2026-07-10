const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter { }

// basic event listener and emitter example
const myEmitter1 = new MyEmitter();
myEmitter1.on('event', () => {
  console.log('an event occurred!');
});
myEmitter1.emit('event');

// passing arguments and this context to event listeners
const myEmitter2 = new MyEmitter();
myEmitter2.on('event', function (a, b) {
  console.log(a, b, this === myEmitter2);
});
myEmitter2.emit('event', 'a', 'b');

// using arrow functions as event listeners callback
const myEmitter3 = new MyEmitter();
myEmitter3.on('event', (a, b) => {
  console.log(a, b, this === myEmitter3);
});
myEmitter3.emit('event', 'a', 'b');

// asynchronous vs. synchronous event listeners
const myEmitter4 = new MyEmitter();
myEmitter4.on('event', (a, b) => {
  setImmediate(() => {
    console.log(a, b, 'this happens asynchronously');
  });
  console.log(a, b, 'this happens synchronously');
});
myEmitter4.emit('event', 'a', 'b');
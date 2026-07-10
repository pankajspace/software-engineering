[<- MERN](mern-quick.md)

# MERN Interview Questions Links
1. [Top 50 IQA](https://javascriptcentric.medium.com/top-50-nodejs-interview-questions-and-answers-for-2024-5e460dac7852)
2. [Interview Questions YT](https://www.youtube.com/playlist?list=PL3aZbxdSiCbOBbNqpsFmn9aUQUcYmg7Kz) 4.5Hrs
3. [Top 100 IQA YT](https://www.youtube.com/watch?v=Nz-nPR5YJbw)

# MERN Interview Questions and Answers

## Errors 
1. [Errors](https://nodejs.org/docs/latest/api/errors.html)

Applications running in Node.js will generally experience four categories of errors:

1. Standard JavaScript errors such as `<EvalError>`, `<SyntaxError>`, `<RangeError>`, `<ReferenceError>`, `<TypeError>`, and `<URIError>`.
2. System errors triggered by underlying operating system constraints such as attempting to open a file that does not exist or attempting to send data over a closed socket.
3. User-specified errors triggered by application code.
4. AssertionErrors are a special class of error that can be triggered when Node.js detects an exceptional logic violation that should never occur. These are raised typically by the node:assert module.

All JavaScript and system errors raised by Node.js inherit from, or are instances of, the standard JavaScript `<Error>` class and are guaranteed to provide at least the properties available on that class.

### Error propagation and interception
Node.js supports several mechanisms for propagating and handling errors that occur while an application is running. How these errors are reported and handled depends entirely on the type of Error and the style of the API that is called.

#### throw mechanism
All JavaScript errors are handled as exceptions that immediately generate and throw an error using the standard JavaScript throw mechanism. These are handled using the try…catch construct provided by the JavaScript language.

```js
// Throws with a ReferenceError because z is not defined.
try {
  const m = 1;
  const n = m + z;
} catch (err) {
  // Handle the error here.
}
```

Any use of the JavaScript throw mechanism will raise an exception that must be handled or the Node.js process will exit immediately.

With few exceptions, Synchronous APIs (any blocking method that does not return a `<Promise>` nor accept a callback function, such as fs.readFileSync), will use throw to report errors.

#### Errors that occur within Asynchronous APIs may be reported in multiple ways:

1. Some asynchronous methods returns a `<Promise>`, you should always take into account that it might be rejected. See --unhandled-rejections flag for how the process will react to an unhandled promise rejection.

```js
const fs = require('fs/promises');

(async () => {
  let data;
  try {
    data = await fs.readFile('a file that does not exist');
  } catch (err) {
    console.error('There was an error reading the file!', err);
    return;
  }
  // Otherwise handle the data
})(); 
```

2. Error first callback. Most asynchronous methods that accept a callback function will accept an Error object passed as the first argument to that function. If that first argument is not null and is an instance of Error, then an error occurred that should be handled.

```js
const fs = require('node:fs');
fs.readFile('a file that does not exist', (err, data) => {
  if (err) {
    console.error('There was an error reading the file!', err);
    return;
  }
  // Otherwise handle the data
}); 
```

3. When an asynchronous method is called on an object that is an EventEmitter, errors can be routed to that object's 'error' event.

```js
const net = require('node:net');
const connection = net.connect('localhost');

// Adding an 'error' event handler to a stream:
connection.on('error', (err) => {
  // If the connection is reset by the server, or if it can't
  // connect at all, or on any sort of error encountered by
  // the connection, the error will be sent here.
  console.error(err);
});

connection.pipe(process.stdout); 
```

4. A handful of typically asynchronous methods in the Node.js API may still use the throw mechanism to raise exceptions that must be handled using try…catch. There is no comprehensive list of such methods; please refer to the documentation of each method to determine the appropriate error handling mechanism required.

#### Error events
The use of the 'error' event mechanism is most common for stream-based and event emitter-based APIs, which themselves represent a series of asynchronous operations over time (as opposed to a single operation that may pass or fail).

For all EventEmitter objects, if an 'error' event handler is not provided, the error will be thrown, causing the Node.js process to report an uncaught exception and crash unless either: a handler has been registered for the 'uncaughtException' event, or the deprecated node:domain module is used.

```js
const EventEmitter = require('node:events');
const ee = new EventEmitter();

setImmediate(() => {
  // This will crash the process because no 'error' event
  // handler has been added.
  ee.emit('error', new Error('This will crash'));
}); 

// Registering an 'error' event handler on the instance to avoid crashing the process
ee.on('error', (err) => {
  console.error('whoops! there was an error');
});
```
Errors generated in this way cannot be intercepted using try…catch as they are thrown after the calling code has already exited.

Developers must refer to the documentation for each method to determine exactly how errors raised by those methods are propagated.

## How to resolve unhandled exceptions in node?
In Node.js, unhandled exceptions can be resolved using the process.on(‘uncaughtException’) event. By attaching a listener to this event, you can catch unhandled exceptions and prevent Node.js from terminating.

```js
process.on('uncaughtException', (err) => {
  console.error('An unhandled exception occurred:', err);
  // Perform cleanup, logging, or any necessary action
  // Avoid attempting to continue with the application as it may be in an inconsistent state
  // Gracefully shut down the application
  process.exit(1); // Exit the process with a failure code (1)
});

// Example of an unhandled exception (for demonstration purposes)
// This code will throw an unhandled exception
setTimeout(() => {
  throw new Error('Intentional unhandled exception');
}, 100);

// Other application logic
// ...
```

When an unhandled exception occurs, the provided callback function is executed, allowing you to log the error, perform any necessary cleanup, and gracefully shut down the application using process.exit(1).

## Promises & Async/Await & Observables
Promises, async/await, and observables are all mechanisms in JavaScript that help manage asynchronous operations and handle the resulting data or errors.

1. Promises: Promises are objects that represent the eventual completion or failure of an asynchronous operation. They provide a way to handle asynchronous code in a more readable and manageable way. Promises have three states: pending, fulfilled, and rejected. They can be chained together using `.then()` and `.catch()` methods to handle the resolved value or any errors.

2. Async/Await: Async/await is a syntactic sugar built on top of promises. It allows you to write asynchronous code that looks and behaves like synchronous code, making it easier to read and understand. The `async` keyword is used to define an asynchronous function, and the `await` keyword is used to pause the execution of the function until a promise is resolved or rejected. This makes it possible to write asynchronous code in a more sequential and linear manner.

3. Observables: Observables are a powerful pattern for handling asynchronous data streams. They are similar to promises but with additional features. Observables can emit multiple values over time, not just a single value like promises. They can be used to represent events, user input, or data streams from APIs. Observables provide operators that allow you to transform, filter, and combine data streams in a declarative and composable way.

Each of these mechanisms has its own strengths and use cases. Promises are widely supported and provide a simple way to handle asynchronous operations. Async/await builds on top of promises and offers a more synchronous-like coding style. Observables are particularly useful for handling complex and continuous data streams.

## Difference between the Asynchronous and non-blocking code?
### Asynchronous:
- Asynchronous code refers to the style of programming where operations are executed independently of the main program flow. Instead of waiting for each operation to complete before moving on to the next one, asynchronous code initiates an operation and then proceeds to execute subsequent code without waiting for the operation to finish.  
- Asynchronous code typically involves the use of callbacks, promises, async/await, and event-driven mechanisms. It allows the program to achieve concurrency, enabling multiple operations to be executed simultaneously.

### Non-blocking:
- Non-blocking code refers to the ability of a program to continue executing without being obstructed by long-running operations. In a non-blocking system, when an operation is initiated, the program can continue executing other tasks without waiting for the operation to be completed.
- Non-blocking behavior is often associated with I/O operations and event-driven architectures.

## What is Buffer in NodeJS?
Buffer is a temporary memory, mainly used by the stream to hold some data until consumed. Buffer is mainly used to store binary data while reading from a file or receiving packets over the network.

It represents a fixed-length sequence of bytes. It allocated memory outside of the V8 heap. (Buffer not available in browser’s JavaScript)

A simple example of converting a string into a buffer:

```js
// a string
const str = "Hey. this is a string!";
// convert string to Buffer
const buff = Buffer.from(str, "utf-8");
console.log(buff); // <Buffer 48 65 79 2e ... 72 69 6e 67 21>

// convert buffer to string
const buffer = new Buffer.from("Pankaj", "utf-8");
buffer.write("ManaswiWakchaure");
console.log(buffer);  // <Buffer 50 41 6e 6b 61 6a>
console.log(buffer.toString()); // PankajManaswiWakchaure
console.log(buffer.toJSON());
```

To convert buffer into a string:
```js
// if the buffers contain text
buffer.toString(encoding) // encoding = 'utf-8'
// if you know how many bytes the buffer contains then
buffer.toString(encoding, 0, numberOfBytes) // numberOfBytes = 12
```

## Difference between crypto and bcrypt module?
### crypto Module: 
The crypto module in Node.js provides cryptographic functionality, including encryption, hashing, and decryption. It offers a wide range of cryptographic algorithms and tools for handling secure data transformations.

```js
const crypto = require('crypto');

const password = 'mySecurePassword';
const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex'); // Generate a hashed password

console.log('Salt:', salt);
console.log('Hashed Password:', hash);
```

### bcrypt Module: 
The bcrypt module is specifically designed for password hashing using the bcrypt algorithm. It provides a convenient way to securely hash passwords, a common requirement for user authentication systems. bcrypt automatically handles the generation of salts, which enhances the security of the hashed passwords.

```js
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'mySecurePassword';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  if (!err) {
    console.log('Hashed Password:', hash);
  }
});
```

The main difference between the crypto and bcrypt modules is that the crypto module is a general-purpose cryptographic library that provides a wide range of cryptographic functions, while the bcrypt module is specifically designed for password hashing using the bcrypt algorithm.

The bcrypt module simplifies the process of securely hashing passwords by automatically handling the generation of salts, which enhances the security of the hashed passwords. It is commonly used in user authentication systems to securely store and verify user passwords.

## What are the global objects of Node.js?
1. [Global objects in Node](https://nodejs.org/api/globals.html)
2. [Standard built-in objects in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

## What are Reactor Pattern and Demultiplexer in Node?
The Reactor pattern is a design pattern used in event-driven systems, and it forms the foundation of Node.js’ event-driven architecture. In this pattern, an event loop (also known as the Reactor) continuously monitors multiple I/O sources for events, such as incoming network connections, file system operations, or timers. When an event occurs, the Reactor dispatches the corresponding event handler to handle the event.

Demultiplexer in Node.js is part of the underlying libuv library. Developers interact with the Reactor pattern through APIs provided by Node.js, such as event emitters, timers, and networking utilities.

The Demultiplexer (often abbreviated as Demux) is a component in Node.js that works in collaboration with the Reactor pattern. Its primary function is to monitor multiple I/O resources, such as network sockets or files, and notify the Reactor when events occur on those resources.

Together, the Reactor pattern and the Demultiplexer form the core of Node.js’ event-driven, non-blocking I/O model. This architecture allows Node.js to handle a large number of concurrent operations efficiently, making it well-suited for building scalable network applications and servers that require high performance.

## How to handle large file upload on node server? What is highWaterMark ?
To handle large file uploads on a Node.js server, you can use the multer middleware, which is a popular choice for handling multipart/form-data, including file uploads.

### Multer:
Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. It can be easily integrated into an Express application to handle file uploads.
```js
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Destination directory for uploaded files

const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Busboy:
Another third-party module that is commonly used for handling file uploads in Node.js is busboy. busboy is a streaming parser for HTML form data for Node.js. It provides a way to handle file uploads and other form data within HTTP requests.
```js
const http = require('http');
const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  if (req.url === '/upload' && req.method === 'POST') {
    const busboy = new Busboy({ headers: req.headers });
    
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const saveTo = path.join(__dirname, 'uploads', filename);
      file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('finish', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File uploaded successfully');
    });

    req.pipe(busboy);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### highWaterMark:
highWaterMark, is a parameter used in streams to control the amount of data that can be read from a source or written to a destination before the stream emits a ‘drain’ event. In the context of file uploads, the highWaterMark is relevant when dealing with large file uploads to prevent backpressure and control the amount of data buffered in memory.

When using fs.createReadStream or other stream-related operations, you can specify the highWaterMark option to control the buffer size.
```js
const fs = require('fs');
const readStream = fs.createReadStream('largeFile.txt', { highWaterMark: 16 * 1024 }); // Set highWaterMark to 16 KB
```

By setting the highWaterMark value appropriately, you can optimize the performance of file uploads and prevent memory-related issues when handling large files in Node.js.

## Difference between Hashing and Encryption?
### Hashing:
Hashing is a one-way process used for data integrity and verification. It converts input data into a fixed-size string of characters, typically a hexadecimal number. The resulting string, known as a hash value or digest, is unique to the input data.

Hashing is indeed idempotent, meaning that for the same input, the resulting hash value will always be the same. This property is desirable for ensuring data integrity and security.

Example of hashing:

When the user sets or changes their password, you would hash their input using bcrypt and then store the resulting hash in your database. When doing this, bcrypt handles the addition of a salt to the password and the hashing process.
```js
const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainTextPassword = 'mySecurePassword';

bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  if (!err) {
    console.log('Hashed Password:', hash);
  }
});
```

When the user attempts to log in, you would retrieve the stored hash from the database and then use bcrypt’s compare function to hash the password input by the user and compare the resulting hash with the stored hash. If they match, the input password is correct.
```js
const bcrypt = require('bcrypt');
const hashedPassword = '...'; // Replace with the actual hashed password
const userInputPassword = 'userInputPassword'; // Replace with the user's input

// Use the bcrypt compare function to check if the userInputPassword matches the hashed password
bcrypt.compare(userInputPassword, hashedPassword, (err, result) => {
  if (err) {
    // Handle error
  }
  if (result) {
    // Passwords match
    console.log('Password is correct');
  } else {
    // Passwords don't match
    console.log('Password is incorrect');
  }
});
```

### Encryption:
Encryption is a two-way process that transforms plaintext (original data) into ciphertext (encrypted data) using an encryption algorithm and an encryption key. The encrypted data can later be transformed back into its original form using a decryption algorithm and the corresponding decryption key. Encryption is designed to protect data confidentiality and ensure that only authorized parties can access the original data.

## Difference between Async.Await and Async.Series and Async.parallel?
### Async/Await:
Async/await is a modern JavaScript feature that allows you to write asynchronous code in a more synchronous style, making it easier to work with promises and asynchronous operations. With async/await, you can define an async function, and within that function, you can use the await keyword to pause the execution of the function until a promise is resolved. This allows you to write asynchronous code that looks and behaves more like synchronous code, making it easier to manage and reason about.
```js
async function fetchData() {
  try {
    let result = await fetch('https://api.example.com/data');
    let data = await result.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
```

### Async.series:
Async.series is a method provided by the Async.js library, which is a utility module for working with asynchronous JavaScript. Async.series is used to run multiple asynchronous functions in a specific order, one after the other. Each function is executed only after the previous function has completed. This is typically used when you have several asynchronous tasks that need to be executed in a specific sequence.
```js
async.series([
  function(callback) {
    // Perform asynchronous operation 1
    callback(null, 'Result 1');
  },
  function(callback) {
    // Perform asynchronous operation 2
    callback(null, 'Result 2');
  }
], function(err, results) {
  // All tasks have been completed
  console.log(results);
});
```

### Async.parallel:
Async.parallel is a function from the Async.js library in JavaScript. It is used to run multiple asynchronous functions simultaneously and collect the results when all of them have completed.
```js
async.parallel([
  function(callback) {
    // Perform asynchronous operation 1
    callback(null, 'Result 1');
  },
  function(callback) {
    // Perform asynchronous operation 2
    callback(null, 'Result 2');
  }
], function(err, results) {
  // All tasks have been completed
  console.log(results);
});
```

## Difference between Promise and Observables ?
Promises and Observables are both used for managing asynchronous operations in JavaScript, but there are several differences between the two:

Single Value vs. Multiple Values:
- Promise: Represents a single value or the eventual result of an asynchronous operation. Once a promise is resolved or rejected, it can only emit a single value.
- Observable: Represents a stream of values over time. It can emit multiple values asynchronously, and it also has additional capabilities such as handling errors, completing, and transformation operations.

Eager vs. Lazy Evaluation:
- Promise: Eagerly evaluates and triggers the asynchronous operation as soon as the promise is created, whether there are consumers interested in the result or not.
- Observable: Lazily evaluates and does not trigger the asynchronous operation until it has at least one subscriber interested in the emitted values. This allows for more efficient use of resources when dealing with cold observables.

Cancellation:
- Promise: Once a promise is created, it cannot be canceled. It will eventually resolve or reject, and the consumer has to handle the result accordingly.
- Observable: Supports cancellation. Subscribers can unsubscribe from receiving further values if they are no longer interested, which can be beneficial in scenarios where resources need to be released early.

Additional Operators and Features:
- Observable: Provides a rich set of operators for transforming, combining, and working with asynchronous data streams. It also supports higher-order observables, multicast behavior, and backpressure handling in certain implementations.
- Promise: Offers limited built-in capabilities, primarily focused on handling the eventual resolution or rejection of a single asynchronous operation.

Backward Compatibility:
- Promise: Has been a part of the JavaScript language since ECMAScript 6 (ES6), making it widely supported in modern environments.
- Observable: Introduced later through libraries such as RxJS and is not part of the core JavaScript language, although it has gained popularity, especially in the context of reactive programming and complex asynchronous scenarios.

Example of Observable:
```js
// Import the necessary modules from RxJS
import { Observable } from 'rxjs';

// Create an observable
const observable = new Observable((observer) => {
  // Emit three values asynchronously with a delay
  setTimeout(() => {
    observer.next('First value');
  }, 1000);

  setTimeout(() => {
    observer.next('Second value');
  }, 2000);

  setTimeout(() => {
    observer.next('Third value');
    // Complete the observable after emitting the third value
    observer.complete();
  }, 3000);
});

// Subscribe to the observable
observable.subscribe({
  // Handle each emitted value
  next: (value) => console.log(value),
  // Handle errors
  error: (error) => console.error(error),
  // Handle completion
  complete: () => console.log('Observable completed'),
});
```

## Difference between Emitter and Dispatcher?
The EventEmitter is a class that facilitates communication/interaction between objects in Node.js. The EventEmitter class can be used to create and handle custom events.

EventEmitter is at the core of Node asynchronous event-driven architecture. Many of Node’s built-in modules inherit from EventEmitter including prominent frameworks like Express.js.

An emitter object basically has two main features:
- Emitting name events.
- Registering and unregistering listener functions.

### Emitter:
An emitter is an object that emits events or signals to indicate that something has happened.

It’s a fundamental component in event-driven programming, where it notifies interested parties (listeners or subscribers) when particular events occur.

Emitters are commonly used in languages like JavaScript, where objects can be event emitters, and they are central to frameworks like Node.js for handling asynchronous events.
```js
/**
 * Callback Events with Parameters
 */
const events = require('events');
const eventEmitter = new events.EventEmitter();

function listener(code, msg) {
   console.log(`status ${code} and ${msg}`);
}

eventEmitter.on('status', listener); // Register listener
eventEmitter.emit('status', 200, 'ok');

// Output
status 200 and ok
```

### Dispatcher:
A dispatcher is an intermediary component responsible for routing and delivering messages or events to their intended recipients.
It acts as a message broker that receives messages from emitters and then forwards them to the appropriate handlers, listeners, or components based on predefined criteria.

Dispatchers are commonly used in message-passing systems, event-driven architectures, and in the context of software design patterns like the observer pattern.

Example: In event-driven systems or message-based architectures, a dispatcher may receive events or messages from various sources and then dispatch or route them to the corresponding event handlers or processing units within the system.

## How video streaming works in Node.js?
Video streaming in Node.js involves serving video files to clients over HTTP using streaming techniques. By streaming video files, you can provide a better user experience by allowing users to start watching the video before the entire file has been downloaded.

Here’s a basic example of how you can stream a video file in Node.js using the Express framework:
```js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/video', (req, res) => {
  const videoPath = path.join(__dirname, 'video.mp4');
  const videoStat = fs.statSync(videoPath);
  const fileSize = videoStat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

---

[<- MERN](mern-quick.md)

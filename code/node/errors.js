
// Question 1 - Unhandled promise rejection
// const fsPromise = require('fs/promises');
// (async () => {
//   let data;
//   data = await fsPromise.readFile('a file that does not exist');
//   // Otherwise handle the data
// })();

// Answer 1 - Handled promise rejection
const fsPromise = require('fs/promises');
(async () => {
  let data;
  try {
    data = await fsPromise.readFile('a file that does not exist');
  } catch (err) {
    console.error('There was an error reading the file!', err);
    return;
  }
  // Otherwise handle the data
})();


// Question 2 - Error first callback
// const fs = require('node:fs');
// fs.readFile('a file that does not exist', () => { });

// Answer 2 - Error first callback
// const fs = require('node:fs');
// fs.readFile('a file that does not exist', (err, data) => {
//   if (err) {
//     console.error('There was an error reading the file!', err);
//     return;
//   }
//   // Otherwise handle the data
// });


// Question 3 - Event emitter error
// const net = require('node:net');
// const connection = net.connect('localhost');
// connection.pipe(process.stdout);

// Answer 3 - Event emitter error
// const net = require('node:net');
// const connection = net.connect('localhost');

// // Adding an 'error' event handler to a stream:
// connection.on('error', (err) => {
//   // If the connection is reset by the server, or if it can't
//   // connect at all, or on any sort of error encountered by
//   // the connection, the error will be sent here.
//   console.error(err);
// });
// connection.pipe(process.stdout);


// Question 4 - Uncaught exception
// setTimeout(() => {
//   throw new Error('Intentional unhandled exception');
// }, 100);

// Answer 4 - Uncaught exception
// process.on('uncaughtException', (err) => {
//   console.error('An unhandled exception occurred:', err);
//   // Perform cleanup, logging, or any necessary action
//   // Avoid attempting to continue with the application as it may be in an inconsistent state
//   // Gracefully shut down the application
//   process.exit(1); // Exit the process with a failure code (1)
// });

// // Example of an unhandled exception (for demonstration purposes)
// // This code will throw an unhandled exception
// setTimeout(() => {
//   throw new Error('Intentional unhandled exception');
// }, 100);
// q1
// function doAsyncTask(cb) {
//   cb();
// }
// doAsyncTask(_ => console.log(message));
// let message = "Callback Called";

// q1a1 
// function doAsyncTask(cb) {
//   setImmediate(() => {
//     cb();
//   })
// }
// doAsyncTask(_ => console.log(message));
// let message = "Callback Called";

// q1a2
// function doAsyncTask(cb) {
//   process.nextTick(() => {
//     cb();
//   })
// }
// doAsyncTask(_ => console.log(message));
// let message = "Callback Called";


// q2
// The below code swallows the error and doesn't pass it up the chain, make it pass the error up the stack using the next callback.
// const fs = require("fs");
// function readFileThenDo(next) {
//   fs.readFile("./blah.nofile", (err, data) => {
//     next(data);
//   });
// }
// readFileThenDo(data => {
//   console.log(data);
// });

// q2a1
// const fs = require("fs");
// const path = require("path");
// const filePath = path.join(__dirname, "./files") + "/demofile.txt";
// function readFileThenDo(next) {
//   fs.readFile(filePath, "utf8", (err, data) => {
//     next(err, data);
//   });
// }
// readFileThenDo((err, data) => {
//   if (err) {
//     throw Error(`readFileThenDo error: ${err}`);
//   }
//   console.log(data);
// });


// q3
// Instead of passing it up the stack throw it instead and try to catch it later on.
// const fs = require("fs");
// const path = require("path");
// const filePath = path.join(__dirname, "./files") + "/demofile.txt";
// function readFileThenDo(next) {
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) throw err;
//     next(data);
//   });
// }
// // Hint use try..catch
// readFileThenDo(data => {
//   console.log(data);
// });

// q3a1
// Or if the error is serious, you can throw the error as soon as you see it.
// try..catch desn't work as you expect with callbacks, it only really works with synchronous code.
// By the time the callback throws the error we have moved on from the try..catch, the throw happens in the root scope and will just cause the program to exit.
// const path = require("path");
// const filePath = path.join(__dirname, "./files") + "/demofile.txt";
// function readFileThenDo(next) {
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) throw err;
//     next(null, data);
//   });
// }
// try {
//   readFileThenDo((_, data) => console.log(data));
// } catch (err) {
//   console.error(err);
// }

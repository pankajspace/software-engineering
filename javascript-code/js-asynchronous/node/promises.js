// q1 - (10min)
// Create a promise version of the async readFile function
// const fs = require("fs");
// function readFile(filename, encoding) {
//   fs.readFile(filename, encoding, (err, data) => {
//     //TODO
//   });
// }
// readFile("./files/demofile.txt", "utf-8")
//     .then(...)
// });

// q1a1
// const fs = require("fs");
// const path = require("path");
// const filePath = path.join(__dirname, "./files") + "/demofile.txt";
// function readFile(filename, encoding) {
//   return new Promise((resolve, reject) => {
//     //TODO
//     fs.readFile(filename, encoding, (err, data) => {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(data);
//     })
//   });
// }
// readFile(filePath, "utf-8")
//   .then(
//     (data) => {
//       console.log("readFile: ", data);
//     },
//     (err) => {
//       console.log("readFile: ", err);
//     }
//   );

// q1a2
// const fs = require("fs");
// const path = require("path");
// const util = require("util");
// const readFile = util.promisify(fs.readFile);
// const filePath = path.join(__dirname, "./files") + "/demofile.txt";
// readFile(filePath, "utf-8")
//   .then(
//     (data) => {
//       console.log("readFile: ", data);
//     },
//     (err) => {
//       console.log("readFile: ", err);
//     }
//   );



// q2
// Load a file from disk using readFile and then compress it using the async zlib node library, use a promise chain to process this work. 
// Load it then zip it and then print it to screen
// const fs = require("fs");
// const path = require("path");
// const zlib = require("zlib");
// const filePath = path.join(__dirname, "./files") + "/demofile.txt";
// function gzip(data) {
//   return new Promise((resolve, reject) => {
//     zlib.gzip(data, (error, data) => {
//       if (error) { reject(error) };
//       resolve(data);
//     });
//   });
// }
// function readFile(filePath, encoding) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, encoding, (error, data) => {
//       if (error) { reject(error) };
//       resolve(data);
//     });
//   });
// }
// readFile(filePath, "utf-8").then(data => {
//   console.log("readFile data: ", data);
//   gzip(data).then(data => {
//     console.log("gzip data: ", data);
//   }, error => {
//     console.error("gzip failed: ", error);
//   })
// }, error => {
//   console.error("readFile failed: ", error);
// });



// q3
// Convert the previous code so that it now chains the promise as well.
// const fs = require("fs");
// const path = require("path");
// const zlib = require("zlib");
// const filePath = path.join(__dirname, "./files") + "/demofile.txt";
// function gzip(data) {
//   return new Promise((resolve, reject) => {
//     zlib.gzip(data, (error, data) => {
//       if (error) { reject(error) };
//       resolve(data);
//     });
//   });
// }
// function readFile(filePath, encoding) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, encoding, (error, data) => {      
//       if (error) { reject(error) };
//       resolve(data);
//     });
//   });
// }
// readFile(filePath, "utf-8").then(data => {
//   console.log("readFile data: ", data);
//   return gzip(data);
// }, error => {
//   console.error("readFile failed: ", error);
// }).then(data => {
//   console.log("gzip data: ", data);
// }, error => {
//   console.error("gzip failed: ", error);
// });



// q4
// Convert the previous code so that it now handles errors using the catch handler
// const fs = require("fs");
// const path = require("path");
// const zlib = require("zlib");
// const filePath = path.join(__dirname, "./files") + "/demofile.txt";
// function gzip(data) {
//   return new Promise((resolve, reject) => {
//     zlib.gzip(data, (error, data) => {
//       if (error) { reject(error) };
//       resolve(data);
//     });
//   });
// }
// function readFile(filePath, encoding) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, encoding, (error, data) => {
//       if (error) { reject(error) };
//       resolve(data);
//     });
//   });
// }
// readFile(filePath, "utf-8").then(data => {
//   console.log("readFile data: ", data);
//   return gzip(data);
// }).then(data => {
//   console.log("gzip data: ", data);
// }).catch(error => {
//   console.error("Failed: ", error);
// }).finally(() => {
//   console.log("Cleaning up.");
// })



// q5
// Create some code that tries to read from disk a file and times out if it takes longer than 1 seconds, use Promise.race
// function readFileFake(sleep) {
//   return new Promise(resolve => setTimeout(resolve, sleep));
// }
// readFileFake(2000); // This resolves a promise after 5 seconds, pretend it's a large file being read from disk

// q5a
// function readFileFake(sleep) {
//   return new Promise(resolve => setTimeout(resolve, sleep, "resolved"));
// }
// function timeout(sleep) {
//   return new Promise((resolve, reject) => setTimeout(reject, sleep, "rejected"));
// }
// Promise.race([readFileFake(2000), timeout(3000)]).then((data) => {
//   console.log("Resolved: ", data);
// }).catch((error) => {
//   console.error("Failed: ", error);
// });



// q6
// Create a process flow which publishes a file from a server, then realises the user needs to login, then makes a login request, the whole chain should error out if it takes longer than 1 seconds. Use catch to handle errors and timeouts.
// function authenticate() {
//   console.log("Authenticating");
//   return new Promise(resolve => setTimeout(resolve, 1000, { status: 200 }));
// }
// function publish() {
//   console.log("Publishing");
//   return new Promise(resolve => setTimeout(resolve, 1000, { status: 403 }));
// }
// function timeout(sleep) {
//   return new Promise((resolve, reject) => setTimeout(reject, sleep, "timeout"));
// }
// Promise.race( [publish(), timeout(3000)])
//   .then(...)
//   .then(...)
//   .catch(...);

// q6a
// function authenticate() {
//   console.log("Authenticating");
//   return new Promise(resolve => setTimeout(resolve, 1000, { status: 200 }));
// }
// function publish() {
//   console.log("Publishing");
//   return new Promise(resolve => setTimeout(resolve, 1000, { status: 403 }));
// }
// function timeout(sleep) {
//   return new Promise((resolve, reject) => setTimeout(reject, sleep, "timeout"));
// }
// Promise.race([publish(), timeout(3000)])
//   .then(res => {
//     if (res.status === 403) {
//       return authenticate();
//     }
//     return res;
//   })
//   .then(res => {
//     // Process save responce
//     console.log("Published");
//   })
//   .catch(err => {
//     if (err === "timeout") {
//       console.error("Request timed out");
//     } else {
//       console.error(err);
//     }
//   });

// q6b
// function authenticate() {
//   console.log("Authenticating");
//   return new Promise(resolve => setTimeout(resolve, 1000, { status: 200 }));
// }
// function publish() {
//   console.log("Publishing");
//   return new Promise(resolve => setTimeout(resolve, 1000, { status: 403 }));
// }
// function timeout(sleep) {
//   return new Promise((resolve, reject) => setTimeout(reject, sleep, "timeout"));
// }
// function safePublish() {
//   return publish().then(res => {
//     if (res.status === 403) {
//       return authenticate();
//     }
//     return res;
//   });
// }
// Promise.race([safePublish(), timeout(3000)])
//   .then(res => {
//     // Process save responce
//     console.log("Published");
//   })
//   .catch(err => {
//     if (err === "timeout") {
//       console.error("Request timed out");
//     } else {
//       console.error(err);
//     }
//   });
const crypto = require("crypto");
const https = require("https");

(function () {
  // Example 1 - Crypto module uses thread pool
  // The following code snippet demonstrates how Node.js uses the thread pool
  // By default, Node.js has 4 threads in the thread pool
  // We can increase the number of threads in the thread pool by setting the following environment variable
  // The following line will increase the number of threads in the thread pool to 16 (for example) 

  process.env.UV_THREADPOOL_SIZE = 5;
  const start = Date.now();
  const MAX_CALLS = 5;

  for (let i = 0; i < MAX_CALLS; i++) {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      console.log(`Hash: ${i + 1}`, Date.now() - start);
    });
  }
})();


(function () {
  // Example 2 - OS async operations
  // The following code snippet demonstrates how Node.js uses OS async operations
  // This is an example of an OS async operation
  // OS async operations are not executed in the thread pool

  // const start = Date.now();
  // const MAX_CALLS = 12;
  // for (let i = 0; i < MAX_CALLS; i++) {
  //   https.request("https://www.google.com", (res) => {
  //     res.on("data", () => { });
  //     res.on("end", () => {
  //       console.log(`Request: ${i + 1}`, Date.now() - start);
  //     });
  //   }).end();
  // }
})();

// q1
// Create a custom async generator that loops over the files that are passed in.
// const util = require("util");
// const fs = require("fs");
// const readFile = util.promisify(fs.readFile);
// function* fileLoader(files) {...}
// (async () => {
//   for await (let contents of fileLoader([
//     "./files/demofile.txt",
//     "./files/demofile.other.txt"
//   ])) {
//     console.log(contents);
//   }
// })();

// q1a
const util = require("util");
const fs = require("fs");
const path = require("path");
const readFile = util.promisify(fs.readFile);
function* fileLoader(files) {
  const promises = files.map(file => readFile(file, "utf-8"));
  for (let promise of promises) {
    yield promise;
  }
}
const arrFiles = [
  path.join(__dirname, "./files/demofile.txt"),
  path.join(__dirname, "./files/demofile2.txt")
];
(async () => {
  for await (let contents of fileLoader(arrFiles)) {
    console.log(contents);
  }
})(); 
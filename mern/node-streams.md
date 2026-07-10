[<- MERN](mern-quick.md)

## Streams
1. [Stream](https://nodejs.org/api/stream.html)
2. [NodeJS Streams YT](https://www.youtube.com/watch?v=64LJJhT6Ybo)

```js
const fs = require("fs");
const zlib = require("zlib");

const readableStream = fs.createReadStream("./file.txt", {
  encoding: "utf8",
  highWaterMark: 2,
});

const writeableStream = fs.createWriteStream("./file2.txt");

readableStream.pipe(writeableStream);

// readableStream.on("data", (chunk) => {
//   console.log(chunk);
//   writeableStream.write(chunk);
// });

const gzip = zlib.createGzip();
readableStream.pipe(gzip).pipe(fs.createWriteStream("./file2.txt.gz"));

readableStream.on("end", () => {
  console.log("Done reading");
});

readableStream.on("error", (err) => {
  console.log(err);
});
```

## What is Stream and different types of streams in nodejs?
Stream is the object (abstract interface) that allows us to transfer data from source to destination and vice-versa. It enables you to process large amounts of data chunk by chunk, without having to load the entire data set into memory at once.

There are 4 types of streams:

### Readable: 
A Readable stream represents a source from which data can be read. It emits “data” events whenever new data becomes available. An example of a Readable stream is reading a file line by line:

```js
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('file.txt'),
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  console.log(`Line from file: ${line}`);
});
```

### Writable: 
A Writable stream represents a destination to which data can be written. It can be used to write data to files, HTTP responses, or any other writable target. Here’s an example of writing data to a file using a Writable stream:

```js
const fs = require('fs');

const writableStream = fs.createWriteStream('output.txt');

writableStream.write('Hello, ');
writableStream.write('World!');
writableStream.end();
```

### Duplex: 
A Duplex stream is both readable and writable, allowing both data input and output. A common example is a TCP socket, where data can be both read from and written to. Here’s a simple echo server using a Duplex stream:

```js
const net = require('net');

const server = net.createServer((socket) => {
  socket.pipe(socket);
});

server.listen(3000);
```

### Transform: 
A Transform stream is a Duplex stream that performs transformations on the data as it is read and written. It allows for data modification or manipulation. An example of a Transform stream is compressing or encrypting data on the fly:

```js
const fs = require('fs');
const zlib = require('zlib');

const readableStream = fs.createReadStream('file.txt');
const writableStream = fs.createWriteStream('file.txt.gz');
const gzipStream = zlib.createGzip();

readableStream.pipe(gzipStream).pipe(writableStream);
```

---

[<- MERN](mern-quick.md)

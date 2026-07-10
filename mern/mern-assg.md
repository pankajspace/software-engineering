[<- MERN](mern-quick.md)

--- 

# Assignments

## 1. CRUD Operations, Middleware, and Error Handling, use MongoDB with Mongoose for CRUD Operations, use Environment Variables for Configuration
Create CRUD API for Todo List

## 2. File Uploads, Image Processing, and File Management
Your task is to develop a RESTful API using Node.js with Express, Multer, and Sharp. The API should include an endpoint to handle file uploads. Specifically, create a POST endpoint at /upload that accepts image files (such as .jpg and .png). Implement validation for file type and size, and store the raw images in a designated folder, for example, uploads/raw/.

Once an image is uploaded, you must process it using Sharp. The processing should include creating a thumbnail version (for example, 150x150 pixels). Also save the original images. Save the processed images in a separate folder like uploads/processed/.

For file management, implement additional endpoints. Create a GET endpoint at /files that lists all processed images, including metadata such as filename, upload date, and file size. Additionally, implement a DELETE endpoint at /files/:filename that allows users to delete a specific processed image. Use Node’s fs module to manage these file operations and ensure proper error handling in cases such as file not found.

Consider implementing asynchronous processing so that the upload response is not delayed by image processing tasks. Create a simple front-end interface that allows users to upload images and view the processed results.

## Event Loop and its working
Predict the output of the following code. You need to have very good understanding of Event Loop and its working. Once you are done you should be able to explain the output. Write the comments to explain the output. Also add exta explanations apart from the comments if needed.
```js
const fs = require("fs");

fs.readFile(__filename, () => { console.log("readFile 1"); });

setImmediate(() => console.log("setImmediate 1"));

setImmediate(() => {
  process.nextTick(() => console.log("nextTick 1"));
  setImmediate(() => console.log("setImmediate 2"));
});

setImmediate(() => console.log("setImmediate 3"));

setTimeout(() => console.log("setTimeout 1"), 0);

Promise.resolve().then(() => console.log("Promise 1"));

process.nextTick(() => console.log("nextTick 2"));

const readableStream = fs.createReadStream(__filename);
readableStream.close();
readableStream.on("close", () => { console.log("Close 1"); });
```

## Node.js and Express.js concepts
1. Commonly used npm packages
2. Cluster module & Worker threads. When to use which?
3. Different types of middleware and why it is used
4. Different types Streams & Pipes and why they are used
5. Event Emitter and its use cases
6. [Node and Express security best practices](https://expressjs.com/en/advanced/best-practice-security.html)
7. [Node and Express performance optimization techniques](https://expressjs.com/en/advanced/best-practice-performance.html)
---

[<- MERN](mern-quick.md)

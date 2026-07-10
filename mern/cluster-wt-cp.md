[<- MERN](mern-quick.md)

## Cluster
1. [Cluster](https://nodejs.org/docs/latest/api/cluster.html)
2. [How to scale NodeJs applications using the cluster module YT](https://www.youtube.com/watch?v=JoPZ9gEvpz8)

The cluster module is used to create multiple processes of the same Node.js application in a single machine to take advantage of multi-core systems. It allows for automatic load balancing across the different processes and enables efficient utilization of system resources.

The primary purpose of the Cluster module is to distribute incoming connection requests (e.g., HTTP requests) across a pool of workers, allowing a Node.js server to handle multiple requests concurrently. This is achieved by forking the main Node.js process into multiple worker processes using a master/worker architecture.

When using the cluster module, a single “master” process is responsible for managing multiple “worker” processes, distributing incoming connections among them, and restarting workers as needed.

### PROCESS: 
A process in Node.js refers to an instance of the Node.js runtime that can be executed independently. Each Node.js process has its own memory space, global objects, modules, and event loop.

When you run a Node.js application, you’re essentially starting a process. Node.js applications can be single-threaded, meaning they run in a single process, or they can leverage the built-in clustering module to create multiple processes to take advantage of multi-core systems.

### Create Multiple Processes: 
The Cluster module in Node.js is designed specifically to enable efficient load balancing of incoming network connections across multiple processes. It allows a Node.js application to take advantage of multi-core systems by creating multiple instances of the application, each running in its own process.

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const process = require('node:process');

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  // Create a worker process for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case, an HTTP server
  http.createServer((req, res) => {
    // Simulate a long-running operation
    const start = Date.now();
    while (true) {
      if (Date.now() - start > 5000) {
        break;
      }
    }

    res.writeHead(200);
    res.end(`Worker ${process.pid} responded`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

---

## Worker Threads 
1. [Worker Threads](https://nodejs.org/api/worker_threads.html)

### THREAD: 
Node.js, by default, uses a single-threaded, event-driven architecture, meaning it utilizes a single thread (event loop) to execute JavaScript code. This single thread processes I/O operations (like file system and network operations) and asynchronous events.

However, Node.js does use additional threads from a thread pool managed by the libuv library to handle certain operations, such as file system operations.

It is also possible to create multiple threads by utilizing Worker Threads, a module provided by Node.js for handling heavy CPU-bound computation and parallel processing.

```js
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // This code is executed in the main thread
  // Create new worker threads
  const worker1 = new Worker(./worker1.js);
  const worker2 = new Worker(./worker2.js);

  // Set up message handlers for worker threads
  worker1.on('message', (msg) => console.log('Message from worker 1:', msg));
  worker2.on('message', (msg) => console.log('Message from worker 2:', msg));

  // Post messages to worker threads
  worker1.postMessage('Hello from main thread to worker 1');
  worker2.postMessage('Hello from main thread to worker 2');
} else {
  // This code is executed in the worker threads
  // Set up message handler for worker thread
  parentPort.on('message', (msg) => {
    console.log('Message from main thread:', msg);
    // Send message back to the main thread
    parentPort.postMessage('Hello from worker thread');
  });
}

// worker1.js
const { parentPort } = require('worker_threads');

parentPort.on('message', (msg) => {
  console.log('Message from main thread to worker 1:', msg);
  // Send message back to the main thread
  parentPort.postMessage('Hello from worker 1');
});

// worker2.js
const { parentPort } = require('worker_threads');

parentPort.on('message', (msg) => {
  console.log('Message from main thread to worker 2:', msg);
  // Send message back to the main thread
  parentPort.postMessage('Hello from worker 2');
});

// Output:
// Message from main thread to worker 1: Hello from main thread to worker 1
// Message from main thread to worker 2: Hello from main thread to worker 2
// Message from worker 1: Hello from worker 1
// Message from worker 2: Hello from worker 2
```

here the main thread creates two worker threads using the Worker class. Each worker thread listens for messages from the main thread using the on(‘message’) event listener and sends messages back to the main thread using parentPort.postMessage().

When running this code, you would see messages exchanged between the main thread and the worker threads, demonstrating the inter-thread communication.

### Communication between Threads: 
You can pass data between threads using the Worker and parentPort objects provided by the Worker Threads module.

```js
// main.js
const { Worker } = require('worker_threads');

// Create a new worker thread and pass initial data
const worker = new Worker('./worker.js', { workerData: { message: 'Hello from main thread' } });

// Listen for messages from the worker thread
worker.on('message', (data) => {
  console.log('Message from worker thread:', data);
});

// worker.js
const { workerData, parentPort } = require('worker_threads');

// Receive initial data from the main thread
console.log('Received data from main thread:', workerData);

// Send a message to the main thread
parentPort.postMessage('Hello from worker thread');
```

In this example, the main.js file creates a new worker thread using Worker(‘./worker.js’) and passes initial data to the worker using the workerData option. In the worker.js file, the workerData is received from the main thread, and a message is sent back to the main thread using parentPort.postMessage().

When the worker script is executed, calling parentPort.postMessage() will trigger the ‘message’ event in the main thread, and the data passed from the worker thread can be accessed and processed accordingly.

This approach allows threads to communicate with each other and pass data back and forth as needed, enabling efficient multi-threaded data processing in Node.js.

---

## Child Process
1. [Child Process](https://nodejs.org/docs/latest/api/child_process.html)

The child_process module is used to spawn new processes to execute external commands, run other Node.js scripts, or perform non-Node.js operations. It provides a way to create and manage child processes from within a Node.js application.

The primary purpose of the child_process module is to enable the execution of tasks that are CPU-intensive, I/O-intensive, or require interaction with external programs or scripts.

When using the child_process module, the parent process can spawn child processes, communicate with them, and receive their results asynchronously using event-driven mechanisms. This allows for parallel execution of tasks and better utilization of system resources.

### Fork:
The fork method is specifically designed for creating child processes that run Node.js modules. It is commonly used to create new instances of the Node.js interpreter to run separate Node.js scripts.

Child process is created using fork, it automatically sets up a communication channel for inter-process communication (IPC) with the parent process.
```js
// parent.js
const { fork } = require('child_process');

const child = fork('child.js');

child.on('message', (message) => {
  console.log('Received message from child:', message);
});

child.send('Hello from parent!');

// child.js
process.on('message', (message) => {
  console.log('Received message from parent:', message);
  process.send('Hello from child!');
});

// Output:
// Received message from parent: Hello from parent!
// Received message from child: Hello from child!
```

### Spawn:
The spawn method is a more general-purpose function for creating child processes. It is used to spawn new processes and execute commands in the operating system’s shell. With spawn, you can execute non-Node.js, programs, such as Python scripts or shell commands.

With spawn, if you need to establish communication between the parent and child processes, you have to manually set up the standard input and output streams to exchange data and messages.
```js
const { spawn } = require('child_process');

const pythonProcess = spawn('python', ['script.py', 'arg1', 'arg2']);

pythonProcess.stdout.on('data', (data) => {
  console.log(`Python script stdout: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`Python script stderr: ${data}`);
});

pythonProcess.on('close', (code) => {
  console.log(`Python script child process exited with code ${code}`);
});
```

### Exec:
The exec method runs a command in a shell and buffers the output. It is suitable for simple commands and scripts where the output is not excessively large.
```js
const { exec } = require('child_process');

// Execute a simple shell command to list files in the current directory
exec('ls -l -a', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
```

---

## Cluster Module vs Worker Threads vs Child Processes
Node.js provides several ways to achieve parallelism and concurrency. Each method has its own characteristics and best-use scenarios. Let’s break down the three main approaches:

### 1. Cluster Module

**What It Is:**  
The cluster module lets you create multiple processes (workers) that run copies of your Node.js application. These workers can share the same server port, making it easier to scale an HTTP server across multiple CPU cores.

**How It Works:**  
- The master process spawns worker processes.
- Each worker is a separate instance of your application.
- The operating system load-balances incoming connections across these workers.

**When to Use It:**  
- **Scaling I/O-bound servers:** When your Node.js application is primarily handling many I/O operations (e.g., HTTP requests) and you want to leverage multiple cores.
- **Fault tolerance:** If one worker crashes, the master process can spawn a new one without affecting the others.

**Example:**  
```js
// cluster_example.js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Optionally, you can spawn a new worker here
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection.
  // Here, an HTTP server is created.
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

---

### 2. Worker Threads

**What They Are:**  
Worker Threads, introduced in Node.js 10.5.0 (and stabilized in later versions), allow you to run JavaScript code in parallel threads within the same process. They share memory using `SharedArrayBuffer` and other mechanisms, making them suitable for CPU-intensive operations.

**How They Work:**  
- A main thread can offload heavy computations to worker threads.
- Each worker runs in its own isolated context but can communicate with the main thread using message passing.
- They help keep the event loop responsive by running blocking tasks in parallel.

**When to Use Them:**  
- **CPU-bound tasks:** Such as image processing, complex calculations, or data processing where heavy computation might block the event loop.
- **Fine-grained parallelism:** When you need to share memory or require low-latency communication between threads.

**Example:**  
```js
// worker_threads_example.js
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  console.log('Main thread starting.');

  // Create a worker thread
  const worker = new Worker(__filename);

  // Listen for messages from the worker
  worker.on('message', (result) => {
    console.log(`Received from worker: ${result}`);
  });

  // Send data to the worker
  worker.postMessage(10);
} else {
  // Worker thread: listen for messages from the main thread
  parentPort.on('message', (num) => {
    // Perform a CPU-intensive task (e.g., factorial)
    let result = 1;
    for (let i = 1; i <= num; i++) {
      result *= i;
    }
    // Send the result back
    parentPort.postMessage(result);
  });
}
```

---

### 3. Child Processes

**What They Are:**  
Child processes allow you to spawn external processes using the `child_process` module. These can run any executable or script, not just Node.js code. They operate independently and do not share memory with the parent process.

**How They Work:**  
- The parent process spawns a new process, which can be another Node.js instance or any other program.
- Communication happens via standard input/output (stdin/stdout) or through IPC (Inter-Process Communication) channels.

**When to Use Them:**  
- **Running external commands or scripts:** For instance, if you need to execute a Python script or a shell command from your Node.js application.
- **Isolation:** When you want a high level of isolation because the child process has its own memory and environment.
- **Legacy or mixed-language integration:** When you need to integrate with tools or libraries not available in Node.js.

**Example:**  
```js
// child_process_example.js
const { spawn } = require('child_process');

// Spawning a child process to execute the 'ls' command (list directory contents)
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

```js
// exec is used for executing shell commands
const { exec } = require('child_process');

exec('ls -lh', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

```js
// spawn is used for spawning new processes
const { spawn } = require('child_process');

const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

```js
// fork is used for creating child processes that can communicate with the parent process
const { fork } = require('child_process');

const forked = fork('child.js');

forked.on('message', (msg) => {
  console.log('Message from child:', msg);
});

forked.send({ hello: 'world' });

// child.js
process.on('message', (msg) => {
  console.log('Message from parent:', msg);
  process.send({ hello: 'world' });
});
```

---

### Choosing the Right Approach

- **Cluster Module:**  
  - **Best for:** Scaling network servers to utilize multiple cores.
  - **Use when:** Your application is I/O-bound (e.g., HTTP servers) and you need resilience and load balancing.
  
- **Worker Threads:**  
  - **Best for:** Parallelizing CPU-intensive tasks within the same application.
  - **Use when:** You need to offload heavy computations without blocking the event loop and require shared memory or low-latency communication between tasks.

- **Child Processes:**  
  - **Best for:** Running external programs or commands, or when full process isolation is needed.
  - **Use when:** You want to run tasks that are not written in Node.js, or when you need to isolate a task completely (e.g., running a legacy script, system commands).

Each method has its own strengths. Choosing between them depends on your specific use case—whether you need to scale a server, offload heavy computation, or run external scripts.

---

[<- MERN](mern-quick.md)
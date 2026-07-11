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
  const server = http.createServer((req, res) => {
    // Simulate a long-running operation
    const start = Date.now();
    while (true) {
      if (Date.now() - start > 50000) { // 50 seconds
        break;
      }
    }
    res.writeHead(200);
    res.end(`Worker ${process.pid} responded`);
  });

  server.listen(8000, () => console.log("Server is running on port 8000"));

  console.log(`Worker ${process.pid} started`);
}

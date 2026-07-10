[<- Performance](../performance/perf-quick.md) | [<- MERN](mern-quick.md)

# Express Performance
1. [Express performance best practices](https://expressjs.com/en/advanced/best-practice-performance.html)

# Node Performance

## Streams: 
Utilize Node.js streams for data processing, especially when dealing with large volumes of data. Streams enable data to be processed in chunks, reducing memory usage and improving performance.
```js
const fs = require('fs');
const readableStream = fs.createReadStream('input.txt');
const writableStream = fs.createWriteStream('output.txt');

readableStream.pipe(writableStream);
```

## Caching: 
Cache frequently accessed data using in-memory solutions like Redis to reduce the need for repeated database queries and enhance overall application responsiveness.
```js
const redis = require('redis');
const client = redis.createClient();

// Caching data
const fetchUserData = (userId) => {
  // Simulated data fetch from database
  const userData = { id: userId, name: 'John Doe' };
  // Store data in cache with expiration
  client.setex(`user:${userId}`, 3600, JSON.stringify(userData));
  return userData;
};

// Retrieving data from cache
const getUserData = (userId, callback) => {
  client.get(`user:${userId}`, (err, userData) => {
    if (err) throw err;
    if (userData) {
      return callback(JSON.parse(userData));
    }
    const userData = fetchUserData(userId);
    return callback(userData);
  });
};

getUserData(1, (userData) => {
  console.log(userData);
});
```

## Compression: 
Enable compression for HTTP responses using middleware like compression in a Node.js web framework such as Express.
```js
const express = require('express');
const compression = require('compression');
const app = express();

app.use(compression()); // Enable compression for all routes

// ... Define your routes and application logic
```

## Containerization:
Use container orchestration tools like Docker Swarm or Kubernetes to manage and scale Node.js application instances across a cluster of machines.

## Database Connection Pooling:
Implement connection pooling for database connections to reuse existing connections and minimize the overhead of establishing new connections for each request.

```js
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root,
  password: 'password',
  database: 'mydb'
});

pool.query('SELECT * FROM users', (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});
```

## Optimized Database Queries and Indexing: 
Construct efficient database queries, utilize database indexing, and employ query optimization techniques to minimize database load and response times.

```js
// Efficient query with proper indexing
const users = await User.find({}).limit(10).sort({ createdAt: -1 });

// Index creation
db.collection('users').createIndex({ name: 1 });
```

## Error Handling: 
Implement effective error handling mechanisms to prevent crashes and ensure the application continues to run smoothly in case of errors.

```js
// Implementing centralized error handling middleware in an Express.js application
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Handling unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Logging and other cleanup tasks
  process.exit(1); // Exit the process in case of unhandled rejections
});
```

## Avoid Synchronous Operations: 
Minimize the use of synchronous operations, especially in I/O-bound tasks, and prioritize asynchronous operations to prevent blocking the event loop and maximize concurrency.

Use Promise.all to execute multiple asynchronous operations concurrently and await their results.
```js
function fetchUserData(userId) {
// Simulated data fetch from a database or API
return new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(`User data for user ${userId}`);
  }, 1000);
});
}

const userIds = [1, 2, 3];

Promise.all(userIds.map((id) => fetchUserData(id)))
.then((userData) => {
  console.log(userData);
})
.catch((error) => {
  console.error(error);
});
```

Use Promises or the async/await syntax to handle asynchronous operations in a more readable and maintainable manner.
```js
function fetchData() {
return new Promise((resolve, reject) => {
  // Simulated asynchronous data fetching
  setTimeout(() => {
    resolve('Data fetched');
  }, 1000);
});
}

fetchData()
.then((data) => {
  console.log(data);
})
.catch((error) => {
  console.error(error);
});
```

### Content Delivery Networks (CDNs):
Offload static content delivery to a CDN to reduce the load on the application servers and improve content delivery performance.

## Profiling:
Use Node.js profiling tools like the built-in `--inspect` flag, `v8-profiler`, or `clinic.js` to identify performance bottlenecks, memory leaks, and optimize the application code.
```bash
node --inspect app.js
```

## Performance monitoring:
Implement monitoring solutions like Prometheus, Grafana, or New Relic to track application performance metrics, identify issues, and optimize resource utilization.
```js
// Example of using New Relic for monitoring
const newrelic = require('newrelic');

// Application code
```

## Load Testing:
Conduct load testing using tools like Apache JMeter, Artillery, or Locust to simulate high traffic scenarios and evaluate the application’s performance under various load conditions.
```bash
artillery quick --count 100 -n 100 http://localhost:3000
```

---

# Node Scaling Strategies
Scaling a Node.js application involves increasing its capacity to handle a growing number of users, requests, and data without sacrificing performance. Here are several approaches to scale a Node.js application:

## Horizontal Scaling:
Use a load balancer to distribute incoming traffic across multiple instances of the Node.js application. Each application instance can run on a separate server or container, allowing the application to handle more concurrent requests. 

## Vertical Scaling:
Upgrade the server hosting the Node.js application with more resources, such as CPU, memory, or storage, to support increased loads and processing requirements.

## Clustering:
Utilize Node.js’s built-in cluster module to create a cluster of Node.js processes running on a single machine, effectively utilizing multiple CPU cores to handle incoming requests.

## Containerization and Orchestration:
Use containerization technologies like Docker to package the application and its dependencies into containers. Orchestrate these containers with tools like Kubernetes to manage and scale them across a cluster of machines.

## Serverless Architecture:
Consider migrating parts of the application to a serverless architecture, where the infrastructure automatically scales to match the application’s demand. Services like AWS Lambda or Azure Functions can be used for executing application code in a serverless manner.

## Database Scaling:
Scale the database layer independently to handle increased data volume and read/write operations. This can involve sharding, replication, using distributed databases, or utilizing managed database services that support auto-scaling.

## Monitoring and Auto-Scaling:
Set up monitoring and alerting systems to track the application’s performance and resource usage. Use cloud services that offer auto-scaling based on predefined metrics to automatically adjust the application’s capacity.

---

[<- Performance](../performance/perf-quick.md) | [<- MERN](mern-quick.md)

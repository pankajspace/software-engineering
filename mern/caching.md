[<- Performance](../performance/perf-quick.md) | [<- MERN](mern-quick.md)

# Client-Side Caching

Client-Side Caching is a technique where data is stored locally on the user's device, typically in the browser, so that it can be retrieved quickly without needing to repeatedly request it from the server. This improves performance by reducing server load and latency, and it enhances the user experience by speeding up page loads and interactions.

## 1. HTTP Caching (Using Cache-Control and ETag Headers)

### Description:
HTTP caching allows the browser to cache responses from the server based on headers like `Cache-Control` and `ETag`. The server tells the browser how long a response can be cached, or how to validate if the cache is still fresh.

### Example:
1. Cache-Control Header: You can specify caching policies for your static assets like JavaScript, CSS, or images. In this example, assets are cached for one day.

   In Express.js (Backend):
   ```js
   app.use(express.static('public', {
     maxAge: '1d'  // Cache assets for 1 day
   }));
   ```

2. ETag Header: An `ETag` (Entity Tag) is a unique identifier assigned to a specific version of a resource. The browser can send an `If-None-Match` request to check if the resource has changed since it was last cached.

   In Express.js:
   ```js
   app.use((req, res, next) => {
     res.setHeader('ETag', 'unique-hash-id');
     next();
   });
   ```

3. Browser Response:
   - If the browser has a cached version and it is still valid (based on `Cache-Control` or `ETag`), the server responds with a 304 Not Modified status, and the browser serves the cached content.
   - If the resource has been updated, the server sends the new version.

### Advantages:
- Effective for caching static assets.
- Reduces the need to download the same resources repeatedly.
  
## 2. Local Storage and Session Storage

### Description:
Local Storage and Session Storage are two browser-based storage mechanisms that allow you to store key-value pairs on the client-side. Local storage persists even after the browser is closed, while session storage is cleared when the tab or window is closed.

### Example:
1. Local Storage: Store data that should persist across page reloads or browser sessions. Use this for storing non-sensitive data like user preferences.

   Example (React or Vanilla JavaScript):
   ```js
   // Storing data in local storage
   localStorage.setItem('theme', 'dark');

   // Retrieving data from local storage
   const theme = localStorage.getItem('theme');
   console.log(theme);  // Outputs: dark
   ```

2. Session Storage: Store data that is only needed for the current session, such as form data that the user might be filling out.

   Example (React or Vanilla JavaScript):
   ```js
   // Storing data in session storage
   sessionStorage.setItem('cart', JSON.stringify([{ item: 'Book', quantity: 1 }]));

   // Retrieving data from session storage
   const cart = JSON.parse(sessionStorage.getItem('cart'));
   console.log(cart);  // Outputs: [{ item: 'Book', quantity: 1 }]
   ```

### Use Cases:
- Local Storage: Storing user preferences (e.g., theme settings), application state (e.g., last visited page), or lightweight non-sensitive data.
- Session Storage: Temporary storage for session-based data (e.g., shopping cart items, form input data) that is cleared when the session ends.

## 3. Service Workers (Caching API Responses and Assets for Offline Use)

### Description:
Service workers are a script that runs in the background of your web application, intercepting network requests and managing offline behavior. They allow you to cache entire web pages, assets, or API responses so users can access the site even when they're offline.

### Example:
Using service workers to cache API responses and assets in a Progressive Web App (PWA):

#### Register the Service Worker (React or Vanilla JavaScript):
   ```js
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/service-worker.js')
       .then(reg => console.log('Service worker registered:', reg))
       .catch(err => console.log('Service worker registration failed:', err));
   }
   ```

#### Service Worker File (`service-worker.js`):
   ```js
   // Cache the app shell and assets
   const CACHE_NAME = 'my-cache-v1';
   const urlsToCache = [
     '/',
     '/index.html',
     '/static/js/main.js',
     '/static/css/main.css',
   ];

   // Install event
   self.addEventListener('install', (event) => {
     event.waitUntil(
       caches.open(CACHE_NAME).then((cache) => {
         console.log('Opened cache');
         return cache.addAll(urlsToCache);
       })
     );
   });

   // Fetch event to serve cached content
   self.addEventListener('fetch', (event) => {
     event.respondWith(
       caches.match(event.request)
         .then((response) => {
           if (response) {
             return response;  // Serve cached response
           }
           return fetch(event.request);  // Fetch from network if not cached
         })
     );
   });
   ```

#### Caching API Responses:
   In addition to static assets, you can cache API responses to handle data retrieval during offline or slow network scenarios.

   ```js
   self.addEventListener('fetch', (event) => {
     if (event.request.url.includes('/api/')) {
       event.respondWith(
         caches.open(CACHE_NAME).then((cache) => {
           return fetch(event.request).then((response) => {
             cache.put(event.request.url, response.clone());  // Cache API response
             return response;
           }).catch(() => caches.match(event.request));  // Serve from cache if offline
         })
       );
     }
   });
   ```

### Use Cases:
- Offline-first web applications (PWAs).
- Caching static assets like HTML, CSS, and JS for faster load times.
- Storing API responses for offline access or performance boosts.

## 4. IndexedDB (For Complex Client-Side Data Storage)

### Description:
IndexedDB is a low-level API for client-side storage of large amounts of structured data, including files and blobs. Unlike local or session storage, IndexedDB allows you to store more complex and larger datasets in the browser, making it ideal for offline applications or local storage of large datasets.

### Example:
Using IndexedDB to cache and store data locally:

1. Opening a Database:
   ```js
   const request = indexedDB.open('MyDatabase', 1);

   request.onupgradeneeded = (event) => {
     const db = event.target.result;
     db.createObjectStore('users', { keyPath: 'id' });
   };
   ```

2. Adding Data:
   ```js
   request.onsuccess = (event) => {
     const db = event.target.result;
     const transaction = db.transaction(['users'], 'readwrite');
     const objectStore = transaction.objectStore('users');
     objectStore.add({ id: 1, name: 'John Doe', age: 30 });
   };
   ```

3. Fetching Data:
   ```js
   request.onsuccess = (event) => {
     const db = event.target.result;
     const transaction = db.transaction(['users']);
     const objectStore = transaction.objectStore('users');
     const getRequest = objectStore.get(1);

     getRequest.onsuccess = (event) => {
       console.log(event.target.result);  // Outputs: { id: 1, name: 'John Doe', age: 30 }
     };
   };
   ```

### Use Cases:
- Storing large datasets locally for offline access.
- Caching complex data structures, such as file blobs or serialized JSON objects.
- Implementing offline functionality for web applications like note-taking apps, file managers, or client-side databases.

## 5. React Query or SWR for Data Fetching and Caching

### Description:
In React applications, libraries like React Query or SWR provide client-side caching of API data with automatic data fetching, caching, and synchronization.

### Example with React Query:
1. Install React Query:
   ```bash
   npm install @tanstack/react-query
   ```

2. React Query Example:
   ```js
   import { useQuery } from '@tanstack/react-query';
   
   function fetchUser(userId) {
     return fetch(`/api/users/${userId}`).then(res => res.json());
   }

   function UserProfile({ userId }) {
     const { data, error, isLoading } = useQuery(['user', userId], () => fetchUser(userId), {
       staleTime: 60000,  // Cache data for 1 minute
     });

     if (isLoading) return 'Loading...';
     if (error) return 'An error occurred';

     return <div>{data.name}</div>;
   }
   ```

### Advantages:
- Automatically caches and reuses data, reducing the number of API calls.
- Handles background refetching and cache invalidation automatically

## Conclusion

Client-side caching is a powerful technique for improving the performance of web applications. Using browser APIs like Local Storage, Session Storage, Service Workers, and IndexedDB, along with HTTP caching mechanisms like Cache-Control and ETag, allows you to store frequently accessed data closer to the user. Libraries like React Query or SWR provide automatic caching for data fetching in modern frontend applications.

Choosing the right caching mechanism depends on your specific use case, data size, and how long you want the data to persist in the cache.

---

# Server-Side Caching

Server-Side Caching is a technique used to improve the performance and scalability of web applications by temporarily storing data on the server. The main goal of server-side caching is to reduce the load on the database or other backend services by serving frequently requested data from cache instead of recomputing or refetching it every time. This helps improve response times and reduces the cost of accessing resources.

There are various server-side caching strategies, and they can be applied at different levels depending on the architecture of the application. Here’s a detailed look at server-side caching techniques along with examples.

## 1. In-Memory Caching

### Description:
In-memory caching stores data in the server’s RAM, making it extremely fast to access. This is commonly used to cache frequently requested data (e.g., database query results or API responses) directly in the server's memory. 

Popular Tools: 
- Node.js: Libraries like `memory-cache` or `node-cache`.
- Python: Libraries like `cachetools`.

### Example with Node.js (Using Node-Cache):
```js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 }); // TTL of 60 seconds

// Example route to fetch data with caching
app.get('/api/data', (req, res) => {
  // Check if data is in cache
  const cachedData = cache.get('myData');
  if (cachedData) {
    return res.json(cachedData);  // Return cached data
  }

  // Simulate data fetching (e.g., from database)
  const fetchedData = { id: 1, name: 'John Doe' };

  // Store data in cache for future requests
  cache.set('myData', fetchedData);
  res.json(fetchedData);
});
```

Pros:
- Fast since data is stored in memory.
- Simple to implement for small datasets or frequently accessed endpoints.

Cons:
- Limited by the server’s available memory.
- Data is lost if the server restarts or crashes.

## 2. Distributed Caching (Using Redis or Memcached)

### Description:
Distributed caching involves using external systems like Redis or Memcached to cache data. These are highly performant in-memory caching systems that can be distributed across multiple servers, making them scalable and persistent across different instances of your application.

Popular Tools:
- Redis: Provides more advanced features such as persistence, replication, and data structures.
- Memcached: Simpler and optimized for storing small, frequently used chunks of data.

### Example with Redis in Node.js:

1. Install Redis Client:
   ```bash
   npm install redis
   ```

2. Basic Redis Cache Implementation:
   ```js
   const redis = require('redis');
   const client = redis.createClient();

   client.on('error', (err) => {
     console.log('Redis error: ', err);
   });

   app.get('/api/users/:id', (req, res) => {
     const userId = req.params.id;

     // Check Redis cache
     client.get(`user:${userId}`, (err, data) => {
       if (data) {
         return res.json(JSON.parse(data));  // Return cached user data
       }

       // Simulate database call if cache miss
       const user = { id: userId, name: 'Jane Doe' };

       // Store result in Redis with an expiration of 1 hour
       client.setex(`user:${userId}`, 3600, JSON.stringify(user));

       res.json(user);
     });
   });
   ```

Pros:
- Redis and Memcached are very fast, making them suitable for high-traffic applications.
- Distributed caching works across multiple application servers.
- Redis supports persistence (storing data on disk).

Cons:
- Requires external infrastructure (Redis or Memcached server).
- Slightly more complex to manage than in-memory caches.

## 3. Content Delivery Network (CDN) Caching

### Description:
A Content Delivery Network (CDN) caches static content (e.g., images, CSS, JavaScript) at edge servers around the world. When a user requests a resource, the CDN serves the cached version from the nearest location, reducing load on the origin server and improving load times for users across the globe.

Popular CDNs:
- Cloudflare, Amazon CloudFront, Akamai.

### Example:
- CDN caching is usually handled via HTTP headers (like `Cache-Control` or `Expires`) that instruct the CDN on how long to cache the content.

In Express.js, you can set `Cache-Control` headers for your static assets to optimize CDN caching:
```js
app.use(express.static('public', {
  maxAge: '30d'  // Cache static assets for 30 days
}));
```

Pros:
- Reduces load on the server and accelerates the delivery of static content.
- Improves global performance by caching content close to the user’s location.

Cons:
- Limited to static content and doesn’t handle dynamic data well.
- Requires configuration of external CDN services.

## 4. HTTP Response Caching

### Description:
HTTP response caching stores the results of API responses so that subsequent requests for the same data can be served from the cache instead of hitting the backend server or database. This is typically done by setting appropriate HTTP cache headers, such as `Cache-Control`, `Expires`, and `ETag`.

### Example:
- You can implement HTTP response caching in Express.js by setting appropriate headers to tell the client or proxy server to cache the response.

```js
app.get('/api/products', (req, res) => {
  // Set Cache-Control header to cache response for 1 hour
  res.set('Cache-Control', 'public, max-age=3600');

  // Simulate database query
  const products = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }];

  res.json(products);
});
```

Pros:
- Simple to implement using HTTP headers.
- Works with static or infrequently changing data.

Cons:
- Not suitable for data that changes frequently.
- Cache invalidation must be managed carefully to avoid serving stale data.

## 5. Database Query Caching

### Description:
Database query caching involves storing the results of frequently executed or expensive queries in a cache. This is useful for reducing the load on the database and improving performance, especially for read-heavy operations.

Popular Tools:
- Redis (for query result caching).
- In-memory cache (for caching query results).

### Example with MongoDB and Redis:
You can cache the results of MongoDB queries in Redis to avoid redundant database lookups for the same data.

```js
app.get('/api/reports/sales', (req, res) => {
  // Check Redis cache for cached sales report
  client.get('salesReport', (err, salesReport) => {
    if (salesReport) {
      return res.json(JSON.parse(salesReport));  // Return cached report
    }

    // Perform database query (e.g., aggregation in MongoDB)
    db.collection('sales').aggregate([...]).toArray((err, report) => {
      if (err) return res.status(500).send('Error fetching data');

      // Cache the result in Redis for future use (1 hour)
      client.setex('salesReport', 3600, JSON.stringify(report));

      res.json(report);
    });
  });
});
```

Pros:
- Reduces load on the database for expensive or frequently executed queries.
- Increases performance for data-heavy applications.

Cons:
- Cache invalidation must be handled carefully, especially if the underlying data changes frequently.
- Slightly more complex setup than basic in-memory caching.

## 6. Reverse Proxy Caching (e.g., NGINX)

### Description:
A reverse proxy like NGINX can be used to cache responses from the backend server before they reach the client. This allows you to cache entire pages or API responses at the proxy level, reducing the load on your application servers.

### Example:
In NGINX, you can configure reverse proxy caching to cache API responses or static assets.

1. Basic NGINX Cache Configuration:
   ```nginx
   server {
     location /api/ {
       proxy_pass http://localhost:3000;        # Forward requests to node app server
       proxy_cache my_cache;                    # Use the cache zone named 'my_cache'
       proxy_cache_valid 200 1h;                # Cache valid responses for 1 hour
       proxy_cache_bypass $http_cache_control;  # Bypass cache if necessary
     }
   }
   ```

2. Enable NGINX Cache:
   ```nginx
   proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m;
   ```

Pros:
- Can cache entire responses at the proxy level.
- Reduces load on the application server by handling caching externally.

Cons:
- Can be complex to configure and manage.
- Requires separate infrastructure (NGINX or similar reverse proxy).

## 7. Cache Invalidation

### Description:
Cache invalidation is a crucial part of any caching strategy. It ensures that stale or outdated data is removed from the cache when the underlying data changes. Common cache invalidation strategies include:

- Time-based Expiration (TTL): Cached data expires after a certain amount of time.
- Manual Invalidation: The application explicitly invalidates or updates cached data when there are changes in the database.
- Event-based In

validation: Cache invalidation occurs when specific events happen (e.g., a database update).

### Example (Manual Invalidation with Redis):
```js
// Invalidate cache when new data is added
app.post('/api/users', (req, res) => {
  const newUser = req.body;

  // Insert into MongoDB
  db.collection('users').insertOne(newUser, (err, result) => {
    if (err) return res.status(500).send('Error saving user');

    // Manually invalidate cache
    client.del('usersList');
    res.status(201).json(result.ops[0]);
  });
});
```

## Conclusion

Server-side caching is a powerful technique for improving the performance, scalability, and responsiveness of web applications. Depending on the architecture and the specific needs of your application, you can implement a range of caching strategies, such as in-memory caching, distributed caching with Redis or Memcached, HTTP response caching, CDN caching, and reverse proxy caching with NGINX. 

Choosing the right strategy often depends on the type of data you need to cache, how frequently it changes, and the infrastructure you have available. It's also essential to implement proper cache invalidation strategies to ensure that stale data is not served to users.

---

[<- Performance](../performance/perf-quick.md) | [<- MERN](mern-quick.md)


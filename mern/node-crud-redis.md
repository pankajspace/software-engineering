[<- MERN](mern-quick.md)

## Node.js CRUD API with MongoDB and Redis

In this example, we’ll build a **Node.js CRUD API** with MongoDB for primary data storage and Redis for caching. We’ll use MongoDB to store our data persistently and Redis to cache data to improve response times for frequently accessed resources. The application will perform CRUD operations on an "items" collection.

### Key Concepts

- **MongoDB**: A NoSQL database used as the primary data store.
- **Redis**: An in-memory data store used for caching, improving read speeds by reducing MongoDB queries.
- **Express**: A web framework for building APIs in Node.js.
- **Mongoose**: A MongoDB Object Data Modeling (ODM) library for Node.js.

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- A **MongoDB** instance running (locally or on a cloud provider like MongoDB Atlas).
- **Redis** running on your local machine or on a cloud service like Redis Labs.

---

### Step 1: Project Setup

1. Create a project directory and navigate into it:

   ```bash
   mkdir nodejs-crud-redis
   cd nodejs-crud-redis
   ```

2. Initialize a new Node.js project and install dependencies:

   ```bash
   npm init -y
   npm install express mongoose redis body-parser
   ```

   - **express**: Minimalist framework for building APIs.
   - **mongoose**: An ODM library for MongoDB and Node.js.
   - **redis**: Library to interact with Redis.
   - **body-parser**: Middleware for parsing incoming JSON requests.

---

### Step 2: Define the Project Structure

Create the following structure:

```
nodejs-crud-redis
│
├── app.js           # Main application file
├── models
│   └── Item.js      # Mongoose model for Item
└── routes
    └── items.js     # CRUD routes for the API
```

### Step 3: Create a Mongoose Model

In `models/Item.js`, define a Mongoose schema for an item. Each item will have a `name`, `description`, `price`, and `dateAdded`.

```javascript
// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
```

### Step 4: Set Up Express, Connect to MongoDB and Redis

In `app.js`, set up Express, connect to MongoDB using Mongoose, and create a Redis client.

```javascript
// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const redis = require('redis');
const itemsRoute = require('./routes/items');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/nodejs_crud', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

// Redis connection
const redisClient = redis.createClient();
redisClient.on('connect', () => {
  console.log('Connected to Redis...');
});

// Middleware to pass the Redis client to routes
app.use((req, res, next) => {
  req.redisClient = redisClient;
  next();
});

// Routes
app.use('/api/items', itemsRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Step 5: Define CRUD Routes with Caching

In `routes/items.js`, define the CRUD operations. We’ll use Redis to cache data and speed up responses for read operations.

```javascript
// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// CREATE - Add a new item
router.post('/', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ - Get all items with caching
router.get('/', async (req, res) => {
  const redisClient = req.redisClient;

  // Check Redis cache for items
  redisClient.get('all_items', async (err, cachedItems) => {
    if (cachedItems) {
      console.log('Serving from Redis cache');
      return res.json(JSON.parse(cachedItems));
    } else {
      try {
        const items = await Item.find();
        redisClient.setex('all_items', 3600, JSON.stringify(items)); // Cache for 1 hour
        res.json(items);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  });
});

// READ - Get a specific item by ID with caching
router.get('/:id', async (req, res) => {
  const redisClient = req.redisClient;
  const itemId = req.params.id;

  // Check Redis cache for the item
  redisClient.get(`item_${itemId}`, async (err, cachedItem) => {
    if (cachedItem) {
      console.log('Serving from Redis cache');
      return res.json(JSON.parse(cachedItem));
    } else {
      try {
        const item = await Item.findById(itemId);
        if (item) {
          redisClient.setex(`item_${itemId}`, 3600, JSON.stringify(item)); // Cache for 1 hour
          res.json(item);
        } else {
          res.status(404).json({ message: 'Item not found' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  });
});

// UPDATE - Update an item by ID
router.put('/:id', async (req, res) => {
  const redisClient = req.redisClient;
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
      },
      { new: true }
    );
    if (updatedItem) {
      redisClient.del('all_items'); // Clear cache of all items
      redisClient.del(`item_${req.params.id}`); // Clear cache for specific item
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete an item by ID
router.delete('/:id', async (req, res) => {
  const redisClient = req.redisClient;
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (deletedItem) {
      redisClient.del('all_items'); // Clear cache of all items
      redisClient.del(`item_${req.params.id}`); // Clear cache for specific item
      res.json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### Explanation of the CRUD Routes

- **POST** `/api/items/`: Creates a new item and stores it in MongoDB.
- **GET** `/api/items/`: Retrieves all items. First, it checks if the data is available in Redis. If not, it queries MongoDB and caches the data in Redis for future requests.
- **GET** `/api/items/:id`: Retrieves a specific item by its ID. The result is cached in Redis, so subsequent requests for the same item ID can be served from the cache.
- **PUT** `/api/items/:id`: Updates an item by its ID. After updating, it clears the cache for all items and the specific item ID, ensuring that stale data is not served.
- **DELETE** `/api/items/:id`: Deletes an item by its ID and clears the cache to maintain data consistency.

### Step 6: Run and Test the Application

1. Start MongoDB and Redis servers if they are not already running.

2. Start the Node.js application:

   ```bash
   node app.js
   ```

3. Use **Postman** or **curl** to test the CRUD API.

   - **Create a new item**:
     ```http
     POST http://localhost:3000/api/items
     Content-Type: application/json
     Body: {
       "name": "Product1",
       "description": "Description of Product1",
       "price": 50
     }
     ```

   - **Get all items**:
     ```http
     GET http://localhost:3000/api/items
     ```

   - **Get a specific item by ID**:
     ```http
     GET http://localhost:3000/api/items/<item_id>
     ```

   - **Update an item**:
     ```http
     PUT http://localhost:3000/api/items/<item_id>
     Content-Type: application/json


     Body: {
       "name": "Updated Product",
       "description": "Updated description",
       "price": 75
     }
     ```

   - **Delete an item**:
     ```http
     DELETE http://localhost:3000/api/items/<item_id>
     ```

### Summary

This Node.js CRUD application uses MongoDB as a persistent database and Redis as a caching layer. This architecture enhances performance by reducing MongoDB read operations with Redis caching. This setup can be expanded to include more complex caching strategies and data handling as your application grows.

---

[<- MERN](mern-quick.md)

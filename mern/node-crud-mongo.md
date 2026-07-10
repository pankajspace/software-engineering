[<- MERN](mern-quick.md)

## Node.js CRUD Application with MongoDB

Creating a Node.js CRUD (Create, Read, Update, Delete) application with MongoDB is a great way to get started with building RESTful APIs. In this example, we’ll build a simple API that allows you to perform CRUD operations on a MongoDB collection for managing items (like "products" or "tasks").

Here’s what we’ll cover:

1. **Setup**: Setting up a basic Node.js application.
2. **Database Connection**: Connecting to MongoDB.
3. **CRUD Routes**: Creating API routes for each CRUD operation.
4. **Running the Application**.

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- A **MongoDB** instance running locally or in the cloud (e.g., MongoDB Atlas).
- **Postman** (or a similar tool) for testing the API.

---

### Step 1: Setup a New Node.js Project

1. Create a new directory for your project and navigate into it.

   ```bash
   mkdir nodejs-crud-app
   cd nodejs-crud-app
   ```

2. Initialize a new Node.js project and install the required packages.

   ```bash
   npm init -y
   npm install express mongoose body-parser
   ```

   - **express**: A minimal and flexible Node.js web application framework.
   - **mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
   - **body-parser**: Middleware for parsing request bodies.

### Step 2: Project Structure

Create the following structure in your project directory:

```
nodejs-crud-app
│
├── app.js           # Main application file
├── models
│   └── Item.js      # Mongoose model for Item
└── routes
    └── items.js     # Routes for CRUD operations
```

### Step 3: Define the Mongoose Model

In `models/Item.js`, define a Mongoose schema for our items. Each item will have a `name`, `description`, `price`, and `dateAdded`.

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

### Step 4: Set Up Express and Connect to MongoDB

In `app.js`, set up Express and connect to MongoDB using Mongoose. Add middleware to parse JSON bodies, and set up routing for the CRUD operations.

```javascript
// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemsRoute = require('./routes/items');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nodejs_crud', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

// Routes
app.use('/api/items', itemsRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

- **MongoDB Connection**: Adjust the MongoDB URL if you’re using a cloud-hosted database.
- **Routes**: All CRUD routes will be accessible under `/api/items`.

### Step 5: Define CRUD Routes

In `routes/items.js`, define the routes for CRUD operations:

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

// READ - Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Get a specific item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - Update an item by ID
router.put('/:id', async (req, res) => {
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
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (deletedItem) {
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

Each route handler performs a specific operation:

- **POST** `/api/items/`: Creates a new item.
- **GET** `/api/items/`: Retrieves all items.
- **GET** `/api/items/:id`: Retrieves an item by ID.
- **PUT** `/api/items/:id`: Updates an item by ID.
- **DELETE** `/api/items/:id`: Deletes an item by ID.

### Step 6: Run and Test the Application

1. Start the server:

   ```bash
   node app.js
   ```

2. Test the endpoints using **Postman** or **curl**:

   - **Create a new item**:
     ```http
     POST http://localhost:3000/api/items
     Content-Type: application/json
     Body: {
       "name": "Item1",
       "description": "This is item 1",
       "price": 100
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
       "name": "Updated Item",
       "description": "Updated description",
       "price": 150
     }
     ```

   - **Delete an item**:
     ```http
     DELETE http://localhost:3000/api/items/<item_id>
     ```

### Summary

This setup creates a basic CRUD API with Node.js and MongoDB. You can now use this API to manage items and perform database operations with ease. This example can be extended and modified for more complex data models and features as needed.

---

[<- MERN](mern-quick.md)

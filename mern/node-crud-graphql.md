[<- MERN](mern-quick.md)

## Node.js GraphQL CRUD with MongoDB

To build a detailed Node.js CRUD application using **GraphQL** and **MongoDB**, we’ll set up an API that allows clients to perform CRUD operations on an "items" collection.

### Project Overview

- **Node.js**: The runtime environment.
- **Express**: The framework for handling server routes and middleware.
- **Apollo Server**: The GraphQL server to manage GraphQL queries and mutations.
- **MongoDB**: The database to store data persistently.
- **Mongoose**: An ODM (Object Data Modeling) library to interact with MongoDB.

### Prerequisites

- **Node.js** and **npm** installed.
- A **MongoDB** instance running (either locally or on MongoDB Atlas).
- **GraphQL Playground** for testing queries (comes with Apollo Server).

---

### Step 1: Project Setup

1. **Create a new directory** for the project and navigate into it:

   ```bash
   mkdir nodejs-graphql-crud
   cd nodejs-graphql-crud
   ```

2. **Initialize a new Node.js project** and install the required dependencies:

   ```bash
   npm init -y
   npm install express mongoose apollo-server-express graphql
   ```

   - **express**: A minimalist framework for creating APIs.
   - **mongoose**: A MongoDB ODM (Object Data Modeling) library.
   - **apollo-server-express**: Integrates Apollo Server with Express.
   - **graphql**: The GraphQL query language for APIs.

---

### Step 2: Define the Project Structure

Here’s a simple structure for our project:

```
nodejs-graphql-crud
│
├── app.js           # Main application file
├── models
│   └── Item.js      # Mongoose model for Item
└── graphql
    ├── schema.js    # GraphQL schema definition
    └── resolvers.js # GraphQL resolvers for CRUD operations
```

---

### Step 3: Define the Mongoose Model

In `models/Item.js`, define a Mongoose schema to represent items in our MongoDB database. Each item will have the following fields: `name`, `description`, `price`, and `dateAdded`.

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

---

### Step 4: Define the GraphQL Schema

In `graphql/schema.js`, define the schema that describes the **Item** type and CRUD operations (queries and mutations) for the items.

```javascript
// graphql/schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    description: String
    price: Float!
    dateAdded: String
  }

  type Query {
    getItems: [Item]
    getItem(id: ID!): Item
  }

  type Mutation {
    addItem(name: String!, description: String, price: Float!): Item
    updateItem(id: ID!, name: String, description: String, price: Float): Item
    deleteItem(id: ID!): String
  }
`;

module.exports = typeDefs;
```

Explanation of the GraphQL Schema:
- **Item Type**: Defines the structure of an item.
- **Queries**:
  - `getItems`: Fetches a list of items.
  - `getItem`: Fetches a single item by ID.
- **Mutations**:
  - `addItem`: Creates a new item.
  - `updateItem`: Updates an item.
  - `deleteItem`: Deletes an item by ID.

---

### Step 5: Define the Resolvers

In `graphql/resolvers.js`, define the logic to handle each query and mutation operation specified in the schema.

```javascript
// graphql/resolvers.js
const Item = require('../models/Item');

const resolvers = {
  Query: {
    getItems: async () => {
      return await Item.find();
    },
    getItem: async (_, { id }) => {
      return await Item.findById(id);
    }
  },
  Mutation: {
    addItem: async (_, { name, description, price }) => {
      const newItem = new Item({ name, description, price });
      return await newItem.save();
    },
    updateItem: async (_, { id, name, description, price }) => {
      return await Item.findByIdAndUpdate(
        id,
        { name, description, price },
        { new: true }
      );
    },
    deleteItem: async (_, { id }) => {
      await Item.findByIdAndDelete(id);
      return "Item deleted successfully";
    }
  }
};

module.exports = resolvers;
```

- Each resolver function corresponds to a query or mutation in the schema.
- **Queries** handle data retrieval.
- **Mutations** handle data creation, updating, and deletion.

---

### Step 6: Set Up Express and Apollo Server

In `app.js`, set up the Express server, connect to MongoDB, and configure Apollo Server with the schema and resolvers.

```javascript
// app.js
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Initialize the app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nodejs_graphql')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Initialize Apollo Server
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql' });

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
});
```

Explanation:
- **Apollo Server**: Configured with the `typeDefs` and `resolvers`, making it the endpoint for our GraphQL API.
- **Express**: Hosts the `/graphql` endpoint where the API can be accessed.

---

### Step 7: Run the Application

1. Start MongoDB if it’s not already running.

2. Start the Node.js server:

   ```bash
   node app.js
   ```

3. Open **GraphQL Playground** at `http://localhost:3000/graphql` to interact with the API.

---

### Step 8: Testing the API with GraphQL Queries

In the GraphQL Playground, test the CRUD operations using the following queries and mutations:

#### 1. Create a New Item

```graphql
mutation {
  addItem(name: "Laptop", description: "A high-end laptop", price: 1500.0) {
    id
    name
    description
    price
  }
}
```

#### 2. Retrieve All Items

```graphql
query {
  getItems {
    id
    name
    description
    price
    dateAdded
  }
}
```

#### 3. Retrieve a Single Item by ID

Replace `YOUR_ITEM_ID_HERE` with an actual item ID from your database.

```graphql
query {
  getItem(id: "YOUR_ITEM_ID_HERE") {
    id
    name
    description
    price
  }
}
```

#### 4. Update an Item by ID

```graphql
mutation {
  updateItem(id: "YOUR_ITEM_ID_HERE", name: "Updated Laptop", description: "Updated description", price: 1600.0) {
    id
    name
    description
    price
  }
}
```

#### 5. Delete an Item by ID

```graphql
mutation {
  deleteItem(id: "YOUR_ITEM_ID_HERE")
}
```

---

### Summary

1. **GraphQL Schema**: Defines types and operations (queries and mutations) for the API.
2. **Resolvers**: Implement the logic for each query and mutation.
3. **Apollo Server with Express**: Sets up a `/graphql` endpoint to handle GraphQL requests.
4. **MongoDB with Mongoose**: Manages data persistence.

This example demonstrates how to build a basic GraphQL CRUD API with Node.js and MongoDB, making it easy to query and manipulate data flexibly. The application can be further expanded with additional features like authentication, error handling, and data validation.

---

[<- MERN](mern-quick.md)

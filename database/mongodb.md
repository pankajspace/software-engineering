[<- Database](database-quick.md)

# Mongodb Examples with Mongooose

## Mongooose Schema & Model

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

## Mongoose Connection

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
```

## Mongoose CRUD Operations

```javascript
const User = require('./models/user');

const createUser = async () => {
  const user = new User({
    name: 'Pankaj',
    email: 'pankaj@test.com', 
    password: 'password',
    age: 30,
  });   

  try {
    await user.save();
    console.log(user);
  } catch (e) {
    console.log(e);
  }
};

const findUser = async () => {
  try {
    const users = await User.find({});
    console.log(users);
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async () => {
  try {
    const user = await User.findByIdAndUpdate('5f7b1b3b1b3b1b3b1b3b1b3', { age: 31 }, { new: true });
    console.log(user);
  } catch (e) {
    console.log(e);
  }
};

// update user using upsert option
const updateUser = async () => {
  try {
    const user = await User.findByIdAndUpdate('5f7b1b3b1b3b1b3b1b3b1b3', { age: 31 }, { new: true, upsert: true });
    console.log(user);
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async () => {
  try {
    const user = await User.findByIdAndDelete('5f7b1b3b1b3b1b3b1b3b1b3');
    console.log(user);
  } catch (e) {
    console.log(e);
  }
};

createUser();
findUser();
updateUser();
deleteUser();
```

## Mongoose Middleware

```javascript
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
```

## Mongoose Virtuals
In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.

Suppose you have a User model. Every user has an email, but you also want the email's domain. For example, the domain portion of 'test@gmail.com' is 'gmail.com'. You can create a virtual property for the domain.

```javascript
const userSchema = mongoose.Schema({
  email: String
});
// Create a virtual property `domain` that's computed from `email`.
userSchema.virtual('domain').get(function() {
  return this.email.slice(this.email.indexOf('@') + 1);
});
const User = mongoose.model('User', userSchema);

const doc = await User.create({ email: 'test@gmail.com' });
// `domain` is now a property on User documents.
doc.domain; // 'gmail.com'
```

## Mongoose Populate
Populate is a Mongoose feature that lets you automatically replace the specified paths in a document with document(s) from other collection(s). You can use populate to reference documents in other collections.

Suppose you have a User model and a Task model. Each task has an owner field that references a user. You can use populate to replace the owner field with the actual user document.

```javascript
const userSchema = new mongoose.Schema({
  name: String
});
const taskSchema = new mongoose.Schema({
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

const user = await User.create({ name: 'Pankaj' });
const task = await Task.create({ description: 'Task 1', owner: user._id });

// Populate the `owner` field in the task document.
const populatedTask = await Task.findById(task._id).populate('owner', 'name').exec();
populatedTask.owner.name; // 'Pankaj'
```

## Mongoose Pagination

```javascript
const users = await User.find({}).limit(2).skip(2);
console.log(users);
```

## Mongoose Sorting

```javascript
const users = await User.find({}).sort({ name: 1 });
console.log(users);
```

## Mongoose Validation

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  }
}, {
  timestamps: true
});
```

## Mongoose Relationship

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});
const User = mongoose.model('User', userSchema);

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
```

## Mongoose Indexing

```javascript
// Create a single field index on the `email` field.
userSchema.index({ email: 1 }, { unique: true });

// Create a compound index on the `name` and `age` fields.
userSchema.index({ name: 1, age: 1 });

// Create a text index on the `name` field.
userSchema.index({ name: 'text' });

// Create a hashed index on the `email` field.
userSchema.index({ email: 'hashed' });
```

## Mongoose Aggregation
Aggregation in Mongoose allows you to run complex queries on your data. You can use the aggregate method to perform operations like filtering, grouping, sorting, and more.

1. $match: Filters documents based on a condition.
2. $group: Groups documents by a specified field and calculates aggregate values.
3. $sort: Sorts documents based on a field.
4. $limit: Limits the number of documents returned.
5. $skip: Skips a specified number of documents.
6. $project: Includes or excludes fields in the output.
7. $count: Counts the number of documents in the output.
8. $lookup: Performs a left outer join with another collection.
9. $unionWith: Combines documents from another collection.

```javascript
const users = await User.aggregate([
  {
    $match: {
      age: { $gte: 30 }
    }
  },
  {
    $group: {
      _id: null,
      count: { $sum: 1 }
    }
  }
]);
console.log(users);
```

## Mongoose Query

```javascript
// Find all users with age greater than or equal to 30.
const users = await User.find({ age: { $gte: 30 } });

// Find all users with age greater than or equal to 30 and sort by name.
const users = await User.find({ age: { $gte: 30 } }).sort({ name: 1 });
```

## Mongoose Transactions

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  await user.save({ session });
  await task.save({ session });
  await session.commitTransaction();
} catch (e) {
  await session.abortTransaction();
}
```

---

# MongoDB Advanced Concepts with Examples

MongoDB is a NoSQL, document-oriented database that offers advanced features for building scalable and high-performance applications. Here are some of the most important advanced MongoDB concepts, each with examples.

---

## 1. Sharding

Sharding is MongoDB's method of horizontal scaling, where data is distributed across multiple servers. This helps in scaling out large datasets across multiple servers or regions.

### Example: Setting Up Sharding

- Enable sharding on a database:
  
  ```bash
  sh.enableSharding("mydatabase")
  ```

- Shard a collection based on a shard key:
  
  ```bash
  sh.shardCollection("mydatabase.mycollection", { shardKeyField: 1 })
  ```

Sharding is especially helpful when you have large data sets that a single server can't efficiently manage. MongoDB automatically distributes the data among the shards based on the shard key.

---

## 2. Replication

Replication is MongoDB's way of ensuring high availability and fault tolerance. It copies data across multiple servers in a replica set. If the primary node fails, MongoDB automatically elects a new primary from the secondary nodes.

### Example: Setting Up Replication

1. Initiate a replica set:

   ```bash
   rs.initiate()
   ```

2. Add a secondary node:

   ```bash
   rs.add("mongodb-secondary-1:27017")
   ```

3. Add another secondary node:

   ```bash
   rs.add("mongodb-secondary-2:27017")
   ```

With replication, your MongoDB cluster can continue to function even if the primary node fails. Secondary nodes replicate the data from the primary node, ensuring redundancy and availability.

---

## 3. Aggregation Framework

MongoDB's Aggregation Framework allows for complex data processing pipelines where documents are filtered, transformed, and aggregated.

### Example: Using Aggregation to Calculate Total Sales

```javascript
const totalSales = await db.sales.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", totalSpent: { $sum: "$amount" } } },
  { $sort: { totalSpent: -1 } }
])
```

In this example:
- `$match` filters documents where `status` is "completed".
- `$group` groups the documents by `customerId` and calculates the total amount spent.
- `$sort` sorts the results by the total amount spent in descending order.

### Example: Get the third highest salary

```javascript
// MongoDB query
db.Employee.find().sort({ Salary: -1 }).limit(1).skip(2).select({ name: 1 });

// Using aggregation
db.Employee.aggregate([
  { $sort: { Salary: -1 } },
  { $limit: 1 },
  { $skip: 2 },
  { $project: { _id: 0, name: 1 } }
]);
```

---

## 4. Indexes

Indexes in MongoDB improve the performance of read operations by allowing MongoDB to quickly locate documents.

### Example: Creating an Index on a Field

```javascript
db.users.createIndex({ email: 1 })
```

- This command creates an index on the `email` field, allowing faster lookups by email.
  
### Example: Compound Index

```javascript
db.users.createIndex({ lastName: 1, firstName: 1 })
```

A compound index improves query performance when queries filter by both `lastName` and `firstName`.

---

## 5. Schema Validation

Though MongoDB is a schema-less database, you can enforce schema validation rules to ensure the integrity of your data.

### Example: Setting Schema Validation

```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\..+$",
          description: "must be a valid email address"
        }
      }
    }
  }
})
```

This ensures that documents in the `users` collection must have a `name` and `email`, and that the `email` must follow a valid email format.

---

## 6. Change Streams

Change Streams allow you to subscribe to real-time updates in a MongoDB collection. They are particularly useful for event-driven architectures.

### Example: Using Change Streams to Track Document Changes

```javascript
const changeStream = db.orders.watch();
changeStream.on("change", (change) => {
  console.log("Order changed: ", change);
});
```

This will log any changes (such as inserts, updates, or deletes) made to the `orders` collection.

---

## 7. GridFS

GridFS is used to store and retrieve large files (e.g., images, videos) that exceed the BSON-document size limit of 16MB. GridFS splits a large file into smaller chunks and stores them in separate documents.

### Example: Storing a File Using GridFS

```javascript
var fs = require('fs');
var Grid = require('gridfs-stream');
var gfs = Grid(db, mongo);

var readStream = fs.createReadStream('/path/to/large/file');
var writeStream = gfs.createWriteStream({ filename: 'myfile.txt' });

readStream.pipe(writeStream);
```

GridFS automatically chunks and stores large files efficiently.

---

## 8. Transactions

MongoDB supports multi-document ACID transactions, which means that a sequence of operations is either fully completed or rolled back in case of an error.

### Example: Using Transactions

```javascript
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const session = client.startSession();
session.startTransaction();
try {
  await db.collection('accounts').updateOne({ _id: 1 }, { $inc: { balance: -100 } }, { session });
  await db.collection('accounts').updateOne({ _id: 2 }, { $inc: { balance: 100 } }, { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  console.log("Transaction aborted due to error: ", error);
} finally {
  session.endSession();
}
```

This code performs a money transfer between two accounts, ensuring that both operations succeed or fail together.

---

## 9. TTL Indexes

TTL (Time-To-Live) indexes automatically delete documents after a specified period. This is useful for managing data like session records, logs, or other temporary data.

### Example: Setting a TTL Index

```javascript
db.sessions.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 3600 })
```

This index will automatically delete documents from the `sessions` collection 1 hour (3600 seconds) after the `createdAt` field.

---

## 10. Geospatial Queries

MongoDB supports geospatial indexes for storing and querying location-based data.

### Example: Adding a Geospatial Index

```javascript
db.places.createIndex({ location: "2dsphere" });
```

### Example: Finding Nearby Locations

```javascript
db.places.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [40.7128, -74.0060]  // New York City
      },
      $maxDistance: 5000  // 5 km
    }
  }
})
```

This query returns all documents within 5 km of the specified point.

---

## 11. Faceted Search

Faceted search allows you to filter and group data into categories using MongoDB’s Aggregation Framework.

### Example: Performing a Faceted Search

```javascript
db.products.aggregate([
  { $match: { category: "Electronics" } },
  {
    $facet: {
      priceRange: [{ $bucket: { groupBy: "$price", boundaries: [0, 100, 500, 1000, 5000], default: "Other" } }],
      brands: [{ $group: { _id: "$brand", count: { $sum: 1 } } }]
    }
  }
])
```

This example performs a faceted search, grouping products by price range and counting the number of products for each brand.

---

## Conclusion

MongoDB offers a wide range of advanced features, from sharding for horizontal scaling to aggregation for data processing, transactions for data consistency, replication for high availability, and geospatial queries for location-based applications. These advanced concepts allow developers to build scalable, flexible, and high-performance applications.

---

# Sharding in MongoDB: A Comprehensive Guide

### **1. Sharding Overview**
Sharding is MongoDB's method for distributing data across multiple servers or nodes to handle large datasets and high query loads. It is a form of horizontal scaling, where data is partitioned and distributed across shards. 

#### Benefits of Sharding:
- **Scalability**: Enables the database to handle more data by adding shards.
- **Performance**: Distributes queries across shards, improving throughput.
- **High Availability**: With replication in each shard, sharded clusters offer fault tolerance.

### **2. Components of a Sharded Cluster**
A MongoDB sharded cluster consists of three key components:

#### a. **Config Servers**
- These servers store the cluster's metadata, which includes the mapping of chunks (data partitions) to shards.
- There must be at least 3 config servers to form a replica set, ensuring high availability and fault tolerance.

#### b. **Shard Servers**
- Shards are the servers that store the actual data.
- Each shard is a replica set to ensure redundancy and high availability.
- Data in a shard is divided into chunks, and each chunk contains a subset of the data based on the shard key.

#### c. **MongoS Router**
- Acts as an interface between the application and the cluster.
- Routes queries from the client to the appropriate shard(s) based on the metadata stored in config servers.
- Consolidates results from multiple shards when needed and sends them back to the client.

### **3. Shard Key**
The **shard key** is a critical aspect of sharding. It determines how data is distributed across shards.

#### Key Characteristics:
- A shard key is a field or set of fields in a document.
- MongoDB uses the shard key to divide the data into ranges or hashes to distribute it across shards.
- A good shard key ensures:
  - **Even Distribution**: Prevents data from being unevenly concentrated in a single shard (avoiding hotspots).
  - **Efficient Query Routing**: Ensures queries can be targeted to specific shards.

#### Types of Shard Key:
1. **Range-Based Sharding**: Documents are distributed based on ranges of the shard key values. Suitable for data with natural ordering, such as dates.
2. **Hash-Based Sharding**: The shard key values are hashed to distribute data evenly. Best for avoiding hotspots.

### **4. Chunk Management**
Chunks are logical data partitions in a shard, and MongoDB divides the data into these chunks based on the shard key.

#### Features of Chunk Management:
- **Size**: By default, each chunk is 64MB.
- **Splitting**: When a chunk exceeds the maximum size, MongoDB splits it into smaller chunks.
- **Balancing**: MongoDB’s balancer ensures chunks are evenly distributed across shards. If a shard becomes overloaded, chunks are migrated to other shards.

### **5. Query Routing**
MongoDB uses the **mongos router** to route queries to the appropriate shard(s) based on the shard key.

#### Query Flow:
1. The client sends a query to the `mongos` router.
2. The `mongos` consults the config servers to determine which shard(s) hold the required data.
3. The query is forwarded to the appropriate shard(s).
4. Results are aggregated (if necessary) and sent back to the client.

### **6. Sharding Operations**
#### a. **Adding Shards**
New shards can be added to the cluster as data grows. When a shard is added, the balancer redistributes data across the cluster to maintain balance.

#### b. **Enabling Sharding**
To shard a database, sharding must be enabled explicitly. Once enabled, collections within the database can be sharded.

#### c. **Sharding a Collection**
A collection is sharded by specifying a shard key. This operation requires careful planning to avoid performance issues and data imbalance.

### **7. Balancer**
The balancer is a background process that ensures chunks are evenly distributed across shards.

#### Features:
- Automatically migrates chunks between shards to maintain balance.
- Operates during periods of low activity to minimize impact on the cluster.
- Configurable to allow finer control over when and how balancing occurs.

### **8. High Availability and Fault Tolerance**
Sharding in MongoDB enhances high availability by:
- Replicating data within each shard using replica sets.
- Ensuring that even if one shard goes down, data can be accessed from other replicas.

### **9. Monitoring and Maintenance**
#### Monitoring:
- Use `sh.status()` to check the cluster’s current sharding status.
- Monitor performance and data distribution using MongoDB’s tools (e.g., `mongotop`, `mongostat`).

#### Maintenance:
- Regularly check shard key selection and adjust as needed for optimal performance.
- Use automated backups to ensure data safety.

### **10. Best Practices**
- **Choose the Right Shard Key**: A poorly chosen shard key can lead to uneven data distribution and performance issues.
- **Monitor Cluster Health**: Regularly review the performance and balance of shards.
- **Plan for Growth**: Design your sharded cluster with future scaling in mind.
- **Use Hash Sharding for Uniform Distribution**: Especially when dealing with unpredictable access patterns.
- **Minimize Cross-Shard Queries**: Optimize queries to target specific shards whenever possible.

By understanding and configuring these concepts, MongoDB sharding can efficiently scale horizontally to handle large datasets and workloads.

---

# MongoDB Sharding Example with Express.js

This guide demonstrates how to implement MongoDB sharding with an Express.js application using Mongoose. Sharding in MongoDB allows you to distribute data across multiple servers, enabling horizontal scaling and improved performance.

## Table of Contents

- [MongoDB Sharding Example with Express.js](#mongodb-sharding-example-with-expressjs)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Overview](#overview)
  - [Steps to Implement MongoDB Sharding with Express.js](#steps-to-implement-mongodb-sharding-with-expressjs)
    - [1. Set Up MongoDB Sharded Cluster](#1-set-up-mongodb-sharded-cluster)
    - [2. Create an Express.js Application](#2-create-an-expressjs-application)
    - [3. Connect to the MongoDB Sharded Cluster](#3-connect-to-the-mongodb-sharded-cluster)
  - [Example Code](#example-code)
  - [Explanation](#explanation)
    - [MongoDB URI](#mongodb-uri)
    - [Schema Definition](#schema-definition)
    - [CRUD Operations](#crud-operations)
  - [Configuring the Shard Key](#configuring-the-shard-key)
  - [Running the Application](#running-the-application)
  - [Testing the API](#testing-the-api)
  - [Important Notes](#important-notes)

---

## Prerequisites

- Node.js installed on your machine.
- MongoDB Sharded Cluster set up (you can use MongoDB Atlas for an easy setup).
- Express.js and Mongoose installed:

  ```bash
  npm install express mongoose
  ```

## Overview

Sharding in MongoDB involves distributing your data across multiple machines to support deployments with very large data sets and high throughput operations. In this example, we'll create a simple Express.js application that connects to a MongoDB sharded cluster and performs basic CRUD operations.

## Steps to Implement MongoDB Sharding with Express.js

### 1. Set Up MongoDB Sharded Cluster

- MongoDB Atlas: The easiest way to set up a sharded cluster is by using MongoDB Atlas. Sign up for an account, create a new cluster, and enable sharding.

- Local Setup: Alternatively, you can set up sharding locally by configuring multiple MongoDB instances. Refer to the [MongoDB sharding documentation](https://docs.mongodb.com/manual/sharding/) for detailed instructions.

### 2. Create an Express.js Application

Initialize a new Node.js project and create an \`app.js\` file:

```bash
npm init -y
touch app.js
```

### 3. Connect to the MongoDB Sharded Cluster

Use Mongoose to connect to your MongoDB sharded cluster using the connection string provided by MongoDB Atlas or your local setup.

## Example Code

```javascript
// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB Sharded Cluster connection string
// Replace <username>, <password>, and <your-cluster-url> with your actual cluster information.
const mongoURI = 'mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the MongoDB Sharded Cluster');
  })
  .catch((error) => {
    console.error('Error connecting to the MongoDB Sharded Cluster:', error);
  });

// Define a simple schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Create a model
const User = mongoose.model('User', UserSchema);

// Middleware to parse JSON
app.use(express.json());

// Create a new user
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const user = new User({ name, email, age });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Explanation

### MongoDB URI

The connection string (\`mongoURI\`) connects your application to the MongoDB sharded cluster. Replace the placeholders with your actual MongoDB Atlas credentials:

- \`<username>\`: Your MongoDB username.
- \`<password>\`: Your MongoDB password.
- \`<your-cluster-url>\`: The cluster URL provided by MongoDB Atlas.

### Schema Definition

The \`UserSchema\` defines the structure of the \`User\` documents in the MongoDB database. MongoDB will distribute these documents across shards based on the shard key, which by default is the \`_id\` field.

```javascript
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
```

### CRUD Operations

- Create a User: \`POST /users\`  
  Adds a new user to the database.

- Get All Users: \`GET /users\`  
  Retrieves all users from the database.

- Get User by ID: \`GET /users/:id\`  
  Retrieves a single user by their unique ID.

- Delete a User: \`DELETE /users/:id\`  
  Removes a user from the database by their unique ID.

These routes allow you to interact with the MongoDB sharded cluster. MongoDB handles the distribution of data across shards transparently.

## Configuring the Shard Key

To optimize sharding, you may want to define a custom shard key. This is typically done in the MongoDB shell or via the MongoDB Atlas interface. The shard key should be a field that:

- Has high cardinality.
- Is frequently used in queries.
- Does not change over time.

For example, you could shard the \`User\` collection on the \`email\` field if it's unique:

```javascript
// In MongoDB shell
sh.shardCollection("yourDatabase.users", { email: 1 });
```

## Running the Application

Start your Express.js application with the following command:

```bash
node app.js
```

You should see the following output if the connection is successful:

```
Connected to the MongoDB Sharded Cluster
Server is running on port 3000
```

## Testing the API

Use a tool like Postman or cURL to test the API endpoints.

- Create a User:

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","age":30}' http://localhost:3000/users
  ```

- Get All Users:

  ```bash
  curl http://localhost:3000/users
  ```

- Get User by ID:

  ```bash
  curl http://localhost:3000/users/<user_id>
  ```

- Delete a User:

  ```bash
  curl -X DELETE http://localhost:3000/users/<user_id>
  ```

## Important Notes

- Sharding Transparency: From the application's perspective, sharding is transparent. You don't need to manually handle data distribution.

- Error Handling: Make sure to implement proper error handling in a production environment.

- Security: Never commit your database credentials to version control. Use environment variables or a configuration management system.

- Indexing: Ensure that the shard key is indexed to improve query performance.

- Testing: Always test your application thoroughly to ensure that sharding is working as expected.

By following this guide, you've set up an Express.js application connected to a MongoDB sharded cluster, capable of handling scalable data operations efficiently.

---

# Most commonly used MongoDB queries in interviews

## **1. Basic Queries**
### **1.1 Retrieve all documents from a collection**
```js
db.employees.find({});
```

### **1.2 Retrieve specific fields**
```js
db.employees.find({}, { name: 1, salary: 1, _id: 0 });
```

### **1.3 Retrieve a document with a specific condition**
```js
db.employees.find({ department: "IT" });
```

### **1.4 Retrieve documents with multiple conditions (`AND`)**
```js
db.employees.find({ department: "IT", salary: { $gt: 50000 } });
```

### **1.5 Retrieve documents using `OR` condition**
```js
db.employees.find({
  $or: [{ department: "IT" }, { salary: { $gt: 50000 } }]
});
```

### **1.6 Count documents in a collection**
```js
db.employees.countDocuments();
```

## **2. Sorting and Pagination**
### **2.1 Sort documents by salary (descending)**
```js
db.employees.find().sort({ salary: -1 });
```

### **2.2 Paginate results (`skip` and `limit`)**
```js
db.employees.find().skip(5).limit(10);
```

## **3. Query Operators**
### **3.1 Find employees with salary greater than 50000**
```js
db.employees.find({ salary: { $gt: 50000 } });
```

### **3.2 Find employees with salary between 40000 and 60000**
```js
db.employees.find({ salary: { $gte: 40000, $lte: 60000 } });
```

### **3.3 Find employees whose names start with "A"**
```js
db.employees.find({ name: /^A/ });
```

### **3.4 Find employees who belong to IT or HR department**
```js
db.employees.find({ department: { $in: ["IT", "HR"] } });
```

### **3.5 Find employees who do not belong to IT or HR department**
```js
db.employees.find({ department: { $nin: ["IT", "HR"] } });
```

## **4. Aggregation (Interview Favorite)**
### **4.1 Count employees in each department**
```js
db.employees.aggregate([
  { $group: { _id: "$department", totalEmployees: { $sum: 1 } } }
]);
```

### **4.2 Find average salary per department**
```js
db.employees.aggregate([
  { $group: { _id: "$department", avgSalary: { $avg: "$salary" } } }
]);
```

### **4.3 Find the highest salary in each department**
```js
db.employees.aggregate([
  { $group: { _id: "$department", maxSalary: { $max: "$salary" } } }
]);
```

### **4.4 Find the total salary expense per department**
```js
db.employees.aggregate([
  { $group: { _id: "$department", totalSalary: { $sum: "$salary" } } }
]);
```

## **5. Updating Documents**
### **5.1 Update salary of a specific employee**
```js
db.employees.updateOne({ name: "John Doe" }, { $set: { salary: 70000 } });
```

### **5.2 Increase salary by 10% for all IT employees**
```js
db.employees.updateMany(
  { department: "IT" },
  { $mul: { salary: 1.1 } }
);
```

### **5.3 Add a new field (`bonus`) to all employees**
```js
db.employees.updateMany({}, { $set: { bonus: 5000 } });
```

## **6. Deleting Documents**
### **6.1 Delete a specific employee**
```js
db.employees.deleteOne({ name: "John Doe" });
```

### **6.2 Delete all employees from HR department**
```js
db.employees.deleteMany({ department: "HR" });
```

## **7. Indexing & Performance Optimization**
### **7.1 Create an index on the `name` field**
```js
db.employees.createIndex({ name: 1 });
```

### **7.2 Create a compound index on `department` and `salary`**
```js
db.employees.createIndex({ department: 1, salary: -1 });
```

### **7.3 Check query execution plan using `explain()`**
```js
db.employees.find({ salary: { $gt: 50000 } }).explain("executionStats");
```

## **8. Working with Arrays**
### **8.1 Find employees who have "JavaScript" in their skills**
```js
db.employees.find({ skills: "JavaScript" });
```

### **8.2 Find employees who have both JavaScript and Python in their skills**
```js
db.employees.find({ skills: { $all: ["JavaScript", "Python"] } });
```

### **8.3 Find employees with at least 3 skills**
```js
db.employees.find({ skills: { $size: 3 } });
```

## **9. Embedded Documents**
### **9.1 Find employees who live in New York**
```js
db.employees.find({ "address.city": "New York" });
```

### **9.2 Update employee's city to San Francisco**
```js
db.employees.updateOne(
  { name: "John Doe" },
  { $set: { "address.city": "San Francisco" } }
);
```

## **10. Transactions (ACID)**
### **10.1 Perform multiple operations in a transaction**
```js
const session = db.getMongo().startSession();
session.startTransaction();
try {
  const employees = session.getDatabase("company").employees;
  employees.updateOne({ name: "John Doe" }, { $inc: { salary: 5000 } });
  employees.updateOne({ name: "Jane Smith" }, { $inc: { salary: -5000 } });
  session.commitTransaction();
} catch (error) {
  session.abortTransaction();
} finally {
  session.endSession();
}
```

### 🚀 **Interview Tips**
1. **Understand Aggregation Framework deeply** – it is a key MongoDB concept.
2. **Practice writing `find()`, `update()`, and `aggregate()` queries**.
3. **Know the difference between SQL and MongoDB (NoSQL)**.
4. **Optimize queries using indexes and query execution plans**.
5. **Be ready to explain scenarios where MongoDB is a better choice than SQL**.

---

# ACID Properties in MongoDB
MongoDB, originally designed as a high-performance, schema-less NoSQL database, historically provided ACID guarantees only on the level of a **single document**. However, starting with version 4.0, MongoDB introduced **multi-document ACID transactions** for replica sets, and later for sharded clusters in version 4.2. Below is a detailed look at how MongoDB implements each of the ACID properties:

## 1. Atomicity

**Definition:**  
Atomicity in MongoDB means that a transaction (or an individual operation) is an all-or-nothing proposition. Either every operation in the transaction completes successfully, or none of the operations have any effect.

**In MongoDB:**

- **Single-Document Operations:**  
  Before multi-document transactions, MongoDB ensured atomicity at the level of a single document. This means that any update or insert operation on a single document is atomic. For example, if you update several fields within one document, either all the field updates are applied, or none are.
  
- **Multi-Document Transactions:**  
  With MongoDB 4.0+, you can group multiple operations (across multiple documents, collections, or even databases) into a single transaction. MongoDB guarantees that if any operation within the transaction fails, the entire transaction is rolled back, preserving atomicity.

**Example:**  
Imagine updating two related documents:
  - Document A in Collection 1.
  - Document B in Collection 2.
  
  Using a multi-document transaction, if the update to Document B fails, the update to Document A will be undone, ensuring that the database does not end up in a partially updated state.

## 2. Consistency

**Definition:**  
Consistency means that any transaction will bring the database from one valid state to another, enforcing all defined rules, constraints, and data integrity.

**In MongoDB:**

- **Schema Validation:**  
  MongoDB allows the use of schema validation rules on collections. These rules ensure that documents conform to a defined structure. If a transaction would result in a document that violates these rules, MongoDB will reject the transaction.
  
- **Business Logic:**  
  Even though MongoDB is schema-less by design, developers often implement application-level validations and constraints. When using transactions, these validations are enforced across all operations in the transaction, ensuring that the database remains in a consistent state.

**Example:**  
Consider a scenario where you have a transaction that updates an order and reduces inventory simultaneously. If reducing the inventory would violate a business rule (for example, inventory cannot be negative), the transaction is aborted. This ensures that both the order and inventory remain in a consistent state.

## 3. Isolation

**Definition:**  
Isolation ensures that concurrently executing transactions do not interfere with each other, and each transaction appears to execute in isolation from others.

**In MongoDB:**

- **Single-Document Isolation:**  
  Operations on a single document are isolated. Other operations will either see the document's state before or after the update, but never an intermediate state.
  
- **Multi-Document Transactions Isolation:**  
  MongoDB uses snapshot isolation for multi-document transactions. This means that a transaction operates on a consistent snapshot of the data as it existed at the start of the transaction. Other operations outside the transaction will not see the intermediate states of the transaction until it is committed.
  
  The isolation level prevents phenomena like dirty reads (reading uncommitted changes) and non-repeatable reads within the transaction.

**Example:**  
If Transaction 1 is updating several documents within a transaction, and Transaction 2 is reading those documents, Transaction 2 will only see the changes made by Transaction 1 after it has been fully committed, thus avoiding any inconsistent reads.

## 4. Durability

**Definition:**  
Durability means that once a transaction has been committed, its effects are permanently recorded in the database, even in the case of a system failure.

**In MongoDB:**

- **Journaling:**  
  MongoDB uses a write-ahead logging mechanism called journaling. This ensures that in the event of a crash, the database can recover to the last committed state by replaying the journal.
  
- **Commit Protocol in Transactions:**  
  When a multi-document transaction is committed, MongoDB ensures that the changes are written to disk and will survive any subsequent failures. The committed data is stored in non-volatile storage, providing durability.

**Example:**  
After a bank transfer transaction completes (updating multiple documents such as account balances), even if the system crashes immediately afterward, MongoDB's journaling and commit protocol ensure that upon restart, the changes (i.e., the updated balances) remain intact and are not lost.

## Summary

- **Atomicity:**  
  - **Single-document:** All changes to one document are applied together.
  - **Multi-document:** MongoDB 4.0+ supports transactions that ensure all operations either succeed or fail as a unit.
  
- **Consistency:**  
  - Enforced through schema validation and application-level rules, ensuring transactions transition the database from one valid state to another.
  
- **Isolation:**  
  - **Single-document operations:** Isolated by default.
  - **Transactions:** Provide snapshot isolation, ensuring that concurrent transactions do not see partial updates.
  
- **Durability:**  
  - Achieved via journaling and transaction commit protocols, ensuring committed changes persist even after failures.

In essence, while MongoDB started with ACID guarantees at the single-document level, its evolution to support multi-document transactions has brought it closer to the full ACID properties typically associated with relational databases. This makes MongoDB suitable for applications that require complex transactions and strong consistency guarantees.

---

# MongoDB indexes, explain in detail with examples.

MongoDB indexes are special data structures that store a small portion of the collection’s data set in an easily traversable form. Indexes support the efficient resolution of queries by allowing MongoDB to quickly locate the data without performing a collection scan (i.e., scanning every document). In this guide, we’ll explain MongoDB indexes in detail and illustrate their usage with examples.

## 1. Why Use Indexes?

- **Performance:** Indexes dramatically reduce the number of documents MongoDB must scan for queries. For large collections, this leads to significant performance improvements.
- **Sorting:** Indexes help with sorting data in a query.
- **Uniqueness:** They can enforce uniqueness on a field (e.g., unique usernames).
- **Query Optimization:** Without indexes, MongoDB performs a collection scan which can be slow for large datasets.

## 2. Basic Concepts

- **B-tree Data Structure:** MongoDB indexes use a B-tree data structure which allows for fast lookups, insertions, and deletions.
- **Index Keys:** The fields on which an index is built. They are stored in a specified sort order (ascending or descending).
- **Collection Scan vs. Index Scan:** A collection scan reads every document, while an index scan only reads a subset of data using the index.

## 3. Creating Indexes

### 3.1. Single Field Index

A single field index is created on one field of a document. For example, if you have a `users` collection and want to index the `username` field:

```javascript
db.users.createIndex({ username: 1 })
```

- **`{ username: 1 }`**: This specifies an ascending order index on the `username` field.
- **Descending Index:** Use `-1` for descending order, e.g., `{ username: -1 }`.

### 3.2. Compound Index

A compound index is built on multiple fields. The order of fields is important because it affects query performance and index usage.

For example, if you often query by `lastName` and `firstName`:

```javascript
db.users.createIndex({ lastName: 1, firstName: 1 })
```

- **Query Efficiency:** This index can efficiently support queries that filter by `lastName` only or by both `lastName` and `firstName`.
- **Note:** A query filtering only on `firstName` will not fully benefit from this compound index because `lastName` is the first field in the index.

### 3.3. Multikey Indexes

When an indexed field holds an array, MongoDB creates a **multikey index** which indexes each element of the array.

For example, if you have a `posts` collection and each post document contains an array of `tags`:

```javascript
db.posts.createIndex({ tags: 1 })
```

- **Behavior:** MongoDB creates an index entry for each tag in the `tags` array, which allows for efficient queries like:
  
  ```javascript
  db.posts.find({ tags: "mongodb" })
  ```

### 3.4. Text Indexes

Text indexes are used for text search queries on string content. They support language-specific rules and stemming.

For example, to create a text index on the `title` and `content` fields of a blog posts collection:

```javascript
db.posts.createIndex({ title: "text", content: "text" })
```

- **Querying Text Indexes:** Use the `$text` operator:

  ```javascript
  db.posts.find({ $text: { $search: "database" } })
  ```

### 3.5. Hashed Indexes

Hashed indexes are primarily used with sharding. They index the hash of the field’s value.

For example, to create a hashed index on the `_id` field:

```javascript
db.users.createIndex({ _id: "hashed" })
```

- **Use Case:** Particularly useful when you want to distribute data evenly across a sharded cluster.

### 3.6. Geospatial Indexes

For geospatial queries (e.g., finding points near a location), MongoDB supports 2d and 2dsphere indexes.

#### 2dsphere Example:

If you have a collection `places` with a `location` field storing GeoJSON objects:

```javascript
db.places.createIndex({ location: "2dsphere" })
```

- **Querying:** You can now perform queries such as finding all places near a certain point.

  ```javascript
  db.places.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [-73.9667, 40.78]
        },
        $maxDistance: 5000
      }
    }
  })
  ```

### 3.7. TTL (Time to Live) Indexes

TTL indexes allow you to automatically remove documents after a certain period. They are useful for collections storing temporary data.

For example, if you have a `sessions` collection where documents should expire after 3600 seconds (1 hour):

```javascript
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
```

- **Mechanism:** MongoDB automatically deletes documents older than 1 hour based on the `createdAt` field.

### 3.8. Partial Indexes

Partial indexes index only the documents that meet a specified filter expression. They are useful when you have a collection where only a subset of documents is frequently queried.

For example, if you have a `products` collection and only want to index products that are in stock:

```javascript
db.products.createIndex(
  { category: 1 },
  { partialFilterExpression: { inStock: true } }
)
```

- **Benefit:** Reduces index size and improves performance for queries that only need in-stock products.

### 3.9. Wildcard Indexes

Wildcard indexes are designed to index multiple fields whose names are not known in advance.

For example, if you have a collection where documents have dynamic fields:

```javascript
db.dynamicCollection.createIndex({ "$**": 1 })
```

- **Usage:** This creates an index on every field in each document, which is helpful for ad hoc queries over dynamically structured documents.

## 4. Viewing and Managing Indexes

### 4.1. Listing Indexes

To view the indexes on a collection, use the `getIndexes()` method:

```javascript
db.users.getIndexes()
```

This returns an array of index specifications for the `users` collection.

### 4.2. Dropping Indexes

To drop a specific index:

```javascript
db.users.dropIndex("username_1")
```

Or to drop all indexes on a collection except for the default `_id` index:

```javascript
db.users.dropIndexes()
```

## 5. How Indexes Affect Query Performance

### 5.1. Query Plans

MongoDB’s query planner uses indexes to determine the most efficient way to execute a query. You can inspect a query’s execution plan using the `.explain()` method:

```javascript
db.users.find({ username: "john_doe" }).explain("executionStats")
```

- **Result:** This will show whether the query used an index scan or a collection scan, along with statistics such as the number of documents scanned.

### 5.2. Index Intersection

MongoDB can combine (or "intersect") multiple indexes to fulfill a query if no single index covers all query fields. However, the best performance is achieved when a compound index is used.

## 6. Best Practices

- **Index Only What You Need:** Over-indexing can consume extra disk space and memory, and slow down write operations.
- **Use Compound Indexes Wisely:** Order the fields based on the queries. Place the fields with higher cardinality (more unique values) first.
- **Monitor Index Performance:** Use MongoDB’s monitoring tools and the `.explain()` method to analyze query performance.
- **Consider Write Performance:** Remember that every index adds overhead to write operations (inserts, updates, deletes).

## 7. Summary

Indexes in MongoDB are critical for optimizing query performance, enforcing data uniqueness, and enabling advanced querying capabilities like text search and geospatial queries. By understanding the types of indexes available and applying best practices, you can design efficient, scalable applications.

### Example Scenario Recap:

- **Single Field Index:** `db.users.createIndex({ username: 1 })`
- **Compound Index:** `db.users.createIndex({ lastName: 1, firstName: 1 })`
- **Multikey Index:** `db.posts.createIndex({ tags: 1 })`
- **Text Index:** `db.posts.createIndex({ title: "text", content: "text" })`
- **Hashed Index:** `db.users.createIndex({ _id: "hashed" })`
- **Geospatial Index:** `db.places.createIndex({ location: "2dsphere" })`
- **TTL Index:** `db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })`
- **Partial Index:** `db.products.createIndex({ category: 1 }, { partialFilterExpression: { inStock: true } })`
- **Wildcard Index:** `db.dynamicCollection.createIndex({ "$**": 1 })`

By implementing and managing these indexes appropriately, you can ensure that your MongoDB queries are as efficient as possible.

---

# Moongose schemas, explain in detail with examples.
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. One of its core features is the ability to define **schemas** that represent the structure of your documents within a MongoDB collection. Schemas allow you to enforce data structure, add validations, define default values, create custom methods, and set up middleware to execute logic before or after certain operations.

Below is a detailed explanation of Mongoose schemas with examples.

## 1. Defining a Schema

A schema defines the structure of a document, default values, validators, and more. You create a schema by instantiating `mongoose.Schema`.

### Example: A Simple User Schema

```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { 
    type: String, 
    required: true,    // Field must be provided
    unique: true       // Unique index
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  age: { 
    type: Number, 
    min: 0             // Age cannot be negative
  },
  createdAt: { 
    type: Date, 
    default: Date.now  // Sets the default value to current date/time
  }
});
```

In this schema:

- **username & email**: Strings that are required and unique.
- **age**: A number with a minimum value of 0.
- **createdAt**: A date field that defaults to the current date/time.

## 2. Creating a Model

Once you have defined a schema, you compile it into a **model**. A model is a class with which you construct documents. 

```javascript
const User = mongoose.model('User', userSchema);
```

You can now create, read, update, and delete (CRUD) documents using the `User` model.

## 3. Schema Types and Options

Mongoose supports a variety of schema types and options for each field:

### 3.1. Schema Types

- **String, Number, Date, Boolean, Buffer, ObjectId, Array, Mixed, Decimal128, Map, etc.**
  
Example with multiple types:

```javascript
const postSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  views: { type: Number, default: 0 },
  tags: [String], // An array of strings
  published: { type: Boolean, default: false },
  metadata: Schema.Types.Mixed  // Can store any data type
});
```

### 3.2. Validators and Defaults

You can specify validators (like `required`, `min`, `max`, etc.) and default values for fields.

```javascript
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { 
    type: Number, 
    required: true, 
    min: [0, 'Price must be positive'] // Custom error message
  },
  inStock: { type: Boolean, default: true }
});
```

## 4. Virtuals

Virtual properties are document properties that you can get and set but that do not get persisted to MongoDB. They are useful for computed properties.

```javascript
userSchema.virtual('profile').get(function() {
  return `${this.username} (${this.email})`;
});
```

Now, when you retrieve a user document, you can access the `profile` property:

```javascript
User.findOne({ username: 'john_doe' }, (err, user) => {
  if (user) {
    console.log(user.profile);  // Outputs: "john_doe (john@example.com)"
  }
});
```

## 5. Custom Methods and Statics

### 5.1. Instance Methods

Instance methods operate on individual documents. Add them to the schema's `methods` object.

```javascript
userSchema.methods.isAdult = function() {
  return this.age >= 18;
};

// Usage:
User.findOne({ username: 'jane_doe' }, (err, user) => {
  if (user && user.isAdult()) {
    console.log(`${user.username} is an adult.`);
  }
});
```

### 5.2. Static Methods

Static methods are attached to the model itself and not the individual document.

```javascript
userSchema.statics.findByUsername = function(username) {
  return this.findOne({ username });
};

// Usage:
User.findByUsername('john_doe')
  .then(user => console.log(user))
  .catch(err => console.error(err));
```

## 6. Middleware (Hooks)

Middleware (or hooks) are functions that run during certain stages of the document lifecycle (e.g., before saving, after removing). They allow you to perform operations automatically.

### Example: Pre-save Hook

```javascript
userSchema.pre('save', function(next) {
  // For example, modify the username before saving:
  this.username = this.username.toLowerCase();
  next();
});
```

### Example: Post-save Hook

```javascript
userSchema.post('save', function(doc) {
  console.log(`User ${doc.username} has been saved.`);
});
```

## 7. Indexing

You can define indexes directly in the schema to improve query performance.

```javascript
userSchema.index({ email: 1 });  // Creates an index on the email field
```

## 8. Schema Options

When creating a schema, you can pass an options object to customize its behavior.

```javascript
const options = {
  timestamps: true,    // Automatically adds createdAt and updatedAt fields
  versionKey: false    // Disables the __v field
};

const commentSchema = new Schema({
  text: String,
  author: String
}, options);
```

With `timestamps: true`, Mongoose will add `createdAt` and `updatedAt` properties to each document automatically.

## 9. Putting It All Together: A Complete Example

Below is a more complete example incorporating various features:

```javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a blog post
const blogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  views: { type: Number, default: 0 },
  published: { type: Boolean, default: false }
}, { timestamps: true });

// Virtual property for a short summary
blogPostSchema.virtual('summary').get(function() {
  return this.content.substring(0, 100) + '...';
});

// Instance method to increment view count
blogPostSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Static method to find published posts
blogPostSchema.statics.findPublished = function() {
  return this.find({ published: true });
};

// Pre-save middleware to ensure title is in Title Case
blogPostSchema.pre('save', function(next) {
  this.title = this.title.split(' ')
    .map(word => word[0].toUpperCase() + word.substring(1).toLowerCase())
    .join(' ');
  next();
});

// Create the model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Usage Example
async function run() {
  await mongoose.connect('mongodb://localhost:27017/mydatabase');

  // Creating a new blog post
  const newPost = new BlogPost({
    title: 'hello world',
    content: 'This is an example blog post content that is quite long and detailed...',
    author: '607d1f77bcf86cd799439011', // Example ObjectId
    tags: ['example', 'blog', 'mongoose']
  });

  await newPost.save();
  console.log('Post saved:', newPost);

  // Accessing virtual property
  console.log('Summary:', newPost.summary);

  // Incrementing views using an instance method
  await newPost.incrementViews();
  console.log('Updated views:', newPost.views);

  // Using static method to find published posts
  const publishedPosts = await BlogPost.findPublished();
  console.log('Published posts:', publishedPosts);

  await mongoose.disconnect();
}

run().catch(err => console.error(err));
```

## 10. Summary

- **Schemas** define the structure of documents, including field types, defaults, validations, and more.
- **Models** are compiled from schemas and are used to interact with MongoDB collections.
- **Virtuals, Methods, and Statics** allow you to add computed properties and custom functionality.
- **Middleware** (hooks) provide a mechanism to execute code during document lifecycle events.
- **Options** like `timestamps` and indexing can be added to customize schema behavior.

Using Mongoose schemas helps you maintain a clear, consistent data model for your application, ensuring that your MongoDB data conforms to expected structures and behaviors.

---

[<- Database](database-quick.md)

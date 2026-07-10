[<- Kafka](kafka-quick.md)

## Node.js CRUD Application with Kafka Integration

To build a Node.js CRUD application with Kafka integration, we’ll break down the components step-by-step. This example will demonstrate a simple app where a user can create, read, update, and delete records, with Kafka managing messaging between services (like a logging or notification service).

### Prerequisites

1. **Node.js** and **npm** installed.
2. **Kafka** server (using Docker to simplify setup).
3. **Express.js** framework (for CRUD operations).
4. **Kafka-node** library (for Kafka client in Node.js).

### Project Structure

Here’s the basic structure:

```
nodejs-kafka-crud/
├── app/
│   ├── models/
│   │   └── item.js        # Mongoose model for items
│   ├── controllers/
│   │   └── itemController.js  # Controller with CRUD operations
│   ├── routes/
│   │   └── itemRoutes.js      # Routes for CRUD
├── kafka/
│   ├── consumer.js    # Kafka consumer script
│   ├── producer.js    # Kafka producer script
├── server.js          # Main server file
├── package.json
└── docker-compose.yml # Docker Compose for Kafka setup
```

### Step 1: Set Up Kafka with Docker

Create a `docker-compose.yml` file to set up Kafka and Zookeeper.

```yaml
version: '2'
services:
  zookeeper:
    image: wurstmeister/zookeeper:3.4.6
    ports:
      - "2181:2181"
  kafka:
    image: wurstmeister/kafka:2.12-2.1.1
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
```

Run the Kafka setup:

```bash
docker-compose up -d
```

### Step 2: Initialize Node.js App

In the root directory, initialize your Node.js application:

```bash
npm init -y
```

Install the necessary packages:

```bash
npm install express mongoose kafka-node body-parser
```

### Step 3: Define a Simple Mongoose Model

In `app/models/item.js`, create a schema for the items you’ll store:

```javascript
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model('Item', itemSchema);
```

### Step 4: Implement CRUD Operations

In `app/controllers/itemController.js`, create CRUD functions:

```javascript
const Item = require('../models/item');

exports.createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Similar implementations for getItem, updateItem, and deleteItem
```

### Step 5: Set Up Kafka Producer and Consumer

In `kafka/producer.js`, create a producer to send messages:

```javascript
const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

producer.on('ready', async () => {
  console.log('Producer is ready');
});

producer.on('error', (err) => {
  console.error('Producer error:', err);
});

exports.sendMessage = (message) => {
  const payloads = [{ topic: 'items', messages: JSON.stringify(message) }];
  producer.send(payloads, (err, data) => {
    if (err) console.error('Send error:', err);
    else console.log('Message sent:', data);
  });
};
```

In `kafka/consumer.js`, create a consumer to listen for messages:

```javascript
const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(client, [{ topic: 'items', partition: 0 }], { autoCommit: true });

consumer.on('message', (message) => {
  console.log('Received message:', message);
});

consumer.on('error', (err) => {
  console.error('Consumer error:', err);
});
```

### Step 6: Integrate Kafka in CRUD Operations

Modify `app/controllers/itemController.js` to use the Kafka producer:

```javascript
const Item = require('../models/item');
const producer = require('../../kafka/producer');

exports.createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();

    // Send message to Kafka
    producer.sendMessage({ action: 'create', item });

    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Implement Kafka messages for update and delete similarly
```

### Step 7: Define Routes for CRUD

In `app/routes/itemRoutes.js`, set up the CRUD routes:

```javascript
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/items', itemController.createItem);
router.get('/items', itemController.getItems);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
```

### Step 8: Main Server Setup

In `server.js`, set up the main application and initialize routes:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const itemRoutes = require('./app/routes/itemRoutes');
require('./kafka/consumer');  // Start Kafka consumer

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB (adjust URI as necessary)
mongoose.connect('mongodb://localhost:27017/kafkaCrud', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', itemRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Step 9: Run the Application

1. Start Kafka using Docker Compose.
2. Run the Kafka producer and consumer.
3. Start your Node.js server:

```bash
node server.js
```

You now have a simple Node.js CRUD application with Kafka integration. The Kafka producer will send messages whenever an item is created, updated, or deleted, and the consumer will log these messages.

---

[<- Kafka](kafka-quick.md)
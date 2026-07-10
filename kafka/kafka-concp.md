[<- Kafka](kafka-quick.md)

# Kafka Main Concepts with Examples Using Node.js

Apache Kafka is a distributed event streaming platform capable of handling large amounts of real-time data. Kafka is commonly used for building real-time data pipelines and streaming applications. It can scale horizontally across many servers and provides fault tolerance through data replication.

Here are the main Kafka concepts and how to work with Kafka in Node.js using the `kafkajs` library:

---

## 1. Producers

A Producer is an application that sends records (messages) to a Kafka topic. Kafka Producers push data to a Kafka broker and are responsible for choosing the partition within a topic.

### Example: Setting Up a Kafka Producer in Node.js

```bash
npm install kafkajs
```

```javascript
const { Kafka } = require('kafkajs');

// Initialize a Kafka instance
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'], // Kafka broker address
});

// Initialize a producer
const producer = kafka.producer();

const runProducer = async () => {
  // Connect the producer
  await producer.connect();

  // Send a message to the 'test-topic'
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello Kafka from Node.js!' },
    ],
  });

  console.log('Message sent!');
  
  // Disconnect the producer
  await producer.disconnect();
};

runProducer().catch(console.error);
```

---

## 2. Consumers

A Consumer reads messages from Kafka topics. Kafka Consumers subscribe to one or more topics and pull messages from the broker. Kafka ensures that each message is delivered to consumers exactly once, unless specifically configured otherwise.

### Example: Setting Up a Kafka Consumer in Node.js

```javascript
const { Kafka } = require('kafkajs');

// Initialize a Kafka instance
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

// Initialize a consumer
const consumer = kafka.consumer({ groupId: 'test-group' });

const runConsumer = async () => {
  // Connect the consumer
  await consumer.connect();

  // Subscribe to the 'test-topic'
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  // Listen for new messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        value: message.value.toString(),
      });
    },
  });
};

runConsumer().catch(console.error);
```

---

## 3. Topics

Topics are channels to which producers publish messages and from which consumers read messages. Kafka topics are partitioned and distributed across multiple brokers for scalability and fault tolerance.

### Example: Creating Topics (Using Kafka CLI)

You can create topics in Kafka using the Kafka CLI:

```bash
kafka-topics.sh --create --topic test-topic --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
```

This command creates a topic named `test-topic` with 3 partitions and a replication factor of 1.

---

## 4. Partitions

Each Kafka topic is split into partitions. A partition is an ordered, immutable sequence of records that is appended to by producers. Consumers read from partitions, and Kafka ensures that records within each partition are read in order.

- Partition Keying: Producers can specify a key, and Kafka ensures that records with the same key are sent to the same partition.

### Example: Sending Messages with Partition Key

```javascript
await producer.send({
  topic: 'test-topic',
  messages: [
    { key: 'key1', value: 'Message with key1' },
    { key: 'key2', value: 'Message with key2' },
  ],
});
```

---

## 5. Offsets

Kafka tracks the position of consumers in a topic partition using offsets. Each record in a partition has a unique offset, and consumers use offsets to remember where they left off. Kafka guarantees that messages within a partition are read in the order they were produced.

### Example: Accessing Offsets in a Consumer

```javascript
await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      topic,
      partition,
      offset: message.offset,
      value: message.value.toString(),
    });
  },
});
```

---

## 6. Consumer Groups

A Consumer Group is a group of consumers that work together to consume messages from one or more topics. Kafka ensures that each partition is consumed by only one consumer in a group. This allows for parallel processing of messages.

### Example: Using Consumer Groups

When multiple consumers in the same group subscribe to a topic, Kafka distributes the partitions among them. Each partition will be consumed by only one consumer in the group.

---

## 7. Replication

Kafka provides replication to ensure fault tolerance. Each partition in a Kafka topic is replicated across multiple brokers. The replication factor determines how many copies of a partition exist. One of the brokers is the leader for a partition, and the others are followers. Only the leader handles all reads and writes for a partition, while followers replicate the data.

### Example: Creating a Topic with Replication

```bash
kafka-topics.sh --create --topic replicated-topic --bootstrap-server localhost:9092 --partitions 3 --replication-factor 2
```

---

## 8. Kafka Streams

Kafka Streams is a client library used for building real-time stream processing applications. It allows for the transformation, filtering, joining, and aggregation of data from Kafka topics.

### Example: Using Kafka Streams with Node.js

Although `kafkajs` does not natively support Kafka Streams, you can simulate streaming logic in Node.js using the Kafka Consumer API for data processing.

```javascript
await consumer.run({
  eachMessage: async ({ message }) => {
    const transformedValue = message.value.toString().toUpperCase();  // Transformation logic
    console.log('Processed Value:', transformedValue);
  },
});
```

---

## 9. Compaction

Compaction in Kafka is a process where older, redundant messages in a log are removed, keeping only the latest value for each key. This is useful for topics where only the latest state of each key is important (e.g., for maintaining the latest status of a user or account).

### Example: Creating a Compacted Topic

```bash
kafka-topics.sh --create --topic compacted-topic --bootstrap-server localhost:9092 --config cleanup.policy=compact
```

---

## 10. Kafka Transactions

Kafka supports exactly-once semantics through transactions, ensuring that data is processed exactly once even in the case of failure.

### Example: Enabling Kafka Transactions

```javascript
const producer = kafka.producer({ transactionalId: 'my-transactional-producer' });

await producer.connect();

await producer.send({
  topic: 'test-topic',
  messages: [
    { value: 'Transactional Message' },
  ],
  transactionalId: 'my-transactional-producer',
});

await producer.disconnect();
```

---

## 11. Fault Tolerance

Kafka achieves fault tolerance through replication and distributed architecture. When a broker fails, Kafka automatically switches to a follower that takes over as the leader for a partition.

---

## Conclusion

Kafka is a powerful, distributed event streaming platform that enables you to build scalable, real-time data pipelines and streaming applications. Using `kafkajs` in Node.js, you can easily integrate Kafka into your applications for both producing and consuming messages. 

---

[<- Kafka](kafka-quick.md)

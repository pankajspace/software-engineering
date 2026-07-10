[<- MERN](mern-quick.md)

# MongoDB Transactions with Node.js: A Detailed Guide

MongoDB introduced multi-document transactions starting with version 4.0, allowing multiple operations (on multiple collections) to be executed within a single transaction. If an error occurs, all changes can be rolled back, ensuring ACID (Atomicity, Consistency, Isolation, Durability) compliance, similar to traditional relational databases.

In Node.js, MongoDB transactions can be implemented using the official MongoDB Node.js driver or Mongoose.

## Key Concepts in MongoDB Transactions

1. Atomicity: Ensures that either all operations in a transaction are committed or none are.
2. Consistency: Ensures that the database moves from one valid state to another valid state.
3. Isolation: Ensures that transactions are isolated from each other until they are completed.
4. Durability: Once a transaction is committed, the changes are permanent.

## Prerequisites

- MongoDB replica set is required to use transactions, even if you have a single node. You can run MongoDB as a standalone replica set using:
  ```bash
  mongod --replSet rs0 --port 27017 --bind_ip localhost
  ```
- MongoDB version 4.0 or higher.

## Step-by-Step: Using MongoDB Transactions in Node.js

Here’s how you can implement a MongoDB transaction in Node.js using the MongoDB Node.js driver.

### 1. Setting Up MongoDB and Node.js

First, make sure you have the MongoDB Node.js driver installed:

```bash
npm install mongodb
```

Now, let’s create a basic Node.js app to perform multi-document transactions.

### 2. Example: Multi-Document Transaction with Node.js

In this example, we will simulate a bank transfer scenario where money is moved from one user account to another. The process involves deducting money from the sender's account and adding it to the receiver's account. If any part of the transaction fails, all operations are rolled back.

### 3. Node.js Transaction Example (MongoDB Driver)

```javascript
const { MongoClient } = require('mongodb');

async function runTransaction() {
    const uri = "mongodb://localhost:27017";  // MongoDB connection string
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const session = client.startSession(); // Start session for transaction
        const accountsCollection = client.db("bank").collection("accounts");

        // Start transaction
        session.startTransaction();

        // Example users
        const senderAccount = { _id: 1, name: 'Alice', balance: 1000 };
        const receiverAccount = { _id: 2, name: 'Bob', balance: 500 };

        // Define transfer amount
        const transferAmount = 200;

        try {
            // Step 1: Deduct from sender's balance
            const updateSender = await accountsCollection.updateOne(
                { _id: senderAccount._id },
                { $inc: { balance: -transferAmount } },
                { session }
            );
            if (updateSender.modifiedCount !== 1) {
                throw new Error("Failed to deduct from sender's balance");
            }

            // Step 2: Add to receiver's balance
            const updateReceiver = await accountsCollection.updateOne(
                { _id: receiverAccount._id },
                { $inc: { balance: transferAmount } },
                { session }
            );
            if (updateReceiver.modifiedCount !== 1) {
                throw new Error("Failed to add to receiver's balance");
            }

            // Commit the transaction if everything is successful
            await session.commitTransaction();
            console.log("Transaction committed. Transfer successful.");

        } catch (error) {
            // Abort the transaction in case of error
            console.log("Error during transaction, aborting...", error);
            await session.abortTransaction();
            console.log("Transaction aborted.");
        } finally {
            session.endSession();  // End session
        }
    } finally {
        await client.close();  // Close the MongoDB connection
    }
}

runTransaction().catch(console.dir);
```

## Step-by-Step Breakdown of the Code

1. MongoDB Connection: We use the MongoDB connection string to connect to the MongoDB instance.
   ```javascript
   const client = new MongoClient(uri, { useUnifiedTopology: true });
   await client.connect();
   ```

2. Session Start: To initiate a transaction, we first start a session.
   ```javascript
   const session = client.startSession();
   ```

3. Transaction Start: The session is used to start a transaction.
   ```javascript
   session.startTransaction();
   ```

4. Operations within the Transaction: In this example, two operations are carried out within the transaction: deducting the amount from the sender’s balance and adding the amount to the receiver’s balance. Both operations use the session object to indicate they are part of the same transaction.
   ```javascript
   await accountsCollection.updateOne({ _id: senderAccount._id }, { $inc: { balance: -transferAmount } }, { session });
   ```

5. Commit Transaction: If all operations are successful, the transaction is committed, ensuring that the changes are applied.
   ```javascript
   await session.commitTransaction();
   ```

6. Abort Transaction: If any operation fails, the transaction is aborted, and none of the changes are applied.
   ```javascript
   await session.abortTransaction();
   ```

7. Ending the Session: After the transaction completes (whether committed or aborted), the session is closed.
   ```javascript
   session.endSession();
   ```

---

## Example: Using Mongoose for MongoDB Transactions

Mongoose also supports transactions through sessions. Let’s look at a similar example using Mongoose.

### 1. Install Mongoose
```bash
npm install mongoose
```

### 2. Mongoose Transaction Example

```javascript
const mongoose = require('mongoose');

// Define a simple account schema
const accountSchema = new mongoose.Schema({
  name: String,
  balance: Number
});

const Account = mongoose.model('Account', accountSchema);

async function runMongooseTransaction() {
  await mongoose.connect('mongodb://localhost:27017/bank', { useNewUrlParser: true, useUnifiedTopology: true });

  const session = await mongoose.startSession();  // Start session

  try {
    session.startTransaction();  // Start transaction

    // Example data
    const senderId = "61a5a90a9b9f2c17b0e8e7d7";
    const receiverId = "61a5a90a9b9f2c17b0e8e7d8";
    const transferAmount = 200;

    // Step 1: Deduct from sender's balance
    const sender = await Account.findById(senderId).session(session);
    if (sender.balance < transferAmount) {
      throw new Error('Insufficient balance');
    }
    sender.balance -= transferAmount;
    await sender.save({ session });

    // Step 2: Add to receiver's balance
    const receiver = await Account.findById(receiverId).session(session);
    receiver.balance += transferAmount;
    await receiver.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    console.log('Transaction committed successfully.');

  } catch (error) {
    // Rollback transaction in case of an error
    console.log('Transaction failed. Rolling back...', error);
    await session.abortTransaction();
  } finally {
    session.endSession();  // End session
    await mongoose.disconnect();
  }
}

runMongooseTransaction();
```

## Step-by-Step Breakdown of Mongoose Code

1. Define Schema and Model: The schema defines the structure of the data in MongoDB. Here, we have an `Account` model with fields `name` and `balance`.
   ```javascript
   const accountSchema = new mongoose.Schema({ name: String, balance: Number });
   ```

2. Start Session and Transaction: The transaction starts by creating a session and calling `startTransaction()`.
   ```javascript
   const session = await mongoose.startSession();
   session.startTransaction();
   ```

3. Operations within Transaction: Similar to the previous example, we perform multiple operations within the transaction. We update the sender's and receiver's balances, ensuring that these operations are part of the same transaction by passing the `session` object to the `save()` method.

4. Commit and Abort Transaction: If all operations succeed, the transaction is committed. If an error occurs, the transaction is rolled back.

---

## Key Best Practices for MongoDB Transactions

1. Limit Scope of Transactions: Transactions introduce overhead, so limit the amount of data and time spent in a transaction.
2. Use Retry Logic: Transactions can fail due to transient issues. Implement retry logic to handle transient transaction failures.
3. Avoid Long-running Transactions: Long-running transactions can block other operations. Keep transactions as short as possible.
4. Monitor Transaction Performance: MongoDB offers performance metrics that you can monitor to ensure your transactions are efficient.

---

## Conclusion

MongoDB's support for multi-document transactions brings ACID properties to your Node.js applications, making it more reliable for critical operations like financial transactions. Whether using the MongoDB Node.js driver or Mongoose, you can create robust applications that ensure data integrity with transactions.

- Use the MongoDB Node.js driver for lower-level control.
- Use Mongoose for easier schema management and abstraction while still getting full transaction support.

These examples showcase how to implement transactions

 using both methods and can be adapted to a wide range of applications where data consistency is crucial.


# SQL Transactions with Node.js: A Detailed Guide

In SQL, transactions allow multiple operations to be executed as a single unit of work. If any operation within the transaction fails, the transaction can be rolled back, ensuring the database is left in a consistent state. This is crucial for ACID (Atomicity, Consistency, Isolation, Durability) compliance, ensuring that operations are executed reliably.

In this guide, we'll explore how to implement SQL transactions in Node.js using two common SQL libraries:
1. `mysql2`/`mysql` for MySQL and MariaDB
2. `pg` for PostgreSQL

## What is a Transaction in SQL?

A transaction is a sequence of SQL statements that are treated as a single unit. A transaction is successful only if all operations are completed successfully; otherwise, the entire transaction is rolled back.

- BEGIN: Start the transaction.
- COMMIT: Save changes to the database permanently.
- ROLLBACK: Revert all changes if any error occurs.

## Key Concepts in SQL Transactions

1. Atomicity: All operations in a transaction are treated as a single unit. If one part fails, the entire transaction fails.
2. Consistency: The transaction must take the database from one valid state to another, ensuring that the database remains valid.
3. Isolation: Transactions are isolated from each other to prevent data corruption caused by concurrent access.
4. Durability: Once a transaction is committed, its changes are permanent, even in case of a system failure.

---

## 1. SQL Transactions with MySQL and `mysql2`

### Setup

First, install the MySQL package for Node.js (`mysql2`):
```bash
npm install mysql2
```

### Example: MySQL Transaction in Node.js

In this example, we simulate a bank transfer between two accounts. We update the balance of the sender and receiver in a transaction. If either update fails, the transaction will be rolled back.

```javascript
const mysql = require('mysql2/promise');

async function runTransaction() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bank',
        password: 'password'
    });

    try {
        await connection.beginTransaction(); // Begin the transaction

        // Define the sender and receiver accounts
        const senderId = 1;
        const receiverId = 2;
        const transferAmount = 200;

        // Deduct amount from sender's account
        const [sender] = await connection.query('SELECT balance FROM accounts WHERE id = ?', [senderId]);
        if (sender[0].balance < transferAmount) {
            throw new Error('Insufficient funds');
        }
        await connection.query('UPDATE accounts SET balance = balance - ? WHERE id = ?', [transferAmount, senderId]);

        // Add amount to receiver's account
        await connection.query('UPDATE accounts SET balance = balance + ? WHERE id = ?', [transferAmount, receiverId]);

        // Commit the transaction
        await connection.commit();
        console.log('Transaction successful!');

    } catch (error) {
        // Rollback the transaction in case of error
        console.error('Transaction failed. Rolling back...', error);
        await connection.rollback();
    } finally {
        await connection.end();  // Close the connection
    }
}

runTransaction().catch(console.error);
```

## Step-by-Step Breakdown

1. Establish Connection: The `mysql2/promise` library is used to create a connection to the MySQL database.
   ```javascript
   const connection = await mysql.createConnection({ /* connection details */ });
   ```

2. Begin Transaction: Start a new transaction using `beginTransaction()`.
   ```javascript
   await connection.beginTransaction();
   ```

3. SQL Operations: Multiple SQL operations are performed inside the transaction. In this case, the sender's balance is checked and updated, and the receiver's balance is updated.
   ```javascript
   await connection.query('UPDATE accounts SET balance = balance - ? WHERE id = ?', [transferAmount, senderId]);
   ```

4. Commit the Transaction: If all operations succeed, the transaction is committed.
   ```javascript
   await connection.commit();
   ```

5. Rollback on Error: If any part of the transaction fails, the changes are rolled back.
   ```javascript
   await connection.rollback();
   ```

---

## 2. SQL Transactions with PostgreSQL and `pg`

### Setup

First, install the PostgreSQL package for Node.js (`pg`):
```bash
npm install pg
```

### Example: PostgreSQL Transaction in Node.js

Here’s an example of implementing the same bank transfer using PostgreSQL.

```javascript
const { Client } = require('pg');

async function runPgTransaction() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'bank',
        password: 'password',
        port: 5432
    });

    try {
        await client.connect();  // Connect to PostgreSQL
        await client.query('BEGIN');  // Begin the transaction

        // Define the sender and receiver accounts
        const senderId = 1;
        const receiverId = 2;
        const transferAmount = 200;

        // Deduct amount from sender's account
        const res = await client.query('SELECT balance FROM accounts WHERE id = $1', [senderId]);
        const senderBalance = res.rows[0].balance;
        if (senderBalance < transferAmount) {
            throw new Error('Insufficient funds');
        }
        await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [transferAmount, senderId]);

        // Add amount to receiver's account
        await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [transferAmount, receiverId]);

        // Commit the transaction
        await client.query('COMMIT');
        console.log('Transaction successful!');

    } catch (error) {
        // Rollback the transaction in case of error
        console.error('Transaction failed. Rolling back...', error);
        await client.query('ROLLBACK');
    } finally {
        await client.end();  // Close the client connection
    }
}

runPgTransaction().catch(console.error);
```

## Step-by-Step Breakdown

1. Establish Connection: Create a connection to the PostgreSQL database using the `pg` client.
   ```javascript
   const client = new Client({ /* connection details */ });
   await client.connect();
   ```

2. Begin Transaction: Start a new transaction using `BEGIN`.
   ```javascript
   await client.query('BEGIN');
   ```

3. SQL Operations: Multiple SQL operations are performed within the transaction, updating the sender's and receiver's balances.
   ```javascript
   await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [transferAmount, senderId]);
   ```

4. Commit the Transaction: If all operations succeed, the transaction is committed.
   ```javascript
   await client.query('COMMIT');
   ```

5. Rollback on Error: If any part of the transaction fails, the changes are rolled back.
   ```javascript
   await client.query('ROLLBACK');
   ```

---

## Error Handling and Retrying Transactions

When dealing with transactions, especially in a concurrent environment, you may face deadlocks, unique constraint violations, or connection issues. It’s a good practice to include retry logic to handle transient errors and deadlocks.

### Retry Logic for Transactions

You can implement a basic retry mechanism to handle transient errors. For example, you might want to retry the transaction a few times before giving up.

```javascript
async function runWithRetry(maxRetries = 3) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            await runTransaction();  // Try running the transaction
            break;  // If successful, exit the loop
        } catch (error) {
            attempt++;
            console.error(`Transaction attempt ${attempt} failed. Retrying...`);
            if (attempt >= maxRetries) {
                console.error('Max retries reached. Transaction failed.');
                throw error;
            }
        }
    }
}
```

In this example, if the transaction fails due to a transient error, it will retry up to 3 times.

---

## Using Transaction Isolation Levels

SQL databases allow you to specify isolation levels for transactions. These isolation levels control how transactions interact with each other and prevent phenomena like dirty reads, non-repeatable reads, and phantom reads.

Common isolation levels:
1. READ UNCOMMITTED: No restrictions. Transactions can see uncommitted changes from other transactions.
2. READ COMMITTED: A transaction can only see data committed before it started.
3. REPEATABLE READ: A transaction will see the same data for the duration of the transaction, even if other transactions modify it.
4. SERIALIZABLE: The highest isolation level. Transactions are executed as if they were sequential.

To set the isolation level in PostgreSQL:
```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

In MySQL:
```sql
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

You can execute this SQL statement right after starting the transaction.

---

## Best Practices for SQL Transactions

1. Keep Transactions Short: Long-running transactions hold locks for an extended period, potentially blocking other operations and leading to deadlocks.
2. Retry Logic: Implement retry logic to handle deadlocks or transient errors

.
3. Use the Appropriate Isolation Level: Choose the correct isolation level based on your application’s needs. High isolation levels like `SERIALIZABLE` provide more consistency but may reduce concurrency.
4. Monitor for Deadlocks: Detect and handle deadlocks appropriately. SQL databases often provide tools to monitor and analyze deadlocks.
5. Log Transaction Failures: Always log the reasons for transaction failures, as this can help in debugging and preventing future failures.

---

## Conclusion

SQL transactions in Node.js provide a powerful way to ensure data integrity and consistency, particularly for applications that require multi-step operations (e.g., financial applications). By using transactions, we can make sure that either all operations succeed or none are applied, keeping the database in a consistent state.

Whether using MySQL with `mysql2` or PostgreSQL with `pg`, you can easily manage transactions in your Node.js applications by wrapping operations in `BEGIN`, `COMMIT`, and `ROLLBACK` statements. Following best practices like retry logic, appropriate isolation levels, and proper error handling will ensure your transactions are robust and reliable.

---

[<- MERN](mern-quick.md)

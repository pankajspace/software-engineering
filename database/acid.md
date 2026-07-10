[<- Database](database-quick.md)

# What are ACID properties in DB. Explain in detail with postgresql examples.

ACID is an acronym that stands for **Atomicity, Consistency, Isolation, and Durability**. These properties ensure that database transactions are processed reliably and protect the integrity of your data. Let’s break down each property and see how PostgreSQL supports them.

---

### 1. Atomicity
**Definition:**  
Atomicity means that a transaction is treated as a single, indivisible unit of work. Either every operation within the transaction is completed successfully, or none are. If any part of the transaction fails, PostgreSQL rolls back the entire transaction, leaving the database unchanged.

**PostgreSQL Example:**  
Consider a scenario where you need to transfer money between two accounts. Both the debit and credit operations must succeed together.

```sql
BEGIN;  -- Start the transaction

-- Debit from one account
UPDATE accounts 
SET balance = balance - 100 
WHERE account_id = 1;

-- Credit to another account
UPDATE accounts 
SET balance = balance + 100 
WHERE account_id = 2;

-- If both updates are successful, commit the transaction
COMMIT;
```

If any of these statements fail (for example, if account 1 does not have sufficient funds), you can issue a rollback:

```sql
ROLLBACK;
```

This ensures that partial changes do not corrupt your data.

---

### 2. Consistency
**Definition:**  
Consistency ensures that a transaction brings the database from one valid state to another, obeying all defined rules such as constraints, triggers, and cascades. It prevents any transaction from violating the integrity rules of the database.

**PostgreSQL Example:**  
Imagine you have a foreign key constraint between an orders table and a customers table. PostgreSQL ensures that any insert or update operation adheres to these constraints.

```sql
-- Suppose you have these tables with a foreign key constraint:
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Trying to insert an order for a non-existent customer will fail:
BEGIN;
INSERT INTO orders (customer_id, order_date) VALUES (999, CURRENT_DATE);
-- This will violate the foreign key constraint and will cause an error.
ROLLBACK;
```

In this way, consistency is maintained because the database will reject any operation that would lead to an invalid state.

---

### 3. Isolation
**Definition:**  
Isolation ensures that concurrent transactions do not interfere with each other. Each transaction is executed in isolation, as if it were the only transaction in the system. PostgreSQL supports multiple isolation levels to control how transaction changes are visible to other transactions.

**Isolation Levels in PostgreSQL:**  
- **Read Committed (Default):** Each query sees only data committed before the query began.
- **Repeatable Read:** All queries in a transaction see a snapshot of the database as of the start of the transaction.
- **Serializable:** The strictest level, ensuring that transactions behave as if they were executed one after another.

**PostgreSQL Example:**  
You can set the isolation level at the beginning of a transaction:

```sql
BEGIN;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Execute your queries here. The snapshot of the data will be consistent for the duration of the transaction.
SELECT * FROM orders WHERE customer_id = 1;

COMMIT;
```

This setting ensures that even if other transactions are making changes concurrently, your transaction sees a stable view of the data.

---

### 4. Durability
**Definition:**  
Durability guarantees that once a transaction has been committed, the changes are permanent—even in the event of a system crash or power failure. PostgreSQL achieves durability through mechanisms like Write-Ahead Logging (WAL), which ensures that all changes are recorded on disk before the transaction is considered committed.

**PostgreSQL Mechanism:**  
- **Write-Ahead Logging (WAL):** Before any changes are applied to the database files, they are recorded in the WAL. This log can be used to recover the committed transactions if a failure occurs.

**PostgreSQL Example:**  
While you might not see WAL in everyday SQL commands, its effect is implicit in every committed transaction:

```sql
BEGIN;

-- Any set of operations here
INSERT INTO transactions (customer_id, amount) VALUES (1, 200);

COMMIT;
```

After the `COMMIT`, PostgreSQL ensures the changes are flushed to disk using WAL. Even if the system crashes immediately after, the transaction can be recovered and the database will reflect the committed changes once it restarts.

---

### Summary
- **Atomicity:** Ensures that all parts of a transaction succeed or fail together.
- **Consistency:** Guarantees that transactions leave the database in a valid state by enforcing constraints.
- **Isolation:** Keeps transactions separated so that concurrent operations do not interfere with each other.
- **Durability:** Ensures that once a transaction is committed, it will remain so, even in case of failures.

PostgreSQL supports these ACID properties robustly, making it a reliable choice for applications where data integrity and reliability are critical.

---

[<- Database](database-quick.md)

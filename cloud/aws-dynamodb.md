[<- Cloud](cloud-quick.md)

# AWS DynamoDB

Amazon DynamoDB is a fully managed NoSQL database service offered by AWS, designed for high availability, scalability, and fast, predictable performance. DynamoDB supports both document (JSON) and key-value data models, making it highly flexible for various use cases, from real-time data analytics to mobile and web applications. Unlike traditional relational databases, DynamoDB does not require fixed schemas, so it’s ideal for applications where data structures can vary or evolve over time.

## Key Features of DynamoDB

1. **Scalability**: DynamoDB scales automatically based on traffic and can handle millions of requests per second.
2. **Low Latency**: DynamoDB offers single-digit millisecond response times, crucial for real-time applications.
3. **Managed Service**: AWS fully manages DynamoDB, handling server maintenance, backups, and updates.
4. **Flexible Data Model**: DynamoDB uses a flexible, schema-less model, supporting both key-value and document storage.
5. **Global Tables**: Allows you to replicate your tables across multiple AWS regions for high availability and disaster recovery.
6. **Secondary Indexes**: DynamoDB supports global and local secondary indexes, allowing efficient querying on attributes other than the primary key.
7. **Transactions**: DynamoDB supports ACID transactions, enabling you to execute multiple operations as a single, atomic operation.
8. **Streams**: DynamoDB Streams provides a time-ordered sequence of item changes, useful for data processing and triggering downstream events.
9. **On-Demand and Provisioned Capacity**: DynamoDB offers both provisioned (fixed capacity) and on-demand (auto-scaling) modes, letting you balance cost and performance.

## Data Model Structure in DynamoDB

- **Tables**: Tables store items and can be thought of as similar to tables in a relational database.
- **Items**: Each item is a collection of attributes (similar to rows in a relational database).
- **Attributes**: Attributes store data values (similar to columns in relational databases).
- **Primary Key**: Each table requires a primary key to uniquely identify items. DynamoDB supports two types of primary keys:
   - **Partition Key (Simple Primary Key)**: A single attribute used to uniquely identify items.
   - **Partition and Sort Key (Composite Primary Key)**: A combination of a partition key and a sort key, allowing multiple items with the same partition key but different sort keys.

### Example Data Model

Suppose you have an e-commerce application. You can create a **"Products"** table in DynamoDB with the following schema:
   - **Partition Key**: `ProductID` (string) — uniquely identifies each product.
   - **Sort Key**: `Category` (string) — enables querying products within a specific category.
   - **Attributes**: Other attributes such as `Name`, `Description`, `Price`, and `Stock`.

## Examples of Key DynamoDB Features

### 1. Basic CRUD Operations

Using DynamoDB, you can perform create, read, update, and delete operations on items in a table.

**Example 1: Adding an Item**
```python
{
    "ProductID": "101",
    "Category": "Electronics",
    "Name": "Smartphone",
    "Description": "Latest 5G smartphone",
    "Price": 799.99,
    "Stock": 50
}
```
This item could represent a product in an e-commerce app. Here, `ProductID` is the partition key, `Category` is the sort key, and other attributes provide product details.

**Example 2: Querying an Item**
   - To get details for `ProductID: 101` in the "Electronics" category, you can query based on the `ProductID` and `Category` keys.

### 2. Secondary Indexes

DynamoDB supports secondary indexes to improve query flexibility:
   - **Global Secondary Index (GSI)**: Allows queries on non-primary key attributes.
   - **Local Secondary Index (LSI)**: Allows additional sort keys per partition key.

**Example**: Suppose your e-commerce app frequently queries products by price in each category. You can create a GSI on the `Category` and `Price` attributes, making it easy to retrieve products within a price range for a specific category.

### 3. Transactions

DynamoDB supports ACID transactions, enabling you to perform multiple operations in a single atomic transaction. This is helpful for applications requiring consistent multi-item writes.

**Example**: In a banking application, you might use a transaction to transfer money between accounts, ensuring that both the debit and credit actions occur as a single atomic operation.

### 4. DynamoDB Streams

DynamoDB Streams provide a log of changes (insert, update, delete) made to items in a table. Streams are useful for triggering downstream processes and integrating with other AWS services like Lambda.

**Example**: Suppose you have a table storing user orders. With DynamoDB Streams, you can trigger an AWS Lambda function whenever a new order is placed. The Lambda function could send a confirmation email to the user or notify the inventory system to update stock levels.

### 5. Global Tables for Multi-Region Replication

Global Tables enable cross-region replication, letting you deploy a fully replicated table across multiple regions. This is ideal for applications requiring low-latency access for global users.

**Example**: A social media app can use Global Tables to store user profile information, ensuring users worldwide can access their data with minimal latency regardless of their location.

### 6. Capacity Modes: Provisioned and On-Demand

DynamoDB offers two capacity modes to manage read/write capacity:
   - **Provisioned Mode**: You specify the number of reads and writes per second, which DynamoDB guarantees. Suitable for applications with predictable workloads.
   - **On-Demand Mode**: DynamoDB automatically scales to accommodate traffic spikes. Ideal for applications with unpredictable or variable workloads.

**Example**: An e-commerce site experiencing unpredictable traffic during holiday sales might opt for on-demand mode, allowing DynamoDB to scale instantly during high traffic times without over-provisioning.

## Advanced Use Cases of DynamoDB

### Example 1: Real-Time Gaming Leaderboard

In a real-time gaming app, a leaderboard tracks players' scores. A `Leaderboard` table can use:
   - **Partition Key**: `GameID` — uniquely identifies each game.
   - **Sort Key**: `Score` — sorts players within each game by score.

With a descending sort order on the `Score`, the highest-scoring players appear at the top of the leaderboard. Additionally, a GSI on the `PlayerID` and `Score` fields can help retrieve individual players’ scores across all games.

### Example 2: IoT Sensor Data Storage

DynamoDB is often used in IoT applications to store time-series data from sensors. An `IoTData` table can use:
   - **Partition Key**: `DeviceID` — uniquely identifies each device.
   - **Sort Key**: `Timestamp` — enables querying data by time.

The IoT system can store sensor readings for each device, and you can query readings within a time range, making it ideal for monitoring and analytics applications.

### Example 3: E-Commerce Shopping Cart

A shopping cart can be stored in DynamoDB with each user's cart items as items in a table. Here’s a potential schema:
   - **Partition Key**: `UserID` — identifies the user.
   - **Sort Key**: `ProductID` — uniquely identifies each product in the cart.
   - **Attributes**: `Quantity`, `Price`, `Timestamp`.

DynamoDB’s flexible data model and high throughput make it easy to add, remove, or update items in the cart, even during high traffic events, while maintaining fast response times.

### Example 4: Chat Application

For a chat application, DynamoDB can store conversations efficiently by structuring tables for users, messages, and timestamps:
   - **Partition Key**: `ChatID` — identifies each chat session.
   - **Sort Key**: `Timestamp` — orders messages by their time of creation.

This structure enables querying messages in chronological order and even facilitates reading only the last few messages for quick loading of the chat history.

## Conclusion

Amazon DynamoDB offers a highly scalable, flexible, and managed NoSQL database solution suitable for various applications, from real-time gaming to IoT and e-commerce. Its key features like global tables, on-demand scaling, ACID transactions, and integration with other AWS services make it a powerful option for developers building modern, high-performance applications. By combining DynamoDB’s core capabilities with secondary indexes, streams, and flexible data modeling, organizations can build resilient and fast applications that scale seamlessly to handle any workload.

---

[<- Cloud](cloud-quick.md)
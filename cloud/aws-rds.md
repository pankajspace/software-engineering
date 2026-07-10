[<- Cloud](cloud-quick.md)

# AWS RDS

To explain AWS RDS with a Node.js example in detail, let’s build a simple application that uses **MySQL** running on AWS RDS. We will:

1. **Create an RDS instance**.
2. **Set up a Node.js application**.
3. **Connect the Node.js application to the RDS instance**.
4. **Perform basic CRUD operations** using MySQL in the Node.js app.

## Step 1: **Create an AWS RDS Instance**

1. **Login to AWS Console**:
   - Go to the [AWS Management Console](https://aws.amazon.com/console/).
   - Navigate to **RDS** by searching for "RDS" in the search bar.

2. **Create Database**:
   - Click on **Create Database**.
   - Choose **MySQL** as the database engine.
   - Choose the **Free Tier** option for testing or select a larger instance type based on your needs.
   - Set the **DB Instance Identifier** (e.g., `mydb-instance`).
   - Set **Master Username** (e.g., `admin`) and **Master Password**.

3. **Configure Instance**:
   - Choose the instance class (for free tier, use `db.t3.micro`).
   - Set allocated storage (e.g., 20 GB).
   - Enable **Multi-AZ deployment** (optional) for production-grade high availability.

4. **Connectivity**:
   - Select the **VPC** (if unsure, select the default VPC).
   - Ensure that **Public Access** is enabled if you want to connect from your local machine (or set up a VPN or SSH tunneling if needed for private access).
   - Set up a **Security Group** that allows incoming connections to the database. You can restrict this by allowing only specific IP addresses or use `0.0.0.0/0` to allow all (for testing, but not recommended for production).

5. **Database Options**:
   - Set **Initial Database Name** (e.g., `myappdb`).
   - Leave other settings as default or configure backups, encryption, etc.

6. **Create the Database**:
   - Click **Create Database**. It will take a few minutes for the database to become available.

7. **Get the Endpoint**:
   - Once the RDS instance is created, go to the **RDS Console** and find your database.
   - Copy the **Endpoint** (e.g., `mydb-instance.abcdefg12345.us-west-2.rds.amazonaws.com`) and the **Port** (default for MySQL is `3306`).

---

## Step 2: **Set up Node.js Application**

### 1. **Create a Node.js Project**
First, set up a simple Node.js project that will connect to your MySQL RDS instance.

1. Initialize a new Node.js project:
   ```bash
   mkdir nodejs-rds-example
   cd nodejs-rds-example
   npm init -y
   ```

2. Install necessary dependencies:
   ```bash
   npm install express mysql2 dotenv
   ```

   - **express**: For building a web server.
   - **mysql2**: A MySQL client for Node.js to interact with the MySQL database.
   - **dotenv**: To manage environment variables securely.

3. **Project Structure**:
   Your project structure should look like this:
   ```
   nodejs-rds-example/
   ├── .env
   ├── app.js
   ├── package.json
   └── node_modules/
   ```

### 2. **Create the `.env` File**
In the root of your project directory, create a `.env` file to securely store environment variables such as database credentials.

```bash
touch .env
```

**Contents of `.env` file**:
```ini
DB_HOST=mydb-instance.abcdefg12345.us-west-2.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=yourPassword
DB_NAME=myappdb
DB_PORT=3306
```

This `.env` file contains the connection details to your RDS instance.

### 3. **Set up `app.js` to Connect to the RDS MySQL Instance**

Create an `app.js` file to define your Node.js app.

```bash
touch app.js
```

Add the following code to `app.js` to connect to the database and perform CRUD operations.

```javascript
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

// Create an express application
const app = express();
app.use(express.json());  // For parsing JSON bodies

// MySQL connection configuration
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Welcome to Node.js with AWS RDS!');
});

// Create a new user (Create)
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  connection.query(query, [name, email], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send('Database error');
    }
    res.status(201).send(`User created with ID: ${results.insertId}`);
  });
});

// Get all users (Read)
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Database error');
    }
    res.status(200).json(results);
  });
});

// Update user (Update)
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  connection.query(query, [name, email, id], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).send('Database error');
    }
    res.status(200).send(`User with ID: ${id} updated`);
  });
});

// Delete user (Delete)
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).send('Database error');
    }
    res.status(200).send(`User with ID: ${id} deleted`);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Step 3: **Prepare the MySQL Database in RDS**

To complete the setup, we need to create a `users` table in the MySQL database on RDS.

1. **Connect to RDS Using MySQL Client**:
   Using the MySQL command-line client, connect to your RDS instance:

   ```bash
   mysql -h mydb-instance.abcdefg12345.us-west-2.rds.amazonaws.com -u admin -p
   ```

   Enter your RDS password when prompted.

2. **Create the Database Table**:
   Once connected, create the `users` table:

   ```sql
   CREATE DATABASE IF NOT EXISTS myappdb;
   USE myappdb;

   CREATE TABLE users (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     email VARCHAR(100),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

This table will store user data with `name`, `email`, and `created_at` fields.

---

## Step 4: **Run the Node.js Application**

1. **Start the Node.js Server**:
   Start your Node.js application by running:

   ```bash
   node app.js
   ```

2. **Testing the Application**:
   You can now test the REST API endpoints using Postman, cURL, or your browser.

   - **Create a New User**:
     ```bash
     curl -X POST http://localhost:3000/users -H 'Content-Type: application/json' -d '{"name": "John Doe", "email": "john@example.com"}'
     ```

     Expected Response:
     ```
     User created with ID: 1
     ```

   - **Get All Users**:
     ```bash
     curl http://localhost:3000/users
     ```

     Expected Response:
     ```json
     [
       {
         "id": 1,
         "name": "John Doe",
         "email": "john@example.com",
         "created_at": "2024-10-15 12:34:56"
       }
     ]
     ```

   - **Update a User**:
     ```bash
     curl -X PUT http://localhost:3000/users/1

 -H 'Content-Type: application/json' -d '{"name": "Jane Doe", "email": "jane@example.com"}'
     ```

     Expected Response:
     ```
     User with ID: 1 updated
     ```

   - **Delete a User**:
     ```bash
     curl -X DELETE http://localhost:3000/users/1
     ```

     Expected Response:
     ```
     User with ID: 1 deleted
     ```

---

## Step 5: **Monitor and Scale**

Once the application is running in production, AWS RDS provides monitoring, scaling, and backup features to ensure high availability.

1. **CloudWatch Monitoring**:
   Use Amazon CloudWatch to monitor key metrics such as CPU usage, memory, and disk I/O. You can set up CloudWatch alarms to notify you if certain thresholds are exceeded.

2. **Scaling the Database**:
   You can increase the size of the RDS instance or add read replicas for scaling. Go to the **RDS Console** to modify the instance class or add replicas for distributing the read workload.

---

## Conclusion

In this example, we walked through how to create an AWS RDS instance, connect it to a Node.js application, and perform basic CRUD operations. AWS RDS simplifies database management by automating backups, scaling, patching, and monitoring, allowing developers to focus on building applications. This setup provides a scalable, secure, and highly available database for your Node.js applications.
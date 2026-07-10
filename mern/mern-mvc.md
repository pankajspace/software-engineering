[<- MERN](mern-quick.md)

# MERN MVC (Model View Controller)
Here's a **simple Express.js & MongoDB application** following the **MVC (Model-View-Controller) pattern** with a **DTO (Data Transfer Object) layer**.

---

## **📌 Features**
✅ Uses **Express.js** as the web framework  
✅ Uses **MongoDB** as the database  
✅ Implements **MVC pattern**  
✅ Includes a **DTO Layer** to manage structured data transfer  

---

## **📂 Project Structure**
```
/express-mvc-dto-app
│── /config
│   ├── db.js              # Database connection setup
│── /controllers
│   ├── userController.js  # Handles API logic for users 
│── /dtos
│   ├── userDTO.js         # Defines DTO structure for users
│── /models
│   ├── userModel.js       # Defines MongoDB schema for users
│── /routes
│   ├── userRoutes.js      # Defines routes for users
│── /services
│   ├── userService.js     # Business logic layer for users
│── server.js              # Entry point for Express server
│── package.json           # Dependencies
```

---

## **Step 1: Initialize Project & Install Dependencies**
```sh
mkdir express-mvc-dto-app && cd express-mvc-dto-app
npm init -y
npm install express mongoose body-parser cors
```

---

## **Step 2: Setup MongoDB Connection**
Create a `config/db.js` file:

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/expressmvc", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
```

---

## **Step 3: Create User Model**
Purpose: To define the schema for the user collection in MongoDB and to interact with the database.

Create a `models/userModel.js` file:

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, // Should not be exposed via API
});

module.exports = mongoose.model("User", userSchema);
```

---

## **Step 4: Create User DTO**
Purpose: To prevent exposure of sensitive data (e.g., password) and to structure data transfer.
Returns data in a structured format.

Create a `dtos/userDTO.js` file:

```javascript
class UserDTO {
    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.email = user.email;
        // We exclude the password for security reasons
    }
}

module.exports = UserDTO;
```

---

## **Step 5: Create Service Layer**
Purpose: To manage business logic independently of controllers.
Returns data transfer objects (DTOs) to controllers.

Create a `services/userService.js` file:

```javascript
const User = require("../models/userModel");
const UserDTO = require("../dtos/userDTO");

class UserService {
    async getAllUsers() {
        const users = await User.find();
        return users.map(user => new UserDTO(user)); // Convert users to DTOs
    }

    async createUser(userData) {
        const user = new User(userData);
        await user.save();
        return new UserDTO(user);
    }
}

module.exports = new UserService();
```

---

## **Step 6: Create Controller**
Purpose: To handle API logic for users.
Returns JSON responses for API requests.

Create a `controllers/userController.js` file:

```javascript
const userService = require("../services/userService");

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const userDTO = await userService.createUser({ name, email, password });
        res.status(201).json(userDTO);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
};
```

---

## **Step 7: Create Routes**
Purpose: To define routes for users.
Returns JSON responses for API requests.

Create a `routes/userRoutes.js` file:

```javascript
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.post("/", userController.createUser);

module.exports = router;
```

---

## **Step 8: Setup Express Server**
Create a `server.js` file:

```javascript
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## **Step 9: Run the Application**
### **Start MongoDB (if not running)**
```sh
mongod
```

### **Start Express Server**
```sh
node server.js
```
> **Output**: `Server running on http://localhost:5000`

---

## **Step 10: Test the API**
### **1️⃣ Create a User**
```sh
curl -X POST "http://localhost:5000/api/users" -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "password": "secret"}'
```
> **Response**
```json
{
    "id": "65a1f68c1234567890abcdef",
    "name": "John Doe",
    "email": "john@example.com"
}
```

### **2️⃣ Fetch All Users**
```sh
curl -X GET "http://localhost:5000/api/users"
```
> **Response**
```json
[
    {
        "id": "65a1f68c1234567890abcdef",
        "name": "John Doe",
        "email": "john@example.com"
    }
]
```

---

## **🎯 Key Takeaways**
✅ **MVC Pattern**: Separates concerns (Model, View, Controller).  
✅ **DTO Layer**: Prevents exposure of sensitive data (e.g., password).  
✅ **Service Layer**: Manages business logic independently of controllers.  
✅ **Modular Design**: Each part of the application has a clear responsibility.  

---

[<- MERN](mern-quick.md)

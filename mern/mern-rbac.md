[<- MERN](mern-quick.md)

## MERN Role-Based Access Control (RBAC)

**Role-Based Access Control (RBAC)** is a security approach where access to resources is granted based on roles assigned to users. In a MERN (MongoDB, Express.js, React.js, Node.js) application, you can implement RBAC by creating middleware to verify roles before allowing access to certain routes or components.

Here’s a step-by-step guide to implementing RBAC in a MERN application:

### 1. **Setting Up a MERN App**

Let’s assume you already have a basic MERN stack application. You will need:
- **MongoDB** for the database.
- **Express.js** for the server.
- **React.js** for the frontend.
- **Node.js** as the runtime environment.

If you haven't set up a MERN app yet, you can create a basic one with these steps:

```bash
npx create-react-app rbac-mern-client
mkdir rbac-mern-server
cd rbac-mern-server
npm init -y
npm install express mongoose jsonwebtoken bcryptjs
```

### 2. **Defining User Model with Roles (MongoDB)**

First, you need to create a **User** schema that includes roles. Let’s assume users have a `role` field where their roles (e.g., `admin`, `user`, etc.) are defined.

```js
// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
```

Here, the `role` field defines the role of the user, which can either be `admin` or `user`.

### 3. **Creating Authentication Middleware**

To secure routes, we’ll need a way to authenticate users and check their roles.

#### JSON Web Token (JWT) Authentication

Install `jsonwebtoken` to manage authentication:

```bash
npm install jsonwebtoken
```

Next, create middleware for verifying JWTs.

```js
// middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate the token
exports.authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Middleware to authorize based on role
exports.roleMiddleware = (roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);
            if (!roles.includes(user.role)) {
                return res.status(403).json({ msg: 'Access denied: Insufficient permissions' });
            }
            next();
        } catch (err) {
            res.status(500).json({ msg: 'Server Error' });
        }
    };
};
```

- **authMiddleware** checks if the user has a valid JWT.
- **roleMiddleware** checks if the user has one of the allowed roles to access a specific route.

### 4. **User Authentication and JWT Token Generation**

In the user controller, you can define routes to handle registration and login. When a user logs in, they receive a JWT token.

```js
// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route POST /api/auth/register
// @desc Register a user
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password, role });
        await user.save();

        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// @route POST /api/auth/login
// @desc Authenticate user & get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
```

### 5. **Protecting Routes Based on Roles**

With JWT and roles implemented, you can now protect routes based on user roles. Use both the `authMiddleware` for authentication and the `roleMiddleware` to check roles.

```js
// routes/protectedRoutes.js

const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// @route GET /api/admin
// @desc Admin route (only accessible by admin)
router.get('/admin', authMiddleware, roleMiddleware(['admin']), (req, res) => {
    res.json({ msg: 'Welcome Admin!' });
});

// @route GET /api/user
// @desc User route (accessible by both admin and user)
router.get('/user', authMiddleware, roleMiddleware(['admin', 'user']), (req, res) => {
    res.json({ msg: 'Welcome User!' });
});

module.exports = router;
```

In this example:
- The `/admin` route is accessible only by users with the `admin` role.
- The `/user` route is accessible by both `admin` and `user` roles.

### 6. **Frontend: Handling Authentication and Role-based UI (React)**

In the React frontend, you can manage access to components based on roles. First, you'll need to store the JWT token in localStorage after login and include it in the Authorization headers for API requests.

```js
// src/utils/PrivateRoute.js

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// A wrapper component for role-based route protection
const PrivateRoute = ({ component: Component, role, ...rest }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    return (
        <Route
            {...rest}
            render={(props) =>
                token && role === userRole ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
```

You can now use this `PrivateRoute` component to protect certain routes based on user roles.

```js
// src/App.js

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Login from './components/Login';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/admin" component={AdminDashboard} role="admin" />
                <PrivateRoute path="/user" component={UserDashboard} role="user" />
            </Switch>
        </Router>
    );
}

export default App;
```

Here, `AdminDashboard` is protected and accessible only by users with the `admin` role, while `UserDashboard` is for users with the `user` role.

### 7. **Testing the RBAC**

1. **Register Users**: Create users with different roles (`admin`, `user`).
2. **Login**: After login, the JWT token will be stored in localStorage, along with the user's role.
3. **Access Control**: Try accessing protected routes like `/admin` and `/user` and ensure access is correctly restricted based on roles.

---

### Conclusion

This setup outlines how to implement Role-Based Access Control (RBAC) in a MERN application. You can use **JWT** for authentication, **middleware** to enforce roles, and control access to API endpoints and frontend components based on the user's role. This approach can easily be extended by adding more roles and refining access control for each route.

Let me know if you need further clarifications or code improvements!

---

[<- MERN](mern-quick.md)

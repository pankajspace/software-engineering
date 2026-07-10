[<- MERN](mern-quick.md)

# JWT
1. [passport-jwt](https://www.passportjs.org/packages/passport-jwt/)

# JWT Authentication with Examples Using Node.js and Refresh Tokens

JWT (JSON Web Token) is a widely used standard for securely transmitting information between a client and a server as a JSON object. It's often used for authentication and authorization in modern web applications, enabling stateless, secure token-based authentication.

## JWT Structure
- Header: Contains metadata about the token, such as the type and signing algorithm. 
- Payload: Contains claims (e.g., user ID, username) and additional data. 
- Signature: Ensures the token is not tampered with and can be verified. It's created by encoding the header, payload, and a secret key. 

## JWT authentication flow
- Access Token: Used for authorizing requests to protected routes or resources.
- Refresh Token: Used to obtain a new access token once the old one expires, without requiring the user to log in again.

In this guide, we'll implement JWT authentication in Node.js using `jsonwebtoken` and refresh tokens.

## Steps to Implement JWT Authentication

1. Setup and Dependencies
2. Generate JWT and Refresh Tokens
3. Verify JWT Token Middleware
4. Refresh Token Mechanism
5. Logout and Revoke Refresh Token

---

## 1. Setup and Dependencies

Install the required dependencies:

```bash
npm init -y
npm install express jsonwebtoken bcryptjs dotenv
```

- `express`: Web framework for Node.js.
- `jsonwebtoken`: Library to create and verify JWTs.
- `bcryptjs`: For hashing passwords.
- `dotenv`: For environment variable management.

### Project Structure:

```bash
├── app.js
├── .env
└── routes
    └── auth.js
```

---

## 2. Generate JWT and Refresh Tokens

`app.js`

```javascript
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

app.use(express.json());

let refreshTokens = []; // Store refresh tokens for simplicity. In real apps, use a DB

// Simulated user data
const users = [
  {
    id: '1',
    username: 'john',
    password: bcrypt.hashSync('password123', 8) // Password is hashed
  },
];

// Function to generate access token
function generateAccessToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Function to generate refresh token
function generateRefreshToken(user) {
  const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken); // Save refresh token
  return refreshToken;
}

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      accessToken,
      refreshToken
    });
  } else {
    res.status(401).send('Username or password incorrect');
  }
});

// Example protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is protected data' });
});

// Middleware to verify access token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Start the server
app.listen(4000, () => {
  console.log('Server running on port 4000');
});
```

- `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` are stored in `.env` for security.
- `generateAccessToken()` generates an access token with a 15-minute expiry.
- `generateRefreshToken()` creates a refresh token that can be used to get a new access token.

`.env`

```env
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
```

---

## 3. Verify JWT Token Middleware

In the `authenticateToken` middleware, the access token is verified before allowing access to protected routes.

```javascript
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
```

This middleware extracts the JWT from the `Authorization` header, verifies it, and grants access to the requested resource.

---

## 4. Refresh Token Mechanism

Create a route to handle token refreshing when the access token expires.

`routes/auth.js`

```javascript
// Refresh Token Route
app.post('/token', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(user); // Generate new access token
    res.json({ accessToken: newAccessToken });
  });
});
```

- When the user’s access token expires, the client can call this endpoint with the refresh token.
- The server verifies the refresh token and issues a new access token if valid.

---

## 5. Logout and Revoke Refresh Token

To invalidate a refresh token (e.g., when logging out), we simply remove it from our list of refresh tokens.

Logout Route

```javascript
// Logout Route
app.post('/logout', (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);
  res.sendStatus(204);
});
```

- This route removes the refresh token from the array, effectively invalidating it.

---

## 6. Example Client Flow

Login Request Example:

```bash
POST /login
{
  "username": "john",
  "password": "password123"
}
```

Response:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

Access Protected Resource Example:

```bash
GET /protected
Authorization: Bearer <accessToken>
```

Response:

```json
{
  "message": "This is protected data"
}
```

Refresh Access Token:

```bash
POST /token
{
  "refreshToken": "<refreshToken>"
}
```

Response:

```json
{
  "accessToken": "newAccessToken"
}
```

Logout:

```bash
POST /logout
{
  "refreshToken": "<refreshToken>"
}
```

## Conclusion

This example demonstrates a simple and secure JWT-based authentication flow using Node.js with access tokens and refresh tokens. It ensures that even if access tokens expire, users can continue interacting with the system through refresh tokens without having to log in again. It also provides an efficient way to handle token revocation during logout, preventing unauthorized access.

---

[<- MERN](mern-quick.md)

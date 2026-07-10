[<- MERN](mern-quick.md)


## OAuth Diagram

Here’s a simplified diagram that illustrates the OAuth flow in a MERN stack application using **Google OAuth** and **Passport.js**:

```
+--------------------+               +------------------------+
|                    |               |                        |
|    React Frontend  |               |  Google Authorization  |
|                    |               |        Server          |
+--------------------+               +------------------------+
        |                                      |
        |                                      |
        | 1. User clicks "Login with Google"   |
        | -----------------------------------> |
        |                                      |
        |                                      |
        | 2. Redirect to Google OAuth Consent  |
        | <----------------------------------- |
        |                                      |
        |                                      |
        | 3. User grants permission            |
        |                                      |
        |                                      |
        | 4. Google redirects with Auth Code   |
        | <----------------------------------- |
        |                                      |
        |                                      |
+--------------------+               +------------------------+
|                    |               |                        |
| Node.js/Express    |               |  Google OAuth Token    |
| Backend (Passport) |               |        Server          |
|                    |               |                        |
+--------------------+               +------------------------+
        |                                      |
        |                                      |
        | 5. Backend receives Auth Code        |
        |                                      |
        |                                      |
        | 6. Backend exchanges Auth Code for   |
        |    Access Token & Profile Info       |
        | -----------------------------------> |
        |                                      |
        |                                      |
        | 7. Google returns Access Token &     |
        |    Profile Data                      |
        | <----------------------------------- |
        |                                      |
        |                                      |
        | 8. Backend stores user info &        |
        |    serializes session (or JWT)       |
        |                                      |
        |                                      |
        | 9. Redirect user to protected        |
        |    resource (dashboard)              |
        | -----------------------------------> |
        |                                      |
+--------------------+                         |
|                    |                         |
|    React Frontend  |                         |
|                    |                         |
+--------------------+                         |
        |                                      |
        |                                      |
        | 10. User can access protected        |
        |     resources in the frontend        |
        |                                      |
```

### Step-by-Step Breakdown:
1. **User clicks the "Login with Google"** button on the frontend (React), which triggers a redirect to Google’s OAuth 2.0 consent screen.
2. The user is asked to grant permission for the app to access their Google profile.
3. **User grants permission**, and Google redirects them back to the backend with an authorization code.
4. **Backend (Express)** receives the authorization code, which Passport.js handles.
5. The backend sends a request to Google to **exchange the authorization code** for an access token and user profile information.
6. **Google returns an access token** and profile data to the backend.
7. The backend processes this data, typically saving the user’s information in a database (MongoDB) and **serializes the session** (or issues a JWT).
8. The user is redirected back to the frontend **dashboard** (or any protected resource).
9. The frontend (React) checks if the user is authenticated (via a session or token) and grants access to the protected resource.

This diagram simplifies the Google OAuth flow in a MERN stack with Passport.js. It shows the key interactions between the user, frontend, backend, and Google’s authorization server.


## OAuth using MERN Stack and Google OAuth2 and Passport.js

To integrate Google OAuth with a MERN stack application using **Passport.js**, we use Passport's Google OAuth strategy to handle authentication. Here’s a detailed step-by-step guide explaining how you can set up Google OAuth in a MERN application with Passport.js.

### Step-by-Step OAuth Flow in a MERN Stack with Passport.js

### 1. **Register Your App with Google**

Before you start, you need to get credentials from Google:

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and navigate to **API & Services** > **Credentials**.
3. Set up **OAuth Consent Screen**.
4. Create **OAuth 2.0 credentials** (Client ID and Client Secret).
5. Set the **Authorized Redirect URI** to your backend route, e.g., `http://localhost:5000/auth/google/callback`.

### 2. **Install Required Packages**

First, you need to install the necessary dependencies in both your **backend (Node.js/Express)** and **frontend (React)**.

#### Backend (Node.js/Express)
```bash
npm install express passport passport-google-oauth20 express-session mongoose connect-mongo
```

#### Frontend (React)
Install Axios for handling API requests.
```bash
npm install axios
```

### 3. **Configure Passport.js in Express (Backend)**

#### a. **Set up Express App with Sessions**

Passport requires session management to persist login state between requests. Use `express-session` for session management.

```javascript
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("dotenv").config();

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express Session Middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
```

#### b. **Define User Model**

You will store the user information in MongoDB. Define a User model with Mongoose.

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  picture: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

#### c. **Set Up Passport Google Strategy**

Now, configure the Google OAuth strategy in Passport.js.

```javascript
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

// Passport Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails, photos } = profile;

      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: id });

        if (!user) {
          // If not, create a new user
          user = new User({
            googleId: id,
            name: displayName,
            email: emails[0].value,
            picture: photos[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        console.error(err);
        return done(err, null);
      }
    }
  )
);

// Serialize user to save to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
```

### 4. **Define Google OAuth Routes**

You need routes to handle the authentication requests. The user will click a "Login with Google" button, which will redirect them to the Google OAuth page. After a successful login, they will be redirected to the callback URL.

```javascript
const express = require("express");
const passport = require("passport");
const router = express.Router();

// Redirect the user to Google for authentication
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // Redirect to login if authentication fails
  }),
  (req, res) => {
    // Successful authentication, redirect to your frontend dashboard or homepage
    res.redirect("http://localhost:3000/dashboard");
  }
);

// Logout route
router.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
```

### 5. **Protecting Routes**

You might want to protect certain routes in your application, such as a dashboard, to ensure that only authenticated users can access it.

```javascript
// Middleware to check if the user is authenticated
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// Protected route example
router.get("/dashboard", ensureAuth, (req, res) => {
  res.send(`Welcome ${req.user.name}, to your dashboard!`);
});
```

### 6. **Frontend (React) Setup**

In your React application, you can have a simple login page with a "Login with Google" button that directs the user to your backend's Google login route.

#### a. **Login Page (React Component)**
```jsx
import React from "react";

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
```

#### b. **Dashboard Page (React Component)**
Once the user is authenticated, redirect them to the dashboard.

```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/user");
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <img src={user.picture} alt={user.name} />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Dashboard;
```

### 7. **Handling User Session on Frontend**

You can create a route in your backend to send the authenticated user data to the frontend.

```javascript
router.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
});
```

### 8. **Session Management**

Sessions are automatically handled via cookies. When the user logs in, Passport.js stores session data. On each request, the session ID is sent to the server, and Passport deserializes the user from the session.

You can also store JWT tokens if you prefer a token-based approach. However, with Passport and session management, cookies are used by default.

---

### Complete OAuth Flow Breakdown:

1. **User clicks "Login with Google" button**: 
   - This redirects the user to the Google OAuth 2.0 consent screen.

2. **User authenticates via Google**: 
   - Google redirects the user back to your app with an authorization code.

3. **Backend exchanges authorization code for tokens**: 
   - Passport.js handles this exchange, retrieving user data from Google.

4. **User data is stored/serialized**: 
   - The user's profile is saved in MongoDB, and Passport.js serializes the user into the session.

5. **Frontend displays user information**: 
   - After successful authentication, the user is redirected to a protected dashboard in your React app, displaying their profile.

### Conclusion

By using **Passport.js** with Google OAuth in a MERN stack, you streamline the authentication process while leveraging Passport's session management and Google’s OAuth service. You can further expand the flow by adding token handling, more security layers, or advanced features like refresh tokens.

---

[<- MERN](mern-quick.md)

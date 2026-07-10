[<- MERN](mern-quick.md)

# Node packages links
1. [30 Node.js Modules With Usecases](https://javascriptcentric.medium.com/30-node-js-modules-with-usecases-36950203722f)

# Node.js useful packages

## Express
Express is a fast, un-opinionated, minimalist web framework. It provides small, robust tooling for HTTP servers, making it a great solution for single-page applications, websites, hybrids, or public HTTP APIs.

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("This is home page.");
});
app.post("/", (req, res) => {
    res.send("This is home page with post request.");
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
```

## Helmet
Helmet middleware is a toolkit that helps you to secure your Express apps by setting various HTTP headers.

```js
const express = require('express');
const helmet = require("helmet");

const app = express();

app.use(helmet());

// or You can use individual headers
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());  // Prevent Click Jacking Attack
app.use(helmet.hidePoweredBy()); // Disable tech-stack from header
app.use(helmet.hsts()); // Set strict transport security
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());// Prevent Cross-site scripting attack
```

## CORS
CORS is shorthand for Cross-Origin Resource Sharing. It is a mechanism to allow or restrict requested resources on a web server depends on where the HTTP request was initiated.

This policy is used to secure a certain web server from access by other websites or domains. For example, only the allowed domains will be able to access hosted files in a server such as a stylesheet, image, or script.
```js
const express = require('express')
const cors = require('cors')

const app = express()

//Simple Usage (Enable All CORS Requests)
app.use(cors())

//Enable CORS for a Single Route
app.get('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})

//Enable CORS for a Single Route with a Specific Origin
var corsOptions = {
  origin: 'http://example.com'
}
app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route with a Specific Origin'})
})
```

## date-fns
date-fns is a modern JavaScript date utility library that provides the most comprehensive, yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js.
```js
const { format, addDays } = require('date-fns');
const today = new Date();
const tomorrow = addDays(today, 1);
console.log(format(tomorrow, 'yyyy-MM-dd'));
```

## Morgan
HTTP request logger middleware for node.js. Including the preset tiny as an argument to morgan() will use its built-in method, identify the URL, declare a status, and the request’s response time in milliseconds.

```js
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

## validator
A library of string validators and sanitizers. This library is used to validate and sanitize strings in Node.js applications.

```js
const validator = require('validator')
// Check whether given email is valid or not
var email = 'test@gmail.com'
console.log(validator.isEmail(email)) // true
email = 'test@'
console.log(validator.isEmail(email)) // false
// Check whether string is in lowercase or not
var name = 'geeksforgeeks'
console.log(validator.isLowercase(name)) // true
name = 'GEEKSFORGEEKS'
console.log(validator.isLowercase(name)) // false
// Check whether string is empty or not
var name = ''
console.log(validator.isEmpty(name)) // true
name = 'geeksforgeeks'
console.log(validator.isEmpty(name)) // false
// Other functions also available in 
// this module like isBoolean()
// isCurrency(), isDecimal(), isJSON(),
// isJWT(), isFloat(), isCreditCard(), etc.
```

## Async
Async is a utility module that provides straight-forward, powerful functions for working with asynchronous JavaScript.

Many helper methods exist in Async that can be used in different situations, like series, parallel, waterfall, etc. Each function has a specific use case, so take some time to learn which one will help in which situations.
```js
async.series(
  [
    function(callback) {
        // do some stuff ...
        callback(null, 'one');
    },
    function(callback) {
        // do some more stuff ...
        callback(null, 'two');
    }
  ],
  // optional callback
  function(err, results) {
      // results is now equal to ['one', 'two']
  }
);
//============================================================
async.parallel(
  {
    one: function(callback) {
        ...
    },
    two: function(callback) {
        ...
    },
    ...
    something_else: function(callback) {
        ...
    }
  },
  // optional callback
  function(err, results) {
      // 'results' is now equal to: {one: 1, two: 2, ..., something_else: some_value}
  }
);
//============================================================
async.waterfall(
  [
    function(callback) {
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function(arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
    }
  ], function(err, result) {
    // result now equals 'done'
});
```

## Nodemailer
This module enables e-mail sending from Node.js applications.

```js
"use strict";
const nodemailer = require("nodemailer");
async function main() {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
main().catch(console.error);
```

## Bcrypt
The bcrypt NPM package is a JavaScript implementation of the bcrypt password hashing function that allows you to easily create a hash out of a password string.

Hashing is a one-way ticket to data encryption. Hashing performs a one-way transformation on a password, turning the password into another String, called the hashed password. Hashing is called one way because it’s practically impossible to get the original text from a hash.

```js
const bcrypt = require("bcrypt");
const express = require("express");
const User = require("./userModel");
const router = express.Router();

// signup route
router.post("/signup", async (req, res) => {
  const body = req.body;

  if (!(body.email && body.password)) {
    return res.status(400).send({
      error: "Data not formatted properly"
    });
  }

// creating a new db doc from user data
  const user = new User(body);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
});

// login route
router.post("/login", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({
    email: body.email
  });

  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({
        message: "Valid password"
      });
    } else {
      res.status(400).json({
        error: "Invalid Password"
      });
    }
  } else {
    res.status(401).json({
      error: "User does not exist"
    });
  }
});
module.exports = router;
```

## Express-rate-limit
Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.

```js
const express = require('express');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to all requests
app.use(limiter)
```

## Response-time
This module creates a middleware that records the response time for requests in HTTP servers. The “response time” is defined here as the elapsed time from when a request enters this middleware to when the headers are written out to the client.

```js
const express = require('express');
const responseTime = require('response-time');

const app = express()

app.use(responseTime())

app.get('/', function(req, res) {
    res.send('hello, world!')
})

app.listen(3000)
```

## Google-auth-library
This is Google’s officially supported node. js client library for using OAuth 2.0 authorization and authentication with Google APIs.

```js
const { OAuth2Client } = require("google-auth-library");
async function googleSignInUser(request, response) {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const { idToken } = request.body;
  client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then((res) => {
      const { email_verified, name, email } = res.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const { _id, email, fullName } = user;
            const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
              expiresIn: process.env.EXPIRE_IN,
            });
            return response.status(200).json({
              accessToken: token,
              user: { _id, email, fullName },
            });
          } else {
            const password = email + process.env.SECRET_KEY;
            bcrypt.hash(password, 12, async (err, passwordHash) => {
              if (err) {
                response.status(500).send("Couldn't hash the password");
              } else if (passwordHash) {
                return User.create({
                  email: email,
                  fullName: name,
                  hash: passwordHash,
                }).then((data) => {
                  const { _id, email, fullName } = data;
                  const token = jwt.sign(
                    { email: email },
                    process.env.SECRET_KEY,
                    { expiresIn: process.env.EXPIRE_IN }
                  );
                  response.status(200).json({
                    accessToken: token,
                    user: { _id, email, fullName },
                  });
                });
              }
            });
          }
        });
      } else {
        return res.status(400).json({
          error: "Google login failed. Try again",
        });
      }
    });
}
```

## Redis
Redis is a super fast and efficient in-memory, key-value cache and store. It’s also known as a data structure server, as the keys can contain strings, lists, sets, hashes, and other data structures.

```js
const redis = require("redis");
const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();
await client.set('key', 'value');
const value = await client.get('key');
console.log(value);
```

## Socket.io
Socket.IO enables real-time, bidirectional, and event-based communication. It works on every platform, browser, or device, focusing equally on reliability and speed.

```js
const express = require('express');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
```

## Winston
Winston, is one of the best logging middleware. Logging is a process of recording information generated by application activities into log files. Messages saved in the log file are called logs. A log is a single instance recorded in the log file.

A log is the first place to look as a programmer, to track down errors and flow of events, especially from a server. A log tells you what happens when an app is running and interacting with your users. A great use case for logging would be if, for example, you have a bug in your system, and you want to understand the steps that led up to its occurrence. 

Let's take an example of the custom logger.js

```js
const { createLogger, format, transports, config } = require('winston');

const usersLogger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),

    transports: [
    new transports.File({ filename: 'users.log' })
  ]
});

const transactionLogger = createLogger({
  transports: [
    new transports.File({ filename: 'transaction.log' })
  ]
});

module.exports = {
  usersLogger: usersLogger,
  transactionLogger: transactionLogger
};

// Usage
const { usersLogger, transactionLogger } = require('./logger');

usersLogger.info('User logged in');
transactionLogger.info('Transaction completed');
```

## loadtest
Runs a load test on the selected HTTP or WebSockets URL. The API allows for easy integration in your own tests.
```js
$ loadtest [-n requests] [-c concurrency] [-k] URL
$ loadtest -n 100000 -c 10000 http://localhost:9090/
```

## Sharp
High-performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, AVIF, TIFF, and GIF images. Uses the libvips library.

```js
const sharp = require('sharp');
sharp('input.jpg')
  .resize(300, 200)
  .toFile('output.jpg', (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });
```

## jasonwebtoken
JWT, or JSON Web Token, is an open standard used to share security information between two parties — a client and a server.

### JWT express example

```js
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const posts = [
  {
    username: 'Kyle',
    title: 'Post 1'
  },
  {
    username: 'Jim',
    title: 'Post 2'
  }
];

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name));
});

app.post('/login', (req, res) => {
  // Authenticate User
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
} 

app.listen(3000);
```

## cookie-parser
cookie-parser is a middleware that parses cookies attached to the client request object. To use it, we will require it in our index. js file; this can be used the same way as we use other middleware

```js
const Express = require('express');
const CookieParser = require('cookie-parser');

const app = Express();
const port = 80;

app.use(CookieParser());

app.get("/send", (req, res) => {
  res.cookie("loggedin", "true");
  res.send("Cookie sent!");
});

app.get("/read", (req, res) => {
  let response = "Not logged in!";
  if (req.cookies.loggedin == "true") {
    response = "Yup! You are logged in!";
  }
  res.send(response);
});

app.listen(port, () => {
  console.log("Server running!");
});
```

## config
Node-config organizes hierarchical configurations for your app deployments.
```js
npm install config
```

Create a config directory and add a config/default.json file to it. This will be the default config file and will contain all your default environment variables.
```json
{
  "server": {
    "host": "localhost",
    "port": 8080,
  }
}
```

To use the config file :
```js
const express = require('express');
const config = require('config');

const app = express();

const port = config.get('server.port');
const host = config.get('server.host');

app.get('/', (req, res) => {
  res.send('Hello World');
});

const server = app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server is running on ${host}:${server.address().port}`);
});
```

## supertest
SuperTest is a Node. js library that helps developers test APIs. It extends another library called superagent, a JavaScript HTTP client for Node. js and the browser. Developers can use SuperTest as a standalone library or with JavaScript testing frameworks like Mocha or Jest.

```js
const request = require('supertest');
const app = require('/app');

describe('Testing POSTS/shots endpoint', function () {
  it('respond with valid HTTP status code and description and message', function (done) {
    const response = await request(app).post('/shots').send({
      title: 'How to write a shot',
      body: "Access the Edpresso tutorial"
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Shot Saved Successfully.');
  });
});

// app.js
const express = require('express');

const app = express();

app.post('/shots', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Shot Saved Successfully.'
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
```

## Multer
Multer is a node.js middleware for handling, which is primarily used for uploading files. It is written on top of the busboy for maximum efficiency.

```js
// upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === 'image/jpg' || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Multer middleware
module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// app.js
const express = require('express');
const upload = require('./upload');

const app = express();

app.use(express.static('public'));

// Use this middleware 
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
})
```

## compression
It is a Node.js compression middleware. Compression in Node.js and Express decreases the downloadable amount of data that is served to users.

```js
const compression = require('compression');
const express = require('express');

const app = express()

// compress all responses
app.use(compression())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

## Axios
Axios is currently the most popular third-party HTTP request client for both Node.js and the browser, with over 40 million weekly downloads at the time of writing.

It simplifies HTTP requests by providing methods that correspond to HTTP methods like get(), post(), put(), and others. Alternatively, you can use axios.request() and specify the HTTP method through the options object:

```js
const response = await axios.get(
  "https://jsonplaceholder.typicode.com/posts/1"
);
```

### Creating Reusable Instances
To streamline requests to multiple endpoints on the same API, you can create custom Axios instances with predefined settings like base URLs, headers, timeouts, or error handling behavior:
```js
const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 10000,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});
 
const response = instance.get("/posts/1"); // GET https://jsonplaceholder.typicode.com/posts/1
```

### Content Handling
By default, Axios automatically serializes JavaScript objects to JSON when sending data to an API. You don't need to use JSON.stringify() like with fetch():

```js
await axios.post("https://jsonplaceholder.typicode.com/posts", {
  title: "foo",
  body: "bar",
  userId: 1,
});
```

It also automatically handles encoding data objects for application/x-www-form-urlencoded and multipart/formdata requests, and sets the Content-Type header automatically based on the data type.

### Response Handling
Axios directly provides access to a request's response through response.data. This is assumed to be JSON by default:

```js
const response = await axios.get("https://icanhazdadjoke.com/", {
  headers: {
    Accept: "application/json",
  },
});
 
console.log(response.data); // Assumed to be JSON by default
```

If you're expecting a different response, you can specify the correct value through the responseType option:
```js 
const { data } = await axios.get("https://icanhazdadjoke.com/", {
  responseType: "text",
  headers: {
    Accept: "text/plain",
  },
});
 
console.log(data);
```

### Timeouts
The default behavior in Axios is to wait indefinitely for a response, which can lead to resource wastage if an endpoint is unresponsive. To prevent this, always set a timeout value:
```js
axios.defaults.timeout = 5000; // global timeout
 
const instance = axios.create({
  // instance timeout overrides the global timeout
  timeout: 10000,
});
 
axios.get("/api/users", { timeout: 5000 }); // per-request timeout overrides all other timeouts
```

### Error Handling
Axios' default behavior is to throw an error whenever a non-2xx response status is received. You can use the validateStatus option to configure this behavior:

```js
axios.get("http://example.com/error-500", {
  validateStatus: function (status) {
    return status <= 500; // Reject only if the status code is equal or more than 500
  },
});
```

For further error handling, the server response can be accessed using error.response. This allows you to examine the status, data, or received headers.

You can also convert the error to JSON format using error.toJSON(), which is useful if you'd like to forward it to an error-tracking platform like AppSignal.

### Request/Response Hooks
Axios interceptors are middleware functions that allow you to intercept and modify HTTP requests and responses before they are handled by your application. This provides a centralized way to add functionality like authentication, logging, error handling, and data transformation.

```js
import axios from "axios";
 
const client = axios.create();
 
// Add a request interceptor
client.interceptors.request.use(
  (config) => {
    console.log("Making request to:", config.url);
    return config;
  },
  (error) => {
    // this function is called only if the client failed to send the request
    // for whatever reason
    return Promise.reject(error);
  }
);
```

### Axios Pros and Cons

#### Pros
1. It supports Node.js and the browser.
2. Its API is straightforward and intuitive to use.
3. Response and error handling are more seamless compared to Fetch.
4. As the most popular Node.js HTTP request library, it has great support, a lot of tutorials, and frequent updates.
5. Advanced features like progress reporting, rate limiting, and hooks are well supported.
6. Almost every aspect of its behavior can be configured.

#### Cons
1. It might be overkill for simple use cases.
2. Support for automatic retries is not built into the library, but you can use axios-retry.
3. It does not currently support HTTP/2 natively despite widespread demand. However, you can use the axios-http2-adapter package to fill this gap.

#### When to Choose Axios
Axios is a good fit if you prioritize convenience and need the advanced features it offers. It excels when you need a feature-rich library with automatic JSON handling, error management, interceptors, and seamless browser/Node.js compatibility.

---

[<- MERN](mern-quick.md)

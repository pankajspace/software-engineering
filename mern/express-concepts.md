[<- MERN](mern-quick.md)

# Express.js Main Concepts

## 1. Creating a Basic Express Server
To start, install Express:

```bash
npm install express
```

A basic Express server listens for incoming requests and responds accordingly:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## 2. Routing
Routing refers to how the application responds to client requests to a particular endpoint, defined by a URL and an HTTP method (GET, POST, etc.).

```javascript
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.post('/submit', (req, res) => {
  res.send('Form submitted!');
});

app.put('/update/:id', (req, res) => {
  res.send(`Updating item with ID ${req.params.id}`);
});

app.delete('/delete/:id', (req, res) => {
  res.send(`Deleting item with ID ${req.params.id}`);
});
```

## 3. Middleware
[Using middleware](https://expressjs.com/en/guide/using-middleware.html)

Middleware functions are functions that execute during the request-response cycle. Middleware can modify the request, response, or terminate the request-response cycle.

```javascript
// A middleware that logs the request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Passes control to the next middleware or route handler
});

app.get('/', (req, res) => {
  res.send('Home Page');
});
```

### Types of Middleware:
- Application-level middleware: Bound to the app object using `app.use()`.
- Router-level middleware: Bound to the router object.
- Error-handling middleware: Defined with four arguments to handle errors.
- Built-in middleware: Included with Express.
- Third-party middleware: External middleware like `body-parser`, `cookie-parser`, etc.
  
```javascript
// Application-level middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Router-level middleware
const router = express.Router();
router.use((req, res, next) => {
  console.log('Router middleware');
  next();
});

// Error-handling middleware
// This middleware will be called when an error occurs in any of the routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Built-in middleware
app.use(express.static('public'));

// Third-party middleware
const morgan = require('morgan');
app.use(morgan('tiny'));
```

### Custom middleware.
```javascript
function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

const logStuff = [logOriginalUrl, logMethod]
app.get('/user/:id', logStuff, (req, res, next) => {
  res.send('User Info')
})
```

## 4. Serving Static Files
Express allows you to serve static files such as HTML, CSS, JavaScript, and images. Use the `express.static` middleware to serve these files.

```javascript
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
```

Now, any file in the `public` directory (e.g., `public/index.html`) will be accessible via `http://localhost:3000/index.html`.

## 5. Handling Form Data
To handle form submissions, Express provides middleware such as `express.json()` and `express.urlencoded()` to parse incoming requests.

```javascript
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/submit', (req, res) => {
  res.send(`Received name: ${req.body.name}`);
});
```

In this example, form data submitted to `/submit` can be accessed using `req.body`.

## 6. Routing with Parameters
Express allows route parameters to capture dynamic values in the URL:

```javascript
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});
```

You can access the route parameter `id` using `req.params.id`.

## 7. Query Parameters
You can also capture query parameters (the part of the URL after `?`):

```javascript
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`Search query: ${query}`);
});
```

For `http://localhost:3000/search?q=javascript`, the value of `q` is accessed via `req.query.q`.

## 8. Router
The `express.Router()` function creates modular route handlers, which allows organizing routes in different files or modules.

```javascript
// myRoutes.js
const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
  res.send('About Us');
});

router.get('/contact', (req, res) => {
  res.send('Contact Us');
});

module.exports = router;
```

In the main app file:

```javascript
// app.js
const express = require('express');
const app = express();
const myRoutes = require('./myRoutes'); // assuming this is the router file

app.use('/pages', myRoutes);
```

Now, routes like `/pages/about` and `/pages/contact` will be handled by the router.

## 9. Template Engines
Express supports template engines for rendering dynamic HTML pages. Some popular template engines include Pug, EJS, and Handlebars.

Example using Pug:

1. Install Pug:

   ```bash
   npm install pug
   ```

2. Set Pug as the view engine:

   ```javascript
   app.set('view engine', 'pug');
   app.set('views', './views');
   ```

3. Create a Pug template (`views/index.pug`):

   ```pug
   html
     head
       title= title
     body
       h1 Hello #{name}
   ```

4. Render the template in a route:

   ```javascript
   app.get('/', (req, res) => {
     res.render('index', { title: 'Home Page', name: 'John' });
   });
   ```

## 10. Redirects
Redirects can be easily handled using the `res.redirect()` method:

```javascript
app.get('/old-route', (req, res) => {
  res.redirect('/new-route');
});

app.get('/new-route', (req, res) => {
  res.send('This is the new route');
});
```

## 11. Chaining Route Handlers
You can chain multiple route handlers for a single route, each performing specific tasks:

```javascript
app.get('/example', 
  (req, res, next) => {
    console.log('First handler');
    next();
  }, 
  (req, res) => {
    res.send('Second handler');
  }
);
```

---

[<- MERN](mern-quick.md)

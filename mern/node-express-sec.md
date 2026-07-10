[<- README](../README.md) | [<- Security](../security/sec-quick.md) | [<- MERN](mern-quick.md)

1. [Node and Express security best practices](https://expressjs.com/en/advanced/best-practice-security.html)

# Node.js and Express.js Application Security Attacks and How to Prevent Them

When building Node.js and Express.js applications, security is a critical concern. Web applications are exposed to various security threats, and understanding these common vulnerabilities is essential for safeguarding your applications. In this guide, we’ll explore the most common security threats to Node.js and Express.js applications and how to prevent them with examples.

## 1. Cross-Site Scripting (XSS)
### Attack Overview:
XSS is a type of injection attack where malicious scripts are injected into a website’s content, potentially affecting users by executing the scripts in their browsers. The attacker aims to steal cookies, session tokens, or other sensitive information.

### Example:
Consider an Express.js app where user input is rendered directly in the browser without sanitization:

```js
app.get('/greet', (req, res) => {
  const name = req.query.name;
  res.send(`<h1>Hello, ${name}!</h1>`);
});
```

If an attacker provides this input:

```html
<script>alert('XSS');</script>
```

It will execute the script in the user’s browser, triggering a malicious payload.

### Prevention:
1. Sanitize User Input: Use libraries like `dompurify` or `xss-filters` to sanitize any user input that is rendered to the browser.

2. Use Templating Engines: Templating engines like EJS, Pug, or Handlebars automatically escape user input to prevent XSS.

   Example using EJS:
   ```ejs
   <h1>Hello, <%= name %>!</h1>
   ```
   This will escape any malicious scripts in `name`.

3. Set Content Security Policy (CSP): Implement CSP headers to restrict what scripts can run on your website. Using `helmet` for security headers in Express helps here (we'll see this later).

## 2. SQL Injection
### Attack Overview:
SQL Injection occurs when an attacker manipulates a query by injecting malicious SQL statements into an application’s input fields. If the input is not properly sanitized, it can lead to data leakage, unauthorized access, or data modification.

### Example:
Consider an Express.js app that executes an SQL query based on user input without validation:

```js
app.get('/users', (req, res) => {
  const username = req.query.username;
  db.query(`SELECT * FROM users WHERE username = '${username}'`, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
```

An attacker can provide the following input to bypass authentication:

```sql
' OR 1=1 --
```

This will transform the query into:

```sql
SELECT * FROM users WHERE username = '' OR 1=1 --';
```

This query returns all users, allowing the attacker to bypass authentication.

### Prevention:
1. Use Prepared Statements (Parameterized Queries): Use prepared statements or ORM libraries (like Sequelize) to prevent SQL injection by ensuring input is treated as data, not executable code.

   Example using parameterized queries:
   ```js
   app.get('/users', (req, res) => {
     const username = req.query.username;
     db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
       if (err) throw err;
       res.send(results);
     });
   });
   ```

2. Use ORM Libraries: ORM libraries like Sequelize or TypeORM automatically use parameterized queries, reducing the risk of SQL injection.

## 3. Cross-Site Request Forgery (CSRF)
### Attack Overview:
CSRF is an attack where a user is tricked into making unwanted requests to a website on which they are authenticated. This can lead to unintended actions, such as transferring money or changing account settings.

### Example:
Consider an Express.js route that processes a form for transferring money:

```js
app.post('/transfer', (req, res) => {
  const { amount, recipient } = req.body;
  // Transfer money logic here...
});
```

If an attacker creates a malicious website with the following form:

```html
<form method="POST" action="https://example.com/transfer">
  <input type="hidden" name="amount" value="10000">
  <input type="hidden" name="recipient" value="attacker_account">
  <button type="submit">Transfer</button>
</form>
```

A logged-in user can be tricked into submitting the form, causing the money to be transferred to the attacker's account.

### Prevention:
1. Use CSRF Tokens: Use a library like `csurf` to generate and verify CSRF tokens.

   Example with `csurf`:
   ```js
   const csrf = require('csurf');
   const csrfProtection = csrf({ cookie: true });

   app.use(csrfProtection);

   app.get('/form', (req, res) => {
     res.render('form', { csrfToken: req.csrfToken() });
   });

   app.post('/transfer', csrfProtection, (req, res) => {
     const { amount, recipient } = req.body;
     // Transfer money logic here...
   });
   ```

2. SameSite Cookies: Set the `SameSite` attribute for cookies to ensure they are not sent on cross-origin requests.

   Example using `cookie-session`:
   ```js
   app.use(session({
     name: 'session',
     secret: 'my_secret',
     cookie: {
       httpOnly: true,
       secure: true,
       sameSite: 'strict',
     }
   }));
   ```

## 4. Insecure Deserialization
### Attack Overview:
Insecure deserialization occurs when an attacker manipulates serialized objects to execute code or change the behavior of an application.

### Example:
If a Node.js application uses `eval()` to deserialize JSON, an attacker could inject malicious code:

```js
app.post('/deserialize', (req, res) => {
  const data = eval(req.body.serializedData); // Insecure deserialization
  res.send(data);
});
```

If the attacker provides input like `{"username": "admin", "role": "admin", "isAdmin": true}`, it may elevate their privileges.

### Prevention:
1. Avoid `eval()`: Never use `eval()` or `Function()` to parse or execute serialized data.
2. Use Safe Libraries: Use libraries like `JSON.parse()` to safely deserialize data, and always validate input before deserialization.

## 5. Denial of Service (DoS)
### Attack Overview:
Denial of Service attacks aim to make a web application unavailable by overwhelming it with requests or consuming too many resources, such as memory or CPU.

### Example:
Consider an application where file uploads are handled without size limits:

```js
app.post('/upload', (req, res) => {
  const file = req.files.file;
  // Handle file upload
});
```

An attacker could upload very large files, causing the server to crash due to memory exhaustion.

### Prevention:
1. Limit Request Size: Use middleware like `express-rate-limit` to limit the size and number of requests.

   Example:
   ```js
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // Limit each IP to 100 requests per window
   });
   app.use(limiter);
   ```

2. Set File Size Limits: Use libraries like `multer` to restrict the size of file uploads.

   Example with `multer`:
   ```js
   const multer = require('multer');
   const upload = multer({ limits: { fileSize: 1 * 1024 * 1024 } }); // 1MB limit
   ```

## 6. Sensitive Data Exposure
### Attack Overview:
Sensitive data exposure occurs when sensitive information (e.g., passwords, credit card numbers, or tokens) is not properly protected, allowing attackers to access it.

### Example:
Consider an app where passwords are stored in plain text:

```js
// Bad practice: storing passwords as plain text
db.query(`INSERT INTO users (username, password) VALUES ('user', '${password}')`);
```

If the database is compromised, attackers can easily steal users' passwords.

### Prevention:
1. Encrypt Sensitive Data: Use bcrypt or another strong hashing algorithm to hash passwords before storing them.

   Example using `bcrypt`:
   ```js
   const bcrypt = require('bcrypt');

   const hashPassword = async (password) => {
     const salt = await bcrypt.genSalt(10);
     return await bcrypt.hash(password, salt);
   };
   ```

2. Use HTTPS: Ensure that sensitive data is transmitted securely over HTTPS.

3. Environment Variables: Store sensitive information like API keys and credentials in environment variables, not in the codebase.

## 7. Using Security Headers with `helmet`

`helmet` is a middleware that helps secure Express apps by setting various HTTP headers:

```js
const helmet = require('helmet');
app.use(helmet());
```

- Content Security Policy (CSP): Helps prevent XSS attacks by restricting what sources can be loaded.
- X-Frame-Options: Prevents clickjacking by disallowing your site from being embedded in an iframe.
- Strict-Transport-Security (HSTS): Ensures that your application is only accessed over HTTPS.

---

# Node.js application security profiling

Security profiling for a Node.js application is a comprehensive process involving static code analysis, dynamic testing, securing dependencies, managing input/output, enforcing security best practices, and utilizing various security tools. Here, I'll break down the steps for security profiling with **detailed examples** to cover different aspects, ensuring your Node.js application is secure.

## 1. **Static Code Analysis (SAST)**

Static code analysis involves scanning the source code to find security vulnerabilities without executing the code. Tools like **ESLint** with security plugins help identify issues such as unsafe code practices.

### **Example: ESLint with a Security Plugin**

- Install ESLint with the security plugin:
  
  ```bash
  npm install eslint eslint-plugin-security --save-dev
  ```

- Create an `.eslintrc.json` file for configuration:
  
  ```json
  {
    "extends": ["eslint:recommended", "plugin:security/recommended"],
    "plugins": ["security"]
  }
  ```

- Run ESLint to check your code:
  
  ```bash
  npx eslint . --ext .js
  ```

- **Common Issue Detected**: 
  Suppose you have the following insecure code:
  
  ```javascript
  const userInput = "console.log('hello')";
  eval(userInput); // Dangerous use of eval!
  ```

  ESLint will flag the `eval()` function as a security risk because it allows arbitrary code execution, leading to code injection attacks.

### **Solution**:
Avoid using `eval()` entirely or use more secure alternatives like function definitions.

## 2. **Dependency Analysis**

Node.js applications heavily rely on third-party packages. Managing dependencies is critical to security because vulnerabilities in these packages can introduce security flaws.

### **Example: Using `npm audit`**

- **Why It’s Needed**: Dependencies can have known vulnerabilities that an attacker could exploit.

- Run `npm audit`:
  
  ```bash
  npm audit
  ```

  Example output:
  
  ```
  found 2 vulnerabilities (1 moderate, 1 high) in 1506 scanned packages
  run `npm audit fix` to fix them, or `npm audit` for details
  ```

- To automatically fix vulnerabilities:
  
  ```bash
  npm audit fix
  ```

### **Example: Using Snyk**

**Snyk** provides real-time scanning of project dependencies.

- Install Snyk:
  
  ```bash
  npm install -g snyk
  ```

- Test the project:
  
  ```bash
  snyk test
  ```

Snyk reports vulnerabilities with detailed remediation advice. It also monitors dependencies over time, alerting you when new vulnerabilities are discovered.

## 3. **Dynamic Application Security Testing (DAST)**

Dynamic testing involves interacting with the running application to uncover vulnerabilities, such as Cross-Site Scripting (XSS) and SQL injection.

### **Example: Testing with OWASP ZAP**

**OWASP ZAP** is a popular tool for performing penetration tests on a live Node.js application.

1. **Set Up OWASP ZAP**: Download and install ZAP from the [official website](https://www.zaproxy.org/).
2. **Proxy the Web Traffic**: Configure ZAP to act as a proxy between your application and the browser.
3. **Run Active Scans**: ZAP scans the running application for vulnerabilities such as:
   - **SQL Injection**
   - **Cross-Site Scripting (XSS)**
   - **Broken Authentication**

### **Example of Vulnerability: SQL Injection**

In a Node.js app, an insecure SQL query might look like this:

```javascript
app.get('/user/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = '${req.params.id}'`;  // Vulnerable to SQL injection
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
```

An attacker could input `1' OR '1'='1` as the `id`, causing the query to return all users. ZAP would flag this as an SQL Injection vulnerability.

### **Solution**: Use parameterized queries to prevent SQL injection:

```javascript
app.get('/user/:id', (req, res) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
```

## 4. **Security Headers**

Security headers protect your application from common vulnerabilities like XSS and clickjacking.

### **Example: Using Helmet.js**

**Helmet.js** helps set HTTP headers to secure your Node.js application.

1. Install Helmet:
   
   ```bash
   npm install helmet --save
   ```

2. Use Helmet in your application:

   ```javascript
   const express = require('express');
   const helmet = require('helmet');
   const app = express();

   app.use(helmet());  // Add security headers automatically
   ```

Helmet sets important headers by default:
- **Content-Security-Policy (CSP)**: Prevents loading malicious resources.
- **X-Frame-Options**: Prevents clickjacking by disallowing your site to be framed.
- **Strict-Transport-Security (HSTS)**: Forces HTTPS.

### Example: Enforcing CSP

```javascript
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://trusted.cdn.com'],
    },
  })
);
```

This CSP configuration ensures that only scripts from your own domain and a trusted CDN can be executed, preventing XSS attacks.

## 5. **Input Validation and Sanitization**

Validating and sanitizing input prevents malicious data from being processed, which can lead to injection attacks.

### **Example: Using Validator.js**

**Validator.js** is a Node.js library for validating and sanitizing input.

1. Install Validator.js:

   ```bash
   npm install validator --save
   ```

2. Example of input validation:

   ```javascript
   const validator = require('validator');

   app.post('/register', (req, res) => {
     const { email, name } = req.body;

     if (!validator.isEmail(email)) {
       return res.status(400).send('Invalid email');
     }

     const sanitizedName = validator.escape(name);  // Prevent XSS
     res.send(`User ${sanitizedName} is registered`);
   });
   ```

- **Validation**: Ensures the input is a valid email.
- **Sanitization**: Removes potentially malicious characters from `name` to avoid XSS attacks.

## 6. **Authentication and Authorization**

Proper authentication and authorization mechanisms ensure that only authorized users can access sensitive resources.

### **Example: Passport.js for Authentication**

**Passport.js** is a popular authentication middleware for Node.js.

1. Install Passport.js and related modules:

   ```bash
   npm install passport passport-local express-session --save
   ```

2. Set up a local authentication strategy:

   ```javascript
   const passport = require('passport');
   const LocalStrategy = require('passport-local').Strategy;

   passport.use(new LocalStrategy((username, password, done) => {
     User.findOne({ username }, (err, user) => {
       if (err) return done(err);
       if (!user) return done(null, false, { message: 'Incorrect username.' });
       if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password.' });
       return done(null, user);
     });
   }));

   app.use(require('express-session')({ secret: 'yourSecret', resave: false, saveUninitialized: false }));
   app.use(passport.initialize());
   app.use(passport.session());
   ```

3. Use Passport to authenticate requests:

   ```javascript
   app.post('/login', passport.authenticate('local', {
     successRedirect: '/dashboard',
     failureRedirect: '/login',
     failureFlash: true,
   }));
   ```

### **Authorization Example (Role-Based Access Control)**

```javascript
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).send('Forbidden');
};

app.get('/admin', isAdmin, (req, res) => {
  res.send('Welcome to admin dashboard');
});
```

In this example, only users with the `admin` role can access the `/admin` route.

## 7. **Logging and Monitoring**

Logging helps track activities and potential security incidents, while monitoring helps you detect anomalies in real-time.

### **Example: Using Winston for Logging**

**Winston** is a popular logging library for Node.js.

1. Install Winston:

   ```bash
   npm install winston --save
   ```

2. Set up logging:

   ```javascript
   const winston = require('winston');

   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' }),
     ],
   });

   // Log every request
   app.use((req, res, next) => {
     logger.info(`${req.method} ${req.url}`);
     next();
   });
   ```

3. **Log Errors**:

   ```javascript
   app.use((err, req, res, next) => {
     logger.error(err.message);
     res.status(500).send('Internal Server Error');
   });
   ```

## 8. **Rate Limiting**

Rate limiting helps protect your app from brute-force attacks and denial-of-service (DoS) attacks.

### **Example: Express Rate Limit**

**Express Rate Limit** helps limit the number of requests a client can make to your application.

1. Install express-rate-limit:

   ```bash
   npm install express-rate-limit --save
   ```

2. Apply rate limiting:

   ```javascript
   const rateLimit = require('express-rate-limit');

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // Limit each IP to 100 requests per windowMs
     message: 'Too many requests, please try again later.',
   });

   // Apply to all requests
   app.use(limiter);
   ```

In this example, a single IP can make only 100 requests in 15 minutes. After the limit is reached, the server will respond with a "Too many requests" message.

## 9. **Session Management**

Session management is crucial for tracking user interactions in a secure way, especially for logged-in users.

### **Example: Secure Sessions with express-session**

1. Install express-session:

   ```bash
   npm install express-session --save
   ```

2. Use express-session for secure session management:

   ```javascript
   const session = require('express-session');

   app.use(session({
     secret: 'yourSecret',
     resave: false,
     saveUninitialized: true,
     cookie: {
       httpOnly: true, // Prevents client-side access to cookies
       secure: true,   // Ensures cookies are sent over HTTPS
       maxAge: 3600000 // 1 hour
     }
   }));
   ```

In this example, the session is securely stored in a cookie, accessible only over HTTPS and not available to client-side JavaScript.

## Conclusion

Securing a Node.js application requires a multi-layered approach that involves static code analysis, dependency management, dynamic testing, proper input validation, security headers, authentication and authorization, logging, monitoring, and other best practices like rate limiting and session management. By using the detailed examples and tools listed here, you can build a more secure and resilient Node.js application.

---

[<- README](../README.md) | [<- Security](../security/sec-quick.md) | [<- MERN](mern-quick.md)

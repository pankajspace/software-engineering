[<- README](../README.md) | [<- Security](../security/sec-quick.md) | [<- MERN](mern-quick.md)

# Using owasp zap with node app with detailed example

OWASP ZAP (Zed Attack Proxy) is a free and open-source security tool for finding vulnerabilities in web applications. You can use it to scan your Node.js applications for potential security flaws, like XSS, SQL Injection, or other common vulnerabilities. In this detailed example, I’ll walk through how to use OWASP ZAP to scan a Node.js application.

## Scenario:
We’ll be setting up OWASP ZAP to scan a simple Node.js web application running on `localhost`, and we’ll cover the following steps:
1. **Setting up a simple Node.js application**.
2. **Installing and configuring OWASP ZAP**.
3. **Running the ZAP proxy and intercepting requests**.
4. **Performing a ZAP security scan**.
5. **Reviewing the scan results**.

## 1. Setting up a Simple Node.js App

We’ll first create a basic Node.js Express application. This app will have two routes: a home page and a login form.

### Step 1.1: Create the Node.js App

```bash
mkdir owasp-zap-node-example
cd owasp-zap-node-example
npm init -y
npm install express
```

### Step 1.2: Create `app.js`

Here is a basic Express application:

```javascript
// app.js
const express = require('express');
const app = express();
const port = 3000;

// Serve a home page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Home Page</h1><p>Go to /login to attempt login</p>');
});

// Serve a simple login form
app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login POST requests (example vulnerability: no proper validation)
app.post('/login', (req, res) => {
  res.send('<h1>Login attempt made</h1>');
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
```

### Step 1.3: Run the Application

You can start the Node.js app by running:

```bash
node app.js
```

This will start the application on `http://localhost:3000`.

## 2. Installing and Configuring OWASP ZAP

### Step 2.1: Download and Install OWASP ZAP

You can download OWASP ZAP from the official website:

- [OWASP ZAP Downloads](https://www.zaproxy.org/download/)

It’s available for Windows, macOS, and Linux.

After installing, start OWASP ZAP.

### Step 2.2: Launch OWASP ZAP

Once OWASP ZAP is running, you'll see the main dashboard with a few panels:

- **Sites Tree**: Shows the hierarchy of the sites and URLs that ZAP has interacted with.
- **Alerts**: Lists potential vulnerabilities.
- **History**: Tracks all the requests and responses captured by ZAP.

## 3. Running OWASP ZAP Proxy and Intercepting Requests

ZAP works as a **proxy** to intercept requests made by your application. For this example, we'll configure your browser to route all requests through ZAP so it can monitor and scan them.

### Step 3.1: Set Up Browser Proxy

1. Open the ZAP application.
2. Go to `Tools > Options > Local Proxies`.
3. Take note of the **Proxy Address** (usually `localhost`) and **Port** (usually `8080`).

To route traffic through ZAP:
- In your browser (e.g., Chrome or Firefox), configure the proxy settings to use `localhost` with port `8080`.
- For Chrome, you can use an extension like **SwitchyOmega** to manage proxies.
- For Firefox, go to `Settings > Network Settings > Manual proxy configuration`.

Set the HTTP/HTTPS Proxy to `localhost` and port `8080`.

### Step 3.2: Verify Proxy is Working

After configuring the proxy, navigate to `http://localhost:3000` in your browser.

- In ZAP, you should see the requests being captured in the **History** and **Sites Tree**.
- If you can see the URL `http://localhost:3000` in the Sites Tree, ZAP is properly intercepting requests.

## 4. Performing a ZAP Security Scan

Once the proxy is set up and requests are being intercepted, you can run an **Active Scan** to identify vulnerabilities.

### Step 4.1: Spider the Application

Before performing an active scan, we’ll "spider" the application to crawl all the available pages.

1. In the ZAP interface, right-click on the site `http://localhost:3000` in the **Sites Tree**.
2. Select **Attack > Spider**.
3. Leave the default options and click **Start Scan**.

ZAP will crawl through the application and attempt to find all the pages and forms. This will populate the Sites Tree with the URLs that ZAP can attack.

### Step 4.2: Perform an Active Scan

After crawling the site, run an active scan to detect vulnerabilities.

1. Right-click on `http://localhost:3000` in the **Sites Tree**.
2. Select **Attack > Active Scan**.
3. Choose the default settings and click **Start Scan**.

ZAP will now actively scan your application for vulnerabilities. It will try to exploit common vulnerabilities like:
- Cross-Site Scripting (XSS)
- SQL Injection
- Insecure Authentication
- Other known security issues

### Step 4.3: Review the Alerts

Once the scan is complete, you’ll see results in the **Alerts** tab. Each alert will provide:
- **Alert Name**: The type of vulnerability.
- **URL**: The specific URL where the vulnerability was found.
- **Risk Level**: The severity of the vulnerability (Low, Medium, High).
- **Description**: Details about the vulnerability.
- **Solution**: Recommendations on how to fix it.

For example, OWASP ZAP might report:
- **XSS vulnerability**: If the app is vulnerable to Cross-Site Scripting.
- **Missing Secure Headers**: If certain security headers like `X-Content-Type-Options` or `X-Frame-Options` are missing.
  
## 5. Reviewing and Fixing the Vulnerabilities

Once you have a list of vulnerabilities from the scan, you can begin to fix them in your Node.js app.

### Example Fixes:
1. **Cross-Site Scripting (XSS)**:
   - If ZAP reports an XSS vulnerability on a form, you might want to sanitize or escape user input to prevent malicious scripts from being executed.

   You could use a package like `express-validator` to sanitize inputs:
   ```bash
   npm install express-validator
   ```

   And modify your login route:
   ```javascript
   const { body, validationResult } = require('express-validator');

   app.post('/login', [
     body('username').escape(),
     body('password').escape()
   ], (req, res) => {
     res.send('<h1>Login attempt made</h1>');
   });
   ```

2. **Missing Security Headers**:
   - OWASP ZAP might report missing security headers like `X-Frame-Options` to prevent clickjacking or `Content-Security-Policy` to control resources that the browser is allowed to load.

   You can use the `helmet` package to add security headers easily:
   ```bash
   npm install helmet
   ```

   And modify your `app.js`:
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

## Summary:
- **OWASP ZAP** is a powerful security tool that works as a proxy to monitor and test your web application.
- **ZAP Proxy** intercepts requests made by your browser to your Node.js app and allows you to spider and actively scan for vulnerabilities.
- **Spider** the application to discover all pages, and then perform an **Active Scan** to detect common vulnerabilities like XSS and SQL Injection.
- After the scan, review the **Alerts** in ZAP and make the necessary security fixes in your Node.js app.

This process is an essential part of securing a web application during the development and deployment stages.

---

[<- README](../README.md) | [<- Security](../security/sec-quick.md) | [<- MERN](mern-quick.md)
[<- Security](../security/sec-quick.md) | [<- react-quick](react-quick.md)

# React Security Quick
1. Use default XSS protection with data binding : `<div>{data}</div>`
2. Use Content Security Policy (CSP) headers in your application using `<meta>` tag
3. Use dangerouslySetInnerHTML with caution by using sanitization libraries like DOMPurify
4. Use HttpOnly and Secure flags for cookies
5. Use HTTPS for secure communication
6. Encrypt sensitive data
7. Configure CORS properly
8. Do not expose sensitive data in the URL
9. Do not directly access the DOM
10. Make sure to use the secure version of libraries, to check for vulnerabilities run `npm audit` regularly or use Snyk or other security tools

# React Security best practices

Securing a React application involves several best practices aimed at preventing common vulnerabilities like Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and securing sensitive data. Below are essential React security best practices, along with examples:

## 1. **Avoid Directly Inserting HTML (Preventing XSS Attacks)**
Cross-Site Scripting (XSS) is one of the most common security issues in web applications. XSS attacks occur when an attacker injects malicious scripts into your application, typically through user input.

**Best Practice**: Never use `dangerouslySetInnerHTML` unless absolutely necessary, and sanitize any HTML content that you must insert.

**Example (Vulnerable to XSS):**
```js
function UserComment({ comment }) {
  return <div dangerouslySetInnerHTML={{ __html: comment }} />;
}
```

If the `comment` contains malicious JavaScript, it will be executed when rendered.

**Solution**: Avoid using `dangerouslySetInnerHTML` unless required. If you must use it, sanitize the input using a library like **DOMPurify**.

```bash
npm install dompurify
```

**Safe Example (Using DOMPurify):**
```js
import DOMPurify from 'dompurify';

function UserComment({ comment }) {
  const sanitizedComment = DOMPurify.sanitize(comment);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedComment }} />;
}
```

## 2. **Use `Content Security Policy (CSP)` Headers**
A Content Security Policy (CSP) helps mitigate XSS attacks by specifying the sources from which content can be loaded in your application.

**Best Practice**: Set CSP headers on your server to restrict the domains from which JavaScript, styles, and other resources can be loaded.

**Example of a CSP Header**:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com; style-src 'self' https://trusted-cdn.com
```

This policy ensures that only scripts from your domain (`self`) and trusted CDNs can be executed in the browser.

## 3. **Avoid Storing Sensitive Data in `localStorage` or `sessionStorage`**
`localStorage` and `sessionStorage` are not secure for storing sensitive data, such as access tokens or user credentials, because they are vulnerable to XSS attacks.

**Best Practice**: Use HTTP-only cookies with the `SameSite` attribute for storing tokens or sensitive data. HTTP-only cookies cannot be accessed by JavaScript, providing better protection against XSS attacks.

**Insecure Example (Storing Token in localStorage):**
```js
localStorage.setItem('authToken', token);
```

**Secure Alternative (Using HTTP-only cookies):**
Set a cookie on the server-side with the `HttpOnly` and `SameSite=Strict` attributes to prevent JavaScript from accessing it.

```http
Set-Cookie: authToken=abc123; HttpOnly; SameSite=Strict; Secure
```

## 4. **Enable HTTPS**
Always serve your React app over HTTPS to ensure that all communication between the client and server is encrypted. This prevents Man-in-the-Middle (MITM) attacks, where an attacker could intercept and manipulate traffic.

**Best Practice**: Use SSL/TLS certificates to enforce HTTPS in production.

## 5. **Use Environment Variables for Sensitive Information**
Do not hard-code sensitive information like API keys, secrets, or passwords in your React application. These values should be kept out of your source code and managed through environment variables.

**Insecure Example (Hardcoding API key):**
```js
const API_KEY = '12345-SECRET-KEY';
```

**Secure Alternative (Using environment variables):**
In `.env`:
```
REACT_APP_API_KEY=12345-SECRET-KEY
```

In your code:
```js
const API_KEY = process.env.REACT_APP_API_KEY;
```

Make sure `.env` is not included in version control by adding it to `.gitignore`.

## 6. **Secure Authentication with OAuth or OpenID Connect**
If you’re handling user authentication, use industry-standard methods such as OAuth 2.0 or OpenID Connect (OIDC) rather than building your own authentication system. This helps protect against common vulnerabilities like replay attacks, token hijacking, etc.

Use libraries like **Auth0**, **Firebase**, or **Okta** to handle authentication securely.

**Example with OAuth2 (Using Auth0):**
```js
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Auth0Provider
      domain="your-auth0-domain"
      clientId="your-client-id"
      redirectUri={window.location.origin}
    >
      <MyApp />
    </Auth0Provider>
  );
}
```

## 7. **Protect Routes with Role-based Access Control (RBAC)**
Role-based access control ensures that only authorized users can access certain routes. For example, restrict access to admin routes for users without admin privileges.

**Example of Route Guarding (with React Router):**
```js
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
```

## 8. **Sanitize User Inputs**
If your application accepts any user input (e.g., forms, search boxes), always sanitize it to prevent injection attacks.

**Best Practice**: Use libraries such as **validator.js** or built-in HTML methods to validate and sanitize input before processing it.

**Example (Using validator.js):**
```bash
npm install validator
```

```js
import validator from 'validator';

function handleFormSubmit(event) {
  const email = event.target.email.value;

  if (!validator.isEmail(email)) {
    alert('Invalid email address!');
  }
}
```

## 9. **Use `Helmet` for Managing Document Head and Security Headers**
`react-helmet` is a library for managing changes to the document’s `<head>` section, including security headers like `X-Content-Type-Options`, `X-Frame-Options`, and `Strict-Transport-Security`.

**Example Using `react-helmet`:**
```bash
npm install react-helmet
```

```js
import { Helmet } from 'react-helmet';

function MyComponent() {
  return (
    <div>
      <Helmet>
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
        <meta http-equiv="X-Content-Type-Options" content="nosniff" />
        <meta http-equiv="X-Frame-Options" content="deny" />
      </Helmet>
      <h1>My Secure App</h1>
    </div>
  );
}
```

## 10. **Implement CSRF Protection**
Cross-Site Request Forgery (CSRF) attacks trick users into making unintended requests to your server while authenticated. To mitigate CSRF, you can use anti-CSRF tokens.

**Best Practice**: Use libraries or frameworks that handle CSRF protection on the server-side, such as `Django` or `Express`. If your server is using CSRF tokens, make sure to include them in your requests from React.

**Example (Including CSRF token in headers):**
```js
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

fetch('/some-api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify(data)
});
```

## 11. **Limit Data Exposure**
Only expose the minimum necessary data through APIs, and make sure that sensitive information is never sent to the client.

**Best Practice**: Never send sensitive information such as passwords, tokens, or personal data to the client unless absolutely necessary, and use access control mechanisms (e.g., JWT, OAuth) to restrict data access.

## 12. **Regularly Audit and Update Dependencies**
Outdated or vulnerable dependencies can expose your React app to attacks. Regularly check for security updates in your packages and update them accordingly.

**Best Practice**: Use tools like `npm audit` or **Snyk** to check for vulnerabilities.

```bash
npm audit
```

---

## Summary of Best Practices:

1. **Avoid XSS by not using `dangerouslySetInnerHTML`** or sanitizing content.
2. **Use Content Security Policy (CSP) headers** to limit allowed sources of scripts and content.
3. **Avoid storing sensitive data in `localStorage`**, and use HTTP-only cookies for security.
4. **Enforce HTTPS** to protect against MITM attacks.
5. **Use environment variables** for sensitive information instead of hard-coding them.
6. **Implement secure authentication methods** like OAuth2 or OpenID Connect.
7. **Implement role-based access control (RBAC)** for route protection.
8. **Sanitize user inputs** to prevent injection attacks.
9. **Use `react-helmet`** to manage security headers and improve security posture.
10. **Implement CSRF protection** by using anti-CSRF tokens.
11. **Minimize data exposure** to the client and only expose essential data.
12. **Audit and update dependencies regularly** to avoid using insecure packages.

By following these best practices, you can significantly improve the security of your React app and reduce the risk of common vulnerabilities.

---

[<- Security](../security/sec-quick.md) | [<- react-quick](react-quick.md)

[<- MERN](mern-quick.md)

# Node.js Testing Examples

This guide provides examples of how to test Node.js applications using popular testing frameworks such as Mocha, Chai, and Jest.

## Table of Contents
- [Testing with Jest](#1-testing-with-jest)
- [Testing Express.js Routes with Supertest](#2-testing-expressjs-routes-with-jest--supertest)
- [Explain stubs, spies, and mocks in testing](#explain-stubs-spies-and-mocks-in-testing)

---

## 1. Testing with Jest

Jest is a popular testing framework that provides a test runner, assertions, mocks, and more.

### Step 1: Install Jest

```bash
npm install jest --save-dev
```

### Example 2: Testing Asynchronous Code

Let's test a function that simulates an asynchronous operation.

#### Create a `user.js` File:

```javascript
// user.js
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = {
        1: { id: 1, name: 'John Doe' },
        2: { id: 2, name: 'Jane Doe' }
      };
      const user = users[id];
      if (user) {
        resolve(user);
      } else {
        reject('User not found');
      }
    }, 1000);
  });
}

module.exports = { fetchUser };
```

#### Create a `test/user.test.js` File:

```javascript
// user.test.js
const { fetchUser } = require('../user');

test('should fetch user with valid ID', async () => {
  const user = await fetchUser(1);
  expect(user).toEqual({ id: 1, name: 'John Doe' });
});

test('should return error for invalid user ID', async () => {
  await expect(fetchUser(99)).rejects.toMatch('User not found');
});
```

### Step 2: Run Jest Tests

To run the tests, add this script to your `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

Then, run the tests using:

```bash
npm test
```

### Output:

```
PASS  ./test/user.test.js
✓ should fetch user with valid ID (1012 ms)
✓ should return error for invalid user ID (1009 ms)
```

---

## 2. Testing Express.js Routes with Jest & Supertest
Here’s a detailed guide to **unit testing a Node.js application** using **Jest** and **Supertest**:

### **Overview**
1. **Jest**:
   - A JavaScript testing framework that is simple, fast, and feature-rich.
   - Provides functions like `describe`, `it`, `test`, `beforeEach`, and assertions like `expect`.

2. **Supertest**:
   - A library for HTTP assertions that makes testing APIs easy.
   - Works well with Jest to test endpoints in a Node.js application.

### **Step-by-Step Guide**

#### **Step 1: Setup Your Node.js Application**
1. Create a simple **Node.js app** using **Express**:
   - Install dependencies:
     ```bash
     npm init -y
     npm install express body-parser
     ```
   - Create an `app.js` file:
     ```javascript
     const express = require("express");
     const bodyParser = require("body-parser");

     const app = express();
     app.use(bodyParser.json());

     // Sample routes
     app.get("/", (req, res) => {
       res.status(200).send("Welcome to the API!");
     });

     app.post("/add", (req, res) => {
       const { a, b } = req.body;
       if (typeof a !== "number" || typeof b !== "number") {
         return res.status(400).json({ error: "Invalid input" });
       }
       const sum = a + b;
       res.status(200).json({ result: sum });
     });

     module.exports = app;
     ```

   - Add an entry file (`index.js`) to start the server:
     ```javascript
     const app = require("./app");
     const PORT = 3000;

     app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
     });
     ```

#### **Step 2: Install Jest and Supertest**
1. Install Jest and Supertest:
   ```bash
   npm install --save-dev jest supertest
   ```

2. Update `package.json` to include a Jest test script:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```

#### **Step 3: Write Tests**
1. Create a `tests` folder and add a test file `app.test.js`:
   ```bash
   mkdir tests
   touch tests/app.test.js
   ```

2. Write unit and integration tests in `app.test.js`:
   ```javascript
   const request = require("supertest");
   const app = require("../app");

   describe("Node.js API Tests", () => {
     // Test the root route
     it("should return a welcome message", async () => {
       const res = await request(app).get("/");
       expect(res.statusCode).toBe(200);
       expect(res.text).toBe("Welcome to the API!");
     });

     // Test the /add route for valid input
     it("should return the sum of two numbers", async () => {
       const res = await request(app).post("/add").send({ a: 5, b: 3 });
       expect(res.statusCode).toBe(200);
       expect(res.body.result).toBe(8);
     });

     // Test the /add route for invalid input
     it("should return a 400 error for invalid input", async () => {
       const res = await request(app).post("/add").send({ a: "5", b: "3" });
       expect(res.statusCode).toBe(400);
       expect(res.body.error).toBe("Invalid input");
     });
   });
   ```

#### **Step 4: Run Tests**
1. Run the tests using the `npm test` command:
   ```bash
   npm test
   ```

2. Output:
   ```
   PASS  tests/app.test.js
    Node.js API Tests
      ✓ should return a welcome message (100ms)
      ✓ should return the sum of two numbers (20ms)
      ✓ should return a 400 error for invalid input (15ms)

   Test Suites: 1 passed, 1 total
   Tests:       3 passed, 3 total
   Snapshots:   0 total
   Time:        2.5s
   ```

### **Step 5: Add More Test Cases (Optional)**
You can add more routes and test cases for edge scenarios. For example:

1. **Test empty body for `/add`**:
   ```javascript
   it("should return a 400 error for missing input", async () => {
     const res = await request(app).post("/add").send({});
     expect(res.statusCode).toBe(400);
     expect(res.body.error).toBe("Invalid input");
   });
   ```

2. **Test large numbers for `/add`**:
   ```javascript
   it("should handle large numbers correctly", async () => {
     const res = await request(app).post("/add").send({ a: 1000000, b: 2000000 });
     expect(res.statusCode).toBe(200);
     expect(res.body.result).toBe(3000000);
   });
   ```

### **Key Jest Features**
- **Assertions**:
  - `expect(value).toBe(expected)`: Checks equality.
  - `expect(value).toEqual(expected)`: Deeply compares objects.
  - `expect(value).toContain(item)`: Verifies arrays or strings.

- **Hooks**:
  - `beforeAll`: Run once before all tests.
  - `afterAll`: Run once after all tests.
  - `beforeEach`: Run before each test.
  - `afterEach`: Run after each test.

- **Grouping Tests**:
  - Use `describe` to group related tests.

### **Supertest Features**
- **Request Methods**:
  - `.get(path)`: Test `GET` requests.
  - `.post(path).send(data)`: Test `POST` requests with a payload.
  - `.put`, `.delete`, etc.

- **Assertions**:
  - `.expect(status)`: Assert HTTP status codes.
  - `.expect(header, value)`: Assert specific headers.
  - `.expect(response.body)`: Assert the response body.

### **Best Practices**
1. **Use Mocks**:
   - Mock database interactions or external services using libraries like `jest.mock()` or `sinon`.

2. **Isolate Unit and Integration Tests**:
   - Keep tests independent of each other.

3. **Test Edge Cases**:
   - Handle invalid inputs, empty payloads, or boundary conditions.

4. **Use CI/CD**:
   - Automate testing with tools like GitHub Actions or Jenkins.

---

# Explain stubs, spies, and mocks in testing
In Node.js testing with **Jest**, stubs, spies, and mocks are essential tools for creating isolated tests. Jest has built-in support for mocks and spies without needing an external library like Sinon. Let's dive into the concepts of stubs, spies, and mocks in Jest with examples.

## 1. **Stub**
A **stub** is a function that replaces a real function and provides predefined behavior. It allows you to control the behavior of a dependency so that the tests can focus on the code under test.

In Jest, you can use `jest.fn()` to create a stub.

### Example:
```javascript
// A simple function that calls a callback
function fetchData(callback) {
  callback('fetched data');
}

test('should call the callback with predefined data', () => {
  const callbackStub = jest.fn(); // Create a stub for the callback

  fetchData(callbackStub); // Call the function with the stub

  // Check if the callback was called
  expect(callbackStub).toHaveBeenCalled();
  // Check if the callback was called with the correct argument
  expect(callbackStub).toHaveBeenCalledWith('fetched data');
});
```

In this example, `jest.fn()` creates a stub for the callback function. We then use Jest assertions to check whether it was called and what data was passed to it.

## 2. **Spy**
A **spy** allows you to track calls to a real function without replacing it. In Jest, you can spy on an object’s method using `jest.spyOn()`.

### Example:
```javascript
const utils = {
  log: (message) => console.log(message),
};

function fetchData() {
  utils.log('Data fetched');
}

test('should call the log method', () => {
  const logSpy = jest.spyOn(utils, 'log'); // Spy on the log method

  fetchData();

  // Check if the log method was called
  expect(logSpy).toHaveBeenCalled();
  // Check if the log method was called with the correct argument
  expect(logSpy).toHaveBeenCalledWith('Data fetched');

  logSpy.mockRestore(); // Restore original function after the test
});
```

In this case, `jest.spyOn()` spies on `utils.log`, allowing us to track its usage without replacing it.

## 3. **Mock**
A **mock** replaces the real implementation of a function, allowing you to provide custom behavior or completely control the function's behavior during testing. In Jest, mocks can be created with `jest.mock()` or `jest.fn()`.

### Example:
Let's mock an external module:

```javascript
// file: api.js
export const getData = () => {
  return fetch('https://api.example.com/data')
    .then(response => response.json());
};

// file: app.js
import { getData } from './api';

export const fetchData = async () => {
  const data = await getData();
  return data;
};

// file: app.test.js
import { fetchData } from './app';
import { getData } from './api';

jest.mock('./api'); // Mock the entire api module

test('should return mocked data', async () => {
  getData.mockResolvedValue({ id: 1, name: 'Test Data' }); // Mock the implementation

  const data = await fetchData();

  // Check if the mocked data is returned
  expect(data).toEqual({ id: 1, name: 'Test Data' });
  expect(getData).toHaveBeenCalled(); // Ensure getData was called
});
```

In this example, `jest.mock('./api')` mocks the entire `api` module, allowing you to provide a custom implementation for the `getData` function. We then mock `getData` to return a specific value when called.

## Summary
- **Stub**: A stand-in function with predefined behavior, typically created with `jest.fn()`.
- **Spy**: Tracks calls to a real function, typically created with `jest.spyOn()`.
- **Mock**: Replaces the real implementation of a function or module, often created with `jest.mock()` or `jest.fn()`.

Each of these tools helps you isolate your tests from external dependencies, ensuring you can test the behavior of your code under different conditions.

---

[<- MERN](mern-quick.md)

[<- QA](qa-quick.md)

# Cypress Testing with React

Cypress is a popular end-to-end testing framework that works well with React applications. It allows you to write tests that simulate real user interactions in the browser, making it easier to validate your application's behavior and ensure its stability.

## Why Cypress for React Testing?

- **Fast and Reliable**: Cypress is optimized for speed and automatically waits for actions to complete before moving on to the next step.
- **Full DOM Interaction**: You can directly interact with DOM elements and simulate user behavior, such as clicks, inputs, and navigations.
- **Real-Time Debugging**: Cypress provides time-traveling, where you can view how each action was performed in the browser.
- **Automatic Waiting**: Cypress automatically waits for elements to load, network requests to complete, and animations to finish.
- **Easy Setup**: Cypress works out of the box with most React applications.

## Setup Cypress in React

To use Cypress in a React project, follow these steps:

1. **Install Cypress:**

   In the root directory of your React application, run the following command to install Cypress as a development dependency:

   ```bash
   npm install cypress --save-dev
   ```

2. **Open Cypress:**

   Once installed, you can open Cypress for the first time using:

   ```bash
   npx cypress open
   ```

   This command will open the Cypress Test Runner, where you can see, write, and run your tests.

3. **Configure Cypress:**

   After opening Cypress, it will create a `cypress` folder where your test files are stored (`cypress/integration`). Inside this folder, you can create `.spec.js` files to write your test cases.

## Basic Example of Cypress Testing with React

Let’s consider a simple React component, a counter, that increments a count when a button is clicked.

```jsx
// Counter.js
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
```

### Testing the Counter Component with Cypress

Create a Cypress test for the `Counter` component in the `cypress/integration` folder. For example, create `counter.spec.js` with the following content:

```js
// cypress/integration/counter.spec.js
describe('Counter Component', () => {
  beforeEach(() => {
    cy.visit('/'); // Visit the homepage where the Counter component is rendered
  });

  it('should display the initial count as 0', () => {
    cy.get('h1').should('contain', '0'); // Check if the count starts at 0
  });

  it('should increment the count when the button is clicked', () => {
    cy.get('button').click(); // Simulate a button click
    cy.get('h1').should('contain', '1'); // Check if the count has incremented to 1
  });
});
```

### Explanation:

- **`cy.visit('/')`**: Cypress loads the application at the root URL (adjust the route if your component is on a different page).
- **`cy.get('h1')`**: This selects the `h1` element in the DOM where the count is displayed.
- **`cy.should('contain', '0')`**: Cypress assertion checks that the `h1` contains the value `0`.
- **`cy.get('button').click()`**: Simulates a button click event.
- **`cy.should('contain', '1')`**: After clicking the button, it verifies that the count has incremented to `1`.

## More Advanced Features in Cypress

### 1. Testing Network Requests (Mocking APIs)

If your React component interacts with an external API, you can mock these API requests in Cypress using `cy.intercept()`.

Suppose you have a component that fetches a list of users:

```jsx
// Users.js
import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
```

To test the API call, you can mock the request:

```js
// cypress/integration/users.spec.js
describe('Users Component', () => {
  beforeEach(() => {
    // Mock the API request using cy.intercept()
    cy.intercept('GET', '/api/users', {
      fixture: 'users.json', // Use fixture for mock data
    }).as('getUsers');

    cy.visit('/users'); // Visit the Users component page
  });

  it('should display a list of users', () => {
    cy.wait('@getUsers'); // Wait for the API call
    cy.get('li').should('have.length', 2); // Assuming mock returns 2 users
    cy.get('li').first().should('contain', 'John Doe'); // Verify user data
  });
});
```

You would create a `users.json` file inside `cypress/fixtures/` with the following content:

```json
[
  { "id": 1, "name": "John Doe" },
  { "id": 2, "name": "Jane Doe" }
]
```

### 2. Testing Component with Redux

If your React application uses Redux, Cypress can test components connected to the Redux store. Here's how you can test a Redux-connected component.

Suppose you have a counter component that interacts with a Redux store:

```jsx
// Counter.js (with Redux)
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from './counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
};

export default Counter;
```

In the Cypress test, you can wrap the component with the Redux provider:

```js
// cypress/integration/counterRedux.spec.js
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from '@cypress/react';
import Counter from '../../src/Counter';
import store from '../../src/store';

describe('Counter Component with Redux', () => {
  it('increments the counter', () => {
    // Mount the component with the Redux provider
    mount(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    cy.get('h1').should('contain', '0'); // Check initial state
    cy.get('button').click(); // Click increment button
    cy.get('h1').should('contain', '1'); // Verify count is incremented
  });
});
```

## Conclusion

Cypress is a powerful tool for testing React applications, allowing you to write and execute tests in a real browser environment. Whether you are performing end-to-end testing, mocking API requests, or testing Redux-connected components, Cypress offers an intuitive and fast experience.


# Advanced Cypress Testing with React

In this document, we will explore advanced examples of Cypress testing with React, covering topics such as:

- Mocking API Requests
- Using Fixtures for Data-Driven Tests
- Component Testing with Redux
- Testing React Router
- Handling Asynchronous UI Elements

---

## 1. Mocking API Requests with Cypress

When your React app makes network requests, you might want to mock these requests in your Cypress tests to ensure you can control the test environment and avoid dependencies on external APIs.

**Example:**

Let’s say we have a React component that fetches a list of users from an API and displays them:

```jsx
// Users.js
import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
```

Now, let’s test this component by mocking the API response using `cy.intercept()`.

```js
// cypress/integration/users.spec.js
describe('Users Component', () => {
  beforeEach(() => {
    // Intercept the API call and mock the response
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users', {
      fixture: 'users.json', // Use fixture file for mock data
    }).as('getUsers');

    cy.visit('/users'); // Assuming the Users component is on the /users route
  });

  it('should display the user list fetched from the API', () => {
    cy.wait('@getUsers'); // Wait for the mocked API response

    // Assert the user names are displayed
    cy.get('ul > li').should('have.length', 2); // Assuming the mock returns 2 users
    cy.get('ul > li').first().should('contain', 'Leanne Graham'); // Verify first user
  });
});
```

In this example:

- `cy.intercept()` is used to mock network requests. We intercept the `GET` request to the API and return mock data.
- **Fixtures**: The `fixture` keyword tells Cypress to use a fixture file (`cypress/fixtures/users.json`) for the mocked data.

Here’s an example of the `users.json` fixture file:

```json
[
  {
    "id": 1,
    "name": "Leanne Graham"
  },
  {
    "id": 2,
    "name": "Ervin Howell"
  }
]
```

---

## 2. Using Fixtures for Data-Driven Tests

Cypress allows you to use external JSON files (fixtures) to provide input data for your tests. This is particularly useful for writing **data-driven tests**.

For instance, let’s test a login form with different sets of user credentials stored in a fixture file:

```js
// cypress/fixtures/users.json
[
  {
    "username": "admin",
    "password": "admin123"
  },
  {
    "username": "user",
    "password": "user123"
  }
]
```

We can iterate over these credentials in our test:

```js
// cypress/integration/login.spec.js
describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/login'); // Visit the login page
  });

  it('should log in with valid credentials', () => {
    cy.fixture('users').then((users) => {
      users.forEach((user) => {
        cy.get('input[name="username"]').clear().type(user.username);
        cy.get('input[name="password"]').clear().type(user.password);
        cy.get('button[type="submit"]').click();
        
        // You can add assertions for login success
        cy.url().should('contain', '/dashboard'); // Assume successful login redirects to dashboard
      });
    });
  });
});
```

---

## 3. Component Testing with Redux

React applications often use **Redux** for state management. Cypress can be used to test components that are connected to the Redux store.

Let’s say we have a simple `Counter` component connected to Redux.

```jsx
// counterSlice.js (Redux slice)
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

And the `Counter` component:

```jsx
// Counter.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;
```

To test this component with Redux, you need to wrap the component with a **Redux provider** in Cypress:

```js
// cypress/integration/counter.spec.js
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from '@cypress/react';
import Counter from '../../src/Counter';
import store from '../../src/store'; // Your Redux store

describe('Counter Component with Redux', () => {
  it('should increment and decrement the counter', () => {
    // Mount the component wrapped in the Redux provider
    mount(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    // Verify initial state
    cy.get('h1').should('contain', '0');

    // Increment the count
    cy.get('button').contains('Increment').click();
    cy.get('h1').should('contain', '1');

    // Decrement the count
    cy.get('button').contains('Decrement').click();
    cy.get('h1').should('contain', '0');
  });
});
```

---

## 4. Testing React Router

You may want to test how React Router behaves in your application. For example, you can test route navigation or redirects.

Here’s an example of testing navigation:

```js
// cypress/integration/navigation.spec.js
describe('Navigation', () => {
  it('should navigate to About page when clicking the About link', () => {
    cy.visit('/'); // Visit the home page
    cy.get('a[href="/about"]').click(); // Click the About link
    cy.url().should('include', '/about'); // Check if the URL contains '/about'
    cy.get('h1').should('contain', 'About'); // Verify the About page content
  });
});
```

---

## 5. Handling Asynchronous UI Elements

Cypress automatically waits for elements to appear, but sometimes you need more control over asynchronous behavior.

Let’s say your app has a loader that appears while fetching data. You can write a test that waits for the loader to disappear before making assertions:

```js
// cypress/integration/loader.spec.js
describe('Loader Behavior', () => {
  it('should wait for the loader to disappear before displaying content', () => {
    cy.visit('/some-page');

    // Wait for the loader to disappear
    cy.get('.loader').should('be.visible');
    cy.get('.loader').should('not.exist'); // Ensure the loader is gone

    // Now assert the content
    cy.get('h1').should('contain', 'Data Loaded');
  });
});
```

---

## Conclusion

With Cypress, you can handle more complex scenarios like mocking network requests, testing Redux-connected components, using fixtures for data-driven tests, and testing navigation or asynchronous behaviors.

---

[<- QA](qa-quick.md)

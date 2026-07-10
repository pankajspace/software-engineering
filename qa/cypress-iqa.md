[<- QA](qa-quick.md)

# Cypress IQA

## 1. What is Cypress and how does it differ from Selenium?
* **Cypress** is a JavaScript-based end-to-end testing framework that runs directly in the browser.
* It uses a **non-WebDriver** architecture, bundling Mocha/Chai assertions, retry-ability, and real-time reloading.
* **Key differences vs. Selenium/WebDriver:**
  * **Execution context:** Cypress runs inside the browser process; Selenium drives external browser instances.
  * **Asynchrony handling:** Cypress commands auto-retry and are promise-aware, so you rarely write explicit waits.
  * **Debuggability:** You get DOM snapshots, time travel, and native devtools integration.
  * **Language support:** Cypress uses JavaScript/TypeScript; Selenium supports many languages.

## 2. How does Cypress’s command queue and “chainability” work?
* Every `cy.*` call enqueues a command; Cypress then executes them one by one, **automatically waiting** for assertions and DOM changes.

* **Chainability:** Each command returns a “chainable” object. You can do:
  ```js
  cy.get('button').click().should('be.disabled')
  ```
  Internally:
  1. **Enqueue** `get('button')`
  2. **Enqueue** `click()`
  3. **Enqueue** `should('be.disabled')`

* **Avoid mixing** Cypress commands with native promises; always return the Cypress chain.

## 3. Test Structure: `describe` & `it`
* **`describe()`** groups related tests
* **`it()`** defines an individual test case

```js
describe('Login Page', () => {
  it('should load successfully', () => {
    cy.visit('/login');
    cy.url().should('include', '/login');
  });
});
```

## 4. Visiting Pages: `cy.visit()`
Navigate your app just like a user would in the browser.

```js
it('navigates to the dashboard after login', () => {
  cy.visit('/login');
  cy.get('input[name="username"]').type('alice');
  cy.get('input[name="password"]').type('secret');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});
```

## 5. Querying Elements: `cy.get()`, `cy.contains()`, `cy.find()`
* **`cy.get(selector)`** finds elements via CSS selectors
* **`cy.contains(text)`** finds elements by text content
* **`cy.find()`** narrows down a selection

```js
cy.get('.todo-input')      // CSS selector
  .type('Buy milk')
  .should('have.value', 'Buy milk');

cy.contains('Add').click() // finds a button with text “Add”
```

## 6. Assertions: `.should()` & `.and()`
Chain assertions to check element state or values.

```js
cy.get('.todo-list li')
  .should('have.length', 1)
  .and('contain.text', 'Buy milk');
```

## 7. Fixtures: `cy.fixture()`
Load static data (e.g., JSON) to drive your tests.

```js
beforeEach(() => {
  cy.fixture('user.json').as('userData');
});

it('logs in using fixture data', function() {
  cy.visit('/login');
  cy.get('input[name="username"]').type(this.userData.username);
  cy.get('input[name="password"]').type(this.userData.password);
  cy.get('button[type="submit"]').click();
  cy.contains(`Welcome, ${this.userData.name}`);
});
```

## 8. Network Control: `cy.intercept()`
Stub or spy on HTTP requests to isolate frontend behavior.

```js
it('shows error message on failed API', () => {
  cy.intercept('POST', '/api/login', {
    statusCode: 401,
    body: { error: 'Invalid credentials' }
  }).as('loginAttempt');

  cy.visit('/login');
  cy.get('button[type="submit"]').click();
  cy.wait('@loginAttempt');
  cy.get('.error').should('be.visible')
    .and('contain.text', 'Invalid credentials');
});
```

## 9. Custom Commands
DRY up repetitive tasks by extending `cy`.

```js
// In cypress/support/commands.js
Cypress.Commands.add('login', (u, p) => {
  cy.visit('/login');
  cy.get('input[name="username"]').type(u);
  cy.get('input[name="password"]').type(p);
  cy.get('button[type="submit"]').click();
});

// In your spec file
it('uses custom login', () => {
  cy.login('alice', 'secret');
  cy.url().should('include', '/dashboard');
});
```

## 10. Hooks: `before`, `beforeEach`, `after`
Set up preconditions or clean up after tests.

```js
before(() => {
  // runs once before all tests
  cy.exec('npm run seed:db');
});

beforeEach(() => {
  // runs before each test
  cy.visit('/');
});

after(() => {
  // cleanup
  cy.exec('npm run reset:db');
});
```

## 11. Aliases & References: `.as()` & `@alias`
Store elements or intercepted routes for later use.

```js
cy.get('.user-card').as('card');
cy.get('@card').find('button').click();
```

## 12. Authentication Caching with `cy.session()`

Speeds up tests by persisting login state across specs.

```js
// cypress/e2e/auth.spec.js
describe('Authenticated Flows', () => {
  beforeEach(() => {
    cy.session('user-session', () => {
      cy.request('POST', '/api/login', {
        username: 'alice', password: 'secret'
      }).then(({ body }) => {
        window.localStorage.setItem('token', body.token)
      })
    })
  })

  it('visits protected page', () => {
    cy.visit('/dashboard')
    cy.contains('Welcome, Alice')
  })
})
```

## 13. Node Tasks with `cy.task()`
Invoke arbitrary Node code—e.g. to seed/clean a database or read files.

```js
// cypress/plugins/index.js
module.exports = (on, config) => {
  on('task', {
    seedDatabase() {
      // import your seed script or use knex/etc.
      return require('../../scripts/seed')()
    },
    readFile(path) {
      return require('fs').readFileSync(path, 'utf8')
    }
  })
}

// In your spec
describe('DB-backed tests', () => {
  before(() => {
    cy.task('seedDatabase')
  })

  it('verifies seeded data', () => {
    cy.task('readFile', 'cypress/fixtures/users.json')
      .then(json => {
        const users = JSON.parse(json)
        expect(users).to.have.length.greaterThan(0)
      })
  })
})
```

## 14. How do you test file uploads and downloads?
* **File Upload:** install [`cypress-file-upload`](https://github.com/abramenal/cypress-file-upload):
  ```js
  import 'cypress-file-upload'

  cy.get('input[type=file]')
    .attachFile('avatar.png')
  cy.get('[data-cy=upload-btn]').click()
  cy.contains('Upload complete')
  ```

* **File Download:** after clicking the download link:
  ```js
  cy.get('a.download-report').click()
  cy.readFile('cypress/downloads/report.pdf', 'binary')
    .should(buf => expect(buf.length).to.be.gt(1000))
  ```

## 15. Describe how to write a data-driven (parameterized) test in Cypress.
Load an array of test cases from a fixture or inline and iterate:
```js
const credentials = [
  { user: 'alice', pass: 'correct', valid: true },
  { user: 'bob',   pass: 'wrong',   valid: false }
]

describe('Login data-driven', () => {
  beforeEach(() => cy.visit('/login'))

  credentials.forEach(({ user, pass, valid }) => {
    it(`login ${user} should be ${valid ? 'successful' : 'unsuccessful'}`, () => {
      cy.get('input[name=username]').type(user)
      cy.get('input[name=password]').type(pass)
      cy.get('button[type=submit]').click()
      if (valid) {
        cy.url().should('include', '/dashboard')
      } else {
        cy.get('.error').should('be.visible')
      }
    })
  })
})
```

## 16. Explain how to debug failed tests in Cypress.
1. **Time-travel UI:** When you run `npx cypress open`, click on the failing command in the left panel to inspect DOM snapshots.

2. **`.debug()` & `cy.log()`:**
   ```js
   cy.get('.todo-item').first().debug()
   cy.log('Current items:', items)
   ```

3. **`--config video=false`** to disable video if it’s slowing things down.

4. **Browser devtools:** click “Open in IDE” or press the DevTools button in the runner.

## 17. How do you capture and report code coverage with Cypress?
1. **Instrument** your frontend code (e.g. `babel-plugin-istanbul`).
2. **Install** `@cypress/code-coverage`.
3. **Support file** (`cypress/support/index.js`):
   ```js
   import '@cypress/code-coverage/support'
   ```
4. **Plugin** (`cypress/plugins/index.js`):
   ```js
   const codeCoverage = require('@cypress/code-coverage/task')
   module.exports = (on, config) => { codeCoverage(on, config); return config }
   ```
5. After `cypress run`, look in the `coverage/` folder for combined reports.

## 18. What are best practices for writing maintainable Cypress tests?
* **Use stable selectors:** Prefer `[data-cy]` attributes over classes or IDs that can change.
* **Avoid hard waits:** Rely on built-in retry and `.should()` rather than `cy.wait(500)`.
* **DRY up** common flows with **custom commands** (`cypress/support/commands.js`).
* **Isolate tests:** Reset DB or app state in hooks (`beforeEach`).
* **Group related tests** into logical spec files.
* **Review flakiness** regularly—investigate any soft failures immediately.
* **Avoid flaky selectors**: prefer data attributes (`[data-cy=submit]`)
* **Keep tests independent**: reset state in hooks
* **Leverage Cypress Dashboard** for parallelization & recording

---

[<- QA](qa-quick.md)

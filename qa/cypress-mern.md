[<- QA](qa-quick.md)

# Comprehensive Cypress Reference for MERN Stack

Below is the same **comprehensive Cypress reference**, now using **Mocha** hooks and **Chai** assertions throughout. Experimental features are omitted.

---

## 📦 1. Installation & Initial Setup

```bash
# Install Cypress as a dev dependency
npm install --save-dev cypress

# (Optional) Install TypeScript support
npm install --save-dev typescript ts-node @types/node @types/mocha @types/chai

# (Optional) Install Testing Library plugin for better selectors
npm install --save-dev @testing-library/cypress
```

**Folder layout** (customizable):

```
project-root/
├─ cypress/
│  ├─ fixtures/          # static data (JSON, images)
│  ├─ integration/       # end-to-end tests
│  ├─ component/         # component tests via @cypress/react
│  ├─ plugins/           # plugin/index.js
│  └─ support/           # commands.js, index.js
├─ server/               # Express + MongoDB
│   ├─ src/
│   └─ seed/             # DB seed scripts
├─ client/               # React app
└─ cypress.json          # Cypress config
```

**Basic `cypress.json`:**

```json
{
  "baseUrl": "http://localhost:3000",
  "viewportWidth": 1280,
  "viewportHeight": 720,
  "video": false,
  "defaultCommandTimeout": 8000,
  "pageLoadTimeout": 60000,
  "responseTimeout": 30000,
  "env": {
    "API_URL": "http://localhost:5000/api"
  },
  "retries": {
    "runMode": 2,
    "openMode": 0
  }
}
```

---

## 🧪 2. Test Structure & Mocha Hooks

```js
// cypress/integration/auth.spec.js
describe('Auth & Dashboard', function() {
  before(function() {
    // runs once before ALL tests
    cy.task('db:reset')           // custom plugin: resets & seeds Mongo
  });

  beforeEach(function() {
    // runs before EACH test
    cy.visit('/login')
  });

  afterEach(function() {
    // runs after EACH test
    cy.clearCookies()
    cy.clearLocalStorage()
  });

  after(function() {
    // runs once after ALL tests
    cy.log('All auth tests done')
  });

  it('shows login validation errors', function() {
    cy.get('button[type=submit]').click()
    cy.contains('Email is required').should('be.visible')
    cy.contains('Password is required').should('be.visible')
  });

  it('logs in successfully', function() {
    cy.get('input[name=email]').type('test@user.com')
    cy.get('input[name=password]').type('Password123!')
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome, Test User').should('exist')
  });
});
```

---

## 🔍 3. Querying & Traversal

| Command              | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `cy.get(selector)`   | CSS selector                                 |
| `cy.contains(text)`  | Find element by visible text                 |
| `cy.findByRole(...)` | ARIA selectors (with Testing Library plugin) |
| DOM traversal:       | `.children()`, `.parent()`, `.closest()`,    |
|                      | `.siblings()`, `.next()`, `.prev()`          |

```js
cy.get('.todo-list')
  .find('li')
  .first()
  .should('contain', 'Buy milk');
```

---

## 🎬 4. Actions

| Command                       | Purpose                  |
| ----------------------------- | ------------------------ |
| `cy.visit(url)`               | Navigate browser         |
| `cy.click()`                  | Click element            |
| `cy.dblclick()`               | Double-click             |
| `cy.type(text)`               | Type into input          |
| `cy.clear()`                  | Clear input field        |
| `cy.select(option)`           | Select from `<select>`   |
| `cy.check()` / `cy.uncheck()` | Tick/untick checkboxes   |
| `cy.scrollTo(pos)`            | Scroll window or element |

```js
cy.get('input[name=email]').clear().type('user@site.com')
cy.get('button[type=submit]').click()
```

---

## ✔️ 5. Assertions

### Chai `expect`

```js
cy.window().then(win => {
  expect(win.localStorage.getItem('token')).to.be.ok;
});

expect(2 + 2).to.equal(4);
```

### Cypress `.should()`

```js
cy.get('h1').should('have.text', 'Dashboard')
cy.get('input').should('have.value', 'Hello')
cy.url().should('include', '/dashboard')
```

Common assertions:

* `.should('be.visible')`
* `.should('not.exist')`
* `.should('have.length', n)`
* `.should('contain', text)`
* `.should('have.class', className)`

---

## 🔗 6. Aliases & `as()`

```js
cy.intercept('POST', '/api/login').as('loginReq')
cy.get('button').click()
cy.wait('@loginReq')
  .its('response.statusCode')
  .then(status => expect(status).to.equal(200));
```

---

## ⏱️ 7. Waiting & Time Control

* **`cy.wait(ms)`**: static delay
* **`cy.wait('@alias', { timeout })`**: wait on stub
* **`cy.clock()` + `cy.tick(ms)`**: mock timers

```js
// Freeze time at Jan 1, 2020
cy.clock(new Date(2020, 0, 1).getTime())
cy.visit('/timer')
cy.tick(5000)
cy.contains('5 seconds elapsed').should('exist')
```

---

## 🛠️ 8. Network Stubbing & Spying

### `cy.intercept()`

```js
// Stub GET /tasks
cy.intercept('GET', '/api/tasks', { fixture: 'tasks.json' })

// Spy POST /tasks
cy.intercept('POST', '/api/tasks').as('createTask')
cy.get('[data-cy=new-task]').type('Test{enter}')
cy.wait('@createTask')
  .its('request.body')
  .then(body => expect(body).to.have.property('title', 'Test'));
```

Options include `statusCode`, `body`, `headers`, `delayMs`, `times`, and `middleware: true`.

---

## 🔌 9. Custom Commands & Overwrites

```js
// cypress/support/commands.js
Cypress.Commands.add('login', ({ email, password }) => {
  cy.request('POST', `${Cypress.env('API_URL')}/auth/login`, { email, password })
    .its('body.token')
    .then(token => window.localStorage.setItem('token', token))
});

Cypress.Commands.overwrite('visit', (originalVisit, url, options) => {
  return originalVisit(url, {
    onBeforeLoad(win) {
      win.localStorage.setItem('token', Cypress.env('API_TOKEN'))
    },
    ...options
  });
});
```

Use in tests:

```js
cy.login({ email: 'a@b.com', password: 'Pwd!' });
cy.visit('/dashboard');
```

---

## 🔄 10. Tasks & Plugins

### Reset DB via plugin

```js
// cypress/plugins/index.js
const { execSync } = require('child_process');
module.exports = (on) => {
  on('task', {
    'db:reset'() {
      execSync('npm run seed:db');
      return null;
    }
  });
};
```

Invoke in tests:

```js
before(function() {
  cy.task('db:reset');
});
```

---

## ⚙️ 11. Configuration & Environment

* **`cypress.json`**: core settings

* **`cypress.env.json`**: sensitive vars (gitignored)

* **CLI overrides**:

  ```bash
  npx cypress run --config video=true --env API_URL=https://staging.api
  ```

* **Per-spec config**:

  ```js
  Cypress.config('defaultCommandTimeout', 20000);
  ```

---

## 📑 12. CI/CD Integration & Reporting

### GitHub Actions

```yaml
# .github/workflows/cypress.yml
name: Cypress E2E
on: [push]
jobs:
  e2e:
    runs-on: ubuntu-latest
    services:
      mongo:
        image: mongo:4.4
        ports: ['27017:27017']
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - run: npm run start:server &      # Express + Mongo
      - run: npm run start:client &      # React
      - run: npx wait-on http://localhost:3000
      - run: npx cypress run --record --key ${{ secrets.CYPRESS_KEY }}
```

### Reporters

* **Mochawesome** (HTML/JSON):

  ```bash
  npm install --save-dev mochawesome
  ```

  ```json
  // cypress.json
  {
    "reporter": "mochawesome",
    "reporterOptions": {
      "reportDir": "cypress/reports",
      "overwrite": false,
      "html": true,
      "json": true
    }
  }
  ```

* **JUnit**:

  ```bash
  npm install --save-dev mocha-junit-reporter
  ```

  ```json
  {
    "reporter": "mocha-junit-reporter",
    "reporterOptions": {
      "mochaFile": "cypress/results/junit-[hash].xml"
    }
  }
  ```

---

## 🖼️ 13. Screenshots & Videos

* **Auto on failure** (`cypress.json`):

  ```json
  {
    "video": true,
    "screenshotOnRunFailure": true
  }
  ```

* **Manual**:

  ```js
  cy.screenshot();               // full viewport
  cy.get('.modal').screenshot(); // specific element
  ```

Customize via `after:screenshot` in `cypress/plugins/index.js`.

---

## 🔐 14. Session & State Management

* **Clear state**:

  ```js
  cy.clearCookies();
  cy.clearLocalStorage();
  ```

* **`cy.session()`** (built-in):

  ```js
  before(function() {
    cy.session('userSession', () => {
      cy.request('POST', '/api/login', { email: 'a@b.com', pwd: 'secret' })
        .its('body.token')
        .then(token => window.localStorage.setItem('token', token));
    });
  });

  it('visits dashboard with cached session', function() {
    cy.visit('/dashboard');
    cy.contains('Welcome').should('exist');
  });
  ```

---

## 📏 15. Component Testing

1. **Install**:

   ```bash
   npm install --save-dev @cypress/react @cypress/webpack-dev-server
   ```

2. **Plugin** (`cypress/plugins/index.js`):

   ```js
   const injectDevServer = require('@cypress/webpack-dev-server');
   module.exports = (on, config) => {
     injectDevServer(on, config);
     return config;
   };
   ```

3. **Spec** (`cypress/component/Button.spec.js`):

   ```jsx
   import React from 'react';
   import { mount } from '@cypress/react';
   import Button from '../../client/src/components/Button';

   describe('Button component', function() {
     it('renders and handles click', function() {
       const onClick = cy.stub().as('onClick');
       mount(<Button onClick={onClick}>Click me</Button>);
       cy.contains('Click me').click();
       cy.get('@onClick').should('have.been.calledOnce');
     });
   });
   ```

---

## ♿ 16. Accessibility Testing

```bash
npm install --save-dev cypress-axe axe-core
```

```js
// cypress/support/index.js
import 'cypress-axe';
```

```js
describe('Accessibility', function() {
  it('dashboard has no a11y violations', function() {
    cy.visit('/dashboard');
    cy.injectAxe();
    cy.checkA11y(null, {
      includedImpacts: ['critical', 'serious']
    });
  });
});
```

---

## 📊 17. Code Coverage

1. **Install**:

   ```bash
   npm install --save-dev @cypress/code-coverage nyc babel-plugin-istanbul
   ```

2. **Instrument code** (via Babel).

3. **Plugin** (`cypress/plugins/index.js`):

   ```js
   require('@cypress/code-coverage/task')(on, config);
   return config;
   ```

4. **Support** (`cypress/support/index.js`):

   ```js
   import '@cypress/code-coverage/support';
   ```

---

## 🐞 18. Debugging Tips

* **`cy.pause()`**: pause test runner
* **`cy.debug()`**: drop into debugger
* **Chrome DevTools**: right-click → “Reveal in Elements”
* **`.then(console.log)`**: inspect values
* **Isolate with** `it.only`, `describe.only`, `it.skip`, `describe.skip`

---

## 🌐 19. Cross-Browser Testing

```bash
npx cypress run --browser firefox
npx cypress run --browser edge
```

---

## 🚀 20. Sample MERN E2E Suite

```js
// cypress/integration/tasks.crud.spec.js

describe('Tasks CRUD', function() {
  before(function() {
    cy.task('db:reset');
  });

  it('creates a task via API', function() {
    cy.request('POST', `${Cypress.env('API_URL')}/tasks`, { title: 'New Task' })
      .then(resp => {
        expect(resp.status).to.equal(201);
      });
  });

  it('lists tasks in UI', function() {
    cy.intercept('GET', '/api/tasks').as('getTasks');
    cy.visit('/tasks');
    cy.wait('@getTasks');
    cy.contains('New Task').should('be.visible');
  });

  it('edits a task', function() {
    cy.contains('New Task').parent().find('.edit-btn').click();
    cy.get('input[name=title]').clear().type('Updated Task');
    cy.get('button.save').click();
    cy.contains('Updated Task').should('exist');
  });

  it('deletes a task', function() {
    cy.contains('Updated Task').parent().find('.delete-btn').click();
    cy.contains('Updated Task').should('not.exist');
  });
});
```

---

With these **20 sections**, you have:

* 📝 **Mocha hooks** & **Chai assertions**
* 🚀 **All Cypress commands** (`cy.visit`, `cy.get`, `cy.intercept`, `cy.request`, …)
* 🔧 **Custom commands**, **plugins**, **tasks**
* 🖼️ **Screenshots/videos**, **CI/CD**, **parallelization**, **Dashboard**
* 🧩 **Component testing**, **accessibility**, **coverage**, **sessions**
* 🐞 **Debugging** tips and **best practices**

Everything you need to build robust, maintainable tests for your MERN-stack application. Happy testing!

---

[<- QA](qa-quick.md)

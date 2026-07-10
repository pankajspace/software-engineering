[<- QA](qa-quick.md)

# Cypress Advanced Concepts with Examples

Here are several **advanced Cypress** topics—each with a concise example to show you how to level up your tests:

## 1. Authentication Caching with `cy.session()`

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

## 2. Node Tasks with `cy.task()`

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

## 3. Component Testing

Mount framework components in isolation (React/Vue/etc).

```js
// cypress/component/Counter.cy.js
import { mount } from 'cypress/react'
import Counter from '../../src/components/Counter'

describe('Counter Component', () => {
  it('increments on button click', () => {
    mount(<Counter />)
    cy.get('button.increment').click()
    cy.get('span.value').should('contain', '1')
  })
})
```

## 4. Code Coverage Integration

Capture coverage with `@cypress/code-coverage`.

```js
// cypress/support/index.js
import '@cypress/code-coverage/support'

// cypress/plugins/index.js
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  return config
}

// then run your tests; coverage report is generated automatically
```

## 5. Network Throttling & Advanced `cy.intercept()`

Simulate slow networks or inspect & modify requests/responses.

```js
it('handles slow API gracefully', () => {
  cy.intercept('/api/data', req => {
    req.on('response', res => {
      res.setDelay(2000)    // simulate 2 s network delay
    })
  }).as('getData')

  cy.visit('/data-page')
  cy.wait('@getData')
  cy.get('.spinner').should('not.exist')
  cy.get('.data-list').should('have.length.at.least', 1)
})
```

## 6. Conditional Testing & Dynamic Assertions

Use function-assertions for non-deterministic states.

```js
cy.get('.notifications').should(($els) => {
  // assert at least one success or warning
  const texts = $els.toArray().map(el => el.innerText)
  expect(texts.some(t => /success|warning/i.test(t))).to.be.true
})
```

## 7. File Uploads & Downloads

Handle `<input type="file">` and verify file system artifacts.

```js
// Upload
cy.get('input[type=file]').attachFile('avatar.png')

// Download (needs fs/plugins support)
cy.get('a.download-report').click()
cy.readFile('cypress/downloads/report.pdf', 'binary').should(buffer => {
  expect(buffer.length).to.be.greaterThan(1000)
})
```

## 8. Parallelization & Test Tagging

Run subsets via [cypress-grep](https://github.com/cypress-io/cypress-grep).

```js
// example: npx cypress run --env grep=@smoke
describe('@smoke Login', () => { … })
describe('Regression Suite', () => { … })
```

## 9. Cross-Origin & Multi-Domain Testing

Enable experimental support for visiting multiple domains.

```js
// cypress.config.js
module.exports = {
  e2e: {
    experimentalSessionAndOrigin: true
  }
}

// in spec
cy.visit('https://app.example.com')
cy.origin('https://auth.example.com', () => {
  cy.get('input#username').type('alice')
  cy.get('button#login').click()
})
cy.url().should('include', 'app.example.com/dashboard')
```

## 10. Environment-Specific Config & Secrets

Use `cypress.env.json`, CI environment variables, or `config.env`.

```js
// cypress.config.js
module.exports = {
  env: {
    API_URL: process.env.API_URL || 'http://localhost:4000'
  }
}

// in test
cy.request(`${Cypress.env('API_URL')}/status`)
  .its('status').should('eq', 200)
```

## 11. Custom Reporters & Dashboard Annotations

Annotate failures or custom logs for Cypress Dashboard.

```js
// in spec
cy.log('🚀 Starting complex flow')
// or use cy.task('log', 'message') in plugins to push to an external system
```

### Conclusion
By combining sessions, tasks, intercepts, and component testing, you can build **fast**, **robust**, and **maintainable** E2E and component suites that integrate seamlessly into CI/CD pipelines.

---

[<- QA](qa-quick.md)

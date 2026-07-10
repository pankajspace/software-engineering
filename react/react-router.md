[<- react-quick](react-quick.md)

# React Router

React Router is a popular library used for client-side routing in React applications. It allows you to navigate between different components/pages without reloading the entire page, keeping the user experience smooth. Let’s go through a detailed example of setting up React Router in a basic app.

## Scenario:
We will build a simple app with three pages:
1. **Home**: A landing page.
2. **About**: A page describing the application.
3. **Contact**: A contact page.

We will set up React Router to navigate between these pages.

## Steps:

### 1. **Install React Router**

First, install the necessary packages for React Router.

```bash
npm install react-router-dom
```

- **`react-router-dom`**: The main package for routing in React applications.

### 2. **Create Basic Components**

We will create three simple components for each page.

```javascript
// Home.js
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
};

export default Home;
```

```javascript
// About.js
import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is a simple application demonstrating React Router.</p>
    </div>
  );
};

export default About;
```

```javascript
// Contact.js
import React from 'react';

const Contact = () => {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>Feel free to contact us at contact@example.com.</p>
    </div>
  );
};

export default Contact;
```

### 3. **Set Up Routing in App.js**

Now we’ll set up the routing in `App.js`. We will use the following components from `react-router-dom`:
- **`BrowserRouter`**: Wraps the app to enable routing.
- **`Routes`**: Contains all the route definitions.
- **`Route`**: Defines the specific paths and the components to render.
- **`Link`**: Provides navigation between routes.

```javascript
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
```

## Explanation:
- **`<Router>` (or `BrowserRouter`)**: This component wraps the entire app and enables client-side routing.
- **`<Link>`**: This component is used to navigate between routes without a full page reload (like an anchor `<a>` tag, but optimized for React Router).
- **`<Routes>`**: This is a wrapper that houses all your defined routes.
- **`<Route>`**: Each route defines a path and the component that should be rendered when that path is matched.

### 4. **Navigating Between Pages**

When you run the app, the links in the navigation bar will change the URL, and React Router will render the appropriate component for each path.

For example:
- Clicking **Home** will take you to `"/"` and render the `Home` component.
- Clicking **About** will take you to `"/about"` and render the `About` component.
- Clicking **Contact** will take you to `"/contact"` and render the `Contact` component.

### 5. **Adding 404 Not Found Page**

To handle cases where a user visits a route that doesn’t exist, you can add a "404 Not Found" page using the wildcard `*` in the `Route`.

```javascript
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
```

## 6. **Nested Routes (Optional)**

React Router also supports **nested routes**. For example, if you want to show sub-pages within the "About" section, you can set it up as follows:

```javascript
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import AboutTeam from './AboutTeam';
import AboutCompany from './AboutCompany';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />}>
            <Route path="team" element={<AboutTeam />} />
            <Route path="company" element={<AboutCompany />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
```

- **Nested Routes**: The `Route` inside the `Route` is an example of nested routes. This allows you to show sub-content within a parent component.

```javascript
// About.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is a simple application demonstrating React Router.</p>
      <ul>
        <li>
          <Link to="team">Our Team</Link>
        </li>
        <li>
          <Link to="company">Our Company</Link>
        </li>
      </ul>
      <Outlet /> {/* This renders the child route component */}
    </div>
  );
};

export default About;
```

- **`<Outlet>`**: A placeholder for rendering the matched child route component inside a parent route.

---

## Summary:
- **`react-router-dom`** is a routing library that allows navigation between different components in a React app without reloading the page.
- Components like `BrowserRouter`, `Routes`, `Route`, `Link`, and `Outlet` help define routes, navigate between them, and handle nested routes.
- You can define dynamic routing and handle edge cases like 404 pages.

This example should give you a solid foundation for using React Router in your applications!

---

[<- react-quick](react-quick.md)

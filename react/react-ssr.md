[<- react-quick](react-quick.md)

# React Server-Side Rendering (SSR) with Examples

React Server-Side Rendering (SSR) is a technique used to render React components on the server and send fully rendered HTML pages to the client. This helps improve performance, especially for initial page loads, and enhances SEO since search engine crawlers can index the content of your pages more easily.

In traditional client-side rendering (CSR), the browser downloads a blank HTML page, fetches JavaScript, and then renders the components on the client side. With SSR, the server generates the HTML content of the page, which the client then receives as fully formed HTML. Once the page is rendered, React takes over, making it interactive on the client side (this process is called "hydration").

## Why Use Server-Side Rendering in React?

1. Improved SEO: SSR generates complete HTML pages, making it easier for search engines to crawl and index the content.
2. Faster Initial Load: SSR can lead to faster Time to First Byte (TTFB) and First Meaningful Paint, especially for content-heavy pages.
3. Better User Experience: Users can see fully rendered content before JavaScript finishes loading, improving the perceived speed of the site.
4. Enhanced Performance on Low-End Devices: Since the initial rendering is done on the server, devices with slower performance won’t struggle to render complex React apps initially.

## How Does React SSR Work?

React doesn’t handle SSR directly but can be integrated with backend frameworks or libraries, like Next.js or Express, to enable SSR. React provides `ReactDOMServer` APIs to render components to HTML on the server.

## Basic Example with React and Express

Let's walk through a simple example of how you can implement SSR with React and Express.

### 1. Setting Up React with Server-Side Rendering

We’ll create a basic React component and render it on the server using Express.

- Install necessary dependencies:

```bash
npm init -y
npm install express react react-dom react-dom/server
```

- Create a simple React component:

```jsx
// src/App.js
import React from 'react';

const App = () => {
  return (
    <div>
      <h1>Hello, Server-Side Rendering with React!</h1>
      <p>This page was rendered on the server.</p>
    </div>
  );
};

export default App;
```

- Set up the Express server to use SSR:

```js
// server.js
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./src/App').default;

const app = express();

app.get('*', (req, res) => {
  const html = ReactDOMServer.renderToString(React.createElement(App));

  const fullHtml = \`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">\${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  \`;

  res.send(fullHtml);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

In the code above:
- `ReactDOMServer.renderToString()`: This method takes a React component and renders it into a string of HTML on the server.
- `App`: This is the root component that we rendered on the server. When a request hits the server, it sends back the fully rendered HTML of this component.

### 2. Client-Side Hydration

Once the HTML is sent to the client, React will "hydrate" the page by making it interactive. Hydration is where React takes the existing static HTML and attaches event listeners to make the app functional.

To enable hydration, you need to bundle your React app with tools like Webpack or Vite and load the JavaScript on the client side. Here's how you can implement hydration:

- Client-side JavaScript:

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Hydrate the App component into the root element
ReactDOM.hydrate(<App />, document.getElementById('root'));
```

- Webpack configuration for bundling:

```bash
npm install webpack webpack-cli webpack-node-externals babel-loader @babel/core @babel/preset-env @babel/preset-react
```

- Basic Webpack configuration:

```js
// webpack.config.js
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  target: 'node',
  externals: [nodeExternals()],
};
```

- Babel configuration:

```js
// .babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Once the Webpack bundle is created, the Express server will serve the `bundle.js` file, and React will hydrate the server-rendered HTML on the client-side to make it interactive.

### 3. Run the Server

To run the server:

```bash
# Build the client-side bundle
npx webpack --config webpack.config.js

# Start the Express server
node server.js
```

Visit `http://localhost:3000`, and you will see the server-rendered HTML content, which React will hydrate on the client side.

## Example with Next.js (React Framework for SSR)

Using Next.js, React SSR becomes much simpler. Next.js is a React framework that provides a complete solution for building server-rendered applications with minimal configuration.

1. Install Next.js:

```bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
```

2. Create Pages with SSR in Next.js:

By default, Next.js pre-renders every page. It can statically generate pages (Static Site Generation, or SSG) or render them at runtime (SSR). Let’s add a simple SSR page:

```jsx
// pages/index.js
import React from 'react';

const Home = ({ data }) => {
  return (
    <div>
      <h1>Server-Side Rendering with Next.js</h1>
      <p>{data.message}</p>
    </div>
  );
};

export async function getServerSideProps() {
  // This function runs on the server, and the returned props are passed to the component
  return {
    props: {
      data: { message: 'This content was fetched on the server.' },
    },
  };
}

export default Home;
```

In this example, `getServerSideProps` is a special Next.js function that runs on the server before rendering the component. This allows you to fetch data or perform operations on the server and pass the results to the component as props.

## Conclusion

Server-side rendering (SSR) in React can improve performance, SEO, and the initial load experience by sending fully-rendered HTML to the client. By using tools like Express, ReactDOMServer, and Next.js, you can easily implement SSR in your React apps.

- ReactDOMServer is a built-in tool to render React components to HTML.
- Hydration is necessary to make the server-rendered HTML interactive once it loads on the client.
- Next.js abstracts the complexity of SSR and provides a simple, opinionated way to build server-rendered React applications with features like routing, data-fetching methods, and more.

---

[<- react-quick](react-quick.md)

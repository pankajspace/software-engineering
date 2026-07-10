[<- Database](database-quick.md)

# GraphQL Main Concepts with Express.js Examples

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. It provides a more efficient, powerful, and flexible alternative to REST by enabling clients to specify the exact shape and structure of the response. Let’s look at the main concepts of GraphQL and how to implement them with Express.js.

---

## 1. Schema

In GraphQL, the schema defines the shape of your API, specifying what queries clients can make and what type of data can be returned.

### Example: Defining a GraphQL Schema in Express.js

```javascript
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define the GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
    user(id: ID!): User
  }
  
  type User {
    id: ID
    name: String
    age: Int
  }
`);

// Define resolvers
const root = {
  hello: () => 'Hello, world!',
  user: ({ id }) => ({ id, name: 'John Doe', age: 28 })
};

// Create an Express app
const app = express();

// Set up the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // Enable GraphiQL UI
}));

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});
```

In this example:
- The schema defines two queries: `hello` (returns a simple string) and `user` (returns a user object with an `id`, `name`, and `age`).
- The resolvers (`root`) provide the logic for fetching the data that the queries expect.

---

## 2. Queries

Queries are how the client asks for data. In GraphQL, you specify exactly what you want to retrieve, reducing over-fetching or under-fetching data.

### Example: Handling a Query in GraphQL

```graphql
{
  hello
  user(id: "1") {
    id
    name
    age
  }
}
```

This query requests two fields:
- `hello` (a simple string)
- `user` with a specific `id`. The response will contain only the fields specified (`id`, `name`, and `age`).

### Example Response:
```json
{
  "data": {
    "hello": "Hello, world!",
    "user": {
      "id": "1",
      "name": "John Doe",
      "age": 28
    }
  }
}
```

---

## 3. Resolvers

Resolvers are the functions responsible for fetching the data for each query in the GraphQL schema.

### Example: Creating Resolvers

```javascript
const root = {
  hello: () => {
    return 'Hello, World!';
  },
  user: ({ id }) => {
    const users = [
      { id: '1', name: 'John Doe', age: 28 },
      { id: '2', name: 'Jane Smith', age: 32 }
    ];
    return users.find(user => user.id === id);
  }
};
```

In this example:
- The `hello` resolver returns a simple string.
- The `user` resolver searches for a user by `id` in a static list and returns the matching user.

---

## 4. Mutations

Mutations are how clients change data (create, update, or delete). Unlike queries, which are read-only, mutations modify the server-side data.

### Example: Defining and Handling a Mutation

Add the mutation to the schema:

```javascript
const schema = buildSchema(`
  type Query {
    hello: String
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int!): User
  }

  type User {
    id: ID
    name: String
    age: Int
  }
`);
```

Add the resolver for the mutation:

```javascript
let users = [];

const root = {
  hello: () => 'Hello, world!',
  user: ({ id }) => users.find(user => user.id === id),
  createUser: ({ name, age }) => {
    const newUser = { id: users.length + 1, name, age };
    users.push(newUser);
    return newUser;
  }
};
```

In this example:
- The `createUser` mutation takes two arguments: `name` and `age`. It creates a new user, adds it to the `users` array, and returns the created user.

### Example Mutation Query:
```graphql
mutation {
  createUser(name: "Alice", age: 30) {
    id
    name
    age
  }
}
```

### Example Response:
```json
{
  "data": {
    "createUser": {
      "id": "1",
      "name": "Alice",
      "age": 30
    }
  }
}
```

---

## 5. Arguments

Arguments allow clients to pass data to queries and mutations. In the schema, you define the argument types for each query or mutation.

### Example: Using Arguments in a Query

```graphql
{
  user(id: "1") {
    name
    age
  }
}
```

In this example, the `user` query takes an `id` argument to fetch a specific user by ID.

---

## 6. Nested Queries

GraphQL allows you to request related data in a single query. For example, a user might have multiple posts, and we can request both the user and their posts in one query.

### Example: Nested Query in GraphQL

Expand the schema:

```javascript
const schema = buildSchema(`
  type Query {
    user(id: ID!): User
  }

  type User {
    id: ID
    name: String
    age: Int
    posts: [Post]
  }

  type Post {
    id: ID
    title: String
    content: String
  }
`);

const root = {
  user: ({ id }) => {
    const users = [
      {
        id: '1',
        name: 'John Doe',
        age: 28,
        posts: [
          { id: '101', title: 'GraphQL Basics', content: 'Introduction to GraphQL' },
          { id: '102', title: 'Advanced GraphQL', content: 'Diving deeper into GraphQL' }
        ]
      }
    ];
    return users.find(user => user.id === id);
  }
};
```

### Example Query:
```graphql
{
  user(id: "1") {
    name
    posts {
      title
      content
    }
  }
}
```

### Example Response:
```json
{
  "data": {
    "user": {
      "name": "John Doe",
      "posts": [
        {
          "title": "GraphQL Basics",
          "content": "Introduction to GraphQL"
        },
        {
          "title": "Advanced GraphQL",
          "content": "Diving deeper into GraphQL"
        }
      ]
    }
  }
}
```

---

## 7. Input Types

When passing complex objects to mutations, you can define Input Types for better structure and reusability.

### Example: Using Input Types in a Mutation

Define an `Input Type` for the user:

```javascript
const schema = buildSchema(`
  type Query {
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User
  }

  input UserInput {
    name: String!
    age: Int!
  }

  type User {
    id: ID
    name: String
    age: Int
  }
`);

const root = {
  createUser: ({ input }) => {
    const newUser = { id: users.length + 1, ...input };
    users.push(newUser);
    return newUser;
  }
};
```

### Example Mutation Query:
```graphql
mutation {
  createUser(input: { name: "Bob", age: 34 }) {
    id
    name
    age
  }
}
```

---

## Conclusion

This guide covers the fundamental concepts of GraphQL and how to implement them with Express.js:
- Schema: Defines the structure of your API.
- Queries: Retrieve data from the API.
- Resolvers: Fetch the actual data for queries.
- Mutations: Modify data in the API.
- Arguments: Allow dynamic data input for queries and mutations.
- Nested Queries: Fetch related data in a single request.
- Input Types: Structure complex input for mutations.

GraphQL’s flexibility and expressive nature make it an excellent alternative to traditional REST APIs. With Express.js, you can easily build a GraphQL server, enabling fine-grained control over the data requested and returned.


# GraphQL with Node.js and React

To build a simple GraphQL API using Node.js and interact with it from a React application, we can use the following tools:

1. Express for building the Node.js server.
2. GraphQL and Apollo Server for defining and serving GraphQL API.
3. Apollo Client for interacting with the GraphQL API in the React app.

## 1. Set up Node.js with Express and GraphQL

First, we will create a simple GraphQL server using `Express` and `Apollo Server`.

### Install dependencies:

```bash
npm init -y
npm install express apollo-server-express graphql
```

### Set up the Node.js server:

Create a file `server.js`:

```js
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Define GraphQL schema using gql
const typeDefs = gql`
  type Query {
    hello: String
    getUser(id: ID!): User
  }

  type User {
    id: ID
    name: String
    email: String
  }
`;

// Resolvers for the queries
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    getUser: (_, { id }) => {
      // Dummy user data
      const users = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
      ];
      return users.find(user => user.id === id);
    },
  },
};

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Initialize Express app
const app = express();

// Apply Apollo middleware to Express
server.start().then(res => {
  server.applyMiddleware({ app });

  // Start server
  app.listen({ port: 4000 }, () =>
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`)
  );
});
```

In this simple setup:
- The `hello` query returns a simple greeting.
- The `getUser` query returns a user based on the `id`.

Run the server using:

```bash
node server.js
```

The server will be available at `http://localhost:4000/graphql`.

## 2. Set up React app with Apollo Client

Next, let's set up the React app that will communicate with this GraphQL server.

### Install dependencies:

```bash
npx create-react-app graphql-react-client
cd graphql-react-client
npm install @apollo/client graphql
```

### Modify the React app:

In the `src` directory, modify the following files.

#### `src/index.js`:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Create Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
```

#### `src/App.js`:

```js
import React from 'react';
import { gql, useQuery } from '@apollo/client';

// Define GraphQL query to fetch data
const HELLO_QUERY = gql`
  query GetHello {
    hello
  }
`;

const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(HELLO_QUERY);
  const { data: userData } = useQuery(GET_USER_QUERY, {
    variables: { id: '1' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data.hello}</h1>
      {userData && (
        <div>
          <h2>User Data:</h2>
          <p>Name: {userData.getUser.name}</p>
          <p>Email: {userData.getUser.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;
```

## Explanation:

1. Apollo Client Setup: 
   In `index.js`, we create an Apollo Client instance pointing to the GraphQL server (`http://localhost:4000/graphql`) and wrap the app with `ApolloProvider` to make the GraphQL client available across the React components.

2. Queries in React: 
   In `App.js`, we use the `useQuery` hook provided by Apollo Client to fetch data from the GraphQL server. We define two queries:
   - The `HELLO_QUERY` fetches the "hello" string.
   - The `GET_USER_QUERY` fetches a user by their ID.

3. Display Data: 
   Once the data is fetched, we render it inside the React component. If the data is still loading, a loading message is shown. If there's an error, the error message is displayed.

## 3. Running the Applications

- Start the GraphQL server:

```bash
node server.js
```

- Run the React app:

```bash
npm start
```

Open your browser at `http://localhost:3000`, and you should see the fetched GraphQL data, including the "hello" message and user details.

This example demonstrates how to set up a simple GraphQL API with Node.js and Apollo Server, and how to consume it using Apollo Client in a React app.

---

[<- Database](database-quick.md)

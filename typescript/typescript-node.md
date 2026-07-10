[<- TypeScript](ts-quick.md)

## TypeScript Node

Using TypeScript with Node.js and Express can improve your development experience by adding strong typing, better IDE support, and more readable code. Here’s a detailed guide on setting up and building a Node.js + Express application with TypeScript.

### Step 1: Setting Up a Node.js Project with TypeScript

#### 1.1 Initialize a New Project

Start by creating a new directory for your project, then initialize a new Node.js project.

```bash
mkdir express-typescript-app
cd express-typescript-app
npm init -y
```

#### 1.2 Install TypeScript and Other Required Packages

Install TypeScript and other dependencies you’ll need for this project.

```bash
npm install typescript ts-node @types/node @types/express --save-dev
npm install express
```

- `typescript`: TypeScript compiler.
- `ts-node`: Allows us to run TypeScript files directly.
- `@types/node`: Type definitions for Node.js.
- `@types/express`: Type definitions for Express.

#### 1.3 Configure TypeScript

Create a `tsconfig.json` file in the root directory:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

- `outDir`: Compiled files output directory.
- `rootDir`: Directory for TypeScript source files.
- `strict`: Enables strict type-checking options.
- `esModuleInterop`: Allows better compatibility with ES6 imports.

### Step 2: Basic Express Server with TypeScript

#### 2.1 Creating the `src` Folder and Basic Server File

Create a folder named `src` and add an `index.ts` file for our Express server:

```bash
mkdir src
touch src/index.ts
```

Inside `src/index.ts`, add the following code:

```typescript
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Here’s a breakdown of this code:
- `app.get('/', ...)`: Defines a basic route.
- `app.listen(PORT, ...)`: Starts the server on the specified port.

#### 2.2 Running the Server

To run the server, you can use `ts-node`:

```bash
npx ts-node src/index.ts
```

Or add a script to `package.json` to make it easier:

```json
"scripts": {
  "start": "ts-node src/index.ts"
}
```

Then run:

```bash
npm start
```

### Step 3: Adding TypeScript Types to Routes and Middleware

Typing the `Request`, `Response`, and `NextFunction` objects can help avoid errors and improve clarity.

#### 3.1 Example of GET Route with Parameters

```typescript
app.get('/user/:id', (req: Request, res: Response) => {
  const userId: string = req.params.id;
  res.send(`User ID: ${userId}`);
});
```

In this example, `req.params.id` is typed as `string`.

#### 3.2 Defining POST Route with Typed Body

You can create an interface for the request body to enforce its structure.

```typescript
interface User {
  name: string;
  age: number;
}

app.post('/user', (req: Request<{}, {}, User>, res: Response) => {
  const { name, age } = req.body;
  res.send(`User created: ${name}, Age: ${age}`);
});
```

Here:
- `Request<{}, {}, User>` tells TypeScript that the body of the request must match the `User` interface.

### Step 4: Organizing Code with Controllers and Routes

Separating routes into their own files helps to organize the code better.

#### 4.1 Creating a User Controller and Route

Create a `src/routes/user.ts` file for the routes:

```typescript
import express, { Request, Response } from 'express';
const router = express.Router();

interface User {
  name: string;
  age: number;
}

router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

router.post('/', (req: Request<{}, {}, User>, res: Response) => {
  const { name, age } = req.body;
  res.send(`User created: ${name}, Age: ${age}`);
});

export default router;
```

In this example:
- `Request<{ id: string }>` ensures that `id` parameter is of type `string`.
- `Request<{}, {}, User>` ensures the body of the request matches the `User` interface.

#### 4.2 Importing the Route in `index.ts`

In `src/index.ts`, import and use the new `user` routes.

```typescript
import userRoutes from './routes/user';

app.use('/user', userRoutes);
```

Now, the `/user` endpoint is defined in its own module.

### Step 5: Adding Middleware with TypeScript

Middleware functions in Express can also benefit from TypeScript.

#### 5.1 Example Middleware Function

Create a logging middleware that logs the request method and URL.

```typescript
import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(loggerMiddleware);
```

In this example:
- The `loggerMiddleware` function logs each incoming request.
- The `next()` function is typed with `NextFunction`, allowing TypeScript to recognize that this function passes control to the next middleware.

### Step 6: Error Handling with TypeScript

You can use TypeScript for centralized error handling.

#### 6.1 Creating an Error Handler

Add a simple error handler that uses TypeScript for type checking:

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).send('Something went wrong!');
});
```

In this example:
- TypeScript checks that `err` is an instance of `Error`.

### Step 7: Compiling and Running the Project

Now that we have multiple files and TypeScript code, let’s compile it into JavaScript for production.

#### 7.1 Build and Run

Add a `build` script to `package.json` to compile TypeScript:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js"
}
```

Then run:

```bash
npm run build
npm start
```

This will compile the TypeScript code to JavaScript in the `dist` folder and run the built application.

### Full Project Structure

After following these steps, your project should look something like this:

```
express-typescript-app/
├── dist/              # Compiled JavaScript files (after running build)
├── node_modules/
├── src/               # TypeScript source files
│   ├── index.ts       # Entry point of the application
│   ├── routes/
│   │   └── user.ts    # User route
├── package.json
├── tsconfig.json
└── ...
```

### Summary

This guide covers the following:

1. **Setting up TypeScript**: Configuring `tsconfig.json` and initializing the project.
2. **Basic Express Server**: Setting up an Express server with TypeScript.
3. **Type Safety in Routes**: Typing `Request`, `Response`, and using interfaces.
4. **Organizing Code**: Creating modular routes and controllers.
5. **Middleware and Error Handling**: Adding middleware and error handling with TypeScript.

This structure is a great starting point for developing scalable, type-safe applications using Node.js, Express, and TypeScript. Let me know if you’d like more examples on specific features like connecting to a database or handling more complex route structures!

---

[<- TypeScript](ts-quick.md)

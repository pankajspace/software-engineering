[<- react-quick](react-quick.md)

# React Redux

To understand how to use Redux with React, along with `redux-thunk` middleware for handling asynchronous actions, I’ll walk you through a detailed example. This example covers setting up Redux, integrating Thunk for async logic, and connecting everything to a React component.

## Scenario:
Imagine you're building a simple app that fetches a list of posts from an API. The app will:
1. Dispatch an action to initiate a request.
2. Make an API call using Thunk.
3. Store the result in Redux state.
4. Display the posts in a React component.

## Steps:

### 1. **Install Dependencies**

```bash
npm install redux react-redux redux-thunk axios
```

- **`redux`**: State management library.
- **`react-redux`**: Connects React with Redux.
- **`redux-thunk`**: Middleware for handling async logic.
- **`axios`**: For making HTTP requests (you can use `fetch` if preferred).

### 2. **Setting up Redux store**

First, you need to create the Redux store and set up `redux-thunk` middleware.

```javascript
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // assuming you have a root reducer

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
```

### 3. **Action Creators with Thunk**

Thunk allows you to return a function inside your action creator instead of just an object. This function gets access to `dispatch` and can perform async operations.

```javascript
// actions/postsActions.js
import axios from 'axios';

// Action types
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

// Action creators
export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

// Async action creator with thunk
export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostsRequest()); // Dispatch request action
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        const posts = response.data;
        dispatch(fetchPostsSuccess(posts)); // Dispatch success action with data
      })
      .catch((error) => {
        dispatch(fetchPostsFailure(error.message)); // Dispatch failure action with error
      });
  };
};
```

### 4. **Reducers**

Reducers handle the state changes based on the dispatched actions.

```javascript
// reducers/postsReducer.js
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '../actions/postsActions';

const initialState = {
  loading: false,
  posts: [],
  error: '',
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: '',
      };
    case FETCH_POSTS_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
```

### 5. **Combining Reducers**

You need to combine the reducer in case you have multiple reducers.

```javascript
// reducers/index.js
import { combineReducers } from 'redux';
import postsReducer from './postsReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
});

export default rootReducer;
```

### 6. **React Component to Display Data**

Now that Redux is set up, let’s connect a React component to display the posts. We use `useDispatch` to dispatch actions and `useSelector` to access the state from the store.

```javascript
// components/PostsList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../actions/postsActions';

const PostsList = () => {
  const dispatch = useDispatch();
  
  // Access state from Redux store
  const { loading, posts, error } = useSelector((state) => state.posts);

  // Fetch posts when component mounts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
```

### 7. **App Component**

Finally, set up the app by providing the Redux store to the React component tree using `Provider`.

```javascript
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import PostsList from './components/PostsList';

const App = () => (
  <Provider store={store}>
    <div>
      <PostsList />
    </div>
  </Provider>
);

export default App;
```

### 8. **Run the App**

Now you can run the app and see the list of posts fetched from the API.

```bash
npm start
```

## Summary of the flow:
1. **Action**: `fetchPosts` is an action creator that dispatches multiple actions (`FETCH_POSTS_REQUEST`, `FETCH_POSTS_SUCCESS`, and `FETCH_POSTS_FAILURE`) depending on the API response.
2. **Reducer**: `postsReducer` updates the state based on the dispatched actions.
3. **Component**: `PostsList` uses `useSelector` to access Redux state and `useDispatch` to dispatch the `fetchPosts` action.

This setup allows your React app to handle async logic like API calls while keeping the state management clean and predictable with Redux and Thunk.

---

# Redux Custom Middleware

Creating custom middleware in Redux allows you to intercept actions before they reach the reducer, modify them, log them, or handle side effects. Middleware in Redux is a higher-order function that wraps around `dispatch` and `getState` to perform additional tasks.

Here’s how you can create and apply custom middleware in Redux:

## Steps to Create Custom Middleware

1. **Create the Middleware Function:**
   A middleware is a function that returns a function which takes `next`, the next middleware or the reducer, and then returns another function that receives the `action`.

   Middleware signature:
   ```js
   const myMiddleware = store => next => action => {
     // Your custom logic goes here
     return next(action); // Pass the action to the next middleware or reducer
   };
   ```

2. **Apply the Middleware:**
   After creating the middleware, you can apply it using `applyMiddleware` from Redux.

## Example of a Custom Logging Middleware

This middleware logs every action and the current state before and after the action is dispatched.

### 1. Creating the Middleware
```js
const loggerMiddleware = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action); // Pass the action to the next middleware or reducer
  console.log('Next state:', store.getState());
  return result; // Return the result of the next dispatch (usually the action)
};
```

### 2. Applying the Middleware

Use `applyMiddleware` from Redux to add your custom middleware.

```js
import { createStore, applyMiddleware } from 'redux';

// Example reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: (state.count || 0) + 1 };
    default:
      return state;
  }
};

// Apply middleware
const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware)
);

// Dispatch an action to see the logger in action
store.dispatch({ type: 'INCREMENT' });
```

### 3. Output:
When the `INCREMENT` action is dispatched, the logger middleware will output:

```bash
Dispatching: { type: 'INCREMENT' }
Next state: { count: 1 }
```

## Another Example: Blocking Specific Actions

You can create middleware to block specific actions. For instance, this middleware blocks actions with a certain type (e.g., "BLOCKED_ACTION").

```js
const blockActionMiddleware = store => next => action => {
  if (action.type === 'BLOCKED_ACTION') {
    console.warn('Action blocked:', action);
    return; // Do not dispatch the action
  }

  return next(action); // Pass the action to the next middleware or reducer
};

// Apply middleware
const store = createStore(
  reducer,
  applyMiddleware(blockActionMiddleware)
);

// Dispatching blocked action
store.dispatch({ type: 'BLOCKED_ACTION' }); // Will be blocked
```

## Timeout Middleware Example

This middleware dispatches actions only after a specified delay. It can be useful for debouncing user actions, delaying an action, or setting up a scheduled task.

```js
const timeoutMiddleware = store => next => action => {
  if (!action.meta || !action.meta.delay) {
    return next(action); // No delay, pass the action to the next middleware/reducer
  }

  const { delay } = action.meta;

  setTimeout(() => {
    next(action); // Dispatch the action after the specified delay
  }, delay);
};

const delayedAction = {
  type: 'SHOW_NOTIFICATION',
  payload: 'You have a new message!',
  meta: { delay: 3000 } // Delay for 3 seconds
};
```

## Applying Multiple Middleware

You can combine multiple middleware by passing them all into `applyMiddleware`. Redux ensures that they are executed in order.

```js
const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, blockActionMiddleware, timeoutMiddleware)
);
```

## How It Works:
1. Middleware wraps the store's `dispatch` function, allowing you to intercept actions.
2. `next(action)` sends the action to the next middleware or the reducer if there are no more middlewares.
3. Middleware can modify actions, perform side effects like logging or API calls, or block actions altogether.

This flexibility is one of the main reasons Redux is so powerful in handling complex logic and side effects.

---

[<- react-quick](react-quick.md)

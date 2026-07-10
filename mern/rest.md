[<- MERN](mern-quick.md)


# REST API Main Concepts

Representational State Transfer (REST) is an architectural style for designing networked applications, particularly web services. REST APIs allow different systems to communicate using HTTP, with operations typically mapped to the familiar HTTP methods: GET, POST, PUT, DELETE, etc. Below are the main concepts behind REST APIs, along with explanations and examples.

---

## 1. Resource

A resource in REST is any piece of information or object that can be accessed through a unique URL (Uniform Resource Locator). Resources could be users, products, orders, or any object in your application.

### Example:
For a REST API that manages users, a user can be a resource with the URL `/users`.

- `GET /users` - Fetch a list of users.
- `GET /users/1` - Fetch a single user with the ID `1`.
- `POST /users` - Create a new user.
- `PUT /users/1` - Update the details of user with ID `1`.
- `DELETE /users/1` - Delete the user with ID `1`.

---

## 2. HTTP Methods

REST APIs rely heavily on HTTP methods to determine the type of operation that will be performed on the resource. The main HTTP methods used in REST are:

- GET: Retrieve a resource or collection of resources.
- POST: Create a new resource.
- PUT: Update an existing resource, or create a new resource if it doesn’t exist.
- PATCH: Partially update an existing resource.
- DELETE: Remove a resource.

### Example:

For the `/users` resource, the HTTP methods could be mapped as follows:

- `GET /users` - Retrieve a list of all users.
- `POST /users` - Create a new user.
- `GET /users/{id}` - Retrieve details of a specific user.
- `PUT /users/{id}` - Update a specific user's details.
- `DELETE /users/{id}` - Delete a specific user.

---

## 3. Statelessness

REST APIs are stateless, meaning each request from a client must contain all the necessary information for the server to understand and process the request. The server does not store the state of the client between requests. Each request is independent of previous requests.

### Example:

If a client sends a `GET /users/1` request to fetch user data, the server does not remember previous interactions or store session data. All necessary authentication, for example, must be included in the request, such as through headers (like a token or API key).

---

## 4. Uniform Interface

A uniform interface between components is a key principle of REST. It simplifies the architecture and improves decoupling. It means that all resources should be exposed in a consistent manner with standardized URIs and methods.

### Example:

The URI structure should follow a predictable pattern. For example:

- `/users` for user-related operations.
- `/orders` for order-related operations.
- `/products` for product-related operations.

Each URI is a representation of a resource, and the API adheres to the same set of HTTP methods for all resources.

---

## 5. Stateless Communication

Each request made to the API must contain all the information necessary to process the request. There is no need for the server to remember previous interactions with the client. This makes REST scalable and allows servers to handle requests more efficiently.

---

## 6. CRUD Operations

CRUD (Create, Read, Update, Delete) is a fundamental concept in REST that maps to HTTP methods. Each operation corresponds to manipulating a resource.

- Create → `POST`
- Read → `GET`
- Update → `PUT` or `PATCH`
- Delete → `DELETE`

### Example:

For a resource like `users`, these operations would look like this:
- `POST /users` → Create a new user.
- `GET /users` → Retrieve a list of users.
- `GET /users/1` → Retrieve details of a specific user.
- `PUT /users/1` → Update the user with ID `1`.
- `DELETE /users/1` → Delete the user with ID `1`.

---

## 7. JSON as a Standard Data Format

Most REST APIs use JSON (JavaScript Object Notation) as the data format for requests and responses because it is lightweight and easy to parse. JSON is typically used when sending data to the server in `POST` or `PUT` requests and when receiving data in `GET` responses.

### Example:

Request (POST):
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

Response (GET):
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## 8. URI (Uniform Resource Identifier)

A URI is the unique address of a resource. It should follow a logical and hierarchical structure that makes sense for the resources being accessed.

### Example:

- `/users`: To fetch or manage users.
- `/users/1`: To fetch or manage a specific user with ID `1`.
- `/orders`: To fetch or manage orders.

---

## 9. Versioning

APIs should be versioned to allow improvements or changes to be made without breaking existing clients that depend on the API.

### Example:

You can version an API by including the version number in the URL.

```bash
GET /api/v1/users
```

This indicates version 1 (`v1`) of the API.

---

## 10. Hypermedia as the Engine of Application State (HATEOAS)

HATEOAS is a concept that extends REST. It means that the server responses should include links to related resources, allowing the client to navigate the API dynamically.

### Example:

A response from a `GET /users/1` request could include links to other related resources:

```json
{
  "id": 1,
  "name": "John Doe",
  "links": {
    "self": "/users/1",
    "orders": "/users/1/orders"
  }
}
```

The client can follow the `orders` link to fetch the user's orders.

---

## 11. Idempotency

In REST APIs, certain operations (e.g., `PUT`, `DELETE`, `GET`) are idempotent, meaning that no matter how many times the same request is repeated, the outcome will be the same.

### Example:

- `PUT /users/1`: Updating a user multiple times with the same data will result in the same state.
- `DELETE /users/1`: Deleting the same user multiple times will still return the same result (i.e., the user is gone).

---

## 12. Pagination

When fetching large datasets, it's common to use pagination to limit the number of results returned. Pagination helps to improve performance and avoid overwhelming the client with too much data at once.

### Example:

A typical paginated request might look like:

```bash
GET /users?page=2&limit=10
```

This retrieves the second page of users, with 10 users per page.

---

## 13. Caching

Caching allows frequently requested data to be stored temporarily to improve performance and reduce server load. In REST APIs, caching is typically controlled using HTTP headers like `Cache-Control` and `ETag`.

### Example:

```bash
Cache-Control: max-age=3600
```

This tells the client to cache the response for 1 hour (3600 seconds).

---

## Conclusion

REST APIs are designed to be simple, scalable, and flexible by leveraging the underlying capabilities of HTTP. By adhering to REST principles like statelessness, uniform resource identification, and standard HTTP methods, you can design APIs that are easy to use and maintain. REST APIs typically use JSON as a data format and include features like versioning, pagination, and caching to improve usability and performance.

---

[<- MERN](mern-quick.md)

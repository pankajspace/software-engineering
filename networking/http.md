[<-- Networking](networking-quick.md)

## HTTP (Hypertext Transfer Protocol)

### **HTTP (Hypertext Transfer Protocol) in Detail**

**HTTP (Hypertext Transfer Protocol)** is the primary protocol used for communication between web clients (e.g., browsers) and servers. It defines how requests are sent from a client to a server and how the server responds with data like web pages, images, or videos. HTTP is a **stateless** and **application-layer protocol**, operating over the **TCP/IP** network stack.

---

### **Key Features of HTTP**

1. **Client-Server Architecture**:
   - HTTP operates on a **client-server model**.
   - The **client** (e.g., browser) initiates a request.
   - The **server** processes the request and sends back a response.

2. **Stateless Protocol**:
   - HTTP does not retain any information about previous requests. Each request is treated independently.
   - To maintain user sessions, mechanisms like cookies, sessions, or tokens are used.

3. **Layer in the Network Stack**:
   - HTTP operates at the **Application Layer** of the OSI model.
   - It relies on lower layers like TCP (Transport Layer) for reliable data delivery.

4. **Port Number**:
   - HTTP uses port **80** by default for communication.

5. **Text-Based Protocol**:
   - HTTP messages are human-readable and easy to debug.

---

### **How HTTP Works**

The HTTP communication process involves the following steps:

1. **Client Request**:
   - A user types a URL (e.g., `http://example.com`) in a browser or application.
   - The browser parses the URL to determine the domain (`example.com`) and the resource path (`/`).

2. **DNS Resolution**:
   - The browser queries the DNS server to resolve the domain (`example.com`) into an IP address.

3. **TCP Connection**:
   - The browser establishes a TCP connection with the server at the resolved IP address (port 80).

4. **HTTP Request**:
   - The browser sends an HTTP request to the server.

5. **Server Response**:
   - The server processes the request and sends an HTTP response containing the requested data (e.g., HTML page).

6. **Rendering**:
   - The browser renders the received data (e.g., displays the webpage).

---

### **Structure of an HTTP Request**

An HTTP request has three main parts:

1. **Request Line**:
   - Contains the HTTP method, the resource path, and the HTTP version.
   - Example:
     ```
     GET /index.html HTTP/1.1
     ```

2. **Headers**:
   - Provide additional information about the request in key-value pairs.
   - Example:
     ```
     Host: www.example.com
     User-Agent: Mozilla/5.0
     Accept: text/html
     ```

3. **Body** (Optional):
   - Used in methods like `POST` and `PUT` to send data to the server.
   - Example:
     ```
     username=admin&password=1234
     ```

---

### **Structure of an HTTP Response**

An HTTP response also has three main parts:

1. **Status Line**:
   - Contains the HTTP version, status code, and a reason phrase.
   - Example:
     ```
     HTTP/1.1 200 OK
     ```

2. **Headers**:
   - Provide metadata about the response.
   - Example:
     ```
     Content-Type: text/html
     Content-Length: 1234
     ```

3. **Body** (Optional):
   - Contains the actual data being sent back (e.g., an HTML page, image, or JSON).
   - Example:
     ```
     <html>
       <body>Welcome to Example!</body>
     </html>
     ```

---

### **HTTP Methods**

HTTP defines a set of methods that specify the action to be performed on a resource. The most common methods are:

| **Method**  | **Description**                                           | **Use Case**                     |
| ----------- | --------------------------------------------------------- | -------------------------------- |
| **GET**     | Requests data from the server.                            | Fetching a webpage or image.     |
| **POST**    | Sends data to the server to create a resource.            | Submitting a form.               |
| **PUT**     | Updates or replaces a resource on the server.             | Updating user profile info.      |
| **DELETE**  | Deletes a resource from the server.                       | Removing a file or record.       |
| **HEAD**    | Similar to GET, but only retrieves headers, not the body. | Checking metadata of a resource. |
| **OPTIONS** | Describes the communication options available.            | Checking allowed HTTP methods.   |
| **PATCH**   | Partially updates a resource.                             | Modifying a single field.        |

---

### **HTTP Status Codes**

HTTP status codes indicate the result of the request. They are grouped into five categories:

1. **1xx: Informational**  
   - The request is being processed.  
   - Example: `100 Continue`

2. **2xx: Success**  
   - The request was successfully processed.  
   - Example: `200 OK`, `201 Created`

3. **3xx: Redirection**  
   - Further action is needed to complete the request.  
   - Example: `301 Moved Permanently`, `304 Not Modified`

4. **4xx: Client Errors**  
   - The request is invalid or cannot be fulfilled.  
   - Example: `400 Bad Request`, `404 Not Found`

5. **5xx: Server Errors**  
   - The server failed to process a valid request.  
   - Example: `500 Internal Server Error`, `503 Service Unavailable`

---

### **HTTP Versions**

1. **HTTP/1.0**:
   - Introduced in 1996.
   - Each request requires a new TCP connection.
   - Limited performance.

2. **HTTP/1.1**:
   - Introduced in 1997.
   - Supports **persistent connections** (reuse of the same connection for multiple requests).
   - Chunked transfer encoding and caching enhancements.

3. **HTTP/2**:
   - Introduced in 2015.
   - Binary protocol (faster than text-based HTTP/1.x).
   - Supports **multiplexing** (multiple requests over a single connection).

4. **HTTP/3**:
   - Introduced in 2020.
   - Uses **QUIC** (UDP-based protocol) instead of TCP.
   - Reduces latency and improves performance.

---

### **Statelessness of HTTP**

HTTP does not maintain information about past requests. For example, if a user logs into a website, the server won't remember the login in subsequent requests. To handle state, developers use:

1. **Cookies**:
   - Small pieces of data stored on the client and sent with every request.

2. **Sessions**:
   - Server-side storage of user-specific data.

3. **Tokens**:
   - Stateless authentication using tokens like **JWT (JSON Web Token)**.

---

### **HTTP Headers**

Headers provide metadata about the request or response.

#### **Common Request Headers**:
- **Host**: Specifies the domain name (`Host: www.example.com`).
- **User-Agent**: Identifies the client software (`User-Agent: Mozilla/5.0`).
- **Accept**: Specifies acceptable response types (`Accept: text/html`).

#### **Common Response Headers**:
- **Content-Type**: Indicates the type of content (`Content-Type: text/html`).
- **Content-Length**: Specifies the size of the response body (`Content-Length: 1234`).
- **Set-Cookie**: Sets cookies on the client (`Set-Cookie: sessionid=abc123`).

---

### **HTTP Caching**

Caching improves performance by storing responses for future use.

1. **Browser Cache**:
   - Saves resources locally for reuse.

2. **Cache-Control Header**:
   - Controls caching behavior.
   - Example: `Cache-Control: max-age=3600`

3. **ETag (Entity Tag)**:
   - Identifies resource versions for efficient revalidation.

---

### **Limitations of HTTP**

1. **No Security**:
   - HTTP sends data in plaintext, making it vulnerable to interception.

2. **Statelessness**:
   - Requires additional mechanisms for session management.

3. **Performance**:
   - HTTP/1.0 and HTTP/1.1 suffer from latency due to connection handling.

---

### **HTTP vs HTTPS**

| **Aspect**      | **HTTP**                         | **HTTPS**                                      |
| --------------- | -------------------------------- | ---------------------------------------------- |
| **Security**    | No encryption.                   | Encrypted using SSL/TLS.                       |
| **Port**        | Uses port 80.                    | Uses port 443.                                 |
| **Trust**       | No authentication.               | Server authenticity verified via certificates. |
| **Performance** | Faster (no encryption overhead). | Slightly slower due to encryption.             |

---

### **Real-World Analogy**

- **HTTP**: Like sending a postcard. Anyone can read the message while it’s in transit.
- **HTTPS**: Like sending a sealed letter. Only the intended recipient can read it.

---

### **Conclusion**

HTTP is the backbone of the web, facilitating the exchange of data between clients and servers. While it is simple and flexible, its limitations in security and state management have led to the widespread adoption of **HTTPS** for modern web applications.

---

[<-- Networking](networking-quick.md)

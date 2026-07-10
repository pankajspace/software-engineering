[<-- Networking](networking-quick.md)

## WebSocket

### **WebSockets in Detail**

**WebSockets** is a communication protocol that provides full-duplex (two-way) communication over a single TCP connection. It enables real-time, interactive communication between a client (e.g., web browser) and a server, making it ideal for applications requiring instant updates like chat systems, gaming, or live data feeds.

---

### **Why Use WebSockets?**

1. **Real-Time Communication**:
   - WebSockets allow for continuous two-way communication, reducing latency compared to traditional HTTP request/response models.

2. **Efficient Resource Usage**:
   - Unlike HTTP polling or long-polling, WebSockets maintain a single open connection, avoiding repetitive requests.

3. **Low Latency**:
   - Messages are pushed instantly between client and server without the need for frequent re-connections.

4. **Bidirectional Communication**:
   - Both the client and server can send data independently at any time.

---

### **How WebSockets Work**

WebSockets start with an HTTP request and then "upgrade" the connection to the WebSocket protocol. This is called the **WebSocket handshake**.

#### **Steps**:
1. **Handshake**:
   - The client sends an HTTP request with a `Connection: Upgrade` header to indicate a request to switch to WebSocket protocol.
   - The server responds with a status code `101 Switching Protocols` to confirm the upgrade.

2. **Connection Establishment**:
   - A TCP connection is established, and the protocol switches from HTTP to WebSocket.

3. **Full-Duplex Communication**:
   - Both client and server can now send messages simultaneously over the open WebSocket connection.

**Example**:
```
Client: GET /chat HTTP/1.1
        Host: example.com
        Upgrade: websocket
        Connection: Upgrade
        Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
        Sec-WebSocket-Version: 13

Server: HTTP/1.1 101 Switching Protocols
        Upgrade: websocket
        Connection: Upgrade
        Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
```

---

### **WebSocket Features**

1. **Persistent Connection**:
   - Once established, the connection remains open, eliminating the need to create new connections for every message.

2. **Low Overhead**:
   - Minimal headers and lightweight message framing reduce data size.

3. **Binary and Text Data**:
   - WebSockets support both text (UTF-8) and binary data.

4. **Real-Time Messaging**:
   - Suitable for time-sensitive applications like live chats or stock tickers.

---

### **WebSocket API**

Web browsers provide a native WebSocket API, making it simple to create WebSocket connections.

#### **Creating a WebSocket Connection**

```javascript
// Initialize WebSocket connection
const socket = new WebSocket('ws://example.com/socket');

// Listen for connection open
socket.onopen = function(event) {
  console.log('WebSocket is open now.');
  socket.send('Hello, Server!');
};

// Listen for messages from the server
socket.onmessage = function(event) {
  console.log('Message from server:', event.data);
};

// Listen for connection close
socket.onclose = function(event) {
  console.log('WebSocket is closed now.');
};

// Listen for errors
socket.onerror = function(error) {
  console.log('WebSocket error:', error);
};
```

---

### **Comparison Between WebSockets and HTTP**

| **Aspect**          | **HTTP**                              | **WebSockets**               |
| ------------------- | ------------------------------------- | ---------------------------- |
| **Connection Type** | Request-response (unidirectional)     | Full-duplex (bidirectional)  |
| **Persistence**     | New connection for each request       | Single persistent connection |
| **Efficiency**      | Higher overhead (headers per request) | Lower overhead               |
| **Latency**         | Higher latency                        | Low latency                  |
| **Use Case**        | Static content delivery               | Real-time communication      |

---

### **WebSocket Protocol**

The WebSocket protocol operates over TCP and defines:
1. **Frame Structure**:
   - **Opcode**: Indicates the type of data (e.g., text, binary, close frame).
   - **Payload Length**: Specifies the size of the data.
   - **Payload Data**: Contains the actual message.

2. **Control Frames**:
   - Close (`opcode = 8`): Terminates the connection.
   - Ping (`opcode = 9`): Sent to check if the connection is alive.
   - Pong (`opcode = 10`): Response to a ping.

---

### **WebSocket Use Cases**

1. **Chat Applications**:
   - Real-time messaging between users.

2. **Live Data Feeds**:
   - Stock market updates or sports scores.

3. **Online Gaming**:
   - Instant updates between players.

4. **IoT (Internet of Things)**:
   - Real-time device communication.

5. **Collaborative Tools**:
   - Collaborative document editing or whiteboarding.

---

### **Advantages of WebSockets**

1. **Low Latency**:
   - Instant updates with no repeated handshake overhead.

2. **Resource Efficiency**:
   - A single connection serves multiple messages.

3. **Bidirectional Communication**:
   - Both client and server can send data without waiting for the other.

4. **Cross-Platform Support**:
   - Supported by most modern browsers and programming frameworks.

---

### **Challenges of WebSockets**

1. **Complexity**:
   - Requires more effort to implement than standard HTTP requests.

2. **Firewall Issues**:
   - WebSocket connections can be blocked by strict firewalls or proxies.

3. **Scalability**:
   - Maintaining persistent connections for a large number of users can consume significant resources.

---

### **WebSocket vs Long Polling**

**Long Polling** is a technique used before WebSockets became widely available.

| **Aspect**     | **Long Polling**                            | **WebSockets**         |
| -------------- | ------------------------------------------- | ---------------------- |
| **Connection** | Repeated connections                        | Persistent connection  |
| **Latency**    | Higher due to reconnects                    | Low latency            |
| **Overhead**   | High (frequent HTTP headers)                | Low (minimal headers)  |
| **Use Case**   | Legacy systems or limited WebSocket support | Real-time applications |

---

### **Security in WebSockets**

1. **Secure WebSockets (WSS)**:
   - Use `wss://` (WebSocket Secure) to encrypt communication using TLS/SSL.

2. **Authentication**:
   - Use tokens (e.g., JWT) to authenticate clients before establishing connections.

3. **Rate Limiting**:
   - Protect servers from abuse by limiting the number of connections per client.

4. **Cross-Origin Communication**:
   - Implement strict origin checks to prevent unauthorized access.

---

### **WebSocket Alternatives**

1. **Server-Sent Events (SSE)**:
   - One-way communication (server to client).
   - Simpler to implement for applications requiring only server-side updates.

2. **Long Polling**:
   - Emulates real-time updates by frequently polling the server.

3. **HTTP/2**:
   - Provides multiplexing but is less efficient for full-duplex communication compared to WebSockets.

---

### **Real-World Analogy**

Think of WebSockets like a **telephone call**:
- Once the call (connection) is established, both parties can talk (send messages) at any time.
- Compared to **HTTP**, which is like sending letters: each message requires a new envelope (connection).

---

### **Conclusion**

WebSockets are a powerful tool for building real-time, interactive applications. They offer low-latency, efficient communication, making them essential for modern web applications that require instant updates. However, their implementation requires careful consideration of scalability, security, and browser support.

---

[<-- Networking](networking-quick.md)

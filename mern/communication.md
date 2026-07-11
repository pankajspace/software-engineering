[<- MERN](mern-quick.md)

# Communication Techniques
1. Short Polling
2. Long Polling
3. WebSockets
4. Server-Sent Events
5. Webhooks
6. WebRTC

## Short Polling
- Client sends a request to the server at regular intervals.
- Server responds with the latest data.
- Client updates the UI with the new data.
- Example: `axios` in JavaScript.

## Long Polling
- Client sends a request to the server.
- Server holds the request until new data is available.
- Server responds with the new data.
- Client sends a new request.
- Example: `axios` in JavaScript.

## WebSockets
- Full-duplex communication.
- Client and server can send messages to each other at any time.
- Example: `socket.io` in JavaScript.

## Server-Sent Events
- Server sends events to the client.
- Client listens to the events.
- Example: `EventSource` in JavaScript.

## Webhooks
- Server sends a POST request to the client.
- Client listens to the POST request.
- Example: GitHub Webhooks.

## WebRTC
- Real-time communication between browsers.
- Example: Video chat.

# API Protocols

## REST (Representational State Transfer)
- An architectural style for designing networked applications.
- It emphasizes stateless communication, the use of standard HTTP methods (GET, POST, PUT, DELETE), and resources identified by URLs.

## GraphQL
- A query language for APIs that allows clients to request exactly the data they need, nothing more and nothing less.
- This efficiency is a major advantage over REST, where endpoints often return fixed data structures.

## SOAP (Simple Object Access Protocol)
- A protocol for exchanging structured information in the form of XML messages over a network.

## gRPC (Google Remote Procedure Call)
- A high-performance, open-source framework for remote procedure calls (RPCs).
- It uses Protocol Buffers (a compact binary format) for data serialization.

## Webhooks
- A mechanism for real-time communication between applications.
- A webhook is essentially an HTTP callback triggered by a specific event in one system, which sends a notification to another system.

## WebSockets
- A protocol providing full-duplex communication channels over a single TCP connection.
- WebSockets enable real-time data exchange between a client and a server.

## MQTT (Message Queuing Telemetry Transport)
- A lightweight publish-subscribe messaging protocol designed for low-bandwidth, high-latency, or unreliable networks.
- It is commonly used in IoT (Internet of Things) applications.

## AMQP (Advanced Message Queuing Protocol)
- An open standard protocol for message-oriented middleware.
- AMQP provides features like reliable message delivery, routing, and queuing, making it suitable for enterprise integration scenarios.

## EDA (Event-Driven Architecture)
- A software architecture pattern where applications react to events (e.g., user actions, sensor readings).
- EDA promotes loose coupling and scalability.

## EDI (Electronic Data Interchange)
- A set of standards for exchanging business documents (e.g., purchase orders, invoices) electronically between organizations.
- EDI is widely used in supply chain management and logistics.

## SSE (Server-Sent Events)
- A server-push technology that allows a server to send updates to a client over an HTTP connection in a unidirectional manner.

## API Protocols Diagram
![API Protocols](images/api.png)

---

[<- MERN](mern-quick.md)

[<-- Networking](networking-quick.md)

For web development and cloud deployment, you don't need to know the physics of fiber optic cables or the intricacies of BGP routing. You only need to understand the layers that control how a user's browser talks to your application and how your infrastructure components talk to each other.

Here is the focused subset of networking that actually matters for building and deploying applications.

## 1. The Application Layer (Browser to Edge)

This is the public-facing side of networking that dictates how users reach your app.

* **DNS (Domain Name System):** The internet's phonebook. You need to know how to map a domain to your infrastructure (like using AWS Route 53).
* **A Record:** Points a domain directly to an IPv4 address.
* **CNAME Record:** Points a domain to another domain name (useful for subdomains).
* **ALIAS Record:** Cloud-specific (often used to point a root domain directly to a Load Balancer or CDN, which dynamically changes IPs).


* **HTTP/HTTPS & Headers:** Beyond GET and POST, understand how headers control caching and security.
* **CORS (Cross-Origin Resource Sharing):** Essential when your React frontend and Node.js backend are on different domains. Understand that the browser sends an `OPTIONS` (preflight) request to check permissions before sending the actual `POST`/`PUT` request.
* **WebSockets:** For real-time, persistent bidirectional communication where standard HTTP request/response cycles are too slow.

## 2. Cloud Infrastructure (The VPC Environment)

When deploying to the cloud, you construct a virtual network to house your resources. Understanding this topology is critical for security and architecture.

* **VPC (Virtual Private Cloud):** Your logically isolated section of the cloud. It's the overarching container for your network.
* **Subnets:** Subdivisions of your VPC.
* **Public Subnets:** Have a direct route to an Internet Gateway (IGW). This is where you place resources that must be reachable from the internet, like Load Balancers or bastion hosts.
* **Private Subnets:** Have no direct inbound internet access. This is the secure zone for your application servers (e.g., EC2 instances running Node.js) and databases (e.g., MongoDB).


* **NAT Gateway:** Placed in a public subnet, it allows instances in a private subnet to initiate outbound traffic (like downloading a security patch or npm package) while blocking inbound traffic from the outside world.

## 3. Security and Traffic Control

Cloud networking uses virtual firewalls to control who can talk to what.

* **Security Groups:** Act as stateful firewalls at the instance level. If you allow an incoming request on port 443 (HTTPS), the outgoing response is automatically allowed.
* **NACLs (Network Access Control Lists):** Act as stateless firewalls at the subnet level. You must explicitly open both inbound and outbound ports.
* **TLS/SSL Termination:** Instead of configuring SSL certificates on every single application server, the certificate is usually placed on a Load Balancer. The Load Balancer decrypts the secure traffic and sends it to the backend instances over standard HTTP, saving CPU cycles on the app servers.

## 4. Load Balancing and Delivery

As applications scale, you need to route traffic efficiently across multiple servers or containers.

| Concept | What It Does | Common Use Case |
| --- | --- | --- |
| **Application Load Balancer (ALB)** | Routes traffic based on HTTP/HTTPS data (like URL paths or headers). | Sending `/api` traffic to Node.js and `/app` traffic to React. |
| **Network Load Balancer (NLB)** | Routes traffic at the TCP/UDP level based purely on IP and port. | Ultra-low latency requirements or non-HTTP traffic. |
| **CDN (Content Delivery Network)** | Caches static assets globally at edge locations. | Serving React bundles or images so users pull from a local node. |
| **Reverse Proxy** | Sits in front of web servers to handle routing, caching, and compression. | Using Nginx to route traffic to specific Docker containers. |

## 5. Container & Orchestration Networking

When deploying via containers, there is an internal layer of networking that handles how microservices interact.

* **Port Mapping:** Bridging a port on the host machine to a port inside the isolated container (e.g., mapping host port `80` to container port `3000`).
* **Internal DNS (Service Discovery):** How containers find each other. In Kubernetes or Docker Compose, containers communicate using service names rather than static IP addresses, which change whenever a pod restarts.
* **Ingress:** The mechanism (usually an API object in Kubernetes) that manages external access to the services in a cluster, providing HTTP routing, load balancing, and SSL termination.
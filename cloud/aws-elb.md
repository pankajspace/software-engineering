[<- Cloud](cloud-quick.md)

# AWS Elastic Load Balancing

AWS Elastic Load Balancing (ELB) is a fully managed service that automatically distributes incoming application or network traffic across multiple targets, such as Amazon EC2 instances, containers, IP addresses, and Lambda functions. ELB provides high availability, fault tolerance, and automatic scaling, helping applications handle traffic surges, maintain low latency, and minimize downtime.

## Types of Elastic Load Balancers

AWS provides four main types of load balancers, each tailored for different use cases:

1. **Application Load Balancer (ALB)**
2. **Network Load Balancer (NLB)**
3. **Gateway Load Balancer (GWLB)**
4. **Classic Load Balancer (CLB)**

### 1. Application Load Balancer (ALB)

The **Application Load Balancer** operates at the application layer (Layer 7) of the OSI model, designed for HTTP and HTTPS traffic. It is ideal for routing requests to microservices and container-based applications.

**Example use case:** Suppose you have a web application with different services (e.g., authentication, user profile, and dashboard). With ALB, you can route requests based on the URL path. For instance:
   - Requests to `/auth` are directed to the authentication service.
   - Requests to `/profile` are sent to the user profile service.
   - Requests to `/dashboard` go to the dashboard service.

This setup simplifies routing and enables more precise distribution based on content, making it popular for web applications.

### 2. Network Load Balancer (NLB)

The **Network Load Balancer** operates at the transport layer (Layer 4) and is optimized for handling TCP, UDP, and TLS traffic. It is designed for high performance and can handle millions of requests per second while maintaining low latencies.

**Example use case:** For applications requiring ultra-low latency or that need to handle high volumes of requests (e.g., financial trading platforms or gaming servers), NLB is ideal. For example:
   - A financial trading application can use NLB to distribute incoming requests to a pool of backend servers that handle trade execution.
   - A multiplayer gaming server can use NLB to balance player traffic across multiple game servers, ensuring consistent performance.

### 3. Gateway Load Balancer (GWLB)

**Gateway Load Balancer** is designed specifically for distributing traffic to third-party virtual appliances, such as firewalls, intrusion detection, and prevention systems. It operates at the network layer and combines load balancing and network gateway functionality.

**Example use case:** If your organization uses third-party security appliances to filter traffic, you can use a GWLB to distribute the traffic across a fleet of virtual security appliances. For instance:
   - An enterprise might have a setup where all incoming traffic goes through a firewall for inspection before reaching the internal network.
   - The GWLB distributes this traffic across multiple firewalls, ensuring both security and scalability.

### 4. Classic Load Balancer (CLB)

The **Classic Load Balancer** is an older generation that operates at both the application (Layer 7) and transport (Layer 4) layers. It’s best for simple load balancing of HTTP/HTTPS or TCP applications. However, it has fewer features than ALB and NLB and is generally recommended only for legacy applications.

**Example use case:** Suppose you have an existing application set up on EC2 instances that only needs simple HTTP load balancing. Using a Classic Load Balancer can balance HTTP requests across these EC2 instances without complex routing rules or additional layers.

## Key Features of Elastic Load Balancing

1. **Health Checks**: ELB continuously monitors the health of registered targets and only routes traffic to healthy targets. If an instance or target becomes unhealthy, ELB automatically redirects traffic to other healthy targets.

2. **SSL Termination**: ELB supports SSL/TLS termination, meaning it can handle SSL/TLS encryption/decryption. This offloads the work from backend servers, enhancing their performance.

3. **Sticky Sessions**: ELB allows sticky sessions (also called session affinity) where requests from the same client are consistently routed to the same backend instance. This is useful for applications where sessions need to remain on a single server.

4. **Automatic Scaling**: ELB integrates with Auto Scaling to automatically adjust the number of targets based on traffic demand, helping applications scale seamlessly during peak and off-peak hours.

5. **Security**: ELB supports integration with AWS Web Application Firewall (WAF), security groups, and VPCs, providing multiple layers of security for your applications.

6. **Cross-Zone Load Balancing**: ELB can distribute traffic evenly across multiple Availability Zones, increasing fault tolerance and ensuring better regional performance.

## Example Scenarios for Elastic Load Balancing

### Example 1: A High-Traffic E-commerce Website with ALB

An e-commerce site with multiple services (product browsing, checkout, payment) uses an Application Load Balancer to route requests based on URL paths:
   - Requests to `/products` are routed to the product catalog service.
   - Requests to `/checkout` go to the checkout service.
   - Requests to `/payment` are directed to the payment processing service.

This segmentation optimizes performance and organizes backend services efficiently.

### Example 2: Real-Time Gaming Application with NLB

A real-time gaming company needs low latency for players connecting from different locations. The company uses a Network Load Balancer to handle TCP traffic, ensuring a smooth gaming experience even during peak times by distributing connections across multiple game servers.

### Example 3: Corporate Network Security with GWLB

An enterprise using third-party security appliances for network traffic inspection deploys a Gateway Load Balancer to evenly distribute traffic across these appliances. Incoming requests are filtered by multiple firewalls, ensuring scalability and protection for internal systems.

### Example 4: Classic Load Balancer for a Legacy App

An organization with a simple, legacy web application uses a Classic Load Balancer to distribute HTTP requests across a few EC2 instances. They avoid the complexity of configuring advanced features, benefiting from straightforward load balancing for a traditional setup.

## Conclusion

AWS Elastic Load Balancing simplifies the management of distributed workloads, enhancing reliability, performance, and security across applications. By choosing the right type of load balancer, businesses can optimize traffic distribution to meet their specific application needs.

---

[<- Cloud](cloud-quick.md)
[<- Microservices](microservices-quick.md)

# Microservice design pattern

## Strangler Fig Pattern:
Facilitates the gradual replacement of a monolithic system with microservices, ensuring a smooth and risk-free transition.

This pattern involves creating new microservices that replicate the functionality of the monolithic system and gradually migrating features from the monolith to the microservices. As more features are migrated, the monolithic system is gradually "strangled" until it is fully replaced by microservices. This approach allows for incremental changes, reduces the risk of migration, and enables the monolithic system to be decommissioned gradually. 

## API Gateway Pattern:
Centralizes external access to your microservices, simplifying communication and providing a single entry point for client requests.

This pattern involves creating an API gateway that acts as a reverse proxy, routing requests from clients to the appropriate microservices. The API gateway handles common concerns such as authentication, authorization, rate limiting, and caching, offloading these responsibilities from individual microservices. By centralizing external access, the API gateway simplifies communication, enforces security policies, and provides a unified interface for clients to interact with your microservices. 

## Backends for Frontends Pattern (BFF):
Creates dedicated backend services for each frontend, optimizing performance and user experience tailored to each platform.

This pattern involves creating separate backend services for each frontend application, allowing you to optimize the performance and user experience for each platform. By tailoring the backend services to the specific needs of each frontend, you can deliver a more responsive and efficient user experience. This approach also enables you to decouple the frontend and backend development, allowing teams to work independently and iterate quickly on their respective components. 

## Service Discovery Pattern:
Enables microservices to dynamically discover and communicate with each other, simplifying service orchestration and enhancing system scalability.

This pattern involves using a service discovery mechanism to register and discover microservices within your system. By dynamically registering services and querying the service registry, microservices can locate and communicate with each other without hardcoding service endpoints. This approach simplifies service orchestration, enhances system scalability, and enables dynamic scaling of microservices in response to changing demand.

## Circuit Breaker Pattern:
Implements a fault-tolerant mechanism for microservices, preventing cascading failures by automatically detecting and isolating faulty services.

This pattern involves using a circuit breaker to monitor the health of microservices and automatically isolate faulty services when they become unresponsive. By detecting failures early and preventing them from cascading through the system, the circuit breaker enhances the resilience of your microservices and improves system reliability. This approach also allows the system to gracefully degrade in the face of failures, providing a more robust and responsive user experience.

## Bulkhead Pattern:
Isolates microservices into separate partitions, preventing failures in one partition from affecting the entire system and enhancing system resilience.

This pattern involves partitioning microservices into separate bulkheads, each with its own resources and failure domain. By isolating microservices into separate partitions, you can contain failures within a single bulkhead and prevent them from propagating to other parts of the system. This approach enhances system resilience, improves fault tolerance, and ensures that failures in one partition do not impact the availability of other services.

## Retry Pattern:
Enhances microservices' resilience by automatically retrying failed operations, increasing the chances of successful execution and minimizing transient issues.

This pattern involves implementing a retry mechanism that automatically retries failed operations in response to transient errors. By retrying failed operations, you increase the chances of successful execution and minimize the impact of transient issues on your microservices. This approach enhances the resilience of your microservices, improves system availability, and provides a more robust user experience.

## Sidecar Pattern:
Attaches additional components to your microservices, providing modular functionality without altering the core service itself.

This pattern involves attaching a sidecar component to your microservices, providing additional functionality such as logging, monitoring, or security features. By decoupling these concerns from the core service and encapsulating them in a sidecar, you can enhance the functionality of your microservices without modifying their codebase. This approach promotes modularity, simplifies maintenance, and enables you to add or remove features independently of the core service.

## Saga Pattern:
Manages distributed transactions across multiple microservices, ensuring data consistency while maintaining the autonomy of your services.

This pattern involves breaking down a distributed transaction into a series of smaller, independent transactions that are executed by individual microservices. By coordinating these transactions using a saga, you can ensure data consistency across multiple services while maintaining the autonomy and scalability of your microservices. This approach enables you to handle complex business processes that span multiple services, ensuring that data remains consistent and transactions are completed successfully.

## Event-Driven Architecture Pattern:
Leverages events to trigger actions in your services, promoting loose coupling between services and enabling real-time responsiveness.

This pattern involves using events to trigger actions in your microservices, enabling asynchronous communication and promoting loose coupling between services. By decoupling services through events, you can create a more flexible and scalable architecture that can respond in real-time to changes in your system. This approach enables you to build resilient, responsive, and scalable microservices that can adapt to changing requirements and handle complex workflows efficiently.

## CQRS (Command Query Responsibility Segregation) Pattern:
Separates the read and write operations in a microservice, improving performance, scalability, and maintainability.

This pattern involves segregating the read and write operations in a microservice, allowing you to optimize each operation independently. By separating the read and write concerns, you can design your microservices to be more performant, scalable, and maintainable. This approach enables you to tailor your microservices to specific use cases, optimize data access patterns, and improve the overall efficiency of your system.

## Configuration Externalization Pattern:
Provides a method to externalize the configuration from the code, enabling microservices to be reconfigured without the need for recompilation or redeployment.

This pattern involves externalizing the configuration of your microservices, allowing you to modify settings without changing the codebase. By separating configuration from code, you can reconfigure your microservices dynamically, reducing the need for recompilation or redeployment. This approach enables you to customize the behavior of your microservices at runtime, adapt to changing requirements, and improve the flexibility and maintainability of your system.

---

[<- Microservices](microservices-quick.md)

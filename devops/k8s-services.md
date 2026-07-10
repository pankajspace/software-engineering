[<- README](../README.md) | [<- k8s](k8s.md)

# Kubernetes Services in detail

## Types of Kubernetes Services

1. ClusterIP Service (Default)
2. NodePort Service
3. LoadBalancer Service
4. ExternalName Service
5. Headless Service (Special type of ClusterIP)
6. Ingress (Not a service but used to manage external access)

Let’s go into detail about each type of service.

---

## 1. ClusterIP Service (Default)

ClusterIP is the default type of service, and it exposes the service only within the Kubernetes cluster. It assigns an internal IP (ClusterIP) to the service, which can only be accessed from within the cluster (not externally).

### Use Case
- Best for internal communication between microservices.
- Used when you want to expose Pods only to other services within the cluster (e.g., a backend service communicating with a database service).

### Example

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-clusterip-service
spec:
  type: ClusterIP
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

In this example:
- The service routes traffic from port 80 to the Pods on port 8080.
- The service is only accessible within the Kubernetes cluster via its assigned ClusterIP.

---

## 2. NodePort Service

NodePort service exposes the service on each Node’s IP address at a static port (the NodePort). Kubernetes allocates a port from the range 30000–32767, and the service becomes accessible via `<NodeIP>:NodePort`. This service is a superset of the ClusterIP service, meaning it is still accessible within the cluster using the ClusterIP.

### Use Case
- Useful for exposing services to the outside world when using bare-metal clusters or when a LoadBalancer is not available.
- Allows external traffic into the cluster by exposing a fixed port on each Node.

### Example

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nodeport-service
spec:
  type: NodePort
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 32000  # You can specify a custom NodePort or let Kubernetes assign one automatically
```

In this example:
- The service exposes port 32000 on each Node.
- External users can access the service via `<NodeIP>:32000`.

---

## 3. LoadBalancer Service

LoadBalancer service is used to expose the service to the internet by automatically provisioning a cloud-based load balancer (such as AWS ELB, Google Cloud Load Balancer, or Azure Load Balancer). It assigns an external IP to the service and balances traffic across the backend Pods. This is an extension of the NodePort and ClusterIP services.

### Use Case
- Best for exposing services directly to the internet using cloud provider infrastructure.
- Automatically provisions a cloud load balancer and configures it to route traffic to the service.

### Example

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-loadbalancer-service
spec:
  type: LoadBalancer
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
```

In this example:
- A load balancer is created, and it forwards external traffic to the Kubernetes service on port 80, which in turn forwards traffic to the Pods on port 8080.

---

## 4. ExternalName Service

ExternalName service maps a Kubernetes service to a DNS name, such as an external database or a service hosted outside the cluster. Instead of providing a ClusterIP or a NodePort, this service returns a CNAME record with the external name.

### Use Case
- Best for routing traffic from within the cluster to external services (e.g., AWS RDS, external APIs).
- You don't have to worry about configuring IP addresses, as it resolves DNS names.

### Example

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-externalname-service
spec:
  type: ExternalName
  externalName: database.example.com
```

In this example:
- The service `my-externalname-service` redirects traffic to `database.example.com`.
- There’s no ClusterIP or NodePort since it resolves to an external DNS name.

---

## 5. Headless Service

A Headless Service is a special type of ClusterIP service that allows you to access individual Pods directly without load balancing. This service has no IP address assigned and instead returns the IP addresses of the individual Pods.

### Use Case
- Ideal for stateful applications like databases, where you need to access individual Pods directly.
- Used in StatefulSets where each Pod must be individually addressable (e.g., in a Cassandra or MySQL cluster).

### Example

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-headless-service
spec:
  clusterIP: None  # No ClusterIP is assigned
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
```

In this example:
- The `clusterIP: None` directive makes the service "headless," meaning no IP is assigned, and DNS queries for the service will return the IP addresses of the individual Pods.

---

## 6. Ingress (Not a Service, but Manages External Access)

An Ingress is not a service itself but a Kubernetes resource that allows you to define how to route external HTTP and HTTPS traffic to services within the cluster. It provides load balancing, SSL termination, and name-based virtual hosting, allowing multiple services to share the same IP.

### Use Case
- Best for routing external traffic to multiple services using a single IP.
- Ideal for web applications where you need to route traffic based on paths or domain names.

### Example

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-app-service
                port:
                  number: 80
```

In this example:
- The Ingress routes traffic from `myapp.example.com` to the Kubernetes service `my-app-service` on port 80.
- You can configure multiple paths and domains in a single Ingress to route to different services.

---

## Summary of Kubernetes Service Types

| Service Type | Internal/External Access | Description                                                                                    |
| ------------ | ------------------------ | ---------------------------------------------------------------------------------------------- |
| ClusterIP    | Internal                 | Exposes the service only within the Kubernetes cluster.                                        |
| NodePort     | External                 | Exposes the service on a static port on each node's IP address.                                |
| LoadBalancer | External                 | Provisions a cloud provider's load balancer to expose the service externally.                  |
| ExternalName | External/Internal        | Maps the service to an external DNS name.                                                      |
| Headless     | Internal                 | No ClusterIP; routes traffic directly to individual Pods.                                      |
| Ingress      | External                 | Provides HTTP/HTTPS routing to services based on domain names or paths (not a service itself). |

---

## Best Practices

1. ClusterIP for Internal Communication: Use ClusterIP services for internal communication between microservices or components within the cluster.
2. NodePort for Simple External Access: NodePort is great for development or bare-metal Kubernetes clusters but may not be suitable for production.
3. LoadBalancer for Cloud-Hosted Apps: Use LoadBalancer services for production apps in cloud environments like AWS, GCP, or Azure, as they automatically manage external traffic.
4. Headless for StatefulSets: Use Headless services for stateful applications like databases that require direct access to individual Pods.
5. Ingress for Complex Routing: Use Ingress for advanced HTTP routing with SSL termination and traffic routing to multiple services based on domain names and paths.

---

## Conclusion

Kubernetes services provide powerful abstractions to manage how different components within your cluster interact and how they are exposed to external traffic. Depending on your use case—whether you are running a microservices-based application, stateful databases, or web applications—you can use the appropriate type of service to route and manage traffic efficiently.

Let me know if you need more detailed examples or further explanation of specific use cases!

---

[<- README](../README.md) | [<- k8s](k8s.md)

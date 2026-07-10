[<- README](../README.md) | [<- k8s](k8s.md)

# Kubernetes Networking Explained: A Detailed Guide with Examples

Kubernetes (K8S) networking is a complex but essential part of any Kubernetes cluster, enabling communication between Pods, Services, and external entities. Below is a detailed explanation of how networking works in Kubernetes, along with real-world examples for each concept.

## Key Concepts in Kubernetes Networking

1. **Pod-to-Pod Networking**
2. **Pod-to-Service Networking**
3. **Service Types (ClusterIP, NodePort, LoadBalancer)**
4. **Ingress**
5. **Egress (Pod-to-External Communication)**
6. **Network Policies**
7. **DNS in Kubernetes**
8. **CNI Plugins and Networking Models**

---

### 1. **Pod-to-Pod Networking**

Every Pod in Kubernetes gets its own IP address. Kubernetes provides a flat network model, meaning every Pod can communicate with every other Pod across the cluster, regardless of the node they are running on. Kubernetes abstracts this complexity, but the actual network traffic between Pods is managed by a **Container Network Interface (CNI)**.

#### Example: Direct Pod-to-Pod Communication
Imagine two Pods: `Pod-A` with IP `10.244.1.10` and `Pod-B` with IP `10.244.1.11`. If `Pod-A` wants to communicate with `Pod-B`, it can directly use `10.244.1.11` without needing NAT or port mapping. This is possible because Kubernetes handles IP routing across nodes using the CNI plugin (e.g., Calico, Flannel).

- **K8S Key Point**: Pods have unique IPs, and all Pods can communicate directly in a flat network.

### 2. **Pod-to-Service Networking**

While Pods are ephemeral (they can die and be replaced), **Services** provide a stable IP and DNS name to connect to a group of Pods. The Service selects Pods based on **labels**. Kubernetes will load-balance traffic to the Pods that match the label selector of the Service.

#### Example: Service with Multiple Pods

Assume you have a set of backend Pods with the label `app: backend`. You can create a Service that exposes these Pods to other Pods within the cluster.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

- **Service Type: ClusterIP (default)**: The `backend-service` gets an internal IP (ClusterIP) and a DNS entry. Any other Pod can now access the `backend-service` at `backend-service:80`. The Service load-balances traffic across the Pods based on their IPs.

### 3. **Service Types (ClusterIP, NodePort, LoadBalancer)**

Kubernetes offers several types of services that allow different kinds of access to Pods:

1. **ClusterIP (Default)**: 
   - Only accessible within the cluster.
   - Used for internal services like databases or backend services.
   - Example: `backend-service` that is accessible only within the cluster.

2. **NodePort**: 
   - Exposes the Service on each node’s IP address at a static port (between 30000-32767). You can access the service from outside the cluster using `<NodeIP>:<NodePort>`.
   - Example:
     ```yaml
     apiVersion: v1
     kind: Service
     metadata:
       name: my-service
     spec:
       type: NodePort
       ports:
         - port: 80
           targetPort: 8080
           nodePort: 30007
     ```

3. **LoadBalancer**:
   - Used in cloud environments (like AWS, GCP, or Azure) to provision an external load balancer that forwards traffic to the Service.
   - Example:
     ```yaml
     apiVersion: v1
     kind: Service
     metadata:
       name: frontend
     spec:
       type: LoadBalancer
       ports:
         - port: 80
           targetPort: 8080
     ```
   - This exposes the service on a cloud-based load balancer’s public IP.

### 4. **Ingress**

While a `NodePort` or `LoadBalancer` exposes a Service to the outside world, **Ingress** provides more fine-grained control over external access to Services. It acts as a smart router that can route traffic based on the URL path or hostname.

#### Example: Routing with Ingress

You can route different URLs to different Services:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /backend
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 80
      - path: /frontend
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
```

In this example, requests to `myapp.example.com/backend` will go to the `backend-service`, while requests to `/frontend` will go to the `frontend-service`.

### 5. **Egress (Pod-to-External Communication)**

Kubernetes also allows Pods to communicate with external resources, such as third-party APIs, databases, or the public internet. This is called **egress traffic**.

By default, egress traffic flows from Pods through the Kubernetes node and out to the external network without any restrictions. However, you can manage egress traffic using **Network Policies**.

#### Example: Egress to an External API

If `Pod-A` wants to communicate with `www.example.com`, it can directly connect using external DNS and Kubernetes routes this traffic through the node’s external IP.

- **K8S Key Point**: Egress traffic is usually unrestricted by default, but policies can restrict it.

### 6. **Network Policies**

Kubernetes **Network Policies** allow you to control the flow of traffic between Pods and external sources. These policies define what Pods can talk to each other or access external resources. By default, all traffic is allowed, but with network policies, you can create rules to restrict traffic.

#### Example: Restrict Traffic Between Pods

This Network Policy allows only Pods in the `frontend` namespace to communicate with Pods that have the label `app: backend`.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
spec:
  podSelector:
    matchLabels:
      app: backend
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: frontend
    ports:
    - protocol: TCP
      port: 8080
```

- **K8S Key Point**: Network Policies help in securing inter-Pod and Pod-to-external communication by specifying which Pods can communicate with which other Pods or external entities.

### 7. **DNS in Kubernetes**

Kubernetes has an internal **DNS** service that automatically creates DNS records for Services and Pods. This allows you to refer to Services and Pods by name rather than by IP.

#### Example:

If you have a Service named `backend-service` in the namespace `my-app`, other Pods can resolve this Service by simply querying `backend-service.my-app.svc.cluster.local`.

### 8. **CNI Plugins and Networking Models**

Kubernetes uses **Container Network Interface (CNI)** plugins to provide network connectivity to Pods. The CNI plugin handles how IPs are assigned, how Pods communicate across nodes, and how traffic is routed.

Popular CNI plugins include:

- **Calico**: Provides networking and network security using BGP routing.
- **Flannel**: Provides a simple overlay network using VXLAN.
- **Weave**: Focuses on simplicity and automatic mesh networking.
- **Cilium**: Uses eBPF for advanced networking and security features.

### Summary

Kubernetes networking abstracts the complexity of managing IP addresses, DNS, routing, and security between Pods and Services. Key concepts include:

- **Pods** have their own IPs and can communicate with each other in a flat network.
- **Services** provide stable IPs and load-balancing for groups of Pods.
- **Ingress** controls external access to Services.
- **Network Policies** allow for traffic restrictions and securing communications.
- **CNI Plugins** manage IP address assignment, routing, and network policies.

This detailed breakdown provides an insight into how Kubernetes manages internal and external communication, load balancing, and security for containerized applications.

Let me know if you need further examples or clarifications!

---

[<- README](../README.md) | [<- k8s](k8s.md)

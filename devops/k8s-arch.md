[<- README](../README.md) | [<- k8s](k8s.md)

## Kubernetes Architecture Overview

Here’s a detailed explanation of Kubernetes architecture, broken down by components and illustrated with a textual diagram. This overview shows the core components of the **Control Plane** and **Worker Nodes**, as well as how they interact with **Pods**, **Services**, **Ingress**, and **Persistent Volumes**.

---

### Kubernetes Architecture Overview

**Kubernetes** is organized around a **Control Plane** and one or more **Worker Nodes**. Each node runs containers inside **Pods**, which are managed by the Control Plane.

### 1. Control Plane

The Control Plane manages the entire Kubernetes cluster, orchestrating all the scheduling, scaling, and monitoring tasks. It consists of the following components:

1. **API Server**: The main interface for all communications in the cluster. It exposes the Kubernetes API, allowing users, components, and automation tools to communicate with the cluster. It is responsible for validating and processing requests, updating the cluster state, and serving as the front-end for the Kubernetes control plane.
2. **etcd**: A key-value store that holds all configuration data and current state of the cluster. It’s a distributed, reliable store for all cluster metadata. It is used as the single source of truth for the cluster. It is responsible for storing the state of the cluster and ensuring consistency across the cluster.
3. **Controller Manager**: Runs controllers, which are responsible for monitoring the state of the cluster and ensuring it matches the desired state. For example, it runs controllers that handle node failures, replica management, etc. It is responsible for maintaining the desired state of the cluster.
4. **Scheduler**: Responsible for placing Pods on Nodes. It makes scheduling decisions based on resource requirements and policies, ensuring optimal use of cluster resources. It is responsible for distributing work across multiple nodes.

### 2. Worker Nodes

Worker Nodes host the application workloads by running containers in Pods. Each node has the following components:

- **Kubelet**: An agent that ensures containers are running in a Pod. It communicates with the API Server and makes sure that the desired state (number and type of Pods) matches the actual state. It is responsible for managing the Pods on the node.
- **Kube-Proxy**: Manages networking rules for the node, allowing Pods to communicate with each other and ensuring Services are accessible within and outside the cluster. It is responsible for managing network rules on the node.
- **Container Runtime**: The software that actually runs containers (e.g., Docker, containerd). It pulls and starts the container images as specified. It is responsible for running containers in Pods.

### 3. Pods

Pods are the smallest deployable units in Kubernetes, typically running a single container, though they can host multiple tightly coupled containers. Each Pod is ephemeral, meaning it’s created and destroyed as needed. Kubernetes ensures the desired number of replicas are running as defined.

### 4. Services

Services are stable network endpoints that expose Pods to other parts of the application or external clients. Types of Services include:
- **ClusterIP**: Exposes Pods to other services within the cluster.
- **NodePort**: Exposes Pods to external clients using a port on each node.
- **LoadBalancer**: Works with cloud providers to provision an external load balancer.

### 5. Ingress

Ingress manages external HTTP and HTTPS access to services within the cluster. It offers advanced routing and load balancing capabilities. For example, `/api` requests can be directed to one service and `/web` to another.

### 6. Persistent Volumes (PV) and Persistent Volume Claims (PVC)

Persistent Volumes provide storage for stateful applications. A Persistent Volume Claim is a request for storage by a Pod. This model allows Kubernetes to manage storage resources separately from Pods.

---

### Text-Based Diagram of Kubernetes Architecture

Here’s a text-based representation of the Kubernetes architecture and how the different components interact.

```
                  ┌──────────────────────────────────────────────────┐
                  │                   Control Plane                  │
                  │ ┌──────────────────────────────────────────────┐ │
                  │ │                   etcd                       │ │
                  │ └──────────────────────────────────────────────┘ │
                  │       │                │                 │       │
                  │       │                │                 │       │
                  │ ┌──────────┐      ┌───────────┐     ┌──────────┐ │
                  │ │ API      │────▶│ Scheduler │───▶│Controller│ │
                  │ │ Server   │      └───────────┘     │Manager   │ │
                  │ └──────────┘                        └──────────┘ │
                  └──────────────────────────────────────────────────┘
                                          │
                                          │
                                          │
 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │                             Kubernetes Cluster                                  │
 │ ┌──────────────────────────────────┐       ┌──────────────────────────────────┐ │
 │ │          Worker Node 1           │       │          Worker Node 2           │ │
 │ │ ┌──────────────┐   ┌──────────┐  │       │ ┌──────────────┐   ┌──────────┐  │ │
 │ │ │ Kubelet      │   │ Pod A    │  │       │ │ Kubelet      │   │ Pod B    │  │ │
 │ │ ├──────────────┤   ├──────────┤  │       │ ├──────────────┤   ├──────────┤  │ │
 │ │ │ Kube-Proxy   │   │ Pod B    │  │       │ │ Kube-Proxy   │   │ Pod C    │  │ │
 │ │ ├──────────────┤   └──────────┘  │       │ ├──────────────┤   └──────────┘  │ │
 │ │ │ Container    │                 │       │ │ Container    │                 │ │
 │ │ │ Runtime      │                 │       │ │ Runtime      │                 │ │
 │ │ └──────────────┘                 │       │ └──────────────┘                 │ │
 │ └──────────────────────────────────┘       └──────────────────────────────────┘ │
 │                                                                                 │
 └─────────────────────────────────────────────────────────────────────────────────┘

                         ┌──────────────────────────────────────────────┐
                         │                 Services                     │
                         │    Stable network endpoints for Pods         │
                         └──────────────────────────────────────────────┘

                         ┌──────────────────────────────────────────────┐
                         │                 Ingress                      │
                         │   Manages external HTTP(S) access to services│
                         └──────────────────────────────────────────────┘

                     ┌─────────────────────────────────────────────────────┐
                     │               Persistent Volumes                    │
                     │    Provides storage for stateful applications       │
                     └─────────────────────────────────────────────────────┘
```

---

### Summary of the Architecture

1. **Control Plane**:
   - **API Server**: The cluster’s main interface.
   - **etcd**: Stores cluster state and configurations.
   - **Controller Manager**: Ensures the cluster state matches the desired state.
   - **Scheduler**: Decides where Pods should run.

2. **Worker Nodes**:
   - **Kubelet**: Manages Pods on the node.
   - **Kube-Proxy**: Manages networking rules.
   - **Container Runtime**: Runs containers in Pods.

3. **Pods**: The smallest deployable units, containing one or more containers.

4. **Services**: Enable communication between Pods and other parts of the cluster or external clients.

5. **Ingress**: Provides external access to Services, managing HTTP(S) traffic routing.

6. **Persistent Volumes**: Allow stateful applications to persist data across Pod restarts.

This architecture is designed to make it easy to scale applications, automate container management, and maintain high availability across distributed environments. Each component in this architecture has a specific role in ensuring that applications are efficiently deployed, monitored, and scaled within a Kubernetes cluster.

---

[<- README](../README.md) | [<- k8s](k8s.md)

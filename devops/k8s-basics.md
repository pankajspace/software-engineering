[<- README](../README.md) | [<- k8s](k8s.md)

# Main Kubernetes Concepts with Examples

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It enables you to run applications across multiple hosts, providing self-healing, load-balancing, and automated scaling capabilities.

This guide covers the key concepts of Kubernetes with practical examples.

---

## 1. Kubernetes Cluster

### Concept:
- A Kubernetes cluster consists of a control plane and worker nodes.
- The control plane manages the cluster, while the worker nodes run the containerized applications.

### Components:
- Control Plane:
  - `kube-apiserver`: Manages communication between the components. It is the front-end for the Kubernetes control plane.
  - `etcd`: Stores all cluster data. It is a distributed key-value store.
  - `kube-scheduler`: Assigns pods to worker nodes. It is responsible for distributing work.
  - `kube-controller-manager`: Manages controller processes. It is responsible for maintaining the desired state of the cluster.
- Nodes: Run applications in containers (pods) and report back to the control plane. Each node has the following components:
  - `kubelet`: Communicates with the control plane and manages the pods on the node.
  - `kube-proxy`: Manages network rules on the node.
  - Container Runtime: Runs containers (e.g., Docker, containerd).

### Command:
To create a cluster, you typically use a managed service like Google Kubernetes Engine (GKE), Amazon EKS, or Minikube (for local development).

```bash
minikube start
```

---

## 2. Pods

### Concept:
- A Pod is the smallest deployable unit in Kubernetes. It can contain one or more containers that share the same network namespace and storage.
- Each pod is assigned a unique IP address.

### YAML Example (Single-Container Pod):
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
    - name: my-container
      image: nginx
      ports:
        - containerPort: 80
```

### Command:
To create the pod from a YAML file:

```bash
kubectl apply -f pod.yaml
```

To view the pod:

```bash
kubectl get pods
```

---

## 3. Deployments

### Concept:
- A Deployment manages the deployment and scaling of pods.
- Deployments ensure the desired number of pod replicas are running at any given time.

### YAML Example:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.17
          ports:
            - containerPort: 80
```

### Commands:
- To create a Deployment from the YAML file:

  ```bash
  kubectl apply -f deployment.yaml
  ```

- To list Deployments:

  ```bash
  kubectl get deployments
  ```

- To scale the Deployment:

  ```bash
  kubectl scale deployment nginx-deployment --replicas=5
  ```

- To delete the Deployment:

  ```bash
  kubectl delete deployment nginx-deployment
  ```

---

## 4. Services

### Concept:
- A Service exposes a set of pods to the network.
- Kubernetes Services enable communication between different pods and with external clients.
- There are different types of Services:
  - ClusterIP: Exposes the service to internal Kubernetes resources.
  - NodePort: Exposes the service on each node's IP at a static port.
  - LoadBalancer: Exposes the service externally using a cloud provider's load balancer.

### YAML Example (ClusterIP Service):
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

### Commands:
- To create the Service:

  ```bash
  kubectl apply -f service.yaml
  ```

- To list the Services:

  ```bash
  kubectl get services
  ```

- To delete a Service:

  ```bash
  kubectl delete service my-service
  ```

---

## 5. Namespaces

### Concept:
- A Namespace provides a way to divide cluster resources between multiple users or projects. Each Kubernetes object is created within a namespace.
- Default namespaces include `default`, `kube-system`, and `kube-public`.

### Command:
- To create a new Namespace:

  ```bash
  kubectl create namespace my-namespace
  ```

- To list all Namespaces:

  ```bash
  kubectl get namespaces
  ```

- To run a pod in a specific Namespace, specify the namespace in the YAML file or use the `--namespace` flag:

  ```bash
  kubectl apply -f pod.yaml --namespace=my-namespace
  ```

---

## 6. ConfigMaps and Secrets

### Concept:
- ConfigMaps store configuration data as key-value pairs that can be consumed by containers in your pods.
- Secrets store sensitive information like passwords, OAuth tokens, etc., in a secure manner.

### ConfigMap Example:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
  DATABASE_URL: mysql://user:pass@localhost:3306/dbname
```

### Secret Example:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
data:
  username: dXNlcm5hbWU=   # base64-encoded value of 'username'
  password: cGFzc3dvcmQ=   # base64-encoded value of 'password'
```

### Commands:
- To create a ConfigMap from a YAML file:

  ```bash
  kubectl apply -f configmap.yaml
  ```

- To create a Secret from a YAML file:

  ```bash
  kubectl apply -f secret.yaml
  ```

- To view a ConfigMap:

  ```bash
  kubectl get configmap app-config -o yaml
  ```

- To view a Secret (without revealing the secret data):

  ```bash
  kubectl get secret app-secret -o yaml
  ```

---

## 7. Persistent Volumes (PV) and Persistent Volume Claims (PVC)

### Concept:
- A PersistentVolume (PV) is a piece of storage that has been provisioned in the cluster. It can be provided by a cloud provider or an on-premise infrastructure.
- A PersistentVolumeClaim (PVC) is a request for storage by a user. Pods use PVCs to access PVs.

### PV Example:
```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /mnt/data
```

### PVC Example:
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

### Commands:
- To create the PV and PVC:

  ```bash
  kubectl apply -f pv.yaml
  kubectl apply -f pvc.yaml
  ```

- To list Persistent Volumes and Claims:

  ```bash
  kubectl get pv
  kubectl get pvc
  ```

---

## 8. Ingress

### Concept:
- An Ingress is an API object that manages external access to services within a Kubernetes cluster, typically HTTP/HTTPS traffic.
- Ingress controllers manage traffic routing within the cluster, acting as a load balancer and reverse proxy.

### YAML Example:
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
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-service
                port:
                  number: 80
```

### Commands:
- To create an Ingress:

  ```bash
  kubectl apply -f ingress.yaml
  ```

- To list Ingresses:

  ```bash
  kubectl get ingress
  ```

---

## 9. Horizontal Pod Autoscaler (HPA)

### Concept:
- The Horizontal Pod Autoscaler (HPA) automatically scales the number of pod replicas based on observed CPU usage or other select metrics.

### YAML Example:
```yaml
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: nginx-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-deployment
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 50
```

### Commands:
- To create the HPA:

  ```bash
  kubectl apply -f hpa.yaml
  ```

- To list HPAs:

  ```bash
  kubectl get hpa
  ```

---

## 10. StatefulSets

### Concept:
- StatefulSets manage the deployment and scaling of a set of pods while maintaining the order and uniqueness of each pod (used for stateful applications like databases).
  
### YAML Example:
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  serviceName: "nginx"
  replicas: 3
  selector:
    matchLabels:
      app: nginx


  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx
          ports:
            - containerPort: 80
```

---

## Conclusion

Kubernetes provides powerful tools to manage containerized applications in production environments. Concepts such as Pods, Deployments, Services, ConfigMaps, Secrets, and Persistent Volumes allow you to build, scale, and secure applications with ease. With these examples, you now have a foundational understanding of how to work with Kubernetes. 

---

[<- README](../README.md) | [<- k8s](k8s.md)

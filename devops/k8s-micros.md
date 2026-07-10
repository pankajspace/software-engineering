[<- README](../README.md) | [<- k8s](k8s.md)

## Deploying Node.js Microservices on AWS with Kubernetes

Deploying a Node.js microservice on AWS using Kubernetes (K8s) involves creating a Kubernetes cluster on AWS (commonly using Amazon EKS), defining microservice configurations with YAML files, and applying those configurations to the cluster. 

Here, I’ll walk through the deployment of two Node.js microservices, `user-service` and `order-service`, on AWS using Kubernetes with example YAML files. We’ll cover the following components:

1. **Cluster Setup**: Amazon EKS
2. **Deployments**: Define and deploy each microservice
3. **Services**: Expose each microservice internally within the cluster
4. **Ingress**: Allow external access to each service
5. **ConfigMap**: Store environment variables for each service
6. **Persistent Volume** (optional): If the service needs storage persistence

Let’s assume you have already set up an Amazon EKS cluster and configured `kubectl` to connect to it.

---

### Step 1: Create Amazon EKS Cluster

To create an EKS cluster, use the **AWS Management Console** or the **AWS CLI**. You can follow [AWS EKS Quick Start Guide](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html) for detailed steps.

Once the EKS cluster is created, make sure your local `kubectl` is configured to access it:

```bash
aws eks --region <region> update-kubeconfig --name <cluster-name>
```

---

### Step 2: Node.js Microservices Deployment in Kubernetes

We’ll define the following YAML files:

- **ConfigMap**: Stores configuration data, such as environment variables.
- **Deployment**: Manages Pod replicas and container settings.
- **Service**: Exposes the microservices within the cluster.
- **Ingress**: Allows external access to the microservices.

### 1. **ConfigMap for Environment Variables**

We’ll create a separate ConfigMap for each microservice to store its environment variables.

#### `user-config.yaml`

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: user-config
data:
  DATABASE_URL: "mongodb://db.example.com:27017/users"  # Replace with your DB connection
  PORT: "3000"
```

#### `order-config.yaml`

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: order-config
data:
  DATABASE_URL: "mongodb://db.example.com:27017/orders"  # Replace with your DB connection
  PORT: "4000"
```

To apply these ConfigMaps to the cluster, use:

```bash
kubectl apply -f user-config.yaml
kubectl apply -f order-config.yaml
```

### 2. **Deployment**

A Deployment manages the number of replicas for each service, container images, and environment variables from the ConfigMaps.

#### `user-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  labels:
    app: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-container
        image: your-dockerhub-username/user-service:latest  # Replace with your image
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: user-config
```

#### `order-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  labels:
    app: order-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
    spec:
      containers:
      - name: order-container
        image: your-dockerhub-username/order-service:latest  # Replace with your image
        ports:
        - containerPort: 4000
        envFrom:
        - configMapRef:
            name: order-config
```

Apply the Deployments to the cluster:

```bash
kubectl apply -f user-deployment.yaml
kubectl apply -f order-deployment.yaml
```

### 3. **Service**

Define ClusterIP Services to expose each Deployment within the cluster. A ClusterIP service ensures that the `user-service` and `order-service` can communicate internally without being exposed to the internet.

#### `service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP
---
apiVersion: v1
kind: Service
metadata:
  name: order-service
spec:
  selector:
    app: order-service
  ports:
  - protocol: TCP
    port: 80
    targetPort: 4000
  type: ClusterIP
```

Apply the Services to the cluster:

```bash
kubectl apply -f service.yaml
```

### 4. **Ingress**

The Ingress resource allows external access to the services, routing HTTP(S) requests to specific services based on path.

#### `ingress.yaml`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    kubernetes.io/ingress.class: "alb"  # For AWS Application Load Balancer (ALB)
    alb.ingress.kubernetes.io/scheme: internet-facing
spec:
  rules:
  - http:
      paths:
      - path: /user
        pathType: Prefix
        backend:
          service:
            name: user-service
            port:
              number: 80
      - path: /order
        pathType: Prefix
        backend:
          service:
            name: order-service
            port:
              number: 80
```

Apply the Ingress to the cluster:

```bash
kubectl apply -f ingress.yaml
```

### 5. **Persistent Volume (Optional)**

If your Node.js microservices require persistent storage (for example, if you’re using a local database or caching system), you may need a Persistent Volume (PV) and Persistent Volume Claim (PVC).

#### `persistent-volume.yaml`

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: user-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  awsElasticBlockStore:
    volumeID: "<aws-volume-id>"  # Replace with your AWS EBS Volume ID
    fsType: ext4
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: user-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

Apply the Persistent Volume configuration:

```bash
kubectl apply -f persistent-volume.yaml
```

---

### Summary of the Example Setup

Here’s a quick recap of what each YAML file does:
- **ConfigMaps (`user-config.yaml`, `order-config.yaml`)**: Store environment variables for each service.
- **Deployments (`user-deployment.yaml`, `order-deployment.yaml`)**: Define the number of replicas, container images, and environment variables for each service.
- **Services (`service.yaml`)**: Expose each Deployment within the cluster using a ClusterIP service.
- **Ingress (`ingress.yaml`)**: Allow external access, routing requests to each service based on URL path.
- **Persistent Volume (`persistent-volume.yaml`)**: (Optional) Configure persistent storage for stateful applications.

### Deploying and Managing Your Application

After applying these configurations, your Node.js microservices will be deployed on AWS using Kubernetes, accessible at paths `/user` and `/order` via the ALB ingress. You can monitor the Pods and Services with:

```bash
kubectl get pods
kubectl get services
kubectl get ingress
```

This setup enables scalable, containerized microservices with external access, making it easy to manage and scale services on AWS using Kubernetes.

---

[<- README](../README.md) | [<- k8s](k8s.md)
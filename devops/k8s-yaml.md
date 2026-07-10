[<- README](../README.md) | [<- k8s](k8s.md)

# Kubernetes YAML Files: A Comprehensive Overview

In Kubernetes, YAML files play a crucial role in defining, deploying, and managing resources. These YAML files are used to configure Kubernetes objects, such as pods, services, volumes, deployments, etc. Here’s a detailed overview of the various types of YAML files commonly used in Kubernetes:

## 1. Pod YAML File
A Pod is the smallest and simplest Kubernetes object. It represents a single instance of a running process in your cluster. The YAML file for a Pod defines the container or containers inside that pod.

### Example Pod YAML:
```yaml
apiVersion: v1  # Kubernetes API version
kind: Pod  # Defines the type of object (Pod)
metadata:
  name: my-pod  # Name of the Pod
spec:
  containers:
  - name: my-container  # Name of the container within the Pod
    image: nginx  # Docker image for the container
    ports:
    - containerPort: 80  # Container port exposed
```

- apiVersion: Defines the version of the Kubernetes API used.
- kind: The type of Kubernetes object, in this case, a Pod.
- metadata: Holds data like name, labels, and annotations.
- spec: Specifies the containers, images, ports, and other details of the pod.

## 2. Deployment YAML File
A Deployment provides declarative updates to applications and manages pods in a ReplicaSet. It allows you to scale your application, perform rolling updates, and rollback changes.

### Example Deployment YAML:
```yaml
apiVersion: apps/v1  # API version for deployments
kind: Deployment  # Object type (Deployment)
metadata:
  name: my-deployment  # Name of the deployment
spec:
  replicas: 3  # Number of replicas (Pod instances)
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx  # Label for Pods
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

- replicas: Specifies the number of identical pods to run.
- selector: Tells the deployment which pods it should manage (based on labels).
- template: Defines the pod configuration (similar to a pod spec).

## 3. Service YAML File
A Service is an abstraction that defines a logical set of Pods and a policy to access them. It exposes an application running on a set of pods as a network service.

### Example Service YAML:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: nginx  # Selects Pods with the label "app: nginx"
  ports:
    - protocol: TCP
      port: 80  # Port exposed by the service
      targetPort: 80  # Port on the container
  type: ClusterIP  # The type of service (default: ClusterIP)
```

- type: Defines how the service is exposed (ClusterIP, NodePort, LoadBalancer, ExternalName).
- selector: Identifies which Pods the service should forward traffic to (based on labels).
- ports: Defines the port configuration (external and internal ports).

## 4. ConfigMap YAML File
A ConfigMap is used to store configuration data as key-value pairs. ConfigMaps allow you to decouple configuration artifacts from image content, making your application more portable.

### Example ConfigMap YAML:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config
data:
  config1: "value1"
  config2: "value2"
```

- data: Holds the key-value pairs of configuration data. This can be injected into Pods as environment variables or mounted as volumes.

## 5. Secret YAML File
A Secret is similar to ConfigMap, but it is specifically meant to store sensitive information like passwords, OAuth tokens, and SSH keys. Secrets are encoded in base64.

### Example Secret YAML:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:
  username: YWRtaW4=  # Base64 encoded value of "admin"
  password: cGFzc3dvcmQ=  # Base64 encoded value of "password"
```

- data: Holds key-value pairs where the values are base64-encoded strings.

## 6. PersistentVolume (PV) YAML File
A PersistentVolume (PV) is a storage resource in a cluster. PVs are used to persist data independently of the pod lifecycle.

### Example PersistentVolume YAML:
```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 1Gi  # Size of the volume
  accessModes:
    - ReadWriteOnce  # The access mode (ReadWriteOnce, ReadOnlyMany, etc.)
  hostPath:
    path: /mnt/data  # The path to the volume on the host machine
```

- capacity: Defines the storage size.
- accessModes: Describes how the volume can be mounted (read/write).
- hostPath: A specific directory on the host node is used for the volume.

## 7. PersistentVolumeClaim (PVC) YAML File
A PersistentVolumeClaim (PVC) is a request for storage by a user. It binds to a PersistentVolume and ensures the requested storage is available for use by a pod.

### Example PersistentVolumeClaim YAML:
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
      storage: 1Gi  # Requested storage size
```

- accessModes: Defines how the volume can be used (read/write).
- resources: Requests the storage size.

## 8. Ingress YAML File
An Ingress is a collection of rules that allow inbound connections to reach the cluster services. It provides HTTP and HTTPS routes to services within the cluster.

### Example Ingress YAML:
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
            name: my-service
            port:
              number: 80
```

- rules: Define routing rules based on hostnames and paths.
- backend: Specifies the service that traffic should be forwarded to.

## 9. DaemonSet YAML File
A DaemonSet ensures that all (or some) nodes run a copy of a pod. It is typically used for background tasks like log collection, monitoring, etc.

### Example DaemonSet YAML:
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: my-daemonset
spec:
  selector:
    matchLabels:
      name: my-daemonset
  template:
    metadata:
      labels:
        name: my-daemonset
    spec:
      containers:
      - name: daemon-container
        image: my-image
```

- DaemonSet ensures that the pod is running on every node in the cluster or a subset of nodes.

## 10. StatefulSet YAML File
A StatefulSet is used for applications that require persistent state, such as databases. Unlike Deployments, StatefulSets maintain a persistent identity for each of their pods.

### Example StatefulSet YAML:
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: my-statefulset
spec:
  serviceName: "my-service"
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: my-image
        volumeMounts:
        - name: my-volume
          mountPath: /data
  volumeClaimTemplates:
  - metadata:
      name: my-volume
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 1Gi
```

- StatefulSet provides guarantees about the ordering and uniqueness of pods.

## 11. Job YAML File
A Job creates one or more pods and ensures that a specified number of them successfully terminate. It is typically used for short-lived, one-time tasks.

### Example Job YAML:
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: my-job
spec:
  template:
    spec:
      containers:
      - name: my-job-container
        image: busybox
        command: ["echo", "Hello Kubernetes!"]
      restartPolicy: Never
  backoffLimit: 4
```

- Job ensures that a task is completed, and the pods are terminated after successful execution.

---

## Conclusion
Each of these YAML file types serves a specific purpose in Kubernetes, enabling you to manage different aspects of a containerized application. Whether you're managing configurations, storage, networking, or orchestrating multiple services, these YAML files give you a declarative way to define the desired state of your system.

---

[<- README](../README.md) | [<- k8s](k8s.md)

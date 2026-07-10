[<- README](../README.md) | [<- k8s](k8s.md)

# Advanced Kubernetes Topics: Helm, RBAC, and Network Policies

Great! Let’s dive into some advanced Kubernetes topics: Helm, RBAC (Role-Based Access Control), and Network Policies.

---

## 1. Helm: Kubernetes Package Manager

### Concept:
- Helm is a package manager for Kubernetes that allows you to define, install, and upgrade complex Kubernetes applications through reusable templates called Helm Charts.
- A Helm Chart is a collection of files that describe a related set of Kubernetes resources.
  
### Key Features of Helm:
- Simplifies management of complex Kubernetes applications.
- Supports application versioning and rollback.
- Easily customizable via templating.

### Helm Components:
- Helm CLI: The command-line interface to interact with the Helm tool.
- Chart: The set of YAML templates and metadata files that define an application.
- Release: An instance of a chart running in a Kubernetes cluster.

### Helm Workflow:
1. Create a Chart: Define Kubernetes resources (Deployments, Services, etc.).
2. Package the Chart: Use Helm to package the Chart into a `.tgz` file.
3. Install the Chart: Install a release from the chart onto a Kubernetes cluster.
4. Upgrade the Chart: Update an existing release with new versions of the chart.
5. Rollback a Chart: Revert to a previous version of the application.

### Commands:
- Install Helm:
  
  Follow the installation guide for your operating system from the official Helm documentation: [Helm Installation Guide](https://helm.sh/docs/intro/install/).

- Create a Helm Chart:

  ```bash
  helm create my-app
  ```

  This generates a basic Helm chart structure in the `my-app` directory.

- Install a Helm Chart:

  ```bash
  helm install <release-name> ./my-app
  ```

  Example:

  ```bash
  helm install my-release ./my-app
  ```

- List Installed Helm Releases:

  ```bash
  helm list
  ```

- Upgrade a Helm Release:

  ```bash
  helm upgrade <release-name> ./my-app
  ```

- Rollback a Release:

  ```bash
  helm rollback <release-name> <revision-number>
  ```

- Uninstall a Release:

  ```bash
  helm uninstall <release-name>
  ```

---

## 2. RBAC (Role-Based Access Control)

### Concept:
- RBAC (Role-Based Access Control) is a method for controlling access to the Kubernetes API based on user roles.
- It allows you to define permissions (who can do what) through Roles, ClusterRoles, RoleBindings, and ClusterRoleBindings.
  
### Key Components:
- Role: Grants permissions within a specific namespace.
- ClusterRole: Grants cluster-wide permissions.
- RoleBinding: Assigns a Role to a user or group within a specific namespace.
- ClusterRoleBinding: Assigns a ClusterRole to a user or group at the cluster level.

### Example YAML for RBAC:

#### 1. Role:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

This defines a Role `pod-reader` that grants read-only access to pods in the `default` namespace.

#### 2. RoleBinding:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: jane
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

This binds the `pod-reader` Role to the user `jane` in the `default` namespace.

### Commands:
- Create a Role:

  ```bash
  kubectl apply -f role.yaml
  ```

- Create a RoleBinding:

  ```bash
  kubectl apply -f rolebinding.yaml
  ```

- List Roles:

  ```bash
  kubectl get roles --namespace=<namespace>
  ```

- List RoleBindings:

  ```bash
  kubectl get rolebindings --namespace=<namespace>
  ```

#### Example: Cluster-Wide Permissions
For cluster-wide permissions, use a ClusterRole and ClusterRoleBinding.

#### ClusterRole:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-admin
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]
```

This grants full access to all resources across the entire cluster.

---

### 3. Network Policies

### Concept:
- Network Policies allow you to control traffic between pods at the network level.
- By default, Kubernetes allows all ingress and egress traffic between pods, but Network Policies can be used to restrict which pods can communicate with each other.
  
### Key Components:
- Pods: The entities to which the Network Policy is applied.
- Selectors: Criteria to define which pods the policy applies to.
- Ingress/Egress Rules: Rules that define the allowed traffic.

### YAML Example:

#### Example 1: Allowing Traffic Only from Specific Pods
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-access
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: my-app
  ingress:
    - from:
        - podSelector:
            matchLabels:
              access: allowed
```

- This Network Policy allows traffic only from pods with the label `access: allowed` to pods labeled `app: my-app`.

#### Example 2: Denying All Traffic Except for Specific Pods
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: my-app
  policyTypes:
    - Ingress
    - Egress
  ingress: []
  egress: []
```

- This policy denies all ingress and egress traffic to pods labeled `app: my-app`.

### Commands:
- Create a Network Policy:

  ```bash
  kubectl apply -f networkpolicy.yaml
  ```

- List Network Policies:

  ```bash
  kubectl get networkpolicy --namespace=<namespace>
  ```

- Delete a Network Policy:

  ```bash
  kubectl delete networkpolicy <policy-name> --namespace=<namespace>
  ```

---

## 4. Advanced Topics

### A. Custom Resource Definitions (CRDs)
- Concept: Custom Resource Definitions allow you to extend the Kubernetes API by defining your own resource types. This enables developers to manage custom application components (like databases, or other custom systems) in a Kubernetes-native way.
  
- Example:
  ```yaml
  apiVersion: apiextensions.k8s.io/v1
  kind: CustomResourceDefinition
  metadata:
    name: crontabs.stable.example.com
  spec:
    group: stable.example.com
    versions:
      - name: v1
        served: true
        storage: true
    scope: Namespaced
    names:
      plural: crontabs
      singular: crontab
      kind: CronTab
      shortNames:
      - ct
  ```

### B. Pod Security Policies (PSP)
- Concept: Pod Security Policies are used to control the security-related conditions a pod must meet in order to be allowed in the cluster.
- Example:
  ```yaml
  apiVersion: policy/v1beta1
  kind: PodSecurityPolicy
  metadata:
    name: restricted
  spec:
    privileged: false
    runAsUser:
      rule: MustRunAsNonRoot
    seLinux:
      rule: RunAsAny
    supplementalGroups:
      rule: MustRunAs
      ranges:
      - min: 1
        max: 65535
    fsGroup:
      rule: MustRunAs
      ranges:
      - min: 1
        max: 65535
  ```

- This Pod Security Policy ensures that all pods run as non-root users and do not use privileged containers.

---

## Conclusion

Helm, RBAC, and Network Policies are advanced concepts that provide additional flexibility and security when managing large-scale Kubernetes applications. With Helm, you can manage and upgrade complex applications. RBAC provides fine-grained access control, ensuring that only the right users or services have permissions to perform operations. Network Policies offer network-level security, allowing you to control traffic between different pods.

Would you like to explore more advanced Kubernetes topics like Kubernetes Operators, Service Meshes (e.g., Istio), or Monitoring & Logging in Kubernetes?

---

[<- README](../README.md) | [<- k8s](k8s.md)

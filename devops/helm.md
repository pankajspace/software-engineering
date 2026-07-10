[<- devops](devops-quick.md)

# Helm

## **Helm**: The Kubernetes Package Manager

Helm is a powerful tool for managing Kubernetes applications. It simplifies the process of deploying and managing Kubernetes resources by packaging Kubernetes YAML manifests into **charts**, which can be easily installed, upgraded, or rolled back. Helm charts allow developers and system administrators to define, install, and upgrade even the most complex Kubernetes applications in a consistent and predictable way.

## Key Components of Helm

1. **Helm Chart**: A Helm chart is a collection of files that describe a related set of Kubernetes resources. It’s like a package of pre-configured Kubernetes resources such as Deployments, Services, ConfigMaps, etc.

2. **Helm Repository**: This is where charts are stored and shared. Helm repositories are like package repositories for sharing Helm charts.

3. **Helm Release**: When a chart is installed in a Kubernetes cluster, it’s called a release. A release is a running instance of a chart, and you can have multiple releases of the same chart with different configurations.

4. **Helm CLI**: The command-line interface that allows you to interact with Helm to manage your Kubernetes resources. You can use it to search for charts, install them, upgrade them, or delete them.

## Helm Architecture

- **Helm Client**: This is the CLI that you interact with. It is responsible for packaging charts, sending them to the Kubernetes cluster, and interacting with the Helm Chart repository.
  
- **Tiller** (deprecated in Helm v3): In Helm v2, there was a server-side component called Tiller, but it was removed in Helm v3 due to security concerns. Helm v3 communicates directly with the Kubernetes API, making it simpler and more secure.

## Basic Helm Workflow

1. **Create a Chart**: Define a Helm chart that packages Kubernetes manifests and templates.
2. **Deploy the Chart**: Use `helm install` to deploy the chart to your Kubernetes cluster.
3. **Upgrade the Chart**: Use `helm upgrade` to apply changes to the release.
4. **Roll Back**: Use `helm rollback` to revert to a previous version of the release.

## Helm Chart Structure

A typical Helm chart has the following directory structure:

```
mychart/
  Chart.yaml          # Metadata about the chart (name, version, etc.)
  values.yaml         # Default values for the chart templates
  templates/          # Kubernetes resource templates (YAML files)
  charts/             # Dependency charts (if any)
  README.md           # Optional documentation
```

### Key Files in a Chart

1. **Chart.yaml**: Contains metadata about the chart like its name, version, description, etc.
   
   ```yaml
   apiVersion: v2
   name: mychart
   description: A Helm chart for a Kubernetes app
   version: 1.0.0
   ```

2. **values.yaml**: Contains the default configuration values for the chart. These values can be overridden at the time of installation or upgrade.
   
   ```yaml
   replicaCount: 3
   image:
     repository: nginx
     tag: "1.19.6"
   service:
     type: ClusterIP
     port: 80
   ```

3. **templates/**: This directory contains the Kubernetes manifests that Helm uses to deploy the application. These manifests can use the values from `values.yaml` via templating.

   - Example: `deployment.yaml` template
   
     ```yaml
     apiVersion: apps/v1
     kind: Deployment
     metadata:
       name: {{ .Release.Name }}-deployment
     spec:
       replicas: {{ .Values.replicaCount }}
       template:
         spec:
           containers:
             - name: myapp
               image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
               ports:
                 - containerPort: {{ .Values.service.port }}
     ```

   This template creates a Deployment using values from `values.yaml` like `replicaCount`, `image.repository`, `image.tag`, and `service.port`.

4. **charts/**: Contains any dependencies (other charts) that this chart relies on. You can define them in the `Chart.yaml` under the `dependencies` section.

## Helm Commands

- **Install a Chart**:
  
  To install a chart, use the `helm install` command. This deploys the chart into a Kubernetes cluster.

  ```bash
  helm install my-release mychart/
  ```

  This will deploy the `mychart` chart with the release name `my-release`.

- **Upgrade a Release**:
  
  To apply changes to a release (for example, if you modify `values.yaml`), use the `helm upgrade` command.

  ```bash
  helm upgrade my-release mychart/
  ```

- **List All Releases**:
  
  To list all releases that have been deployed, use:

  ```bash
  helm list
  ```

- **Uninstall a Release**:
  
  To delete a release from the cluster, use:

  ```bash
  helm uninstall my-release
  ```

- **Rollback a Release**:
  
  If an upgrade causes issues, you can roll back to a previous version using:

  ```bash
  helm rollback my-release 1
  ```

  This command rolls back `my-release` to revision 1.

- **Template Rendering**:
  
  You can see the raw Kubernetes YAML that Helm generates by running the following command:

  ```bash
  helm template mychart/
  ```

## Helm Values and Templating

Helm uses **Go templating** to allow dynamic substitution of values in your YAML manifests. The `values.yaml` file contains the default values for the chart templates, and these values can be overridden when installing or upgrading a chart.

Example of overriding values during installation:

```bash
helm install my-release mychart/ --set replicaCount=2 --set image.tag="1.20.0"
```

This command overrides the `replicaCount` and `image.tag` values from the `values.yaml`.

## Helm Repositories

Helm charts are stored in Helm repositories, which are public or private storage for charts. Helm's default repository is **Helm Hub**. You can also add your own repositories.

- **Add a Helm Repository**:

  ```bash
  helm repo add stable https://charts.helm.sh/stable
  ```

- **Search for a Chart**:

  ```bash
  helm search repo nginx
  ```

  This will search the repository for charts related to "nginx".

- **Update Repository**:

  ```bash
  helm repo update
  ```

  This updates the list of charts in your repositories.

## Helm Example

Let’s create a simple Helm chart to deploy an Nginx web server.

1. **Create the chart**:

   ```bash
   helm create nginx
   ```

   This creates a new Helm chart named `nginx` with the necessary files and directories.

2. **Modify `values.yaml`** to specify the Nginx image and replica count:

   ```yaml
   replicaCount: 2
   image:
     repository: nginx
     tag: "latest"
   ```

3. **Modify `templates/deployment.yaml`**:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: {{ .Release.Name }}-nginx
   spec:
     replicas: {{ .Values.replicaCount }}
     template:
       spec:
         containers:
           - name: nginx
             image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
             ports:
               - containerPort: 80
   ```

4. **Install the chart**:

   ```bash
   helm install my-nginx ./nginx
   ```

   This installs the Nginx chart with the release name `my-nginx`.

5. **Verify the deployment**:

   ```bash
   kubectl get pods
   ```

This should show two Nginx pods running as defined in `values.yaml`.

## Helm Best Practices

- **Versioning**: Always version your charts in `Chart.yaml` to ensure that upgrades and rollbacks work seamlessly.
  
- **Parameterize Everything**: Use the `values.yaml` file to expose configuration options so users can easily override them.
  
- **Use Dependencies**: If your application depends on other services (like databases), use the `dependencies` section in `Chart.yaml` to link other charts.

## Helm Use Cases

1. **CI/CD Pipelines**: Helm is commonly used in CI/CD pipelines to automate the deployment of Kubernetes resources.
  
2. **Kubernetes Operators**: Helm charts are often used to package and deploy Kubernetes operators.

3. **Microservices**: Helm simplifies deploying and managing multiple microservices in Kubernetes, especially when services have complex configurations.

## Conclusion

Helm streamlines Kubernetes management by packaging Kubernetes manifests into easy-to-use charts, which provide a powerful templating system and lifecycle management for Kubernetes applications. Whether deploying a simple web application or a complex microservice architecture, Helm can significantly reduce the complexity of managing your Kubernetes environment.

---

# Helm NodeJS Example

In Kubernetes, **Helm** is a package manager designed to make it easy to deploy and manage applications on Kubernetes. It uses "charts," which are collections of files describing a related set of Kubernetes resources. Helm charts simplify the process of deploying complex applications by packaging Kubernetes manifests in a reusable, templated format.

Here’s how to use Helm to deploy a Node.js application in a Kubernetes cluster, with an example Helm chart and YAML files.

---

### What is Helm?

- **Helm Charts**: Collections of templates and configurations packaged together. Charts can contain Deployments, Services, ConfigMaps, Ingresses, and other Kubernetes resources.
- **Reusable Templates**: Helm templates allow for parameterization, making it easy to reuse the same configuration with different variables.
- **Release Management**: Helm enables easy installation, upgrade, rollback, and deletion of application deployments.
  
### Node.js Application Example with Helm

Let’s create a simple Helm chart for deploying a Node.js application. The chart will include:

1. **Deployment**: Defines how the app will be deployed in Pods.
2. **Service**: Exposes the app within the cluster.
3. **ConfigMap**: Stores environment variables.
4. **Ingress**: Provides external access to the app.

#### Prerequisites

- A Kubernetes cluster (like Amazon EKS, Minikube, or any other Kubernetes setup)
- Helm installed on your machine (install using `brew install helm` or [follow the Helm installation guide](https://helm.sh/docs/intro/install/))

---

### Step 1: Create a New Helm Chart

To create a Helm chart, use the following command:

```bash
helm create nodejs-app
```

This command generates a new directory named `nodejs-app`, which contains all the necessary template files and directories for a Helm chart.

### Step 2: Modify the Helm Chart Files

The `nodejs-app` directory will contain a `templates` folder where you can define Kubernetes resources, such as a Deployment, Service, ConfigMap, and Ingress. 

Let’s modify the files within the `templates` folder for our Node.js app.

---

#### 1. **ConfigMap (configmap.yaml)**

Create a `ConfigMap` to store environment variables for your Node.js app. In `templates/configmap.yaml`, define:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-config
data:
  DATABASE_URL: "mongodb://db.example.com:27017/mydatabase"
  PORT: "3000"
```

This ConfigMap stores the database URL and port number for the Node.js app. Using `{{ .Release.Name }}`, Helm will generate a unique name for this ConfigMap with each release.

#### 2. **Deployment (deployment.yaml)**

Define a Deployment for the Node.js app in `templates/deployment.yaml`. This template includes placeholders for the image, replica count, and environment variables.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-deployment
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app: {{ .Release.Name }}
    spec:
      containers:
      - name: nodejs-app
        image: {{ .Values.image.repository }}:{{ .Values.image.tag }}
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: {{ .Release.Name }}-config
```

- **Values.yaml** (explained below) will contain `replicaCount`, `image.repository`, and `image.tag`.
- The `ConfigMap` is referenced in the `envFrom` section, linking the environment variables to the container.

#### 3. **Service (service.yaml)**

Define a Service to expose the app within the cluster in `templates/service.yaml`.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}-service
spec:
  selector:
    app: {{ .Release.Name }}
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP
```

This Service enables internal communication for the Node.js app.

#### 4. **Ingress (ingress.yaml)**

Define an Ingress resource to provide external access to the app in `templates/ingress.yaml`.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ .Release.Name }}-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - host: {{ .Values.ingress.host }}
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: {{ .Release.Name }}-service
            port:
              number: 80
```

In this example:
- The host is defined in `values.yaml`, making it easy to customize for different environments.
- The Ingress routes HTTP traffic to the Service, exposing the app externally.

---

### Step 3: Configure `values.yaml`

The `values.yaml` file is where you set default values for your Helm chart, which can be overridden during deployment.

In `values.yaml`:

```yaml
replicaCount: 2

image:
  repository: your-dockerhub-username/nodejs-app
  tag: "latest"

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  host: "yourdomain.com"  # Replace with your domain
```

### Step 4: Deploy the Helm Chart

To deploy the chart, use the `helm install` command. This command creates a new release of the chart.

```bash
helm install my-nodejs-app ./nodejs-app
```

Here:
- `my-nodejs-app` is the name of the release.
- `./nodejs-app` is the path to the Helm chart directory.

Helm will render the templates with values from `values.yaml`, create Kubernetes manifests, and apply them to your cluster.

### Step 5: Verify the Deployment

After deploying the chart, verify the resources:

```bash
kubectl get pods
kubectl get svc
kubectl get ingress
```

- The Pods should reflect the number of replicas defined in `values.yaml`.
- The Service should be accessible within the cluster, and the Ingress should provide external access.

### Step 6: Updating and Rolling Back

One of Helm’s powerful features is the ability to update and roll back releases.

#### Updating the Deployment

To update the configuration or any value in `values.yaml`, use:

```bash
helm upgrade my-nodejs-app ./nodejs-app
```

Helm will apply the updated values, rolling out changes to the Kubernetes resources.

#### Rolling Back

If something goes wrong with the update, you can roll back to a previous release:

```bash
helm rollback my-nodejs-app 1
```

This command will revert the deployment to release version 1.

### Summary of Helm with Node.js App

1. **Helm Chart**: Packages the Kubernetes resources (Deployment, Service, ConfigMap, and Ingress).
2. **Templates**: Use templated YAML files to generate resources dynamically.
3. **Values.yaml**: Stores configurable values to make the chart reusable.
4. **Helm Commands**: Install, upgrade, and rollback commands to manage releases.

Using Helm with Kubernetes simplifies the deployment and management of Node.js microservices by making it easy to configure, update, and maintain applications in a reusable way.

---

[<- README](../README.md) | [<- Devops](devops-quick.md)
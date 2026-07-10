[<- README](../README.md) | [<- k8s](k8s.md)

## Node.js CRUD Application with Docker and Kubernetes on Local Machine

Here’s a detailed guide on setting up a Node.js CRUD application with Docker and Kubernetes on your local machine, covering the code, required software, installation steps, and running the app.

### Part 1: Set Up the Node.js CRUD Application

#### 1.1: Initialize a Node.js Project

1. Create a directory for the project:
    ```bash
    mkdir nodejs-crud-k8s && cd nodejs-crud-k8s
    ```
   
2. Initialize Node.js:
    ```bash
    npm init -y
    ```

#### 1.2: Install Dependencies

We’ll use Express for the API and Mongoose to connect to MongoDB:

```bash
npm install express mongoose
```

#### 1.3: Create the CRUD Application

In the project directory, create a file named `app.js`:

```javascript
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://mongo:27017/crud-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemSchema);

// CRUD Endpoints
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.put("/items/:id", async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

### Part 2: Dockerize the Application

#### 2.1: Create a Dockerfile

Create a `Dockerfile` to containerize the application:

```dockerfile
# Use Node.js image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy application files
COPY . .

# Expose port and start the application
EXPOSE 3000
CMD ["node", "app.js"]
```

### Part 3: Setting Up Kubernetes Configuration

#### 3.1: Create Kubernetes Deployment and Service Files

To deploy MongoDB and the Node.js application, create a Kubernetes configuration file `k8s-deployment.yml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-crud-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nodejs-crud-app
  template:
    metadata:
      labels:
        app: nodejs-crud-app
    spec:
      containers:
        - name: nodejs-crud-app
          image: yourusername/nodejs-crud-app:v1
          ports:
            - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: nodejs-crud-service
spec:
  type: LoadBalancer
  selector:
    app: nodejs-crud-app
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
        - name: mongo
          image: mongo
          ports:
            - containerPort: 27017
---
apiVersion: v1
kind: Service
metadata:
  name: mongo
spec:
  selector:
    app: mongo
  ports:
    - protocol: TCP
      port: 27017
      targetPort: 27017
```

### Part 4: Required Software and Installation Steps

To develop, Dockerize, and run this application on Kubernetes locally, you need the following:

1. **Node.js** – Develop the application.
2. **Docker** – Containerize the application.
3. **Minikube** – Run Kubernetes locally.
4. **kubectl** – Control and manage the Kubernetes cluster.

#### Install Node.js

- Download from [Node.js official website](https://nodejs.org/) and install. Verify with:
    ```bash
    node -v
    npm -v
    ```

#### Install Docker

- Download Docker Desktop from [Docker’s official website](https://www.docker.com/products/docker-desktop/).
  - For Linux, use:
    ```bash
    sudo apt update
    sudo apt install -y docker.io
    ```

Verify with:
```bash
docker --version
```

#### Install Minikube

- Download and install from [Minikube’s website](https://minikube.sigs.k8s.io/docs/start/).

- For Linux:
    ```bash
    curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
    sudo install minikube-linux-amd64 /usr/local/bin/minikube
    ```

Start Minikube:
```bash
minikube start
```

#### Install kubectl

Install kubectl to control Kubernetes:

- Follow the instructions on the [Kubernetes website](https://kubernetes.io/docs/tasks/tools/install-kubectl/) or for Linux:
    ```bash
    sudo apt update
    sudo apt install -y kubectl
    ```

Verify with:
```bash
kubectl version --client
```

### Part 5: Running the Application Locally

#### 5.1: Build and Test Docker Image

1. Build the Docker image:
    ```bash
    docker build -t nodejs-crud-app .
    ```

2. Run the Docker container:
    ```bash
    docker run -p 3000:3000 nodejs-crud-app
    ```

3. Confirm the app is accessible at `http://localhost:3000`.

#### 5.2: Push Docker Image to Docker Hub

1. Log in to Docker:
    ```bash
    docker login
    ```

2. Tag and push the image:
    ```bash
    docker tag nodejs-crud-app:latest yourusername/nodejs-crud-app:v1
    docker push yourusername/nodejs-crud-app:v1
    ```

#### 5.3: Deploy on Kubernetes Using Minikube

1. Start Minikube (if not already started):
    ```bash
    minikube start
    ```

2. Apply the Kubernetes configuration:
    ```bash
    kubectl apply -f k8s-deployment.yml
    ```

3. Verify that the pods and services are running:
    ```bash
    kubectl get pods
    kubectl get services
    ```

4. To access the app, get Minikube’s IP address:
    ```bash
    minikube ip
    ```

5. Open the Node.js API in your browser or use curl commands to test the endpoints at the specified IP and port (from `nodejs-crud-service`).


### Conclusion

You’ve successfully set up a Node.js CRUD application with Docker and Kubernetes on your local machine. This guide covers the code, Dockerization, Kubernetes configuration, required software, installation steps, and running the app locally.

---

[<- README](../README.md) | [<- k8s](k8s.md)

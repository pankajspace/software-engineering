[<- README](../README.md) | [<- Docker](docker.md)

## Node.js CRUD App with MongoDB, Docker, GitHub Actions, and AWS Deployment

Creating a Node.js CRUD application with MongoDB, Docker, GitHub Actions, and deploying it to AWS can be an in-depth process. Let’s go through it step-by-step, including code samples, Dockerization, CI/CD pipeline setup, and AWS deployment. We’ll use AWS Elastic Container Service (ECS) for the deployment, which is simpler to integrate with GitHub Actions than EKS, and will focus on using the Fargate launch type for serverless containers.

### Overview

This guide includes:
1. Setting up a basic Node.js CRUD API with MongoDB
2. Dockerizing the application
3. Creating a CI/CD pipeline with GitHub Actions
4. Deploying the application to AWS ECS with MongoDB Atlas as the database

---

### 1. Create a Basic Node.js CRUD API

Start by creating a simple Node.js application with MongoDB as the database.

#### Step 1: Initialize Node.js Project

Create a new directory for the project and initialize it:
```bash
mkdir node-crud-app
cd node-crud-app
npm init -y
npm install express mongoose dotenv body-parser
```

#### Step 2: Directory Structure

```plaintext
node-crud-app/
├── .env
├── app.js
├── models/
│   └── Item.js
├── routes/
│   └── items.js
└── Dockerfile
```

#### Step 3: Create CRUD Endpoints

1. **app.js** - This is the main file that sets up the Express server.

   ```javascript
   const express = require("express");
   const mongoose = require("mongoose");
   const bodyParser = require("body-parser");
   require("dotenv").config();

   const app = express();
   const port = process.env.PORT || 3000;

   app.use(bodyParser.json());

   mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log("MongoDB connected"))
     .catch(err => console.log(err));

   const itemsRoute = require("./routes/items");
   app.use("/api/items", itemsRoute);

   app.listen(port, () => console.log(`Server running on port ${port}`));
   ```

2. **models/Item.js** - Defines the data schema for MongoDB.

   ```javascript
   const mongoose = require("mongoose");

   const ItemSchema = mongoose.Schema({
     name: String,
     description: String,
     quantity: Number,
   });

   module.exports = mongoose.model("Item", ItemSchema);
   ```

3. **routes/items.js** - Sets up CRUD routes for items.

   ```javascript
   const express = require("express");
   const router = express.Router();
   const Item = require("../models/Item");

   // Create item
   router.post("/", async (req, res) => {
     const item = new Item(req.body);
     await item.save();
     res.send(item);
   });

   // Get all items
   router.get("/", async (req, res) => {
     const items = await Item.find();
     res.send(items);
   });

   // Get item by ID
   router.get("/:id", async (req, res) => {
     const item = await Item.findById(req.params.id);
     res.send(item);
   });

   // Update item by ID
   router.put("/:id", async (req, res) => {
     const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
     res.send(item);
   });

   // Delete item by ID
   router.delete("/:id", async (req, res) => {
     await Item.findByIdAndDelete(req.params.id);
     res.send({ message: "Item deleted" });
   });

   module.exports = router;
   ```

4. **.env** - Store environment variables here, especially sensitive information like MongoDB URI.
   ```plaintext
   PORT=3000
   MONGO_URI="your_mongo_uri_here"
   ```

---

### 2. Dockerize the Application

1. **Dockerfile** - Create a Dockerfile to containerize the app.

   ```dockerfile
   # Use the official Node.js image as the base image
   FROM node:14

   # Create and set the working directory
   WORKDIR /usr/src/app

   # Copy package.json and install dependencies
   COPY package*.json ./
   RUN npm install

   # Copy the app source code
   COPY . .

   # Expose the application port
   EXPOSE 3000

   # Start the application
   CMD ["node", "app.js"]
   ```

2. **Docker Commands** - Build and test the Docker image locally:

   ```bash
   docker build -t node-crud-app .
   docker run -p 3000:3000 --env-file .env node-crud-app
   ```

---

### 3. Set Up CI/CD with GitHub Actions

To automate the build, test, and deployment process, create a GitHub Actions workflow.

1. **GitHub Secrets** - In your GitHub repository settings, add these secrets:
   - `AWS_ACCESS_KEY_ID` – Your AWS access key
   - `AWS_SECRET_ACCESS_KEY` – Your AWS secret access key
   - `ECR_REPOSITORY` – The ECR repository URI (e.g., `123456789012.dkr.ecr.us-east-1.amazonaws.com/node-crud-app`)

2. **GitHub Actions Workflow File**

   Create a `.github/workflows/deploy.yml` file in your repository with the following content:

   ```yaml
   name: CI/CD Pipeline

   on:
     push:
       branches:
         - main

   jobs:
     build:
       runs-on: ubuntu-latest

       steps:
       - name: Checkout code
         uses: actions/checkout@v2

       - name: Log in to ECR
         env:
           AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
           AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
         run: |
           aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${{ secrets.ECR_REPOSITORY }}

       - name: Build and Push Docker image to ECR
         env:
           ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY }}
         run: |
           docker build -t node-crud-app .
           docker tag node-crud-app:latest $ECR_REPOSITORY:latest
           docker push $ECR_REPOSITORY:latest

     deploy:
       runs-on: ubuntu-latest
       needs: build

       steps:
       - name: Configure AWS credentials
         uses: aws-actions/configure-aws-credentials@v1
         with:
           aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
           aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
           aws-region: us-east-1

       - name: Deploy to ECS
         run: |
           aws ecs update-service --cluster <your-cluster-name> --service <your-service-name> --force-new-deployment
   ```

   This workflow does the following:
   - **Build** and **push** Docker images to ECR.
   - **Deploy** to ECS by triggering a new deployment.

---

### 4. Deploying on AWS ECS

1. **Set Up ECR Repository** - Create a repository in AWS ECR to store the Docker image.
   - In the AWS Management Console, go to ECR, create a new repository, and note its URI.

2. **Configure ECS Cluster and Service**:
   - In the AWS ECS console, create a new cluster and configure it to use Fargate.
   - Define a **Task Definition** specifying the container image and resource requirements.
   - Create a **Service** that uses this Task Definition to run the containers.

3. **MongoDB Setup**:
   - Use MongoDB Atlas or another managed MongoDB service, and connect it to your Node.js application by providing the `MONGO_URI` environment variable.
   
4. **Update GitHub Workflow for ECS Deployment**:
   - Your GitHub Actions file will trigger the ECS deployment automatically on every push to the main branch.

---

### Summary

This guide covered building a Node.js CRUD API, Dockerizing it, setting up GitHub Actions for CI/CD, and deploying it on AWS ECS with Fargate. Each step enables you to build, test, and deploy in a secure, scalable, and automated manner. 

---

[<- README](../README.md) | [<- Docker](docker.md)

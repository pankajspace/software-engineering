[<- Cloud](cloud-quick.md)

## Amazon ECS (Elastic Container Service)

AWS ECS (Elastic Container Service) is a fully managed container orchestration service that allows you to run, stop, and manage containers on a cluster of virtual machines. It integrates deeply with other AWS services, making it a popular choice for deploying containerized applications.

### Key Concepts in AWS ECS

1. **Cluster**: A logical group of EC2 instances (or servers) that ECS uses to run your containerized applications. You can choose to have EC2-based clusters (using EC2 instances to run your containers) or Fargate clusters (which do not require you to manage any servers; AWS manages the infrastructure for you).

2. **Task Definition**: A blueprint that defines how your container should behave. It includes things like:
   - The Docker image to use.
   - CPU and memory allocation.
   - Networking details.
   - Volumes.
   - Logging configuration.

3. **Task**: A running instance of a task definition. It’s what actually runs your containerized application.

4. **Service**: A service ensures that a specified number of tasks are running in your cluster. If a task fails or stops, the service will launch a new task.

5. **ECS Agent**: Runs on each EC2 instance in your cluster and communicates with the ECS service.

6. **Fargate**: A serverless option where you do not manage the infrastructure (EC2 instances). You only specify how much CPU and memory you need, and AWS handles the rest.

### Setting Up a Node.js App on AWS ECS with Fargate

Let’s go step by step to deploy a simple Node.js app using AWS ECS with Fargate.

#### Step 1: Prepare the Node.js App

1. Create a simple `Node.js` app in a folder called `app/`.

```js
// app/index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, ECS Fargate!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

2. Create a `Dockerfile` in the same directory to containerize the app.

```dockerfile
# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
```

3. Build the Docker image:

```bash
docker build -t my-nodejs-app .
```

4. Test the image locally:

```bash
docker run -p 3000:3000 my-nodejs-app
```

#### Step 2: Push the Docker Image to Amazon ECR

Amazon Elastic Container Registry (ECR) is a fully managed container registry by AWS.

1. Create an ECR repository:

```bash
aws ecr create-repository --repository-name my-nodejs-app
```

2. Tag the Docker image for ECR:

```bash
docker tag my-nodejs-app:latest <aws-account-id>.dkr.ecr.<region>.amazonaws.com/my-nodejs-app:latest
```

3. Authenticate Docker to your ECR repository:

```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<region>.amazonaws.com
```

4. Push the Docker image to ECR:

```bash
docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/my-nodejs-app:latest
```

#### Step 3: Create ECS Cluster

1. In the AWS Management Console, navigate to **ECS** and create a new cluster. Choose the "Networking only" option to use AWS Fargate.
2. Configure your VPC and subnets for networking. This ensures that your containers are isolated and have proper access to the internet if needed.

#### Step 4: Define Task Definition

1. In the ECS Console, create a new Task Definition.
2. Choose **Fargate** as the launch type.
3. In the task definition, specify the following:
   - Container image: Use the ECR URI of the image you pushed earlier.
   - Memory and CPU requirements.
   - Port mappings: Map port 3000 of your container to port 80 of the host.

#### Step 5: Create a Service

1. Create a new service from the task definition.
2. Set the number of tasks you want to run (e.g., 1 task).
3. Configure the service to use a load balancer (if you want to make the service publicly available).

#### Step 6: Access the Node.js App

Once the service is running, you can access the Node.js app via the public IP or DNS name of the load balancer (or via direct IP if no load balancer is used).

#### Optional: Use Autoscaling and Monitoring

1. **Autoscaling**: ECS services support autoscaling based on CPU or memory utilization. This can automatically adjust the number of running tasks to handle increased load.
2. **CloudWatch Logs**: Use AWS CloudWatch to monitor logs and track metrics of your Node.js application, making it easier to debug and scale effectively.

### Summary of Steps

1. **Prepare and containerize the Node.js app**.
2. **Push the Docker image to Amazon ECR**.
3. **Create an ECS cluster**.
4. **Define a Task Definition** for your Node.js app.
5. **Create a Service** to manage tasks and scale your app.
6. **Access the app** through the service’s endpoint.

This is a basic example, but AWS ECS supports much more complex setups with autoscaling, load balancing, and integration with other AWS services like RDS (for databases), S3 (for storage), and Lambda (for serverless operations).

---

[<- Cloud](cloud-quick.md)

[<- Microservices](microservices-quick.md)

# Node.js Microservices with Docker, AWS EC2, GitHub Actions

To create and deploy two Node.js microservices on AWS using Docker, EC2, and GitHub Actions for CI/CD, follow these steps:

## Step-by-Step Guide

1. **Create Two Node.js Microservices**
2. **Dockerize Both Microservices**
3. **Set Up AWS EC2 Instances**
4. **Push Code to GitHub**
5. **Create GitHub Actions for CI/CD**

### Step 1: Create Two Node.js Microservices

Let’s create two simple microservices, a **User Service** and an **Order Service**.

#### 1.1 User Service

Create a `user-service` folder with `app.js` and a `package.json` file.

1. **Initialize Node.js**:
   ```bash
   mkdir user-service
   cd user-service
   npm init -y
   npm install express
   ```

2. **Add app.js**:
   ```javascript
   // user-service/app.js
   const express = require('express');
   const app = express();
   const PORT = process.env.PORT || 3000;

   app.get('/user', (req, res) => {
     res.json({ message: 'Hello from User Service!' });
   });

   app.listen(PORT, () => {
     console.log(`User Service running on port ${PORT}`);
   });
   ```

#### 1.2 Order Service

Repeat similar steps for the **Order Service**:

1. **Initialize Node.js**:
   ```bash
   mkdir order-service
   cd order-service
   npm init -y
   npm install express
   ```

2. **Add app.js**:
   ```javascript
   // order-service/app.js
   const express = require('express');
   const app = express();
   const PORT = process.env.PORT || 3000;

   app.get('/order', (req, res) => {
     res.json({ message: 'Hello from Order Service!' });
   });

   app.listen(PORT, () => {
     console.log(`Order Service running on port ${PORT}`);
   });
   ```

---

### Step 2: Dockerize Both Microservices

#### 2.1 Create Dockerfiles

Add Dockerfiles to each service directory.

1. **User Service Dockerfile**:
   ```dockerfile
   # user-service/Dockerfile
   FROM node:14-alpine

   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["node", "app.js"]
   ```

2. **Order Service Dockerfile**:
   ```dockerfile
   # order-service/Dockerfile
   FROM node:14-alpine

   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["node", "app.js"]
   ```

#### 2.2 Build Docker Images

Optionally, build and test the Docker images locally:

```bash
cd user-service
docker build -t user-service .
docker run -p 3001:3000 user-service
```

Repeat for `order-service`:

```bash
cd order-service
docker build -t order-service .
docker run -p 3002:3000 order-service
```

---

### Step 3: Set Up AWS EC2 Instance

#### 3.1 Launch an EC2 Instance

1. Log in to AWS Console and navigate to **EC2**.
2. Launch an instance with **Amazon Linux 2 AMI**.
3. Configure security groups to allow inbound traffic on ports:
   - **22** for SSH
   - **3000-3002** for your services (you may use a load balancer later to manage this).
4. SSH into the EC2 instance once launched.

#### 3.2 Install Docker on EC2

1. **Update Packages**:
   ```bash
   sudo yum update -y
   ```

2. **Install Docker**:
   ```bash
   sudo amazon-linux-extras install docker
   sudo service docker start
   ```

3. **Add EC2 User to Docker Group**:
   ```bash
   sudo usermod -a -G docker ec2-user
   ```

4. **Log out and log back in** to apply group changes.

#### 3.3 Log in to Docker Hub (Optional)

You’ll need Docker Hub for GitHub Actions to push images, but on the EC2 instance, you’ll pull from Docker Hub:

```bash
docker login
```

---

### Step 4: Push Code to GitHub

Create a new repository on GitHub and push the `user-service` and `order-service` folders to it.

1. **Initialize Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

---

### Step 5: Create GitHub Actions for CI/CD

GitHub Actions will automate the Docker build and deploy process to AWS EC2.

#### 5.1 Create Workflow File

1. In your repository, navigate to **Actions** > **New Workflow** > **Set up a workflow yourself**.
2. Create `.github/workflows/deploy.yml` with the following content:

   ```yaml
   name: Build and Deploy to EC2

   on:
     push:
       branches:
         - main

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest

       steps:
         - name: Check out the code
           uses: actions/checkout@v2

         - name: Log in to Docker Hub
           run: echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin

         - name: Build User Service Image
           run: |
             cd user-service
             docker build -t user-service .
             docker tag user-service ${{ secrets.DOCKER_USERNAME }}/user-service
             docker push ${{ secrets.DOCKER_USERNAME }}/user-service

         - name: Build Order Service Image
           run: |
             cd order-service
             docker build -t order-service .
             docker tag order-service ${{ secrets.DOCKER_USERNAME }}/order-service
             docker push ${{ secrets.DOCKER_USERNAME }}/order-service

         - name: SSH into EC2 and Deploy
           uses: appleboy/ssh-action@v0.1.4
           with:
             host: ${{ secrets.EC2_HOST }}
             username: ec2-user
             key: ${{ secrets.EC2_KEY }}
             script: |
               docker pull ${{ secrets.DOCKER_USERNAME }}/user-service
               docker pull ${{ secrets.DOCKER_USERNAME }}/order-service
               docker stop user-service || true
               docker stop order-service || true
               docker rm user-service || true
               docker rm order-service || true
               docker run -d -p 3000:3000 --name user-service ${{ secrets.DOCKER_USERNAME }}/user-service
               docker run -d -p 3001:3000 --name order-service ${{ secrets.DOCKER_USERNAME }}/order-service
   ```

#### 5.2 Set GitHub Secrets

Go to **Settings > Secrets > Actions** in your GitHub repository, and add the following secrets:

- **DOCKER_USERNAME**: Your Docker Hub username.
- **DOCKER_PASSWORD**: Your Docker Hub password.
- **EC2_HOST**: The public IP or DNS of your EC2 instance.
- **EC2_KEY**: Your SSH private key content (use `cat ~/.ssh/your-key.pem` and copy the content here).

#### 5.3 Push Code and Trigger GitHub Actions

Push any new code changes to the `main` branch to trigger the GitHub Actions workflow:

```bash
git add .
git commit -m "Deploy with GitHub Actions"
git push origin main
```

---

### Step 6: Test the Deployment

Once the deployment completes successfully, you can access your services on the EC2 instance’s public IP:

- **User Service**: `http://<ec2-public-ip>:3000/user`
- **Order Service**: `http://<ec2-public-ip>:3001/order`

---

### Additional Considerations

#### 1. Security Group

Ensure your security group allows access to ports 3000 and 3001 (or your custom ports) on the EC2 instance. For production, consider using a load balancer.

#### 2. Automated Restart

For automatic container restarts after reboots, you can configure Docker Compose or create a systemd service on your EC2 instance.

#### 3. Scaling and Monitoring

For scaling, consider using Amazon ECS or Kubernetes with AWS EKS for a more managed container orchestration solution.

---

By following these steps, you’ve created a robust pipeline for deploying two microservices on AWS EC2 using Docker and GitHub Actions. This setup provides a simple, repeatable deployment process.

---

[<- Microservices](microservices-quick.md)
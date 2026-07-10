[<- MERN](mern-quick.md)

## Deploy Node.js Web Application on AWS EC2 with Docker and GitHub Actions

Here’s a detailed guide to deploying a **Node.js web application** on **AWS EC2** with **Docker**, **GitHub Repo**, and **GitHub Actions** without using ECS or Fargate. This setup focuses on using EC2 instances directly to host your application.

---

### **Overview**
1. Launch an EC2 instance to host the application.
2. Dockerize the Node.js application.
3. Use GitHub Actions to automate CI/CD:
   - Build the Docker image.
   - Push the code and deploy it to the EC2 instance.

---

### **Step 1: Launch and Configure an EC2 Instance**
1. **Launch an EC2 Instance**:
   - Go to the AWS Management Console → **EC2** → **Launch Instance**.
   - Choose:
     - **AMI**: Amazon Linux 2 or Ubuntu 20.04.
     - **Instance Type**: t2.micro (or a higher configuration based on your needs).
     - **Key Pair**: Create/download a key pair for SSH access.
     - **Security Group**:
       - Allow inbound SSH (port 22) for your IP.
       - Allow inbound HTTP (port 80) or any other required port (e.g., 3000 for the Node.js app).

2. **Connect to the EC2 Instance**:
   - SSH into the instance:
     ```bash
     ssh -i <your-key.pem> ec2-user@<your-ec2-public-ip>
     ```

3. **Install Required Software on EC2**:
   - Update the system and install Docker:
     ```bash
     sudo yum update -y
     sudo yum install -y docker git
     sudo service docker start
     sudo usermod -aG docker ec2-user
     ```
   - Reconnect to apply Docker group changes.

---

### **Step 2: Dockerize the Node.js Application**
1. **Create a Node.js Application**:
   - Structure your app as:
     ```
     /node-app
     ├── app.js
     ├── package.json
     ├── Dockerfile
     ├── .dockerignore
     ```
   - Example `app.js`:
     ```javascript
     const express = require('express');
     const app = express();

     app.get('/', (req, res) => {
       res.send('Hello, Node.js on EC2 with Docker!');
     });

     const PORT = process.env.PORT || 3000;
     app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
     });
     ```

   - Example `package.json`:
     ```json
     {
       "name": "node-app",
       "version": "1.0.0",
       "main": "app.js",
       "dependencies": {
         "express": "^4.18.2"
       }
     }
     ```

   - Example `Dockerfile`:
     ```dockerfile
     FROM node:18

     WORKDIR /usr/src/app

     COPY package*.json ./
     RUN npm install

     COPY . .

     EXPOSE 3000
     CMD ["node", "app.js"]
     ```

   - Example `.dockerignore`:
     ```text
     node_modules
     npm-debug.log
     ```

2. **Push the Code to GitHub**:
   - Commit your code and push it to a GitHub repository:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin https://github.com/<your-username>/<your-repo>.git
     git push -u origin main
     ```

---

### **Step 3: Automate Deployment with GitHub Actions**
1. **Set Up Secrets in GitHub**:
   - Go to your repository → **Settings** → **Secrets and Variables** → **Actions**.
   - Add the following secrets:
     - `EC2_PUBLIC_IP`: Public IP address of your EC2 instance.
     - `EC2_USER`: Username for SSH (usually `ec2-user`).
     - `PRIVATE_KEY`: Your EC2 private key content (e.g., the `.pem` file). Ensure this is added as a multiline value.

2. **Create a GitHub Actions Workflow**:
   - Add a workflow file in `.github/workflows/deploy.yml`:
     ```yaml
     name: Deploy to EC2

     on:
       push:
         branches:
           - main

     jobs:
       deploy:
         runs-on: ubuntu-latest

         steps:
         - name: Checkout code
           uses: actions/checkout@v3

         - name: Set up SSH
           run: |
             mkdir -p ~/.ssh
             echo "${{ secrets.PRIVATE_KEY }}" > ~/.ssh/id_rsa
             chmod 600 ~/.ssh/id_rsa

         - name: Copy files to EC2
           run: |
             scp -o StrictHostKeyChecking=no -r . ec2-user@${{ secrets.EC2_PUBLIC_IP }}:/home/ec2-user/node-app

         - name: Deploy app on EC2
           run: |
             ssh -o StrictHostKeyChecking=no ec2-user@${{ secrets.EC2_PUBLIC_IP }} << 'EOF'
             cd /home/ec2-user/node-app
             docker build -t node-app .
             docker stop node-app || true
             docker rm node-app || true
             docker run -d -p 3000:3000 --name node-app node-app
             EOF
     ```

---

### **Step 4: Test the Deployment**
1. **Push Code to GitHub**:
   - Commit and push your changes:
     ```bash
     git add .
     git commit -m "Add GitHub Actions workflow"
     git push origin main
     ```

2. **GitHub Actions Execution**:
   - Go to your repository → **Actions** → Check the workflow logs.
   - Ensure that the app is deployed successfully on the EC2 instance.

3. **Access the Application**:
   - Open your browser and navigate to:
     ```
     http://<ec2-public-ip>:3000
     ```

---

### **Step 5: Optimize the Deployment**
1. **Use Nginx as a Reverse Proxy**:
   - Install Nginx on the EC2 instance:
     ```bash
     sudo yum install -y nginx
     sudo systemctl start nginx
     ```
   - Configure Nginx to forward traffic to the Docker container:
     ```nginx
     server {
         listen 80;
         server_name _;

         location / {
             proxy_pass http://127.0.0.1:3000;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection 'upgrade';
             proxy_set_header Host $host;
             proxy_cache_bypass $http_upgrade;
         }
     }
     ```
   - Restart Nginx:
     ```bash
     sudo systemctl restart nginx
     ```

2. **Secure the Instance**:
   - Use **AWS Systems Manager** for management.
   - Set up **firewall rules** in your security group to restrict access.

3. **Enable HTTPS**:
   - Use **Let’s Encrypt** or **AWS Certificate Manager** with Nginx to enable HTTPS.

4. **Monitor the Instance**:
   - Install **CloudWatch Agent** on the EC2 instance to monitor CPU, memory, and logs.

---

### **Best Practices**
1. **Scalability**:
   - Use an **Auto Scaling Group** to handle traffic spikes by adding/removing EC2 instances.

2. **Zero-Downtime Deployment**:
   - Use a load balancer to distribute traffic between multiple EC2 instances during deployments.

3. **Data Persistence**:
   - Use a **mounted volume** or **S3** bucket for storing data outside the container.

4. **Logging**:
   - Forward application and Nginx logs to **CloudWatch Logs** for centralized logging.

---

This guide outlines the complete setup to deploy your Node.js app on AWS EC2 with Docker, GitHub Actions, and a fully automated pipeline. Let me know if you need help with specific configurations!

---

## Steps to add load balancer to the setup

To implement **load balancing** for your Node.js app hosted on **AWS EC2**, you can use an **AWS Application Load Balancer (ALB)**. Here's how you can set it up step by step:

---

### **Steps to Add Load Balancing**

#### **1. Launch Multiple EC2 Instances**
1. **Launch Additional EC2 Instances**:
   - Launch two or more EC2 instances using the same AMI and configurations as your existing instance.
   - Ensure Docker is installed, and your Node.js app is running on these instances.

2. **Install and Configure the App**:
   - SSH into each EC2 instance, pull the application code from GitHub, build the Docker container, and start the app on port `3000` (or your app's port).

   Example:
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd node-app
   docker build -t node-app .
   docker run -d -p 3000:3000 --name node-app node-app
   ```

---

#### **2. Create an Application Load Balancer (ALB)**
1. **Go to AWS Management Console**:
   - Navigate to **EC2 Dashboard** → **Load Balancers** → **Create Load Balancer**.

2. **Select Application Load Balancer**:
   - Choose **Application Load Balancer (ALB)**.
   - Set the load balancer type to **Internet-facing** (for public traffic).
   - Listener: Keep the default listener on **HTTP (port 80)**.
   - Configure the VPC and subnets (choose at least two subnets for high availability).

3. **Configure Security Groups**:
   - Use a security group that allows inbound HTTP (port 80) traffic.
   - The same security group must allow traffic from the load balancer to the EC2 instances (e.g., traffic on port `3000`).

---

#### **3. Create a Target Group**
1. **Navigate to Target Groups**:
   - Go to **Target Groups** → **Create Target Group**.

2. **Configure the Target Group**:
   - **Target Type**: Choose **Instance**.
   - **Protocol**: HTTP.
   - **Port**: `3000` (the port where the Node.js app runs inside the Docker container).
   - Register the EC2 instances running the app.

3. **Set Health Checks**:
   - Set a **health check path** (e.g., `/`) to verify the health of your application.
   - Customize health check parameters like the **timeout**, **interval**, and **success thresholds**.

4. **Register Targets**:
   - Add your EC2 instances as **targets** in the target group.

---

#### **4. Link the ALB to the Target Group**
1. **Attach the Target Group to the ALB**:
   - Under the **Listeners** section of the ALB configuration, add a rule to forward traffic from the load balancer to your target group.

2. **Review and Create**:
   - Review your ALB configuration and create the load balancer.

---

#### **5. Test the Load Balancer**
1. **Get the DNS Name**:
   - Once the ALB is created, find its **DNS name** in the Load Balancer details section (e.g., `http://my-load-balancer-1234567890.us-east-1.elb.amazonaws.com`).

2. **Access the Application**:
   - Open the DNS name in a browser:
     ```
     http://<ALB-DNS-Name>
     ```

3. **Verify Load Balancing**:
   - Stop the Docker container on one of the EC2 instances and ensure the ALB automatically routes traffic to the healthy instances.

---

### **Optional Enhancements**

#### **1. Enable HTTPS**
- Use **AWS Certificate Manager (ACM)** to create or import an SSL/TLS certificate.
- Update the ALB to use **HTTPS** as a listener with the certificate.

#### **2. Use Auto Scaling**
1. **Create an Auto Scaling Group (ASG)**:
   - Navigate to the **Auto Scaling Groups** section of the EC2 dashboard.
   - Create an ASG with your EC2 instances.
   - Attach the ASG to the target group used by the ALB.

2. **Set Scaling Policies**:
   - Configure the ASG to scale out (add instances) based on metrics like **CPU usage** or **network traffic**.

#### **3. Use Private Subnets for EC2 Instances**
- Place your EC2 instances in private subnets for additional security.
- Use the ALB in public subnets to expose the application.

#### **4. Centralized Logging**
- Use **AWS CloudWatch** or an external logging tool to centralize and monitor logs from all EC2 instances.

#### **5. Set Up Sticky Sessions (Optional)**
- If your application requires session persistence, enable **sticky sessions** in the ALB configuration.

---

### **Architecture Summary**
- **Client** → **AWS ALB** → **EC2 Instances** (with Dockerized Node.js app).
- ALB handles load balancing and forwards traffic to healthy instances.
- Optional Auto Scaling ensures your application scales based on traffic demand.

---

Let me know if you'd like further details on any specific part (e.g., HTTPS setup, Auto Scaling, or Nginx)!

---

[<- MERN](mern-quick.md)

[<- Cloud](cloud-quick.md)

# AWS VPC

## AWS VPC with Node.js Example

AWS VPC (Virtual Private Cloud) is a service that allows you to provision a logically isolated section of AWS where you can launch AWS resources like EC2 instances in a virtual network that you define. Using VPC, you can have complete control over your network configuration, such as subnets, routing tables, and security groups.

In this example, we will create a VPC and deploy a Node.js application inside an EC2 instance within the VPC.

## Key Features of AWS VPC

1. Subnets: VPC divides the network into subnets, which can be either public (connected to the internet) or private.
2. Security: Use security groups and network ACLs to control access to resources inside the VPC.
3. Routing Tables: Define how traffic flows between subnets and to the internet.
4. NAT Gateway: Allows instances in private subnets to access the internet without exposing them publicly.
5. VPN Connections: VPC allows you to connect securely to your on-premise infrastructure.

---

## Use Case: Running a Node.js App Inside an AWS VPC

We will:
1. Create a VPC with public and private subnets.
2. Launch an EC2 instance in the public subnet to host a Node.js application.
3. Access the Node.js app from the internet.

---

## Step-by-Step Guide: Deploying a Node.js App in AWS VPC

---

## Step 1: Create a VPC

1. Go to the VPC Console in AWS.
2. Click Create VPC and set the following:
   - VPC Name: `my-node-vpc`
   - IPv4 CIDR block: `10.0.0.0/16` (this provides a range of IP addresses for the VPC)
3. Click Create VPC.

### Create Subnets
Now we need two subnets: one public and one private.

1. Create Public Subnet:
   - Click Create Subnet.
   - Select the VPC you created (`my-node-vpc`).
   - Name the subnet (e.g., `public-subnet`).
   - Set the IPv4 CIDR block as `10.0.1.0/24` (a subset of the VPC's range).
2. Create Private Subnet:
   - Click Create Subnet.
   - Name the subnet (e.g., `private-subnet`).
   - Set the IPv4 CIDR block as `10.0.2.0/24`.

---

## Step 2: Set Up an Internet Gateway

1. Go to the VPC Console and click Internet Gateways.
2. Click Create Internet Gateway and name it (e.g., `my-node-igw`).
3. Attach the Internet Gateway to your VPC (`my-node-vpc`).

---

## Step 3: Set Up a Route Table

Now, we will configure routing so that instances in the public subnet can access the internet.

1. Go to the VPC Console → Route Tables.
2. Select the main route table associated with your VPC and click Edit Routes.
3. Add a new route:
   - Destination: `0.0.0.0/0` (for all internet traffic).
   - Target: Select the Internet Gateway you created (`my-node-igw`).

4. Associate this route table with your public subnet.
   - Click Subnet Associations and associate the route table with the public-subnet.

---

## Step 4: Launch an EC2 Instance in the Public Subnet

We will now launch an EC2 instance to host our Node.js application.

1. Go to the EC2 Console and click Launch Instance.
2. Select the Amazon Linux 2 AMI.
3. Choose an instance type like t2.micro (free tier eligible).
4. Configure the instance:
   - Network: Select your VPC (`my-node-vpc`).
   - Subnet: Select the public-subnet.
   - Auto-assign Public IP: Enable this option to get a public IP address.
5. Create a new security group that allows HTTP (port 80) and SSH (port 22) access from anywhere (`0.0.0.0/0`).
6. Launch the instance and connect using SSH.

---

## Step 5: Install Node.js and Deploy the Application

Once your EC2 instance is running, connect to it via SSH and install Node.js.

### 5.1 Connect to EC2 via SSH

Use the following command to connect (replace `your-key.pem` with your key file and `ec2-user@public-ip` with your instance's public IP):

```bash
ssh -i "your-key.pem" ec2-user@your-public-ip
```

### 5.2 Install Node.js on EC2

1. Update the package repository:
   ```bash
   sudo yum update -y
   ```

2. Install Node.js and npm:
   ```bash
   sudo yum install -y nodejs npm
   ```

### 5.3 Create a Simple Node.js App

1. Create a new directory for the app:
   ```bash
   mkdir my-app
   cd my-app
   ```

2. Initialize a new Node.js project:
   ```bash
   npm init -y
   ```

3. Install Express.js:
   ```bash
   npm install express
   ```

4. Create an `app.js` file with the following content:

   ```javascript
   const express = require('express');
   const app = express();

   app.get('/', (req, res) => {
       res.send('Hello from Node.js running in AWS VPC!');
   });

   const PORT = process.env.PORT || 80;
   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
   ```

### 5.4 Run the Node.js App

Run the Node.js app using the following command:

```bash
node app.js
```

Your Node.js app should now be running on port 80.

---

## Step 6: Access the Application

To access your Node.js application, open a browser and navigate to the public IP of your EC2 instance. You should see:

```
Hello from Node.js running in AWS VPC!
```

---

## Step 7: Secure the VPC (Optional)

### Use Security Groups

Ensure that your security group only allows access to required ports. For example:
- HTTP (Port 80): Allow access from `0.0.0.0/0`.
- SSH (Port 22): Restrict access to your IP only.

### Use a NAT Gateway for Private Subnets (Optional)

If you have instances in private subnets that need internet access, you can set up a NAT Gateway in the public subnet. This allows outbound internet access without exposing instances to the public internet.

---

## Best Practices for AWS VPC with Node.js

1. Use Private Subnets: For security, consider deploying databases or sensitive services in private subnets and keep only public-facing applications in public subnets.
2. Use Security Groups: Ensure your EC2 instances have proper security group rules to control traffic.
3. Use NAT Gateway: If you need private instances to access the internet, use a NAT gateway to allow outbound internet access without exposing them publicly.
4. Monitor Traffic: Use VPC Flow Logs to monitor traffic in and out of your VPC and identify potential issues.
5. Set Up Auto-Scaling: Use EC2 Auto Scaling for high availability and scalability.

---

## Conclusion

AWS VPC provides a highly customizable, secure virtual network environment for running applications like Node.js. By deploying your Node.js app inside an EC2 instance in a VPC, you gain full control over your networking, routing, and security configurations. Whether you're running public web applications or private services, VPC ensures your infrastructure is secure and scalable.

---

[<- Cloud](cloud-quick.md)

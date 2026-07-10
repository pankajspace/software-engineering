[<- Cloud](cloud-quick.md)

# AWS EC2

## AWS EC2 (Elastic Compute Cloud) Overview

Amazon EC2 (Elastic Compute Cloud) is a web service that provides resizable compute capacity in the cloud. It allows you to launch virtual servers, known as EC2 instances, which can run various operating systems and software configurations. EC2 enables you to scale computing resources up or down, making it easy to accommodate varying workloads.

## Key Features of EC2

1. Virtual Servers: EC2 instances act like virtual servers that can run any OS, such as Linux or Windows.
2. Scalability: You can easily scale your EC2 instances to handle varying amounts of traffic.
3. Pay-As-You-Go: You only pay for the compute resources you use.
4. Instance Types: EC2 offers different instance types optimized for specific use cases, such as compute-intensive, memory-intensive, or storage-optimized workloads.
5. Security: EC2 integrates with AWS Identity and Access Management (IAM) for secure access management, and you can configure firewalls with security groups.

---

## Core Components of EC2

- Instances: Virtual servers that run your applications.
- AMI (Amazon Machine Image): A pre-configured template used to launch EC2 instances.
- Instance Types: Different types of instances optimized for specific purposes (e.g., t2.micro, m5.large).
- Security Groups: Virtual firewalls that control inbound and outbound traffic for instances.
- Elastic IP: A static public IP address you can associate with an instance.
- EBS (Elastic Block Store): Persistent block storage for EC2 instances.
- Auto Scaling: Automatically adjust the number of EC2 instances in response to changing demand.

---

## Example 1: Launching a Simple EC2 Instance

In this example, we’ll launch a basic EC2 instance with an Amazon Linux operating system.

### Step 1: Select an AMI
1. Go to the EC2 Console.
2. Click Launch Instance.
3. Select an AMI (Amazon Machine Image). For this example, choose Amazon Linux 2 AMI.

### Step 2: Choose an Instance Type
1. Choose the t2.micro instance type, which is eligible for the AWS Free Tier.
2. Click Next: Configure Instance Details.

### Step 3: Configure Instance Details
1. Set the default settings (e.g., the number of instances, network, etc.).
2. You can enable auto-scaling if needed.

### Step 4: Add Storage
1. By default, EC2 creates an 8GB EBS volume. You can modify the storage size if required.
2. Click Next: Add Tags.

### Step 5: Configure Security Group
1. Create a new security group with an inbound rule that allows SSH access (port 22) from your IP.
2. Optionally, add rules to allow HTTP/HTTPS traffic if you're hosting a web application.

### Step 6: Review and Launch
1. Review the configuration and click Launch.
2. Create or select an existing SSH key pair to connect to the instance.
3. Launch the instance.

Once the instance is launched, you can connect to it via SSH using the key pair you created.

### Connecting to the EC2 Instance
Use the following SSH command to connect to your instance (replace the IP address and key file name):

```bash
ssh -i "your-key-file.pem" ec2-user@your-ec2-instance-ip
```

---

## Example 2: Hosting a Web Server on EC2 (Apache)

In this example, we’ll set up an Apache web server on an EC2 instance running Amazon Linux.

### Step 1: Launch an EC2 Instance
Follow the same steps as Example 1 to launch an EC2 instance with Amazon Linux 2.

### Step 2: Connect to the EC2 Instance
Use the SSH command to connect to the instance:

```bash
ssh -i "your-key-file.pem" ec2-user@your-ec2-instance-ip
```

### Step 3: Install Apache
Run the following commands to install and start Apache:

```bash
sudo yum update -y
sudo yum install httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd
```

### Step 4: Configure Security Group
In the EC2 Console, update your security group to allow HTTP traffic on port 80.

1. Go to Security Groups.
2. Find the security group associated with your instance.
3. Add an inbound rule to allow HTTP traffic on port 80 from anywhere (`0.0.0.0/0`).

### Step 5: Access the Web Server
Open a web browser and visit the public IP address of your EC2 instance. You should see the Apache default page.

```
http://your-ec2-instance-ip
```

You now have a web server running on EC2!

---

## Example 3: Using EC2 Auto Scaling

Auto Scaling ensures that your application always has the right number of EC2 instances to handle traffic, scaling up when demand increases and scaling down when demand decreases.

### Step 1: Create a Launch Template
1. In the EC2 Console, go to Launch Templates.
2. Click Create Launch Template.
3. Name your template and select the Amazon Linux 2 AMI.
4. Choose an Instance Type (e.g., `t2.micro`).
5. Configure the necessary instance details (e.g., security groups, key pairs).
6. Click Create Launch Template.

### Step 2: Create an Auto Scaling Group
1. In the EC2 Console, go to Auto Scaling Groups.
2. Click Create Auto Scaling Group.
3. Choose the launch template created in Step 1.
4. Set the desired, minimum, and maximum number of instances.
   - Desired capacity: 2
   - Minimum capacity: 1
   - Maximum capacity: 4
5. Select a target VPC and subnet.
6. Configure scaling policies based on metrics like CPU utilization (e.g., scale up when CPU usage exceeds 70%).

### Step 3: Monitor Auto Scaling
Once configured, EC2 Auto Scaling will automatically adjust the number of instances based on demand, ensuring your application is always responsive and cost-efficient.

---

## Example 4: Creating an EC2 Spot Instance

Spot Instances allow you to take advantage of unused EC2 capacity at a significant discount. They are ideal for workloads that are flexible and can tolerate interruptions.

### Step 1: Request a Spot Instance
1. Go to the EC2 Console and click Spot Requests.
2. Click Request Spot Instances.
3. Select an AMI (e.g., Amazon Linux 2).
4. Choose an Instance Type (e.g., `t2.micro`).
5. Set the Maximum Price you are willing to pay for the instance. AWS will use the lowest available spot price.
6. Click Launch.

### Step 2: Monitor Spot Instance
Once the Spot Instance is launched, you can monitor its status in the EC2 console. If your Spot request is interrupted, the instance will be terminated, but you can configure it to restart if capacity becomes available again.

---

## Example 5: Using EC2 Elastic IP Addresses

Elastic IP addresses are static, public IPv4 addresses that you can assign to an EC2 instance to ensure consistent communication, even after stopping and starting instances.

### Step 1: Allocate an Elastic IP Address
1. In the EC2 Console, go to Elastic IPs.
2. Click Allocate Elastic IP Address.
3. Click Allocate.

### Step 2: Associate the Elastic IP Address with an Instance
1. Go to Elastic IPs in the EC2 console.
2. Select the Elastic IP you allocated.
3. Click Associate Elastic IP Address.
4. Choose your EC2 instance from the dropdown and associate the Elastic IP.

Now, even if you stop and start your instance, it will retain the same public IP address.

---

## Example 6: EC2 Security Groups

Security groups act as virtual firewalls for your EC2 instances, controlling inbound and outbound traffic.

### Step 1: Create a Security Group
1. In the EC2 Console, go to Security Groups.
2. Click Create Security Group.
3. Name your security group and assign it to a VPC.
4. Add an inbound rule to allow SSH traffic on port 22 from your IP.
5. Optionally, add an inbound rule for HTTP traffic on port 80.

### Step 2: Attach the Security Group to an Instance
1. In the EC2 Console, select your instance.
2. Click Actions → Networking → Change Security Groups.
3. Select the security group you created and click Assign Security Groups.

This security group now controls the traffic for your EC2 instance.

---

## Example 7: Using EC2 with AWS CLI

You can manage EC2 instances from the command line using the AWS CLI.

### Step 1: Launch an EC2 Instance via CLI
```bash
aws ec2 run-instances --image-id ami-12345678 --count 1 --instance-type t2.micro --key-name my-key --security-group-ids sg-12345678
```

### Step 2: Stop an EC2 Instance via CLI
```bash
aws ec2 stop-instances --instance-ids i-12345678
```

### Step 3: Terminate an EC2 Instance via CLI
```bash
aws ec2 terminate-in

stances --instance-ids i-12345678
```

---

## Best Practices for Using EC2

1. Use Auto Scaling: Ensure your application can handle variable workloads by using Auto Scaling.
2. Monitor Instances: Use Amazon CloudWatch to monitor the performance and health of your EC2 instances.
3. Use Elastic IPs: Assign Elastic IPs to ensure your instance retains a public IP even after stopping and starting.
4. Leverage Spot Instances: Use Spot Instances for cost savings on workloads that are flexible and can handle interruptions.
5. Secure Your Instances: Always configure security groups and limit inbound traffic to only what's necessary.

---

## Conclusion

AWS EC2 provides a scalable, flexible compute service that allows you to deploy applications in the cloud. By using different instance types, Auto Scaling, Spot Instances, and Elastic IPs, you can optimize cost and performance for your workloads. EC2 integrates seamlessly with other AWS services, making it a core part of many cloud architectures.

---

[<- Cloud](cloud-quick.md)

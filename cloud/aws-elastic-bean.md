[<- Cloud](cloud-quick.md)

# AWS Elastic Beanstalk

## AWS Elastic Beanstalk with Node.js Examples

AWS Elastic Beanstalk is a Platform as a Service (PaaS) that simplifies the deployment and management of applications, including Node.js applications, without worrying about the underlying infrastructure. Elastic Beanstalk handles tasks like provisioning resources (e.g., EC2 instances), load balancing, auto-scaling, and monitoring, allowing you to focus on building your application.

## Key Features of AWS Elastic Beanstalk

1. Simplified Deployment: Deploy Node.js applications by simply uploading your code.
2. Auto-Scaling: Automatically scale your application up or down based on demand.
3. Health Monitoring: Integrated monitoring tools for keeping track of application performance.
4. Multiple Environment Types: You can deploy web apps, APIs, and worker services.
5. Environment Configuration: You can manage environment variables, set up software configurations, and manage capacity settings.

---

## Example 1: Deploying a Simple Node.js Application on AWS Elastic Beanstalk

In this example, we'll create a basic Node.js application and deploy it using Elastic Beanstalk.

### Step 1: Create a Node.js Application

Let’s start by creating a simple Node.js application that serves a web page using Express.

1. Create a new directory for your app:
   ```bash
   mkdir my-node-app
   cd my-node-app
   ```

2. Initialize the Node.js project:
   ```bash
   npm init -y
   ```

3. Install Express:
   ```bash
   npm install express
   ```

4. Create an `app.js` file with the following code:

   ```javascript
   const express = require('express');
   const app = express();

   app.get('/', (req, res) => {
       res.send('Hello from AWS Elastic Beanstalk and Node.js!');
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
   ```

5. Create a `.gitignore` file to avoid uploading unnecessary files:
   ```
   node_modules/
   ```

### Step 2: Initialize Elastic Beanstalk CLI

To deploy this app using Elastic Beanstalk, we need to use the Elastic Beanstalk CLI (EB CLI). If you haven’t installed it yet, follow these steps:

1. Install the EB CLI using pip (Python’s package manager):
   ```bash
   pip install awsebcli --upgrade --user
   ```

2. Initialize the Elastic Beanstalk environment:
   In the root of your application directory, run:
   ```bash
   eb init
   ```

   - Select the AWS region where you want to deploy your application (e.g., `us-east-1`).
   - Choose Node.js as the platform.
   - Provide the AWS access credentials if needed.

### Step 3: Create an Elastic Beanstalk Environment

1. Create and deploy the environment:
   ```bash
   eb create my-node-env
   ```

   Elastic Beanstalk will create an environment with an EC2 instance, a load balancer, and other resources to run your Node.js application.

2. Deploy the application:
   After the environment is created, you can deploy your Node.js app by running:
   ```bash
   eb deploy
   ```

   This will upload the code and deploy the app to Elastic Beanstalk.

### Step 4: Access Your Application

Once the deployment is complete, you will see a URL where your application is accessible. You can access it by running:

```bash
eb open
```

This will open your browser, and you should see the message:
```
Hello from AWS Elastic Beanstalk and Node.js!
```

---

## Example 2: Using Environment Variables in AWS Elastic Beanstalk

Elastic Beanstalk allows you to manage environment variables easily. Let’s modify our application to use environment variables.

### Step 1: Update the Node.js Application

Modify the `app.js` file to display a message stored in an environment variable:

```javascript
const express = require('express');
const app = express();

const message = process.env.MESSAGE || 'Hello from AWS Elastic Beanstalk and Node.js!';

app.get('/', (req, res) => {
    res.send(message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### Step 2: Set Environment Variables in Elastic Beanstalk

1. Go to the AWS Elastic Beanstalk Console.
2. Select your environment (`my-node-env`).
3. Go to the Configuration page.
4. Under Software, click Modify.
5. Scroll to the Environment properties section and add the following key-value pair:
   ```
   MESSAGE = Hello from Elastic Beanstalk with Environment Variables!
   ```

6. Save the changes and redeploy the application.

### Step 3: Verify the Application

Access your application, and you should see the updated message:
```
Hello from Elastic Beanstalk with Environment Variables!
```

---

## Example 3: Auto-Scaling in AWS Elastic Beanstalk

Elastic Beanstalk provides automatic scaling based on traffic. Let’s explore how to configure auto-scaling for your Node.js application.

### Step 1: Enable Auto-Scaling

1. Go to the AWS Elastic Beanstalk Console and select your environment.
2. Click on the Configuration page.
3. Under Capacity, click Modify.
4. You will see options to configure the Auto Scaling group:
   - Minimum instance count: Set this to 1.
   - Maximum instance count: Set this to 4 (to allow up to 4 instances).
5. Save the changes.

### Step 2: Set Scaling Triggers

1. Under Scaling Triggers, set the conditions to scale based on metrics like CPU Utilization.
   - For example, scale up when CPU > 70% and scale down when CPU < 40%.
2. Click Save to apply the changes.

Elastic Beanstalk will automatically scale your environment up or down based on traffic.

---

## Example 4: Managing Deployment with Multiple Environments

Elastic Beanstalk allows you to manage multiple environments, such as a production environment and a staging environment. This is useful for testing changes before deploying them to production.

### Step 1: Create a Staging Environment

1. In the root directory of your application, run the following command to create a staging environment:
   ```bash
   eb create my-node-env-staging
   ```

2. Deploy your app to the staging environment:
   ```bash
   eb deploy
   ```

3. Once deployed, you can test the changes in the staging environment.

### Step 2: Swap Environments

Elastic Beanstalk allows you to swap CNAMEs between environments. This allows you to switch between environments without downtime.

1. After testing your changes in the staging environment, go to the Elastic Beanstalk Console.
2. Select both environments (production and staging) and choose Swap Environment URLs.

Now your staging environment will become the production environment, and the previous production environment will take the staging URL.

---

## Example 5: Monitoring and Logs in Elastic Beanstalk

Elastic Beanstalk provides built-in monitoring and logging features to help you keep track of your Node.js application's performance.

### Step 1: View Environment Health

1. Go to the AWS Elastic Beanstalk Console.
2. Select your environment and click on the Health tab.
3. You can view CPU utilization, request count, and other health metrics.

### Step 2: Access Logs

1. In the Elastic Beanstalk Console, go to the Logs section.
2. Click Request Logs → Full Logs to download and view the logs from your EC2 instances.

You can also integrate CloudWatch for more detailed monitoring and set up alarms to notify you of potential issues.

---

## Best Practices for Using Elastic Beanstalk with Node.js

1. Use Environment Variables: Store sensitive information, such as database credentials or API keys, in environment variables instead of hardcoding them.
2. Enable Auto-Scaling: Use Elastic Beanstalk’s auto-scaling feature to handle traffic spikes and reduce costs when traffic is low.
3. Use Multiple Environments: Separate production and development environments to ensure that changes are tested thoroughly before going live.
4. Monitor Logs: Regularly check your application logs and use CloudWatch to monitor application performance.
5. Regularly Deploy: Deploy frequently to avoid large code changes, which can introduce unexpected bugs.

---

## Conclusion

AWS Elastic Beanstalk simplifies the deployment and management of Node.js applications, allowing you to focus on writing code while AWS handles infrastructure. It provides powerful features like automatic scaling, environment management, and monitoring, making it a great choice for developers looking to deploy web applications without dealing with the complexities of server management.

With Elastic Beanstalk, you can quickly set up development, staging, and production environments and easily manage them through the AWS console or the EB CLI.

---

[<- Cloud](cloud-quick.md)

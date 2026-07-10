[<- Cloud](cloud-quick.md)

# AWS CloudFront

## AWS CloudFront with Node.js Examples

In this guide, we'll cover how to use AWS CloudFront to serve content (both static and dynamic) from a Node.js application. CloudFront, AWS's Content Delivery Network (CDN), can improve performance, security, and scalability for your Node.js application by caching content at edge locations globally.

## Key Concepts of AWS CloudFront

- Origin: The source of your content (e.g., S3 bucket, EC2 instance, or a custom web server like a Node.js app).
- Distribution: A configuration that tells CloudFront where to find the origin and how to cache and serve content.
- Cache Behavior: Determines how CloudFront handles requests, including caching rules, allowed HTTP methods, and TTL settings.
- Edge Locations: CloudFront caches content at these locations to reduce latency for users by serving content from the nearest edge.

---

## Example 1: Serving Static Files Using CloudFront and Node.js

In this example, we will create a simple Node.js application that serves static files, and then use AWS CloudFront to cache and distribute the files globally.

### Step 1: Set Up the Node.js Application

Create a simple Node.js application that serves static files using `express`:

Install Node.js and Express:
```bash
npm init -y
npm install express
```

Create the application (app.js):

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

Create a `public` directory, and place your static files (e.g., `index.html`, `style.css`, etc.) inside this folder.

### Step 2: Deploy the Node.js App on EC2

1. Launch an EC2 instance (Amazon Linux or Ubuntu).
2. Install Node.js on the EC2 instance:

```bash
sudo yum update -y
sudo yum install -y nodejs npm
```

3. Transfer your Node.js app to the EC2 instance (using SCP or Git).
4. Install dependencies and start the server:

```bash
npm install
node app.js
```

5. Make sure your EC2 instance’s security group allows HTTP traffic (port 80).

Your Node.js app should now be running, and you can access it through the EC2 public DNS.

### Step 3: Create a CloudFront Distribution

1. Go to the AWS CloudFront Console.
2. Click Create Distribution.
3. Choose Web as the delivery method.
4. Under Origin Settings:
   - Origin Domain Name: Enter the public DNS of your EC2 instance.
   - Viewer Protocol Policy: Choose Redirect HTTP to HTTPS for security.
   - Set Allowed HTTP Methods: Choose GET, HEAD for static content delivery.
5. Set the default TTL for cache behavior. For static content, you can set a longer TTL, such as 86400 seconds (24 hours).
6. Complete the creation of the CloudFront distribution.

### Step 4: Test the CloudFront Distribution

Once the CloudFront distribution is deployed (this can take a few minutes), you will be provided with a CloudFront Domain Name (e.g., `d12345.cloudfront.net`). Use this domain to access your static content, and CloudFront will serve the content from its edge locations.

For example, if your app serves `index.html`, you can access it via:
```
https://d12345.cloudfront.net/index.html
```

---

## Example 2: Using CloudFront for Dynamic Content with Node.js and API Gateway

In this example, we’ll create a dynamic REST API using Node.js and integrate it with CloudFront via AWS API Gateway.

### Step 1: Create a Node.js REST API

Create a simple Node.js API that returns JSON data.

Install `express` and create the app (api.js):

```javascript
const express = require('express');
const app = express();

app.get('/data', (req, res) => {
    res.json({
        message: "Hello from AWS Lambda and API Gateway!"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### Step 2: Deploy the API on AWS Lambda via API Gateway

1. Create a Lambda Function:
   - Package your Node.js API code into a zip file.
   - Go to the AWS Lambda Console and click Create Function.
   - Upload the zip file and configure your Node.js runtime.

2. Create an API Gateway:
   - Go to the API Gateway Console and click Create API.
   - Set up an HTTP API or REST API.
   - Define a GET /data route that triggers the Lambda function.

### Step 3: Create a CloudFront Distribution for API Gateway

1. Go to the CloudFront Console and click Create Distribution.
2. Set the Origin Domain Name to your API Gateway URL (e.g., `abc123.execute-api.us-east-1.amazonaws.com`).
3. Configure cache behavior:
   - Set Allowed HTTP Methods to `GET, HEAD, OPTIONS`.
   - Set Cache Based on Selected Request Headers to forward important headers (such as authentication headers, if needed).
   - Adjust the TTL values for dynamic content (e.g., 0 seconds for real-time data).

### Step 4: Test CloudFront with API Gateway

Once CloudFront is deployed, you will be able to access your API through the CloudFront distribution URL:
```
https://d12345.cloudfront.net/data
```

CloudFront will cache responses for dynamic requests, improving the latency for users who repeatedly access the API.

---

## Example 3: Using CloudFront with Lambda@Edge and Node.js

Lambda@Edge allows you to run Lambda functions at CloudFront edge locations. This can be used for modifying requests, adding headers, or generating dynamic content closer to users.

### Step 1: Create a Lambda Function for Lambda@Edge

Let’s create a simple Lambda function that modifies HTTP headers for requests.

Lambda Function (lambdaEdge.js):

```javascript
exports.handler = async (event) => {
    const response = event.Records[0].cf.response;
    
    // Add a custom header to the response
    response.headers['x-custom-header'] = [{ key: 'X-Custom-Header', value: 'Hello from Lambda@Edge' }];
    
    return response;
};
```

1. Go to the AWS Lambda Console.
2. Create a Lambda function using the above code.
3. Deploy the function and replicate it to the edge by attaching it to a CloudFront distribution.

### Step 2: Attach Lambda@Edge to CloudFront

1. In the CloudFront Console, go to your distribution.
2. Click Behaviors and select the default behavior.
3. Click Edit and add a Lambda function trigger at Viewer Response.
4. Select your Lambda@Edge function.

### Step 3: Test Lambda@Edge

Access your CloudFront distribution, and check the response headers. You should see the custom header added by Lambda@Edge:
```
X-Custom-Header: Hello from Lambda@Edge
```

---

## Best Practices for Using CloudFront with Node.js

1. Cache Static Content: Set long TTLs for static content like images, CSS, and JavaScript to reduce load on your origin server.
2. Dynamic Content Handling: Use API Gateway and Lambda with CloudFront for dynamic content, and configure TTLs based on how frequently the data changes.
3. Security: Enable SSL/TLS for your CloudFront distribution and use AWS WAF (Web Application Firewall) to protect your Node.js application from threats.
4. Lambda@Edge for Custom Logic: Use Lambda@Edge to modify requests and responses, or perform additional custom logic at edge locations.
5. Monitoring and Logging: Use CloudFront logs and AWS CloudWatch for monitoring performance and debugging issues.

---

## Conclusion

AWS CloudFront is a powerful CDN that can help you scale your Node.js application globally by caching content at edge locations and reducing latency for users. It can serve both static files and dynamic API responses. Integrating CloudFront with services like EC2, S3, Lambda, and API Gateway can significantly improve the performance and security of your Node.js applications.

---

[<- Cloud](cloud-quick.md)

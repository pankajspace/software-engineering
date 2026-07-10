[<- Cloud](cloud-quick.md)

# AWS API Gateway

## AWS API Gateway with Node.js Example

AWS API Gateway is a fully managed service that allows developers to create, publish, maintain, monitor, and secure APIs at any scale. API Gateway allows you to expose RESTful APIs, WebSocket APIs, and HTTP APIs to access backend services like AWS Lambda, EC2, or other AWS services.

In this example, we'll create a simple Node.js API and deploy it using AWS Lambda integrated with API Gateway. This allows you to create scalable, serverless APIs with minimal setup.

## Key Features of API Gateway

1. Serverless API: API Gateway integrates seamlessly with AWS Lambda to create a serverless API without managing infrastructure.
2. Multiple Integration Options: You can integrate API Gateway with Lambda, EC2, DynamoDB, S3, or any HTTP backend.
3. Security: API Gateway provides built-in security features such as authorization, API keys, and throttling.
4. Monitoring: You can monitor your API with Amazon CloudWatch to track performance and usage.

---

## Example 1. Creating a RESTful API with API Gateway and Node.js (Lambda)

In this example, we'll create an API that returns a simple message like "Hello from API Gateway and Lambda!" using Node.js as the backend.

---

### Step 1: Create a Lambda Function (Node.js)

#### 1.1 Write the Node.js Lambda Code

We'll create a simple Lambda function that returns a JSON response with a message.

1. Open the AWS Lambda Console.
2. Click Create Function.
3. Choose Author from Scratch and name the function (e.g., `myApiFunction`).
4. Select Node.js as the runtime (e.g., Node.js 14.x or 16.x).
5. Choose Create a new role with basic Lambda permissions.
6. Click Create Function.

Once the function is created, replace the default code with the following Node.js code:

```javascript
exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from AWS Lambda and API Gateway!',
        }),
    };
};
```

7. Click Deploy to save and deploy the Lambda function.

#### 1.2 Test the Lambda Function

1. Click Test.
2. Create a new test event (you can use the default settings).
3. Run the test, and you should see the following response in the output:

```json
{
    "statusCode": 200,
    "body": "{\"message\":\"Hello from AWS Lambda and API Gateway!\"}"
}
```

---

### Step 2: Create an API Gateway

#### 2.1 Create an HTTP API

1. Open the API Gateway Console.
2. Click Create API.
3. Select HTTP API (or REST API for more advanced use cases).
4. Click Build.

#### 2.2 Configure the API

1. Name your API (e.g., `myApi`).
2. In the Integrations section, click Add Integration.
3. Choose Lambda as the integration type and select the Lambda function you created (`myApiFunction`).

#### 2.3 Set Up Routes

1. Go to the Routes section.
2. Create a new route for the API:
   - Method: `GET`
   - Path: `/hello`

This will map GET requests made to `/hello` to your Lambda function.

#### 2.4 Deploy the API

1. Go to the Stages section and click Create.
2. Name the stage (e.g., `dev`).
3. Deploy the API.

Once the API is deployed, you'll receive a URL where the API can be accessed (e.g., `https://abc123.execute-api.us-east-1.amazonaws.com/hello`).

---

### Step 3: Test the API

Open the API endpoint in a browser or use `curl` to send an HTTP GET request:

```bash
curl https://abc123.execute-api.us-east-1.amazonaws.com/hello
```

You should receive a JSON response:

```json
{
    "message": "Hello from AWS Lambda and API Gateway!"
}
```

---

### Step 4: Securing the API with API Keys (Optional)

You can add security to your API by requiring an API Key for accessing the endpoint.

#### 4.1 Enable API Key Requirement

1. In the API Gateway Console, go to Routes → GET /hello.
2. Click on the Settings tab.
3. Enable the option to require an API Key.

#### 4.2 Create an API Key

1. Go to API Keys in the API Gateway Console.
2. Click Create API Key.
3. Name the key (e.g., `myApiKey`) and generate a value.
4. Associate the API key with your API by adding it to the Usage Plan.

#### 4.3 Test the API with API Key

Now, when you call the API, you need to include the API key in the header:

```bash
curl -H "x-api-key: YOUR_API_KEY" https://abc123.execute-api.us-east-1.amazonaws.com/hello
```

You should still receive the JSON response if the key is valid.

---

### Step 5: Monitoring the API with CloudWatch

API Gateway automatically logs request and performance data to CloudWatch. You can view:

1. Request Logs: Detailed logs of each request made to your API.
2. Metrics: Metrics like request count, latency, and error rates.

Go to the CloudWatch Console and check the Log Groups or Metrics for your API Gateway to monitor performance.

---

## Example 2: Creating a POST API with Node.js (Lambda)

In this example, we’ll create a POST route that accepts data in the request body and returns it in the response.

### Step 1: Modify the Lambda Function

Update the Lambda function to handle POST requests and process the incoming JSON data:

```javascript
exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Data received',
            data: requestBody
        }),
    };
};
```

### Step 2: Create a POST Route in API Gateway

1. Go to the API Gateway Console.
2. In your API (`myApi`), go to the Routes section.
3. Add a new route:
   - Method: `POST`
   - Path: `/submit`

4. Set the Integration to your Lambda function.

### Step 3: Test the POST API

Use `curl` to test the POST API by sending a JSON payload:

```bash
curl -X POST https://abc123.execute-api.us-east-1.amazonaws.com/submit \
-H "Content-Type: application/json" \
-d '{"name": "John", "age": 30}'
```

The response should look like this:

```json
{
    "message": "Data received",
    "data": {
        "name": "John",
        "age": 30
    }
}
```

---

## Best Practices for Using API Gateway with Node.js

1. Use Environment Variables: Store sensitive information like API keys and database credentials in Lambda environment variables.
2. Security: Use features like API Keys, CORS, IAM Roles, or OAuth 2.0 for securing your API.
3. Monitoring: Enable detailed request logging in CloudWatch to monitor API performance and troubleshoot issues.
4. Throttling and Rate Limiting: Use API Gateway’s built-in throttling and rate limiting to prevent abuse and manage traffic effectively.
5. Caching: Enable caching for GET endpoints to improve performance and reduce the number of requests to Lambda.

---

## Conclusion

AWS API Gateway combined with Node.js (running on AWS Lambda) provides a powerful platform to create scalable, secure, and cost-efficient APIs. With API Gateway, you can manage your API lifecycle, from development to production, with features like security, monitoring, and caching. Integrating Lambda makes it easy to deploy serverless, highly available backends for web or mobile applications.

---

# What are the different use cases for AWS API Gateway?

1. **RESTful APIs**: API Gateway is commonly used to create RESTful APIs that expose backend services like Lambda functions, EC2 instances, or other HTTP endpoints.
2. **WebSocket APIs**: API Gateway supports real-time communication using WebSocket APIs, making it suitable for chat applications, gaming, or IoT devices.
3. **HTTP APIs**: HTTP APIs are lightweight and cost-effective for simple use cases like proxying requests to an HTTP backend or serving static content.
4. **Serverless APIs**: API Gateway integrates seamlessly with AWS Lambda to create serverless APIs without managing infrastructure.
5. **Microservices**: API Gateway can be used to create APIs that expose microservices running on different AWS services like Lambda, ECS, or DynamoDB.
6. **Mobile Backends**: API Gateway is commonly used as a backend for mobile applications to provide secure access to resources and data.
7. **API Proxy**: API Gateway can act as a proxy to route requests to different backend services based on the request path or method.
8. **API Management**: API Gateway provides features like API keys, throttling, caching, and monitoring to manage and secure APIs effectively.
9. **Webhooks**: API Gateway can be used to create webhooks that trigger Lambda functions or other services in response to events.
10. **Integration with AWS Services**: API Gateway can integrate with other AWS services like S3, DynamoDB, or Step Functions to create powerful serverless applications.
11. **Third-Party Integrations**: API Gateway can be used to integrate with third-party services or APIs to expose them securely to clients.
12. **Custom Authorizers**: API Gateway supports custom authorizers to implement custom authentication and authorization logic for APIs.
13. **API Documentation**: API Gateway provides tools to generate API documentation and SDKs for developers to use your APIs easily.
14. **API Versioning**: API Gateway supports API versioning to manage changes and updates to APIs without breaking existing clients.
15. **API Gateway as a Frontend**: API Gateway can be used as a frontend for web applications, serving static content, or proxying requests to backend services.
16. **API Gateway as a Proxy**: API Gateway can act as a proxy to route requests to different backend services based on the request path or method.
17. **API Gateway as a Gateway**: API Gateway can be used as a gateway to expose on-premises services or legacy systems securely to the cloud.
18. **API Gateway as a Load Balancer**: API Gateway can distribute incoming requests to different backend services based on routing rules or load balancing algorithms.
19. **API Gateway as a Security Layer**: API Gateway provides security features like encryption, authentication, and authorization to protect APIs from attacks and unauthorized access.
20. **API Gateway as a Monitoring Tool**: API Gateway logs request data and performance metrics to CloudWatch for monitoring and troubleshooting API performance.
21. **API Gateway as a Scalability Tool**: API Gateway automatically scales to handle high traffic loads and spikes without manual intervention.
22. **API Gateway as a Cost-Effective Solution**: API Gateway is a cost-effective solution for managing APIs, with a pay-as-you-go pricing model based on usage.
23. **API Gateway as a Developer Tool**: API Gateway provides tools for developers to create, deploy, and manage APIs easily, with features like API Gateway Console, CLI, and SDKs.
24. **API Gateway as a Compliance Tool**: API Gateway provides features like encryption, access control, and audit logging to help organizations comply with security and privacy regulations.
25. **API Gateway as a Performance Tool**: API Gateway optimizes API performance with features like caching, request/response compression, and content delivery networks (CDNs).

---

[<- Cloud](cloud-quick.md)

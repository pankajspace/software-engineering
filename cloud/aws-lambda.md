[<- Cloud](cloud-quick.md)

# AWS Lambda

## AWS Lambda with Node.js Examples

AWS Lambda allows you to run serverless functions without provisioning or managing servers. When integrated with Node.js, AWS Lambda can be a powerful tool to run JavaScript code in the cloud in response to events from services like API Gateway, S3, or DynamoDB. AWS Lambda automatically scales with incoming requests and charges you only for the compute time you use.

## Key Concepts

1. Event-Driven: AWS Lambda runs in response to events like API calls, file uploads, or updates in DynamoDB tables.
2. Serverless: You don't have to manage infrastructure. AWS takes care of scaling and availability.
3. Languages: AWS Lambda supports multiple languages, including Node.js.

---

## Example 1: Basic AWS Lambda Function in Node.js

Let's create a basic Lambda function that returns a simple message, "Hello, AWS Lambda!".

### Step 1: Create a Lambda Function

1. Go to the AWS Lambda Console.
2. Click Create Function.
3. Choose Author from Scratch.
4. Give the function a name, such as `helloLambda`.
5. Choose Node.js as the runtime (e.g., Node.js 14.x or 16.x).
6. Choose Create a new role with basic Lambda permissions.

### Step 2: Write the Code

In the Lambda editor, replace the default code with the following Node.js code:

```javascript
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello, AWS Lambda!'),
    };
    return response;
};
```

### Step 3: Test the Lambda Function

1. Click Test.
2. Create a new test event (you can use the default event).
3. Click Test again, and you should see the result: `"Hello, AWS Lambda!"`.

This is a simple Lambda function that runs in response to events and returns a static message.

---

## Example 2: AWS Lambda Function with API Gateway

In this example, we’ll create a Lambda function that serves a REST API through API Gateway. The Lambda function will return a JSON response when accessed via an HTTP GET request.

### Step 1: Create a Lambda Function

1. Go to the AWS Lambda Console.
2. Click Create Function and name it `lambdaAPI`.
3. Choose Node.js as the runtime.

### Step 2: Write the Node.js Code

Replace the default code with the following:

```javascript
exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello from API Gateway and Lambda!' }),
    };
};
```

### Step 3: Create an API Gateway

1. Go to the API Gateway Console.
2. Click Create API → HTTP API (or REST API for more features).
3. Create a new API and set up a route (e.g., GET /hello).
4. Integrate the route with the Lambda function you created (`lambdaAPI`).

### Step 4: Test the API

Once API Gateway is deployed, you’ll receive an endpoint URL (e.g., `https://abc123.execute-api.us-east-1.amazonaws.com/hello`). Open the URL in your browser, and you should see the JSON response:

```json
{
    "message": "Hello from API Gateway and Lambda!"
}
```

---

## Example 3: AWS Lambda with S3 Trigger (File Upload)

This example demonstrates how to trigger a Lambda function when a file is uploaded to an S3 bucket. The Lambda function will log the name of the uploaded file.

### Step 1: Create an S3 Bucket

1. Go to the S3 Console and create a bucket (e.g., `lambda-file-upload-bucket`).
2. Allow public access and leave other settings as default.

### Step 2: Create a Lambda Function

1. Go to the AWS Lambda Console.
2. Create a new Lambda function (`logS3Upload`) with Node.js as the runtime.

### Step 3: Write the Node.js Code

```javascript
exports.handler = async (event) => {
    // Log the bucket and file name from the S3 event
    const records = event.Records;
    records.forEach(record => {
        const bucketName = record.s3.bucket.name;
        const objectKey = record.s3.object.key;
        console.log(`File uploaded to ${bucketName}: ${objectKey}`);
    });
    return {
        statusCode: 200,
        body: JSON.stringify('File uploaded successfully!'),
    };
};
```

### Step 4: Add S3 Trigger to Lambda

1. In the S3 Console, go to your bucket.
2. Click Properties → Event Notifications.
3. Create a notification for All object create events and select AWS Lambda as the destination.
4. Choose the Lambda function you created (`logS3Upload`).

### Step 5: Test the S3 Trigger

Upload a file to the S3 bucket using the S3 Console. The Lambda function will automatically trigger, logging the file name and the bucket name to CloudWatch Logs.

---

## Example 4: AWS Lambda with DynamoDB Trigger

You can also use AWS Lambda to process changes in a DynamoDB table. This example will trigger a Lambda function when a new item is inserted into a DynamoDB table.

### Step 1: Create a DynamoDB Table

1. Go to the DynamoDB Console.
2. Create a table named `ItemsTable` with a primary key `itemId`.

### Step 2: Create a Lambda Function

1. Go to the AWS Lambda Console and create a new function (`processDynamoItem`).
2. Choose Node.js as the runtime.

### Step 3: Write the Node.js Code

```javascript
exports.handler = async (event) => {
    event.Records.forEach(record => {
        if (record.eventName === 'INSERT') {
            const newItem = record.dynamodb.NewImage;
            console.log(`New item added: ${JSON.stringify(newItem)}`);
        }
    });
    return { message: "DynamoDB stream processed successfully!" };
};
```

### Step 4: Add a DynamoDB Trigger to Lambda

1. In the DynamoDB Console, select your table (`ItemsTable`).
2. Click Manage Stream → Enable Stream.
3. Go to the AWS Lambda Console, select your function, and add a DynamoDB trigger.

### Step 5: Test the DynamoDB Trigger

Insert a new item into the DynamoDB table using the AWS CLI or DynamoDB Console:

```bash
aws dynamodb put-item --table-name ItemsTable --item '{"itemId": {"S": "1"}, "name": {"S": "MyItem"}}'
```

Check CloudWatch Logs for the Lambda function, and you’ll see the details of the inserted item logged.

---

## Example 5: AWS Lambda with Scheduled Events (CloudWatch Events)

In this example, we’ll create a Lambda function that runs on a schedule (e.g., every 5 minutes). This is useful for tasks like database cleanups or generating reports.

### Step 1: Create a Lambda Function

1. Go to the AWS Lambda Console and create a new function (`scheduledLambda`).
2. Choose Node.js as the runtime.

### Step 2: Write the Node.js Code

```javascript
exports.handler = async (event) => {
    console.log('Scheduled Lambda triggered');
    return {
        statusCode: 200,
        body: JSON.stringify('Scheduled Lambda executed successfully!'),
    };
};
```

### Step 3: Create a CloudWatch Event Rule

1. Go to the CloudWatch Console.
2. Click Rules → Create Rule.
3. Choose Event Source → Schedule and set it to trigger every 5 minutes (`rate(5 minutes)`).
4. Set the target to your Lambda function (`scheduledLambda`).

### Step 4: Test the Scheduled Event

Wait for the CloudWatch Event to trigger your Lambda function every 5 minutes. You can check the logs in CloudWatch Logs to confirm that it’s being executed.

---

## Best Practices for AWS Lambda with Node.js

1. Optimize Cold Starts: Use smaller Node.js packages and reduce dependencies to minimize the cold start time.
2. Monitor with CloudWatch: Use CloudWatch to track execution time, memory usage, and function errors.
3. Environment Variables: Store configuration details (like database credentials or API keys) using Lambda environment variables.
4. Error Handling: Implement proper error handling and retry mechanisms to ensure smooth operations.
5. Versioning: Enable Lambda function versioning for safe deployment and rollback.

---

## Conclusion

AWS Lambda combined with Node.js provides a powerful serverless platform for building scalable and event-driven applications. From handling HTTP requests via API Gateway to responding to file uploads in S3, Lambda functions can be used to execute a wide variety of tasks without worrying about server management. By integrating with services like DynamoDB, S3, and CloudWatch, AWS Lambda allows you to build highly flexible and scalable applications.

---

[<- Cloud](cloud-quick.md)

[<- Cloud](cloud-quick.md)

# AWS SDK

## AWS SDK with Node.js Examples

AWS SDK (Software Development Kit) for Node.js provides a set of libraries and tools that enable developers to interact programmatically with AWS services like S3, DynamoDB, EC2, Lambda, etc. Using the AWS SDK, you can manage your AWS resources, perform CRUD operations on S3 objects, invoke Lambda functions, or interact with other AWS services.

## Key Features of AWS SDK for Node.js

1. Comprehensive API: Provides full access to AWS services, including S3, EC2, DynamoDB, Lambda, SNS, and more.
2. Asynchronous Operations: Built on top of Node.js' asynchronous capabilities, allowing non-blocking operations for better performance.
3. Authentication: Automatically handles AWS credentials using IAM roles, environment variables, or credentials files.
4. Simplifies AWS Integration: Makes it easier to integrate AWS services into your Node.js applications.

---

## Setting Up the AWS SDK in Node.js

### Step 1: Install the AWS SDK

First, ensure that you have Node.js installed. Then, in your Node.js project directory, install the AWS SDK:

```bash
npm install aws-sdk
```

### Step 2: Configure AWS Credentials

To interact with AWS services, you need to provide your AWS credentials (Access Key ID and Secret Access Key). You can configure your credentials in different ways:

- Credentials File: Store your credentials in a `~/.aws/credentials` file.
  
  Example:
  ```
  [default]
  aws_access_key_id = YOUR_ACCESS_KEY
  aws_secret_access_key = YOUR_SECRET_KEY
  ```

- Environment Variables: Set your AWS credentials as environment variables.
  
  Example:
  ```bash
  export AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
  export AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
  ```

- IAM Roles: If you're running the code on an EC2 instance or Lambda, AWS SDK will automatically use the attached IAM role to authenticate.

---

## Example 1: Uploading a File to S3 Using AWS SDK

In this example, we will use the AWS SDK to upload a file to an S3 bucket.

### Step 1: Set Up an S3 Bucket

1. Go to the S3 Console and create a new bucket (e.g., `my-node-sdk-bucket`).
2. Ensure the bucket allows uploads (use default settings for now).

### Step 2: Write Node.js Code to Upload a File

Create a `uploadS3.js` file with the following code:

```javascript
const AWS = require('aws-sdk');
const fs = require('fs');

// Configure the AWS SDK
AWS.config.update({ region: 'us-east-1' });

// Create an S3 instance
const s3 = new AWS.S3();

// Function to upload a file
const uploadFile = (fileName) => {
    // Read the file content
    const fileContent = fs.readFileSync(fileName);

    // Set up S3 upload parameters
    const params = {
        Bucket: 'my-node-sdk-bucket', // Replace with your bucket name
        Key: 'uploaded-file.txt',      // File name to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, (err, data) => {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

// Call the function
uploadFile('file-to-upload.txt');
```

### Step 3: Run the Node.js Script

1. Ensure you have a file named `file-to-upload.txt` in your project directory.
2. Run the script:

```bash
node uploadS3.js
```

If successful, you should see a message in the console indicating that the file was uploaded, along with the S3 URL of the uploaded file.

---

## Example 2: Reading a File from S3 Using AWS SDK

Now, let's fetch the file that we uploaded to S3.

### Step 1: Write Node.js Code to Read the File

Create a `readS3.js` file with the following code:

```javascript
const AWS = require('aws-sdk');

// Configure the AWS SDK
AWS.config.update({ region: 'us-east-1' });

// Create an S3 instance
const s3 = new AWS.S3();

// Function to read a file from S3
const readFile = () => {
    const params = {
        Bucket: 'my-node-sdk-bucket', // Replace with your bucket name
        Key: 'uploaded-file.txt'      // File name to read from S3
    };

    // Reading the file from the bucket
    s3.getObject(params, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('File content:', data.Body.toString());
    });
};

// Call the function
readFile();
```

### Step 2: Run the Node.js Script

```bash
node readS3.js
```

You should see the contents of `uploaded-file.txt` printed in the console.

---

## Example 3: Inserting and Fetching Data from DynamoDB Using AWS SDK

We will use the AWS SDK to insert an item into a DynamoDB table and then retrieve it.

### Step 1: Create a DynamoDB Table

1. Go to the DynamoDB Console.
2. Click Create Table.
3. Name the table `MyTable` and set the Partition key as `id` (String).

### Step 2: Write Node.js Code to Insert Data

Create a `putDynamoDB.js` file with the following code:

```javascript
const AWS = require('aws-sdk');

// Configure the AWS SDK
AWS.config.update({ region: 'us-east-1' });

// Create a DynamoDB DocumentClient instance
const docClient = new AWS.DynamoDB.DocumentClient();

// Function to insert data into DynamoDB
const putItem = () => {
    const params = {
        TableName: 'MyTable',
        Item: {
            id: '123',
            name: 'John Doe',
            age: 30
        }
    };

    // Insert item into the table
    docClient.put(params, (err, data) => {
        if (err) {
            console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Item added:', JSON.stringify(data, null, 2));
        }
    });
};

// Call the function
putItem();
```

### Step 3: Write Node.js Code to Fetch Data

Create a `getDynamoDB.js` file with the following code to fetch the inserted item:

```javascript
const AWS = require('aws-sdk');

// Configure the AWS SDK
AWS.config.update({ region: 'us-east-1' });

// Create a DynamoDB DocumentClient instance
const docClient = new AWS.DynamoDB.DocumentClient();

// Function to get data from DynamoDB
const getItem = () => {
    const params = {
        TableName: 'MyTable',
        Key: {
            id: '123'
        }
    };

    // Fetch the item from the table
    docClient.get(params, (err, data) => {
        if (err) {
            console.error('Unable to get item. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Item fetched:', JSON.stringify(data, null, 2));
        }
    });
};

// Call the function
getItem();
```

### Step 4: Run the Scripts

1. Insert the item:

```bash
node putDynamoDB.js
```

2. Fetch the item:

```bash
node getDynamoDB.js
```

If successful, the inserted data will be printed to the console.

---

## Example 4: Invoking AWS Lambda Using AWS SDK

You can use the AWS SDK to invoke a Lambda function from your Node.js application.

### Step 1: Create a Lambda Function

1. Go to the AWS Lambda Console.
2. Create a new function (`myLambdaFunction`) with Node.js as the runtime.
3. Write the following code in your Lambda function:

```javascript
exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};
```

4. Deploy the Lambda function.

### Step 2: Write Node.js Code to Invoke Lambda

Create a `invokeLambda.js` file with the following code:

```javascript
const AWS = require('aws-sdk');

// Configure the AWS SDK
AWS.config.update({ region: 'us-east-1' });

// Create a Lambda client
const lambda = new AWS.Lambda();

// Function to invoke Lambda
const invokeLambda = () => {
    const params = {
        FunctionName: 'myLambdaFunction',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({})
    };

    // Invoke the Lambda function
    lambda.invoke(params, (err, data) => {
        if (err) {
            console.error('Error invoking Lambda:', err);
        } else {
            console.log('Lambda response:', JSON.parse(data.Payload));
        }
    });
};

// Call the function
invokeLambda();
```

### Step 3: Run the Node.js Script

```bash
node invokeLambda.js
```

You should see the response from the Lambda function in the console:

```json
{
    "statusCode": 200,
    "body": "\"Hello from Lambda!\""
}
```

---

## Conclusion

The AWS SDK for Node.js provides an easy-to-use API to interact with various AWS services, including S3,

 DynamoDB, Lambda, and more. By using the SDK, you can integrate AWS capabilities into your Node.js applications to manage resources programmatically, store and retrieve data, invoke serverless functions, and more.

---

[<- Cloud](cloud-quick.md)

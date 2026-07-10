[<- Cloud](cloud-quick.md)

# AWS S3

## AWS S3 (Simple Storage Service) Overview

Amazon S3 (Simple Storage Service) is a highly scalable and durable object storage service provided by AWS. It allows you to store and retrieve any amount of data from anywhere on the web. S3 is designed for data storage, backup, and archival use cases, and it offers high availability, security, and scalability.

## Key Features of AWS S3

1. Object Storage: S3 stores data as objects in buckets. Each object consists of the data itself, metadata, and a unique key.
2. Buckets: A bucket is a container for storing objects. Each bucket has a globally unique name within S3.
3. Data Durability: S3 is designed for 99.999999999% (11 9's) durability.
4. Scalability: S3 can automatically scale to handle any amount of data.
5. Lifecycle Policies: Automatically transition objects between storage classes or delete them after a certain time.
6. Versioning: S3 can keep multiple versions of an object.
7. Security: Supports encryption, access control policies, and Identity and Access Management (IAM).

---

## AWS S3 Bucket and Object Concepts

1. Buckets: A bucket is like a folder that stores your objects (files). It must have a unique name across all of AWS.
2. Objects: Data you store in S3. It could be any file type (e.g., images, documents, videos, backups).
3. Keys: The unique identifier for each object within a bucket.

---

## Example 1: Creating an S3 Bucket and Uploading an Object

Let’s create a bucket and upload a file into it.

### Step 1: Create an S3 Bucket
1. Go to the S3 Console.
2. Click Create Bucket.
3. Give your bucket a globally unique name (e.g., `my-app-bucket`).
4. Choose an AWS region (e.g., `us-east-1`).
5. Configure settings (optional), such as enabling versioning or public access settings.
6. Click Create.

### Step 2: Upload an Object to the Bucket
1. In the S3 Console, click on the bucket you just created.
2. Click Upload.
3. Select a file to upload (e.g., `image.jpg`).
4. Set permissions for the object (public or private).
5. Click Upload.

Once the file is uploaded, you will get an S3 URL to access the object, such as:
```
https://my-app-bucket.s3.amazonaws.com/image.jpg
```

---

## Example 2: Enabling Versioning on an S3 Bucket

S3 versioning allows you to keep multiple versions of an object in the same bucket. If you upload a new file with the same name, S3 will keep both the old and new versions.

### Step 1: Enable Versioning
1. In the S3 Console, go to the bucket where you want to enable versioning.
2. Click on Properties.
3. Scroll down to the Versioning section and click Edit.
4. Enable Versioning and save changes.

### Step 2: Upload a New Version of an Object
1. Upload a new file with the same name (e.g., `image.jpg`) to the same bucket.
2. Now, the bucket will have two versions of the `image.jpg` object: the original and the new one.

You can view and retrieve previous versions of an object from the Versioning section.

---

## Example 3: Setting Bucket Policies for Public Access

You can use bucket policies to control access to your bucket and its contents. Let’s create a bucket policy to make all objects in the bucket publicly readable.

### Step 1: Add a Bucket Policy
1. Go to the S3 Console and select your bucket.
2. Click Permissions and then Bucket Policy.
3. Add the following JSON policy to make the bucket publicly readable:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-app-bucket/*"
    }
  ]
}
```

4. Save the policy. Now, all objects in your bucket are publicly accessible.

### Step 2: Test Public Access
You can access objects in the bucket via a publicly accessible URL:
```
https://my-app-bucket.s3.amazonaws.com/image.jpg
```

---

## Example 4: S3 Lifecycle Policies

Lifecycle policies allow you to define rules that automatically move objects between different storage classes (e.g., from S3 Standard to S3 Glacier) or delete them after a certain period.

### Step 1: Create a Lifecycle Rule
1. Go to the S3 Console and select your bucket.
2. Click on Management → Lifecycle Rules → Create Rule.
3. Name your rule (e.g., `Move to Glacier`).
4. Select the scope of the rule (e.g., apply to all objects in the bucket).
5. Add transitions (e.g., move objects to S3 Glacier after 30 days).
6. Add an expiration rule (e.g., delete objects after 365 days).

### Step 2: Apply the Rule
Once the rule is created, S3 will automatically move or delete objects based on the conditions you set.

---

## Example 5: Using AWS S3 with AWS CLI

You can interact with S3 using the AWS CLI (Command Line Interface).

### Step 1: Upload a File via AWS CLI
```bash
aws s3 cp my-file.txt s3://my-app-bucket/
```

### Step 2: Download a File from S3 via AWS CLI
```bash
aws s3 cp s3://my-app-bucket/my-file.txt .
```

### Step 3: List Objects in a Bucket
```bash
aws s3 ls s3://my-app-bucket/
```

---

## Example 6: S3 Storage Classes

S3 offers multiple storage classes, each optimized for different use cases and costs.

- S3 Standard: For frequently accessed data.
- S3 Intelligent-Tiering: Automatically moves data between two access tiers (frequent and infrequent) based on usage.
- S3 Standard-IA (Infrequent Access): For infrequently accessed data, with lower storage costs but higher access costs.
- S3 Glacier: For archival storage with retrieval times ranging from minutes to hours.
- S3 Glacier Deep Archive: For long-term archival with the lowest cost and retrieval times up to 12 hours.

### Example of Using Different Storage Classes

1. Upload an object using the S3 Standard-IA storage class:
```bash
aws s3 cp my-file.txt s3://my-app-bucket/ --storage-class STANDARD_IA
```

2. Transition objects to Glacier using lifecycle policies (as shown in Example 4).

---

## Example 7: S3 Static Website Hosting

You can host a static website directly from an S3 bucket by enabling S3 Static Website Hosting.

### Step 1: Enable Static Website Hosting
1. Go to the S3 Console.
2. Select your bucket and click Properties.
3. Scroll to the Static Website Hosting section and enable it.
4. Set the Index Document (e.g., `index.html`) and Error Document (e.g., `error.html`).

### Step 2: Upload Website Files
Upload your `index.html` and any other website files to the S3 bucket.

### Step 3: Access the Website
You will get a website URL (e.g., `http://my-app-bucket.s3-website-us-east-1.amazonaws.com`) that serves your static site.

---

## Best Practices for Using AWS S3

1. Enable Versioning: To ensure that old versions of files are retained for recovery.
2. Use Bucket Policies: Apply fine-grained access controls to secure your data.
3. Encrypt Your Data: Enable server-side encryption (SSE) or client-side encryption to protect your data.
4. Implement Lifecycle Policies: Save costs by transitioning data to cheaper storage classes like S3 Glacier or S3 Glacier Deep Archive.
5. Use MFA Delete: Enable multi-factor authentication to prevent accidental deletions of data.
6. Monitor Access: Use AWS CloudTrail to log and monitor S3 bucket access and operations.

---

## Conclusion

Amazon S3 is a versatile and powerful object storage service that can be used for a wide variety of use cases, such as storing static files, backups, media hosting, and more. With its high durability, scalability, and multiple storage classes, S3 can fit both high-performance workloads and long-term archival storage. By using features like versioning, lifecycle policies, and bucket policies, you can efficiently manage your data in S3.

---

[<- Cloud](cloud-quick.md)

[<- Cloud](cloud-quick.md)

# AWS Cognito 
It is a service designed to manage user authentication, authorization, and access control in web and mobile applications. It helps you securely handle sign-in and sign-up processes, user identity management, and token-based authentication with minimal setup. It integrates seamlessly with other AWS services and supports both direct authentication through its user pools and federation from external identity providers like Google, Facebook, and enterprise systems.

## Core Concepts of AWS Cognito

AWS Cognito consists of two main components:

1. User Pools  
2. Identity Pools  

Each serves different purposes, although they can work together depending on the use case.

---

## 1. Amazon Cognito User Pools  
A User Pool is a user directory that helps manage user sign-up and sign-in functionalities, as well as user profile data. It is similar to a centralized user management system, providing capabilities such as user registration, account recovery, and authentication.

### Key Features of User Pools:
- User Sign-up and Sign-in: Allows users to register and sign in using various identity providers like social logins (Google, Facebook, Apple, etc.), third-party identity providers, or their email/phone number and password.
  
- Multi-Factor Authentication (MFA): You can configure MFA to add an extra layer of security during authentication. Cognito supports SMS-based MFA and Time-based One-Time Password (TOTP).
  
- Password Management: It offers features like password policies, forgotten password recovery, and automatic account locking in case of multiple failed login attempts.
  
- Hosted UI: Cognito provides a pre-built hosted UI for authentication that can be customized for branding. You don’t need to build your own login and registration screens unless you want full customization.
  
- Custom Authentication Flows: For more complex use cases, AWS Cognito supports Lambda triggers to allow custom authentication flows, including pre-sign-up, post-confirmation, or custom challenges.
  
- User Attributes: You can store user data, such as names, email addresses, phone numbers, or custom attributes that your application may require.
  
- Token-based Authentication: After successful authentication, Cognito issues JSON Web Tokens (JWTs)—ID token, access token, and refresh token—following the OpenID Connect (OIDC) standard. These tokens allow users to make authenticated API requests to your backend services or other AWS services.

---

## 2. Amazon Cognito Identity Pools (Federated Identities)  
Identity Pools allow you to grant your users temporary AWS credentials so they can access AWS services (such as S3, DynamoDB, or Lambda) directly. While User Pools manage users, Identity Pools handle permissions and access to AWS resources.

### Key Features of Identity Pools:
- Federated Authentication: Identity Pools support federating identities from various identity providers, including User Pools, external providers (like Google, Facebook, or enterprise IdPs using SAML), and unauthenticated guest users.
  
- Access Control with IAM Roles: Identity Pools provide temporary, limited-privilege AWS credentials via IAM roles, allowing users to interact with AWS services securely. For example, a user can be given access to upload files to a specific S3 bucket without exposing sensitive AWS credentials.
  
- Unauthenticated Identities: You can allow guest access (unauthenticated) to your AWS resources, with limited permissions for users who have not signed in yet.

- Token Exchange: Cognito Identity Pools can exchange identity tokens (such as from Cognito User Pools or social login providers) for AWS credentials. This allows your app to request and use temporary credentials to access AWS services.

---

## Key Concepts in AWS Cognito:

### 1. Authentication Tokens
   - ID Token: Contains claims about the user (such as email, name) and is primarily used to authenticate users within your application.
   - Access Token: Used to authorize access to AWS resources or services.
   - Refresh Token: Used to obtain new ID and Access tokens without requiring the user to log in again.

### 2. Cognito Triggers (Lambda Functions)
   AWS Cognito offers several integration points where you can execute Lambda functions to customize the authentication process or enforce additional business logic. Some triggers include:
   - Pre-Sign-Up: Customize user attributes or prevent users from signing up based on custom logic.
   - Post-Confirmation: Perform actions after user registration, such as sending a welcome message or updating user metadata.
   - Pre-Authentication: Add custom validation or steps before the authentication.
   - Post-Authentication: Log sign-in events or trigger notifications.
   - Pre-Token Generation: Modify tokens before they are returned to the user.

---

## How AWS Cognito Works:

1. Sign-up Process:
   - The user provides an email, phone number, or username and password.
   - AWS Cognito verifies the user’s information (with email/phone verification if required).
   - User attributes (like email or phone) are stored in the User Pool.

2. Sign-in Process:
   - The user provides their credentials or signs in with an external provider (such as Google, Facebook).
   - Cognito authenticates the user and issues tokens (ID, Access, and Refresh tokens).
   - The tokens are used to access backend services or AWS resources (through Identity Pools if necessary).

3. Access AWS Resources:
   - Identity Pools are used to grant users temporary AWS credentials.
   - These credentials allow users to interact with services like S3, DynamoDB, or Lambda within the AWS ecosystem based on assigned permissions.

---

## Common Use Cases of AWS Cognito:

1. User Authentication for Web/Mobile Apps:
   AWS Cognito is commonly used for authentication in web or mobile apps, allowing users to sign up and log in securely, manage their profiles, and handle password recovery.

2. Social Login Integration:
   With its integration to social identity providers (Facebook, Google, Apple, etc.), AWS Cognito simplifies user authentication via social media without custom backend logic.

3. Federated Authentication (Enterprise SSO):
   Cognito Identity Pools allow your app to authenticate users from different providers, including SAML-based corporate identity providers for single sign-on (SSO).

4. User Data Synchronization:
   AWS Cognito can sync user data across devices. It provides APIs for syncing user data like preferences and app state, which is useful for apps needing cross-device data consistency.

5. AWS Resource Access:  
   When your app needs to give users permission to access AWS services (e.g., uploading images to S3 or reading data from DynamoDB), Cognito Identity Pools handle this by assigning temporary credentials through IAM roles.

---

## Pricing:
- User Pools: You pay based on Monthly Active Users (MAUs). Each authentication (sign-in or token refresh) counts as part of this, but you can have unlimited sign-ups and users in your pool.
  
- Identity Pools: You are charged for the number of credentials issued through Cognito for accessing AWS resources.

AWS Cognito is highly scalable and can handle millions of users, making it suitable for both small-scale and enterprise applications.

---

[<- Cloud](cloud-quick.md)

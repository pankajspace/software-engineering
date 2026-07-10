[<-Microfrontends](microfrontends-quick.md)

# Microfrontends with Webpack: Main Concepts and Examples

Webpack 5 introduced Module Federation, which revolutionized how microfrontends can be implemented by enabling applications to dynamically share and consume code from other independent applications. This makes it easier to build microfrontends by allowing teams to develop, deploy, and manage their frontend applications independently while sharing necessary dependencies or components. 

Let’s explore the main concepts of microfrontends using Webpack, with examples:

---

## 1. Module Federation in Webpack
Webpack 5’s Module Federation enables JavaScript applications to load modules dynamically from different builds during runtime. It’s perfect for microfrontends because it allows independent applications to share components or libraries without bundling everything into a single build.

Example: 
- A Product microfrontend and a Cart microfrontend can each be built separately and deployed independently. The Product microfrontend can still consume components like a shared header from the Cart microfrontend without duplicating it in both projects.

---

## 2. Independent Builds and Deployments
Each microfrontend is independently built and deployed, and the Module Federation plugin allows these separate builds to dynamically load and share code without being bundled together at build time.

Example: 
- The Product microfrontend team builds and deploys their application separately from the Cart microfrontend team. The Cart frontend might expose a shared CartButton component that the Product team can import dynamically at runtime, ensuring that both microfrontends are always using the latest version of the component.

---

## 3. Dynamic Imports
Webpack’s dynamic import feature allows applications to load components only when necessary, which is a great optimization for microfrontends. With Module Federation, the system can fetch code from another application at runtime, based on user interactions or route changes.

Example: 
- When a user adds a product to their cart, the Product microfrontend dynamically loads the Cart microfrontend to display the updated cart information. This is done only when required, reducing the initial load time.

```javascript
// Dynamically importing CartButton from another microfrontend
import('cartApp/CartButton').then(CartButton => {
  // Render CartButton in the Product page
});
```

---

## 4. Shared Dependencies
Microfrontends may share dependencies like React, but you don’t want to bundle React multiple times across different microfrontends. With Module Federation, shared dependencies can be loaded only once and reused by different microfrontends.

Example:
- Both Product microfrontend and Cart microfrontend use React. Using Module Federation, React is loaded only once, even though both microfrontends are built independently. This reduces duplication and keeps the overall bundle size smaller.

```javascript
// Webpack configuration for Product microfrontend
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'productApp',
      remotes: {
        cartApp: 'cartApp@http://localhost:3002/remoteEntry.js'
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
    })
  ]
};
```

```javascript
// Webpack configuration for Cart microfrontend
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'cartApp',
      filename: 'remoteEntry.js',
      exposes: {
        './CartButton': './src/components/CartButton'
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
    })
  ]
};
```

---

## 5. Exposing and Consuming Modules
Each microfrontend can expose specific components or modules that can be used by other microfrontends. The other microfrontends will consume these modules as needed.

Example: 
- The Cart microfrontend exposes a CartButton component, and the Product microfrontend consumes it dynamically. This means that both applications remain independent, but the Product microfrontend can use functionality from the Cart microfrontend.

```javascript
// In Cart microfrontend's webpack.config.js
exposes: {
  './CartButton': './src/components/CartButton'
}
```

```javascript
// In Product microfrontend, dynamically importing CartButton
const CartButton = React.lazy(() => import('cartApp/CartButton'));
```

---

## 6. Routing and Composition
Microfrontends often need to manage their own routing, and using tools like React Router or Vue Router in combination with Module Federation makes it easier to load specific parts of an application dynamically as the user navigates.

Example:
- When the user navigates to the `/cart` route, the Cart microfrontend is dynamically loaded into the shell application. Similarly, when they navigate to `/products`, the Product microfrontend is loaded.

```javascript
// In the shell app
const routes = [
  {
    path: '/cart',
    component: React.lazy(() => import('cartApp/Cart'))
  },
  {
    path: '/products',
    component: React.lazy(() => import('productApp/ProductList'))
  }
];
```

---

## 7. Error Handling and Resilience
Webpack enables microfrontends to handle failures gracefully. If a microfrontend fails to load (perhaps due to network issues or a bug), the shell application can show an error message without breaking the entire experience.

Example:
- If the Cart microfrontend fails to load, the shell app can catch the error and display a fallback component, such as a message informing the user that the cart is temporarily unavailable.

```javascript
const CartButton = React.lazy(() => import('cartApp/CartButton'));

const App = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <CartButton />
  </React.Suspense>
);
```

---

## 8. Versioning and Updates
Each microfrontend can have its own version, and with Module Federation, new versions of a microfrontend can be deployed without affecting others. If there are breaking changes, they are isolated to the specific microfrontend, ensuring the rest of the application remains stable.

Example:
- The Product microfrontend is updated to version `2.0`, while the Cart microfrontend remains on version `1.0`. As long as the contract between the two remains valid (i.e., the interface or API is not broken), both versions can co-exist without any issues.

---

## 9. Performance Considerations
Performance optimizations, like code splitting and lazy loading, can be used to ensure that only the necessary parts of the microfrontends are loaded at any given time.

Example:
- When the user visits the homepage, only the essential parts of the Product microfrontend are loaded. As the user interacts with the app (e.g., clicks on the cart), the Cart microfrontend is dynamically loaded and injected into the page.

---

## Example Use Case: A Shopping Application

### Scenario:
- The shopping application is composed of multiple microfrontends:
  - Product microfrontend: Displays product lists and details.
  - Cart microfrontend: Manages the shopping cart.
  - Payment microfrontend: Handles payment processing.

Each microfrontend is built, deployed, and managed independently but can share common functionality (e.g., a shared header component or auth service). Webpack Module Federation allows these microfrontends to seamlessly integrate and share dependencies.

```javascript
// Product microfrontend's webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'productApp',
      remotes: {
        cartApp: 'cartApp@http://localhost:3002/remoteEntry.js'
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
    })
  ]
};

// Cart microfrontend's webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'cartApp',
      filename: 'remoteEntry.js',
      exposes: {
        './CartButton': './src/components/CartButton'
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
    })
  ]
};
```

---

## Conclusion
Webpack's Module Federation plugin provides an elegant solution to building microfrontends by enabling independent development, deployment, and sharing of code between different frontend applications. It facilitates breaking down large monolithic frontends into smaller, manageable parts, allowing teams to build scalable and modular applications.


# Sharing data between microfrontends using Webpack Module Federation

Webpack Module Federation is a powerful feature that allows microfrontends to share modules (JavaScript code, components, utilities, etc.) at runtime without the need to bundle everything together at build time. This makes it an excellent solution for sharing data between microfrontends while maintaining independence.

With Module Federation, microfrontends can dynamically consume code from each other. This is useful in scenarios where you want to share state, components, or utilities like authentication logic across different microfrontends.

## How Module Federation Works

- Host: The microfrontend that consumes modules or components from another microfrontend.
- Remote: The microfrontend that exposes modules or components to other microfrontends.

The microfrontends can act as both hosts and remotes, depending on the setup. Here's how data can be shared between microfrontends using Webpack Module Federation.

## Scenario

Let’s assume we have two microfrontends in an e-commerce platform:
- Product Microfrontend: Displays product details.
- Cart Microfrontend: Manages and displays the shopping cart.

We want to share the cart state between these two microfrontends using Webpack Module Federation so that both microfrontends can access and modify the same cart state.

## Steps to Share Data Using Webpack Module Federation

### 1. Setting Up Webpack Module Federation

First, you need to configure Module Federation in both microfrontends using webpack.config.js.

#### Product Microfrontend (Remote)

In the Product Microfrontend, we will expose the `cart` module that holds the shared cart state, allowing the Cart Microfrontend to access and modify the cart.

webpack.config.js for Product Microfrontend:
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 3001, // Product microfrontend runs on port 3001
  },
  entry: './src/index.js',
  output: {
    publicPath: 'http://localhost:3001/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'product',
      filename: 'remoteEntry.js',
      exposes: {
        './CartModule': './src/cart', // Expose cart module
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

Here:
- We expose the `./src/cart` module under the name `CartModule`.
- The shared `react` and `react-dom` dependencies ensure that the same versions are used across all microfrontends.

#### Cart Microfrontend (Host)

In the Cart Microfrontend, we will consume the `CartModule` from the Product Microfrontend.

webpack.config.js for Cart Microfrontend:
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 3002, // Cart microfrontend runs on port 3002
  },
  entry: './src/index.js',
  output: {
    publicPath: 'http://localhost:3002/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'cart',
      remotes: {
        product: 'product@http://localhost:3001/remoteEntry.js', // Access product microfrontend
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

Here:
- The Cart Microfrontend specifies that it can load the `product` remote from `http://localhost:3001/remoteEntry.js`.
- This allows the Cart Microfrontend to access the `CartModule` exposed by the Product Microfrontend.

### 2. Implementing the Shared Cart Module

Now, let’s implement the shared cart module that will be used by both microfrontends. This module will hold the cart state.

cart.js (in Product Microfrontend):
```javascript
let cart = [];

export const getCart = () => cart;

export const addToCart = (product) => {
  cart.push(product);
  console.log(`Product added to cart: ${product.name}`);
};

export const clearCart = () => {
  cart = [];
  console.log('Cart cleared');
};
```

In this module:
- `getCart()` returns the current state of the cart.
- `addToCart()` adds a product to the cart.
- `clearCart()` clears the cart.

### 3. Using the Shared Cart in the Product Microfrontend

The Product Microfrontend will add items to the cart by calling the `addToCart()` method from the shared module.

index.js (in Product Microfrontend):
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { addToCart } from './cart';

const ProductPage = () => {
  const product = { id: 1, name: 'Laptop' };

  return (
    <div>
      <h1>{product.name}</h1>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

ReactDOM.render(<ProductPage />, document.getElementById('root'));
```

Here:
- The Product Microfrontend renders a product and a button that adds the product to the cart using the `addToCart()` function from the shared `cart.js` module.

### 4. Consuming the Shared Cart in the Cart Microfrontend

Now, the Cart Microfrontend will consume the `getCart()` function from the `CartModule` exposed by the Product Microfrontend to display the cart items.

index.js (in Cart Microfrontend):
```javascript
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Import the CartModule from the Product Microfrontend
const CartModule = React.lazy(() => import('product/CartModule'));

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load the cart from the shared CartModule
    CartModule.then((module) => {
      setCart(module.getCart());
    });
  }, []);

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<CartPage />, document.getElementById('root'));
```

In this code:
- The Cart Microfrontend dynamically imports the `CartModule` from the Product Microfrontend using `import('product/CartModule')`.
- It calls `getCart()` to retrieve the cart contents and displays them in a list.

### 5. Running the Microfrontends

Now that both microfrontends are set up, you can run them:

1. Run the Product Microfrontend:
   ```bash
   cd product-microfrontend
   npm start
   ```
   This will start the Product Microfrontend on `http://localhost:3001`.

2. Run the Cart Microfrontend:
   ```bash
   cd cart-microfrontend
   npm start
   ```
   This will start the Cart Microfrontend on `http://localhost:3002`.

### 6. Interaction Between Microfrontends

- When a user clicks "Add to Cart" in the Product Microfrontend on `http://localhost:3001`, the product is added to the shared cart state in `cart.js`.
- The Cart Microfrontend on `http://localhost:3002` fetches the cart state from the shared module and displays the items in the cart.

## Benefits of Using Webpack Module Federation for Sharing Data

1. Independent Deployments: Microfrontends can be deployed independently, and shared modules can be updated or replaced without affecting the entire application.
2. Dynamic Module Loading: Modules are loaded at runtime, reducing bundle size and improving performance.
3. Code Reusability: Shared components and logic (like cart state) can be reused across microfrontends, reducing duplication.
4. Version Control: Each microfrontend can use its own version of a shared module or even enforce using the same version across microfrontends.

## Conclusion

Webpack Module Federation provides a powerful and flexible way to share data and modules between microfrontends. In this example, we shared the cart state between a Product Microfrontend and a Cart Microfrontend. This approach enables microfrontends to remain independent while sharing common functionality at runtime, making the overall architecture more modular and scalable.


# AWS Microfrontends Deployment Using S3 and CloudFront

A simple yet effective way to deploy microfrontends on AWS is to use Amazon S3 for static hosting combined with Amazon CloudFront for CDN. This method provides a low-cost, scalable, and easily manageable solution while allowing for independent deployments of each microfrontend. Here’s how you can achieve this step-by-step:

## Steps to Deploy Microfrontends on AWS Using S3 and CloudFront

### 1. Develop and Build Microfrontends
   - Each microfrontend (e.g., home page, product page, checkout page) should be developed as a standalone Single Page Application (SPA) using React, Angular, Vue, or any frontend framework.
   - Ensure that each microfrontend is self-contained, with its own repository and build process (Webpack, Vite, etc.).
   - Example:
     - home-frontend (React)
     - product-frontend (Vue)
     - checkout-frontend (Angular)

### 2. Create S3 Buckets for Each Microfrontend
   - For each microfrontend, create a separate S3 bucket:
     - `home-frontend-bucket`
     - `product-frontend-bucket`
     - `checkout-frontend-bucket`
   - Enable static website hosting on each S3 bucket.

   - Example commands using the AWS CLI:
     ```bash
     aws s3 mb s3://home-frontend-bucket
     aws s3 website s3://home-frontend-bucket --index-document index.html
     ```

### 3. Upload Microfrontends to S3
   - After building your microfrontend (which generates static files like `index.html`, `bundle.js`, etc.), upload the build output to the corresponding S3 bucket.
   - Example command to upload files:
     ```bash
     aws s3 sync ./build s3://home-frontend-bucket --acl public-read
     ```

### 4. Set Up CloudFront Distribution
   - Create a CloudFront distribution for each microfrontend S3 bucket to enable fast content delivery with global caching.
   - CloudFront will act as a Content Delivery Network (CDN), caching the static assets and delivering them to users with low latency.
   - Example steps:
     - Go to CloudFront in the AWS Management Console.
     - Create a new distribution and select the S3 bucket as the origin.
     - Configure custom domain names for each microfrontend, such as `home.example.com`, `product.example.com`, and `checkout.example.com`.
     - Set caching behavior for the static files based on how often you expect changes.

### 5. Configure AWS Route 53 for DNS
   - Use AWS Route 53 to manage DNS and create subdomains for each microfrontend. This will map the custom domains (`home.example.com`, `product.example.com`, etc.) to their respective CloudFront distributions.
   - Steps:
     - Create a hosted zone for your domain (e.g., `example.com`).
     - Add CNAME or A records to map each subdomain (`home.example.com`, `product.example.com`) to the CloudFront distribution's domain name.

### 6. Enable HTTPS with SSL/TLS Certificates
   - Use AWS Certificate Manager (ACM) to provision an SSL certificate for your domain. This allows your microfrontends to be served over HTTPS.
   - Steps:
     - Request an SSL certificate in AWS Certificate Manager.
     - Attach the certificate to your CloudFront distributions to secure your microfrontends.

### 7. Set Up CI/CD Pipeline (Optional but Recommended)
   - Automate the build and deployment process using AWS CodePipeline, GitHub Actions, or another CI/CD tool.
   - Steps:
     - On every push to the microfrontend’s repository, the build process runs and the static files are deployed to the corresponding S3 bucket automatically.
     - Example:
       - Use AWS CodePipeline to trigger on code changes, build the microfrontend using CodeBuild, and deploy the build artifacts to the S3 bucket.

### 8. Manage Cross-Origin Resource Sharing (CORS)
   - If your microfrontends need to communicate with each other (for instance, if they are hosted on different subdomains), you need to set up CORS rules in each S3 bucket to allow safe resource sharing across origins.

   - Example CORS configuration:
     ```json
     [
       {
         "AllowedHeaders": ["*"],
         "AllowedMethods": ["GET", "POST", "PUT"],
         "AllowedOrigins": ["*"],
         "ExposeHeaders": []
       }
     ]
     ```

## Benefits of This Approach:
1. Simplicity: Using S3 and CloudFront is a simple, serverless, and cost-effective solution.
2. Scalability: S3 and CloudFront automatically scale with traffic, handling high volumes of users without any manual intervention.
3. Independence: Each microfrontend is stored in its own S3 bucket, meaning teams can independently update and deploy their microfrontend without impacting others.
4. Performance: CloudFront's global CDN ensures fast delivery of static assets, reducing latency for users worldwide.
5. Security: With HTTPS enabled via CloudFront and ACM, your microfrontends will be served securely, providing protection and trust for users.

## Example Scenario:

Let’s say you are running an e-commerce platform with separate microfrontends for the homepage, product listing, and checkout.

- Each microfrontend is hosted in its own S3 bucket (`home-frontend-bucket`, `product-frontend-bucket`, `checkout-frontend-bucket`).
- The CloudFront distributions serve each microfrontend via subdomains (e.g., `home.example.com`, `product.example.com`, `checkout.example.com`).
- Users visiting any part of your application will experience fast load times due to CloudFront’s caching capabilities.
- Each microfrontend team can independently push new updates via a CI/CD pipeline, which deploys directly to the corresponding S3 bucket, ensuring smooth and isolated updates.

## Conclusion

This strategy offers a balance of simplicity and effectiveness, allowing you to easily scale, update, and manage microfrontends without the need for complex infrastructure. Using S3 and CloudFront provides the core services needed for microfrontend hosting, while Route 53 and ACM help manage domain routing and security. This approach is ideal for static or client-side rendered applications and can be enhanced with CI/CD for automated deployments.

---

[<-Microfrontends](microfrontends-quick.md)

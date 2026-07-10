[<- Performance](../performance/perf-quick.md) | [<- MERN](mern-quick.md)

# New Relic for Node.js - APM Profiler

New Relic is a powerful Application Performance Monitoring (APM) tool that helps monitor the performance of Node.js applications in real-time. It collects detailed metrics about transactions, memory usage, database queries, external services, and other key components, providing rich insights to improve performance and troubleshoot bottlenecks.

## Setting Up New Relic for Node.js

### 1. Create a New Relic Account
To get started, you'll need a New Relic account. Sign up on [New Relic's website](https://newrelic.com/).

### 2. Install the New Relic Node.js Agent
Once you have your account, you can integrate New Relic into your Node.js application by installing the New Relic agent.

Run the following command in your project’s root directory:

```bash
npm install newrelic --save
```

### 3. Configure the New Relic Agent

After installing the New Relic agent, you'll need to configure it by adding a `newrelic.js` configuration file. You can generate this file using a template provided by New Relic:

```bash
cp node_modules/newrelic/newrelic.js ./newrelic.js
```

The key part of the configuration is your New Relic license key. You can find this in your New Relic account under Account Settings.

Open the `newrelic.js` file and update the `license_key` field with your New Relic license key:

```javascript
exports.config = {
  app_name: ['My Node App'],  // Name of your app, as it will appear in New Relic
  license_key: 'YOUR_NEW_RELIC_LICENSE_KEY',
  logging: {
    level: 'info' // Set the logging level (trace, debug, info, warn, error, fatal)
  }
};
```

### 4. Include the New Relic Agent in Your Application

To activate the New Relic agent, you need to include it at the very top of your application's main file (before any other `require` statements):

```javascript
require('newrelic');
const express = require('express');
const app = express();

// Your app code here...
app.get('/', (req, res) => {
  res.send('Hello, New Relic!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

This loads the New Relic agent, which automatically starts monitoring your application's performance.

### 5. Deploy Your Application

After integrating the New Relic agent, deploy your Node.js application. New Relic will automatically start collecting data and send it to the New Relic dashboard. You can monitor your application's performance, including response times, error rates, transaction times, and memory usage, from the New Relic dashboard.

## Example Scenarios for New Relic in Node.js

### Example 1: Monitoring Slow Transactions

New Relic can automatically track slow transactions and identify bottlenecks.

For example, if you have an API endpoint that takes a long time to respond, New Relic will capture details such as the time spent on database queries, external HTTP calls, and CPU usage.

```javascript
app.get('/slow', async (req, res) => {
  // Simulating a slow database query
  await new Promise((resolve) => setTimeout(resolve, 5000));
  res.send('This was a slow request');
});
```

In this case, New Relic will flag this `/slow` route as a slow transaction and provide insights into what caused the delay.

### Example 2: Tracking External Services and HTTP Calls

If your application relies on external services or APIs, New Relic can track the performance of those calls.

```javascript
const axios = require('axios');

app.get('/external-api', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/data');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data from external API');
  }
});
```

New Relic will show how long the call to the external API took, how frequently it's called, and if there are any errors or timeouts.

### Example 3: Memory Usage and Garbage Collection

New Relic can also track memory usage and identify if there are any memory leaks or excessive garbage collection cycles. This is useful for understanding how your application is managing memory over time.

For example, if your app holds onto large objects unnecessarily, you may notice increasing memory consumption in the New Relic dashboard.

```javascript
app.get('/leak', (req, res) => {
  global.leakArray = global.leakArray || [];
  global.leakArray.push(new Array(1000000).fill('leak'));
  res.send('Memory leak simulated!');
});
```

In this scenario, you will notice the memory consumption increasing every time the `/leak` route is accessed. New Relic can help diagnose such memory leaks by showing the memory usage pattern and garbage collection activity.

### Example 4: Custom Instrumentation

New Relic automatically monitors most parts of your application, but sometimes you might want to add custom instrumentation to track specific functions or metrics. You can use the New Relic API to measure the performance of custom code blocks.

```javascript
const newrelic = require('newrelic');

app.get('/custom', (req, res) => {
  const transaction = newrelic.startWebTransaction('/custom', () => {
    setTimeout(() => {
      transaction.end();
      res.send('Custom transaction monitored!');
    }, 1000);
  });
});
```

In this example, a custom web transaction is started with `newrelic.startWebTransaction`. This will show up in the New Relic dashboard as a distinct transaction, giving you more granular insights into the performance of specific routes or functions.

## Viewing Performance Data in New Relic

Once your application is up and running with New Relic, you can log into the New Relic dashboard to monitor various metrics:

1. Application Overview: View your app's overall health, including average response times, throughput, and error rates.
2. Transactions: See detailed information about specific routes or transactions, including response times, database queries, and external API calls.
3. Error Analytics: Monitor error rates and get detailed stack traces for exceptions that occur in your app.
4. Memory and CPU Usage: Track memory usage over time, view garbage collection frequency, and identify potential memory leaks.
5. External Services: Monitor the performance of external services your app depends on, including HTTP requests to third-party APIs.

## Best Practices for Using New Relic in Node.js

- Monitor critical transactions: Use custom instrumentation to track key functions or routes that are important for your business.
- Set up alerts: New Relic allows you to configure alerts based on thresholds, such as response times, error rates, or memory usage. This will notify you when performance degrades or if errors spike.
- Use distributed tracing: If your app is part of a microservices architecture, enable distributed tracing to get end-to-end visibility across services.
- Monitor deployments: Track how new deployments affect performance with New Relic's deployment markers. This helps correlate changes in the application with performance metrics.

## Conclusion

New Relic provides a robust set of tools for monitoring and profiling Node.js applications in both development and production environments. By integrating the New Relic agent into your app, you gain access to detailed metrics that help identify bottlenecks, memory leaks, and slow transactions, ultimately enabling you to optimize the performance of your Node.js application.

---

[<- Performance](../performance/perf-quick.md) | [<- MERN](mern-quick.md)

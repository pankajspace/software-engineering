const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// worker-threads.js

if (isMainThread) {
  // This code is executed in the main thread

  // Create a new worker
  const worker = new Worker(__filename, {
    workerData: { start: 1, end: 100 }
  });

  // Listen for messages from the worker
  worker.on('message', (result) => {
    console.log(`Sum from worker: ${result}`);
  });

  // Listen for errors from the worker
  worker.on('error', (error) => {
    console.error(`Worker error: ${error}`);
  });

  // Listen for the worker to exit
  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });

} else {
  // This code is executed in the worker thread

  // Function to calculate the sum of numbers in a range
  const calculateSum = (start, end) => {
    let sum = 0;
    for (let i = start; i <= end; i++) {
      sum += i;
    }
    return sum;
  };

  // Get the data passed to the worker
  const { start, end } = workerData;

  // Calculate the sum and send it back to the main thread
  const result = calculateSum(start, end);
  parentPort.postMessage(result);
}
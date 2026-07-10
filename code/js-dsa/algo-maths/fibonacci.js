// Fibonacci Series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

console.log("Fibonacci Iterative");

// Print Fibonacci Series upto n terms
function fibonacciSeries(n) {
  const fib = [0, 1];

  if (n == 1) return 0;

  if (n == 2) return fib;

  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  return fib;
}

console.log("0 : ", fibonacciSeries(0)); // 0
console.log("1 : ", fibonacciSeries(1)); // 0
console.log("9 : ", fibonacciSeries(9)); // [0, 1, 1, 2, 3, 5, 8, 13, 21]

// Time Complexity: O(n)
// Space Complexity: O(n)

// ----------------------------------------------------------------

// Print nth Fibonacci Number using iterative approach
function fibonacciIterative(n) {
  let a = 0;
  let b = 1;
  let c = 0;

  if (n == 0) return a;

  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }

  return b;
}

console.log("0 : ", fibonacciIterative(0)); // 0
console.log("1 : ", fibonacciIterative(1)); // 1
console.log("9 : ", fibonacciIterative(9)); // 34

// Time Complexity: O(n)
// Space Complexity: O(1)

module.exports = {
  fibonacciSeries,
  fibonacciIterative
};